class KnownIssue < ActiveRecord::Base
	has_and_belongs_to_many :known_issue_patterns
	has_and_belongs_to_many :msg_show_logs
end
