require 'bundler'
require 'active_support/all'

Bundler.require(:default)

ActiveSupport.on_load(:game_result_factory) do
  Time.zone = 'America/Sao_Paulo'
  I18n.load_path += Dir[File.expand_path('./../../locales/**/*.yml', __FILE__)]
  I18n.locale = :'pt-BR'
end

Sequel.connect(ENV.fetch('DATABASE_URL'))

Dir[File.expand_path('./../../lib/**/*.rb', __FILE__)].each { |file| require file }
