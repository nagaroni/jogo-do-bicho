require 'rack/urlmap'
require 'active_support/all'

class GameResult
  def self.app
    self.new.routes
  end

  def routes
    Rack::URLMap.new(
      '/api/results' => results,
    )
  end

  private

  def results
    Proc.new do |_env|
      [200, { 'Content-Type' => 'application/json' }, [results_body]]
    end
  end

  def results_body
    { results: GameResultFactory.create }.to_json
  end
end

