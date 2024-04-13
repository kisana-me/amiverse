class V1::ApplicationController < ApplicationController
  protect_from_forgery
  private
  def api_admin_account
    unless logged_in? && @current_account.administrator?
      render status: 403
    end
  end
  def api_logged_in_account
    unless logged_in?
      render status: 401
    end
  end
  def api_logged_out_account
    unless !logged_in?
      render status: 400
    end
  end
  def set_csrf_token_cookie
    cookies['CSRF-TOKEN'] = {
      value: form_authenticity_token,
      domain: :all,
      expires: 1.year.from_now,
      secure: ENV["RAILS_SECURE_COOKIES"].present?,
      httponly: true
    }
  end
  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end
  def login_account_data(account)
    return account.as_json(only: [
      :aid,
      :name,
      :name_id,
      :icon_id,
      :banner_id,
      :followers_counter,
      :following_counter,
      :meta,
      :cache,
      :discoverable,
      :manually_approves_followers,
    ])
  end
  def account_data(account)
    account_data_json = account.as_json(only: [
      :aid,
      :name,
      :name_id,
      :icon_id,
      :banner_id,
      :summary,
      :location,
      :followers_counter,
      :following_counter,
      :items_counter,
      :birthday,
      :created_at,
      :meta,
      :cache,
      :bot,
      :kind,
      :public_key
    ])
    account_data_json['icon_url'] = image_url(aid: account.icon_id, type: 'icons')
    account_data_json['banner_url'] = image_url(aid: account.banner_id, type: 'banners')
    account_data_json['items'] = items_data(account.items)
    return account_data_json
  end
  def with_account_data(account)
    account_data_json = account.as_json(only: [
      :aid,
      :name,
      :name_id,
      :icon_id,
      :banner_id,
      :meta,
      :cache,
      :bot,
      :kind
    ])
    account_data_json['icon_url'] = image_url(aid: account.icon_id, type: 'icons')
    account_data_json['banner_url'] = image_url(aid: account.banner_id, type: 'banners')
    return account_data_json
  end
  def ap_account_data(account)
  end
  def item_data(item)
    item_data_json = item.as_json(only: [
      :aid,
      :kind,
      :meta,
      :cache,
      :content,
      :sensitive,
      :warning_message,
      :foreign,
      :created_at,
      :updated_at,
    ])
    # account
    account_data_json = with_account_data(item.account)
    item_data_json['account'] = account_data_json
    # image
    images_array_json = []
    #images = JSON.parse(item.images)
    #images.each do |image|
    #  #image_data_json = image_data(image)
    #  if image_data = Image.find_by(
    #    aid: image,
    #    private: false,
    #    deleted: false
    #  )
    #  else
    #    # 削除された画像
    #  end
    #  image_data_json['url'] = image_url(aid: image_data.aid)
    #  images_array_json << image_data_json
    #end
    #item_data_json['images'] = images_array_json
    # video
    # reaction
    item_data_json['reactions'] = []
    # other
    return item_data_json
  end
  def items_data(items)
    return items.map {|item|
      item_data(item)
    }
  end
  def image_data(image)
    return image.as_json(only: [
      :aid,
      :name,
      :description,
      :sensitive,
      :warning_message,
      :meta
    ])
  end
end