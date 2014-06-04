# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'time'

['ERROR', 'CRITICAL', 'WARNING', 'EVENT', 'DEBUG', 'INFO'].each do |t|
	MsgType.create(name: t)
end

collected_at = Time.now

ActiveSupport::JSON.decode(File.read('db/seeds/msgshowlog.json')).each do |j|
	m = MsgShowLog.new
	m.msg_type = MsgType.where(name: j["msg_type"]).first
	m.count = j["count"].to_i
	m.collected_at = collected_at
	m.message = j["message"]
	m.save
end

f = File.open("db/seeds/dallas_msg.log", "r")
f.each_line do |l|
	fields = l.split(/\s+/)
	msg_type = fields.shift
	ts = fields.shift
	message = fields.join(" ")
	m = MsgLog.new
	m.msg_type = MsgType.where(name: msg_type).first
	m.recorded_at = Time.parse(ts)
	m.message = message
	matched = /.*MS-Id: ([^,]+),\s*IMSI: ([^,]+),.*Last event: (.*),\s*Last TCs: \[(.*)\]/.match(message)
	if matched && matched.captures.length == 4
		m.msid = matched.captures[0]
		m.imsi = matched.captures[1]
		m.last_event = matched.captures[2]
		m.last_tcs = matched.captures[3]
	end
	m.save
end
f.close
