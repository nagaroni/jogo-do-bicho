require 'rack/urlmap'

class GameResult
  def self.app
    self.new.routes
  end

  def routes
    Rack::URLMap.new(
      '/api/results' => results,
      '/assets/bundle.js' => asset_bundle_js,
      '/' => index_path
    )
  end

  private

  JAVASCRIPT = { 'Content-Type' => 'text/javascript' }.freeze
  JSON       = { 'Content-Type' => 'application/json' }.freeze
  HTML       = { 'Content-Type' => 'text/html' }.freeze

  def asset_bundle_js
    filepath = path.join('assets', 'bundle.js')
    bundle_js_content = File.read(filepath)

    Proc.new { |_| [200, JAVASCRIPT, [ bundle_js_content ]] }
  end

  def index_path
    filepath = path.join('public', 'index.html')

    index_html = File.read(filepath)

    Proc.new { |_| [200, HTML, [ index_html ]] }
  end

  def results
    Proc.new { |_| [200, JSON, [ results_body ]] }
  end

  def results_body
    { results: GameResultFactory.create }.to_json
  end

  def path
    @path ||= Pathname.new(File.expand_path('./../../', __FILE__))
  end
end

