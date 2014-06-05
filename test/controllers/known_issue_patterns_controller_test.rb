require 'test_helper'

class KnownIssuePatternsControllerTest < ActionController::TestCase
  setup do
    @known_issue_pattern = known_issue_patterns(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:known_issue_patterns)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create known_issue_pattern" do
    assert_difference('KnownIssuePattern.count') do
      post :create, known_issue_pattern: { content: @known_issue_pattern.content }
    end

    assert_redirected_to known_issue_pattern_path(assigns(:known_issue_pattern))
  end

  test "should show known_issue_pattern" do
    get :show, id: @known_issue_pattern
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @known_issue_pattern
    assert_response :success
  end

  test "should update known_issue_pattern" do
    patch :update, id: @known_issue_pattern, known_issue_pattern: { content: @known_issue_pattern.content }
    assert_redirected_to known_issue_pattern_path(assigns(:known_issue_pattern))
  end

  test "should destroy known_issue_pattern" do
    assert_difference('KnownIssuePattern.count', -1) do
      delete :destroy, id: @known_issue_pattern
    end

    assert_redirected_to known_issue_patterns_path
  end
end
