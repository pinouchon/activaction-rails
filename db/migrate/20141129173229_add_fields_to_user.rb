class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :gender, :boolean
    add_column :users, :bio, :text
    add_column :users, :username, :string
    add_column :users, :terms_at, :datetime
    add_column :users, :newsletter_at, :datetime
  end
end
