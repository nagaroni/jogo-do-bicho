workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['RACK_MAX_THREADS'] || 5)
threads threads_count, threads_count

ENV['SITE_URL'] ||= 'https://www.ojogodobicho.com/deu_no_poste.htm'

port        ENV['PORT']     || 3000

environment ENV['RACK_ENV'] || 'development'
