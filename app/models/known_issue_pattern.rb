class KnownIssuePattern < ActiveRecord::Base
	has_and_belongs_to_many :known_issues
end
