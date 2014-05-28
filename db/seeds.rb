# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

['ERROR', 'CRITICAL', 'WARNING', 'EVENT'].each do |t|
	MsgType.create(name: t)
end

collected_at = Time.now

1.upto(5) do |i|
	srand
	m = MsgShowLog.new
	m.msg_type = MsgType.find(1)
	m.count = rand(5000)
	m.collected_at = collected_at
	m.message = "Randomly generated error message group #{i}"
	m.save
end

MsgShowLog.all.each do |l|
	1.upto(50) do |i|
		srand
		m = MsgLog.new
		m.msg_type = l.msg_type
		m.message = "#{l.message} ... details #{i}"
		m.recorded_at = l.collected_at - ((50 - i) * 60)
		m.save
	end
end
