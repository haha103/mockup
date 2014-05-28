class CreateMsgShowLogs < ActiveRecord::Migration
  def change
    create_table :msg_show_logs do |t|
      t.integer :count
      t.text :message
      t.datetime :collected_at

      t.timestamps
    end
  end
end
