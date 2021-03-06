require 'test_helper'

class KnownIssuesControllerTest < ActionController::TestCase
  setup do
    @known_issue = known_issues(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:known_issues)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create known_issue" do
    assert_difference('KnownIssue.count') do
      post :create, known_issue: { name: @known_issue.name }
    end

    assert_redirected_to known_issue_path(assigns(:known_issue))
  end

  test "should show known_issue" do
    get :show, id: @known_issue
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @known_issue
    assert_response :success
  end

  test "should update known_issue" do
    patch :update, id: @known_issue, known_issue: { name: @known_issue.name }
    assert_redirected_to known_issue_path(assigns(:known_issue))
  end

  test "should destroy known_issue" do
    assert_difference('KnownIssue.count', -1) do
      delete :destroy, id: @known_issue
    end

    assert_redirected_to known_issues_path
  end
end
