class AddMsgTypeRefToMsgShowLogs < ActiveRecord::Migration
  def change
    add_reference :msg_show_logs, :msg_type, index: true
  end
end
