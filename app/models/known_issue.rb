class KnownIssue < ActiveRecord::Base
	has_and_belongs_to_many :known_issue_patterns, :join_table => "known_issue_patterns_known_issues"
	has_and_belongs_to_many :msg_show_logs
end
