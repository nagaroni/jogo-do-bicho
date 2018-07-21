class GameResultFactory
  def self.create
    send(:new).create
  end

  def create
    games = find_games_by_today_caption || create_games

    [today_caption, group_by_game_type(games)]
  end

  private

  DEFAULT_POSITION_START = 1

  private_class_method :new
  private_constant :DEFAULT_POSITION_START

  def initialize
    ActiveSupport.run_load_hooks(:game_result_factory)
  end

  def group_by_game_type(games)
    games.group_by(&:type)
  end

  def today_caption
    @today_caption ||= I18n.l(Time.zone.now, format: :caption)
  end

  def crawler
    @crawler ||= GameCrawler.new
  end

  def find_games_by_today_caption
    games = Game.where(caption: today_caption).order(:position)

    games.to_a if games.count > 0
  end

  def create_games
    info = crawler.get_current_result
    info[:results].flat_map do |(game_type, results)|
      save_game_results(info[:caption], game_type, results)
    end
  end

  def save_game_results(caption, game_type, results)
    results.map.with_index(
      DEFAULT_POSITION_START
    ) do |(animal, game_result), position|
      ::Game.create(
        caption: caption,
        type: game_type,
        position: position,
        result: game_result,
        animal: animal
      )
    end
  end
end
