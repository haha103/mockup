json.array!(@msg_show_logs) do |msg_show_log|
  json.extract! msg_show_log, :id, :count, :message, :collected_at
  json.url msg_show_log_url(msg_show_log, format: :json)
end
