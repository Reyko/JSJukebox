require 'sinatra'
require 'erb'
require 'tilt'


get '/' do
  template = Tilt.new('views/index.html.erb')
  template.render
end