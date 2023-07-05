Rails.application.routes.draw do
  get 'places/index'
  get "api//v1/places", to: "api/v1/places#index"
  root "places#index"
end
