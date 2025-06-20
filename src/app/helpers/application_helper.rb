module ApplicationHelper
  include TrendManagement
  require 'aws-sdk-s3'
  def full_title(page_title = '')
    base_title = Rails.application.config.x.server_property.server_name
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end
  def full_front_url(path)
    return File.join(ENV["FRONT_URL"], path)
  end
  def full_back_url(path)
    return File.join(ENV["BACK_URL"], path)
  end
  def to_page(current_page, where_to_go)
    current_page = current_page.to_i
    page = where_to_go == 'next' ? [current_page + 1, 2].max : where_to_go == 'prev' ? [current_page - 1, 1].max : 2
    return page
  end
  def tab_trend
    current_trend(limit: 5)
  end
  private
  def object_url(path_key)
    bucket_key = File.join(ENV["S3_BUCKET"], path_key)
    url = File.join(ENV["S3_PUBLIC_ENDPOINT"], bucket_key)
    return url
  end
  def signed_object_url(path_key)
    s3 = Aws::S3::Client.new(
      endpoint: ENV["S3_PUBLIC_ENDPOINT"],
      region: ENV["S3_REGION"],
      access_key_id: ENV["S3_USER"],
      secret_access_key: ENV["S3_PASSWORD"],
      force_path_style: true
    )
    signer = Aws::S3::Presigner.new(client: s3)
    url = signer.presigned_url(
      :get_object,
      bucket: ENV["S3_BUCKET"],
      key: "#{path_key}",
      expires_in: 12
    )
    return url
  end

  def url_and_hashtag_linker(text)
    url_regex = %r{https?://[^\s　]+}
    hashtag_regex = /#[^\s　]+/

    text = text.gsub(url_regex) do |url|
      scheme_after = url.sub(%r{^https?://}, "").sub(%r{/$}, "")
      domain, path = scheme_after.split("/", 2)
      case domain
      when "amiverse.net"
        "<a href=\"#{url}\" class=\"inside-link\">#{scheme_after}</a>"
      when "api.amiverse.net"
        "<a href=\"/#{path}\" class=\"inside-link\">#{scheme_after}</a>"
      else
        "<a href=\"#{url}\" target=\"_blank\" rel=\"noopener noreferrer\">#{scheme_after}</a>"
      end
    end

    text = text.gsub(hashtag_regex) do |hashtag|
      ht_txt = hashtag.delete_prefix("#")
      "<a href=\"/search?query=#{ht_txt}\">#{hashtag}</a>"
    end
    
    text.html_safe
  end

  def get_reactions(reactions)
    rwe = reactions.joins(:emoji)
    rwe.group("emoji_id").map do |r| {
      reaction_count: rwe.where(emoji_id: r.emoji_id).count, 
      emoji: r.emoji
    }
    end
  end
end
