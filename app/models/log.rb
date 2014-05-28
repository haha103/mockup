class Log < ActiveRecord::Base

	
end


class LtsShowMsgLog < Log

	attr_accessor :messages
	
	def initialize
		@messages = []
	end

	def update
		if @messages.empty?
			f = Rails.application.config.lts_showmsg_log
			puts ">>> Reading #{f}"
			File.open(f, "r").each_line do |l|
				matched = l.match(%r{^\s+(\d+)\s+([^\s]+)\s+(.*)$})
				next unless matched
				msg = LtsShowMsgEntry.new
				msg.count = matched.captures[0]
				msg.type = matched.captures[1]
				msg.msg = matched.captures[2]
				@messages << msg
			end
			puts ">>> Finished reading #{f}"
		else
			# probability of having new entries is 0.1
			if rand(10) == 0
				msg = LtsShowMsgEntry.new
				msg.count = 1
				msg.type = "ERROR"
				msg.msg = "Newly randomly generated error message"
				@messages << msg
			end
			# update all counts
			@messages.each do |m|
				# probability of remaining unchanged is 0.2
				unless rand(5) == 0
					m.count += rand(50)
				end
			end
		end
	end
	
end

class LtsShowMsgEntry

	attr_accessor :count, :type, :msg
	
end
