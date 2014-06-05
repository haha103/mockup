class MsgShowLog < ActiveRecord::Base
	belongs_to :msg_type
	belongs_to :test_run
	has_many   :msg_show_log_histories
	has_and_belongs_to_many :known_issues
end
