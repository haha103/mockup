json.array!(@known_issues) do |known_issue|
  json.extract! known_issue, :id, :name
  json.url known_issue_url(known_issue, format: :json)
end
