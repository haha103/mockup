class AddTestRunRefToMsgShowLogs < ActiveRecord::Migration
  def change
    add_reference :msg_show_logs, :test_run, index: true
  end
end
