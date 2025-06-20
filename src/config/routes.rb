require 'sidekiq/web'
Rails.application.routes.draw do

  # sidekiq
  mount Sidekiq::Web => '/sidekiq'
  Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
    [user, password] == [ENV['SIDEKIQ_USERNAME'], ENV['SIDEKIQ_PASSWORD']]
  end

  # action cable
  mount ActionCable.server => '/cable'

  # === base === #
  root 'feeds#index'
  get 'following' => 'feeds#following'
  get 'current' => 'feeds#current'
  get 'discovery' => 'discovery#index'
  get 'search' => 'search#index'
  get 'dashboard' => 'dashboard#index'

  # === account === #
  # resources :accounts, param: :aid, constraints: { name_id: /.*/ } do
  #   #post '@:name_id/follow' => 'accounts#follow', as: 'follow'
  # end
  get '@:name_id' => 'accounts#show', as: 'account', constraints: { name_id: /[A-Za-z0-9\-_\.@]*/ }
  get '@:name_id/icon' => 'accounts#show_icon', as: 'show_icon', constraints: { name_id: /.*/ }
  get '@:name_id/banner' => 'accounts#show_banner', as: 'show_banner', constraints: { name_id: /.*/ }
  post '@:name_id/follow' => 'accounts#follow', as: 'follow', constraints: { name_id: /.*/ }      # 以下resourcesに移行
  post '@:name_id/reject_follow' => 'accounts#reject_follow', as: 'reject_follow', constraints: { name_id: /.*/ }
  patch '@:name_id/upate' => 'accounts#update', as: 'update_account'

  # === item === #
  resources :items, param: :aid do
    get 'reload' => 'items#reload', as: 'reload'
    get 'reply' => 'items#new_reply', as: 'reply'
    get 'quote' => 'items#new_quote', as: 'quote'
    get 'react' => 'items#new_react', as: 'react'
    get 'diffuse' => 'items#diffuse', as: 'diffuse'
    post 'reply' => 'items#create_reply', as: 'create_reply'
    post 'quote' => 'items#create_quote', as: 'create_quote'
    post 'react' => 'reactions#react', as: 'create_react'
  end

  # === storage === #
  get 'storage' => 'storage#index'
  resources :icons, param: :aid
  resources :banners, param: :aid
  resources :images, param: :aid
  resources :audios, param: :aid
  resources :videos, param: :aid

  # === notifications === #
  resources :notifications, param: :aid, only: %i[ index new create show destroy ]

  # === emojis === #
  resources :emojis, param: :aid

  # === tags === #
  resources :tags, param: :aid

  # === canvases === #
  resources :canvases, param: :aid

  # pre
  get 'messages' => 'resources#index'

  # === entries === #
  # signup
  get 'signup' => 'signup#index'
  get 'signup/check' => 'signup#check'
  post 'signup/entry' => 'signup#entry'
  post 'signup/create' => 'signup#create'
  # log-in-out
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create', as: 'create_session'
  delete 'logout' => 'sessions#logout'
  # clients
    # get 'clients/:aid'
  # sessions
  patch 'sessions/current' => 'sessions#update_current'
  post 'sessions/change' => 'sessions#change'
  post 'sessions/destroy' => 'sessions#destroy'

  # === settings === #
  get 'settings' => 'settings#index'
  get 'settings/profile' => 'settings#profile'
  get 'settings/account' => 'settings#account'
  get 'settings/storage' => 'settings#storage'
  get 'settings/contents' => 'settings#contents'
  get 'settings/activity' => 'settings#activity'
  get 'settings/notifications' => 'settings#notifications'
  get 'settings/display' => 'settings#display'
  get 'settings/security_and_authority' => 'settings#security_and_authority'
  get 'settings/analytics' => 'settings#analytics'
  get 'settings/bills_and_payments' => 'settings#bills_and_payments'
  get 'settings/others' => 'settings#others'

  # === resources === #
  get 'resources' => 'resources#index'
  get 'about' => 'resources#about'
  get 'info' => 'resources#info'
  get 'help' => 'resources#help'
  get 'sitemap' => 'resources#sitemap'
  get 'contact' => 'resources#feedback'
  # お知らせ
  get 'blog' => 'resources#blog'
  get 'release_notes' => 'resources#release_notes'
  # 法的表示
  get 'tos' => 'resources#tos'
  get 'privacy_policy' => 'resources#privacy_policy'

  namespace :administrations do
    root 'dashboard#index'

    resources :accounts, param: :aid, constraints: { name_id: /.*/ }, except: %i[ show ] do
      get 'extra_edit'  => 'accounts#extra_edit'
      patch 'extra_update'  => 'accounts#extra_update'
    end
    resources :clients, param: :uuid, except: %i[ show ]
    resources :sessions, param: :uuid, except: %i[ show ]
    resources :items, param: :aid, except: %i[ show ]
    resources :invitations, param: :aid, except: %i[ show ]
    resources :roles, param: :aid
    resources :badges, param: :aid
    resources :server_properties, param: :aid
    # test
    get 'test' => 'test#index'
    get 'test/explore' => 'test#explore'
    get 'test/explore/:id' => 'test#show', constraints: { id: /.*/ }
    get 'test/new'
    post 'test/generate'
    post 'test/verify'
    post 'test/digest'
    post 'test/generate_ap_key_pair'
    get 'new_accounts' => 'test#new_accounts'
    post 'create_accounts' => 'test#create_accounts'
  end

  namespace :v1 do
    root 'resources#index'

    # session
    get 'sessions/new' => 'sessions#new'
    post 'sessions/check' => 'sessions#check'
    post 'login' => 'sessions#login'
    delete 'logout' => 'sessions#logout'

    # feed
    post 'feeds/index' => 'feeds#index'
    post 'feeds/follow' => 'feeds#following'
    post 'feeds/current' => 'feeds#current'

    # account
    post '@:name_id' => 'accounts#show', as: 'account'
    post '@:name_id/followers' => 'accounts#followers', as: 'followers'
    post '@:name_id/following' => 'accounts#following', as: 'following'

    # signup
    post 'signup/check' => 'signup#check'
    post 'signup/create' => 'signup#create'

    # item
    # post 'items' => 'items#index', as: 'items'
    post 'items/create' => 'items#create', as: 'create_items'
    post 'items/react' => 'items#react', as: 'react'
    post 'items/diffuse' => 'items#diffuse', as: 'diffuse'
    post 'items/:aid' => 'items#show', as: 'item'

    post 'search' => 'search#index', as: 'search'

    # emoji
    post 'emojis' => 'emojis#index', as: 'emojis'

    # discovery
    post 'discovery' => 'discovery#index', as: 'discovery'

    # activity pub
    post 'activitypub/inbox' => 'activity_pub#inbox'
  end
  
  namespace :ap do
    # account
    post '@:name_id' => 'accounts#show', as: 'account'
  end

  get '*not_found', to: 'application#routing_error'
  post '*not_found', to: 'application#routing_error'
end
