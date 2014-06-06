class KnownIssuePattern < ActiveRecord::Base
	has_and_belongs_to_many :known_issues, :join_table => "known_issue_patterns_known_issues"
end
