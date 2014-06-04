class AddMsidAndImsiAndLastEventAndLastTcsToMsgLogs < ActiveRecord::Migration
  def change
    add_column :msg_logs, :msid, :string
    add_column :msg_logs, :imsi, :string
    add_column :msg_logs, :last_event, :text
    add_column :msg_logs, :last_tcs, :text
  end
end
