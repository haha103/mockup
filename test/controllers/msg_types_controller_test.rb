require 'test_helper'

class MsgTypesControllerTest < ActionController::TestCase
  setup do
    @msg_type = msg_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:msg_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create msg_type" do
    assert_difference('MsgType.count') do
      post :create, msg_type: { name: @msg_type.name }
    end

    assert_redirected_to msg_type_path(assigns(:msg_type))
  end

  test "should show msg_type" do
    get :show, id: @msg_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @msg_type
    assert_response :success
  end

  test "should update msg_type" do
    patch :update, id: @msg_type, msg_type: { name: @msg_type.name }
    assert_redirected_to msg_type_path(assigns(:msg_type))
  end

  test "should destroy msg_type" do
    assert_difference('MsgType.count', -1) do
      delete :destroy, id: @msg_type
    end

    assert_redirected_to msg_types_path
  end
end
