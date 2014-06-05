require 'test_helper'

class MsgShowLogHistoriesControllerTest < ActionController::TestCase
  setup do
    @msg_show_log_history = msg_show_log_histories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:msg_show_log_histories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create msg_show_log_history" do
    assert_difference('MsgShowLogHistory.count') do
      post :create, msg_show_log_history: { collected_at: @msg_show_log_history.collected_at, count: @msg_show_log_history.count }
    end

    assert_redirected_to msg_show_log_history_path(assigns(:msg_show_log_history))
  end

  test "should show msg_show_log_history" do
    get :show, id: @msg_show_log_history
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @msg_show_log_history
    assert_response :success
  end

  test "should update msg_show_log_history" do
    patch :update, id: @msg_show_log_history, msg_show_log_history: { collected_at: @msg_show_log_history.collected_at, count: @msg_show_log_history.count }
    assert_redirected_to msg_show_log_history_path(assigns(:msg_show_log_history))
  end

  test "should destroy msg_show_log_history" do
    assert_difference('MsgShowLogHistory.count', -1) do
      delete :destroy, id: @msg_show_log_history
    end

    assert_redirected_to msg_show_log_histories_path
  end
end
