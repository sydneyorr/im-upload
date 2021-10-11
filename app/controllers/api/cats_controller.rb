class Api::CatsController < ApplicationController

  def index
    render json: Cat.all
  end
  
end
