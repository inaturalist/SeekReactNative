source "https://rubygems.org"
# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby ">= 2.6.10"

# Exclude problematic versions of cocoapods and activesupport that causes build failures.
gem "activesupport", ">= 6.1.7.5", "!= 7.1.0"
gem "cocoapods", ">= 1.13", "!= 1.15.0", "!= 1.15.1"
gem "concurrent-ruby", "< 1.3.4"
gem "xcodeproj", "< 1.26.0"
 
# Ruby 3.4.0 has removed some libraries from the standard library.
gem 'bigdecimal'
gem 'logger'
gem 'benchmark'
gem 'mutex_m'

gem "fastlane"
# Currently fastlane support for ruby 3.4.x is not finished, so we need to add
# this here because fastlane does not specifically add this dependency.
gem "abbrev"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
