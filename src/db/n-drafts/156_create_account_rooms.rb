class CreateAccountRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :account_rooms do |t|
      t.references :account, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.timestamps
    end
  end
end
