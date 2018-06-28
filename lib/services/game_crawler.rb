require 'net/http'

class GameCrawler
  def initialize
    @url = ENV.fetch('SITE_URL')
  end

  def get_current_result
    nodes = nodes_with_results

    get_current_day_result(nodes.first)
  end

  private

  def site_uri
    @site_uri ||= URI(@url)
  end

  def get_current_day_result(node)
    caption = node.first_element_child.text
    headers = node.css('thead > tr > th').map(&:text)[1..-1]
    results = get_result_from_table_body(node)

    { caption: caption, results: normalized_results(headers, results) }
  end

  def get_result_from_table_body(node)
    node.css('tbody > tr').map do |row_node|
      row_node.css('td')[1..-1].map do |column|
        [ column.attr('title'), column.text ]
      end
    end
  end

  def normalized_results(games, results)
    games.map.with_index do |game_type, index|
      [
        game_type,
        results.map { |result| result[index] }
      ]
    end
  end

  def nodes_with_results
    document.css('table').select do |node|
      node.first_element_child.name.eql?('caption')
    end
  end

  def document
    @document ||= Nokogiri::HTML(get_site_content)
  end

  def get_site_content
    Net::HTTP.get(site_uri).squish
  end
end
