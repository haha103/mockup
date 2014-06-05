class AddMsgShowLogRefToMsgShowLogHistories < ActiveRecord::Migration
  def change
    add_reference :msg_show_log_histories, :msg_show_log, index: true
  end
end
