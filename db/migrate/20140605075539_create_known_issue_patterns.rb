class CreateKnownIssuePatterns < ActiveRecord::Migration
  def change
    create_table :known_issue_patterns do |t|
      t.string :content

      t.timestamps
    end
  end
end
