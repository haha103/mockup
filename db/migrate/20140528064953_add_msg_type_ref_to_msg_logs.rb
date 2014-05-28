class AddMsgTypeRefToMsgLogs < ActiveRecord::Migration
  def change
    add_reference :msg_logs, :msg_type, index: true
  end
end
