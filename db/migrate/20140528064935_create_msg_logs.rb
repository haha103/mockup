class CreateMsgLogs < ActiveRecord::Migration
  def change
    create_table :msg_logs do |t|
      t.datetime :recorded_at
      t.text :message

      t.timestamps
    end
  end
end
