class Admin::DashboardController < Admin::ApplicationController
  before_action :logged_in_account
  def index
  end
  private
end
