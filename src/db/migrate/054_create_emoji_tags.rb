class CreateEmojiTags < ActiveRecord::Migration[7.0]
  def change
    create_table :emoji_tags do |t|
      t.references :emoji, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.timestamps
    end
  end
end
