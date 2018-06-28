Sequel.migration do
  change do
    create_table :games do
      primary_key :id
      String :caption
      String :type
      String :result
      String :animal
      Integer :position
    end
  end
end
