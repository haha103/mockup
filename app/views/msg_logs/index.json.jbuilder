json.array!(@msg_logs) do |msg_log|
  json.extract! msg_log, :id, :recorded_at, :message
  json.url msg_log_url(msg_log, format: :json)
end
