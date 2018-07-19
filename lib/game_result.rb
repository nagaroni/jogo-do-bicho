require 'rack/urlmap'

class GameResult
  def self.app
    self.new.routes
  end

  def routes
    Rack::URLMap.new(
      '/api/results' => results,
      '/assets/bundle.js' => asset_bundle_js,
      '/assets/style.css' => asset_css,
      '/' => index_path
    )
  end

  private

  JAVASCRIPT = { 'Content-Type' => 'text/javascript' }.freeze
  JSON       = { 'Content-Type' => 'application/json' }.freeze
  HTML       = { 'Content-Type' => 'text/html' }.freeze
  CSS        = { 'Content-Type' => 'text/css' }.freeze

  def asset_bundle_js
    bundle_js_content = read_file('assets', 'bundle.js')

    Proc.new { |_| [200, JAVASCRIPT, [ bundle_js_content ]] }
  end

  def asset_css
    css_content = read_file('assets', 'style.css')

    Proc.new { |_| [200, CSS, [ css_content ]] }
  end

  def index_path
    index_html = read_file('public', 'index.html')

    Proc.new { |_| [200, HTML, [ index_html ]] }
  end

  def results
    Proc.new { |_| [200, JSON, [ results_body ]] }
  end

  def results_body
    { results: GameResultFactory.create }.to_json
  end

  def read_file(*args)
    File.read(path.join(*args))
  end

  def path
    @path ||= Pathname.new(File.expand_path('./../../', __FILE__))
  end
end

