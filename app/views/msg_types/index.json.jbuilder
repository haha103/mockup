json.array!(@msg_types) do |msg_type|
  json.extract! msg_type, :id, :name
  json.url msg_type_url(msg_type, format: :json)
end
