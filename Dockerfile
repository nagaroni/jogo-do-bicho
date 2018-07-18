FROM 'ruby:2.4.1'

ENV NODE_VERSION 8
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | \
  tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential postgresql-client nodejs yarn

RUN gem install bundler

WORKDIR /app
ADD . .

RUN bundle install

RUN yarn install

CMD ['bundle', 'exec', 'puma', '-C', 'config/puma.rb']
