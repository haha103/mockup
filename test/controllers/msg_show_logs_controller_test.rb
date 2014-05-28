require 'test_helper'

class MsgShowLogsControllerTest < ActionController::TestCase
  setup do
    @msg_show_log = msg_show_logs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:msg_show_logs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create msg_show_log" do
    assert_difference('MsgShowLog.count') do
      post :create, msg_show_log: { collected_at: @msg_show_log.collected_at, count: @msg_show_log.count, message: @msg_show_log.message }
    end

    assert_redirected_to msg_show_log_path(assigns(:msg_show_log))
  end

  test "should show msg_show_log" do
    get :show, id: @msg_show_log
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @msg_show_log
    assert_response :success
  end

  test "should update msg_show_log" do
    patch :update, id: @msg_show_log, msg_show_log: { collected_at: @msg_show_log.collected_at, count: @msg_show_log.count, message: @msg_show_log.message }
    assert_redirected_to msg_show_log_path(assigns(:msg_show_log))
  end

  test "should destroy msg_show_log" do
    assert_difference('MsgShowLog.count', -1) do
      delete :destroy, id: @msg_show_log
    end

    assert_redirected_to msg_show_logs_path
  end
end
