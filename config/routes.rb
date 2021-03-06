ActivactionRails::Application.routes.draw do
  #devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, :path => '',
             :controllers => {
               :sessions => 'sessions',
               :registrations => 'registrations'
             },
             :path_names => {
               :sign_in => 'login',
               :password => 'forgot',
               :confirmation => 'confirm',
               :unlock => 'unblock',
               :registration => 'register',
               :sign_up => 'new', :sign_out => 'logout'}

  root 'static#landing'
  get '/about' => 'static#about'
  get '/community' => 'users#index'
  get '/register' => redirect('/register/new')

  resources :events
  resources :comments
  resources :wiki_pages
  resources :users
  resources :attendances
  resources :labels
  resources :likes

  get '/wiki' => 'wiki_pages#handler'
  get '/wiki/*url' => 'wiki_pages#handler'

  #chat
  #wiki
  #forum
  #activ'profil

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
