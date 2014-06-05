class CreateMsgShowLogHistories < ActiveRecord::Migration
  def change
    create_table :msg_show_log_histories do |t|
      t.integer :count
      t.datetime :collected_at

      t.timestamps
    end
  end
end
