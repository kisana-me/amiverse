class CreateAccountBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :account_badges do |t|
      t.references :account, null: false, foreign_key: true
      t.references :badge, null: false, foreign_key: true
      t.timestamps
    end
  end
end
