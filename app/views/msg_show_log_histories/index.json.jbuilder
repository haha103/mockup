json.array!(@msg_show_log_histories) do |msg_show_log_history|
  json.extract! msg_show_log_history, :id, :count, :collected_at
  json.url msg_show_log_history_url(msg_show_log_history, format: :json)
end
