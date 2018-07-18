#!/bin/bash

yarn run build && bundle exec puma -C config/puma.rb
