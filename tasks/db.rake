namespace :db do
  require 'sequel'
  require 'active_support/all'

  Sequel.extension :migration
  DB = Sequel.connect(ENV['DATABASE_URL'] || 'postgres://postgres:postgres@localhost:5432/jogo_do_bicho')

  desc 'prints current schema version'
  task :version do
    version = if DB.tables.include?(:schema_info)
                DB[:schema_info].first[:version]
              end || 0

    puts "Schema Version: #{version}"
  end

  desc 'Perform migration'
  task :migrate do
    Sequel::Migrator.run(DB, 'migrations')
    Rake::Task['db:version'].execute
  end

  desc 'rollback to a given version'
  task :rollback, :version do |_, args|
    default_version = if Dir['migrations/**'].size < 2
                        0
                      else
                        DB[:schema_migrations]
                          .order(:filename)
                          .last[:filename]
                          .split('_')
                          .first
                      end
    args.with_defaults(version: default_version)

    Sequel::Migrator.run(DB, "migrations", target: args[:version].to_i)

    puts "Rollback to version #{args[:version]}"
  end

  desc 'generate migration file'
  task :migration_file, :filename do |_, args|
    raise 'You must provice a migration name' if args[:filename].blank?

    timestamp = Time.now.strftime('%Y%m%d%H%M%S')
    migration_name = args[:filename].underscore
    migration_filename = "#{timestamp}_#{migration_name}.rb"

    file = File.new("migrations/#{migration_filename}", 'w')
    file.write('')
    file.close()

    puts "File #{migration_filename} created!"
  end
end
