class CreateAccountAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :account_achievements do |t|
      t.references :account, null: false, foreign_key: true
      t.references :achievement, null: false, foreign_key: true
      t.timestamps
    end
  end
end
