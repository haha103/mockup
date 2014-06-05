class CreateJoinTableKnownIssueKnownIssuePattern < ActiveRecord::Migration
  def change
    create_join_table :known_issues, :known_issue_patterns do |t|
      # t.index [:known_issue_id, :known_issue_pattern_id]
      # t.index [:known_issue_pattern_id, :known_issue_id]
    end
  end
end
