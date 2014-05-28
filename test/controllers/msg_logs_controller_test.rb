require 'test_helper'

class MsgLogsControllerTest < ActionController::TestCase
  setup do
    @msg_log = msg_logs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:msg_logs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create msg_log" do
    assert_difference('MsgLog.count') do
      post :create, msg_log: { message: @msg_log.message, recorded_at: @msg_log.recorded_at }
    end

    assert_redirected_to msg_log_path(assigns(:msg_log))
  end

  test "should show msg_log" do
    get :show, id: @msg_log
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @msg_log
    assert_response :success
  end

  test "should update msg_log" do
    patch :update, id: @msg_log, msg_log: { message: @msg_log.message, recorded_at: @msg_log.recorded_at }
    assert_redirected_to msg_log_path(assigns(:msg_log))
  end

  test "should destroy msg_log" do
    assert_difference('MsgLog.count', -1) do
      delete :destroy, id: @msg_log
    end

    assert_redirected_to msg_logs_path
  end
end
