class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :aid, null: false
      t.string :name, null: false, default: ''
      t.text :description, null: false, default: ''
      t.bigint :counter, null: false, default: 0
      t.timestamps
    end
    add_index :words, [:aid], unique: true
  end
end
