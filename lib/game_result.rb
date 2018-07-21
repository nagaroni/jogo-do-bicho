require 'rack/urlmap'

class GameResult
  def self.app
    self.new.routes
  end

  def routes
    Rack::URLMap.new(
      '/api/results' => results,
      '/dist' => public_files,
      '/' => index_path
    )
  end

  private

  HTML = { 'Content-Type' => 'text/html' }.freeze
  JSON = { 'Content-Type' => 'application/json' }.freeze

  def public_files
    Proc.new do |env|
      path_to_file = env['REQUEST_PATH'][1..-1]

      if File.exists?(path.join('public', path_to_file))
        [ 200, {},  [string_response(*path_to_file)]]
      else
        [ 404, {},  ['Not found']]
      end
    end
  end

  def index_path
    index_html = string_response(path.join('public', 'index.html'))

    Proc.new { |_| [200, HTML, [ index_html ]] }
  end

  def results
    Proc.new { |_| [200, JSON, [ results_body ]] }
  end

  def results_body
    caption, results = GameResultFactory.create

    { caption: caption, results: results }.to_json
  end

  def string_response(path_to_file)
    File.read(path.join('public', path_to_file))
  end

  def path
    @path ||= Pathname.new(File.expand_path('./../../', __FILE__))
  end
end

