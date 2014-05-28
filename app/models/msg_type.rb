class MsgType < ActiveRecord::Base
	has_many :msg_show_logs
	has_many :msg_logs
end
