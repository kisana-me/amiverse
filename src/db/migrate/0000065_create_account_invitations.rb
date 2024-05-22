class CreateAccountInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :account_invitations do |t|
      t.references :account, null: false, foreign_key: true
      t.references :invitation, null: false, foreign_key: true
      t.timestamps
    end
  end
end
