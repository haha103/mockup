json.array!(@known_issue_patterns) do |known_issue_pattern|
  json.extract! known_issue_pattern, :id, :content
  json.url known_issue_pattern_url(known_issue_pattern, format: :json)
end
