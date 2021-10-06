Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get "things", to: "things#index"

    get "/users", to: "users#index"
    get "/users/:id", to: "users#show"
    put "/users/:id", to: "users#update"
  end
end
