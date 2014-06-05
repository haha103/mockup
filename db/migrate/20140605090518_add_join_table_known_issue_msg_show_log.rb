class AddJoinTableKnownIssueMsgShowLog < ActiveRecord::Migration
  def change
    create_join_table :known_issues, :msg_show_logs do |t|
      # t.index [:known_issue_id, :msg_show_log_id]
      # t.index [:msg_show_log_id, :known_issue_id]
    end
  end
end
