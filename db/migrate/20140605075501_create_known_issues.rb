class CreateKnownIssues < ActiveRecord::Migration
  def change
    create_table :known_issues do |t|
      t.string :name

      t.timestamps
    end
  end
end
