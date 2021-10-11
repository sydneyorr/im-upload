Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get "things", to: "things#index"

    post "memes", to: "memes#create"

    post "memes1", to: "memes#create1"
    get "cats", to: "cats#index"

    get "users", to: "users#index"
    get "users/:id", to: "users#show"
    put "users/:id", to: "users#update"
  end
  # ensure that we always render the index.html
  get "+other", to: "static#index"
end
