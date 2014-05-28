require 'json'

class MsgShowLogsController < ApplicationController
  before_action :set_msg_show_log, only: [:show, :edit, :update, :destroy]

	def ajax_get_increment
		d = {
			increment: rand(50),
			collected_at: Time.now
		}
		respond_to do |f|
			f.json { render :json => d }
		end
	end
	
  # GET /msg_show_logs
  # GET /msg_show_logs.json
  def index
		update_all if params["update"] == "1"
    @msg_show_logs = MsgShowLog.where(collected_at: MsgShowLog.maximum(:collected_at)).order(count: :desc).paginate(:page => params[:page], :per_page => 20)
  end

  # GET /msg_show_logs/1
  # GET /msg_show_logs/1.json
  def show
		update_all if params["update"] == "1"
		@single_msg_records = MsgShowLog.where(message: MsgShowLog.find(params[:id]).message).order(collected_at: :desc)
  end

  # GET /msg_show_logs/new
  def new
    @msg_show_log = MsgShowLog.new
  end

  # GET /msg_show_logs/1/edit
  def edit
  end

  # POST /msg_show_logs
  # POST /msg_show_logs.json
  def create
    @msg_show_log = MsgShowLog.new(msg_show_log_params)

    respond_to do |format|
      if @msg_show_log.save
        format.html { redirect_to @msg_show_log, notice: 'Msg show log was successfully created.' }
        format.json { render action: 'show', status: :created, location: @msg_show_log }
      else
        format.html { render action: 'new' }
        format.json { render json: @msg_show_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /msg_show_logs/1
  # PATCH/PUT /msg_show_logs/1.json
  def update
    respond_to do |format|
      if @msg_show_log.update(msg_show_log_params)
        format.html { redirect_to @msg_show_log, notice: 'Msg show log was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @msg_show_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /msg_show_logs/1
  # DELETE /msg_show_logs/1.json
  def destroy
    @msg_show_log.destroy
    respond_to do |format|
      format.html { redirect_to msg_show_logs_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_msg_show_log
      @msg_show_log = MsgShowLog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def msg_show_log_params
      params.require(:msg_show_log).permit(:count, :message, :collected_at)
    end

		def update_single(id)
			m = MsgShowLog.where(message: MsgShowLog.find(params[:id]).message).order(collected_at: :desc).first
			collected_at = Time.now
			m1 = MsgShowLog.new
			m1.msg_type = m.msg_type
			m1.count = m.count
			m1.message = m.message
			m1.collected_at = collected_at
			# probability of remaining unchanged is 0.2
			unless rand(5) == 0
				m1.count += rand(50)
			end
			m1.save
		end

		def update_all
			# probability of having new entries is 0.1
			puts "update all ... "
			t = MsgType.find(1)
			if rand(10) == 0
				srand
				m = MsgShowLog.new
				m.msg_type = t
				m.count = 1
				m.message = "Randomly added error message group #{MsgShowLog.count + 1}"
				m.save
			end
			msg_show_logs = MsgShowLog.where(collected_at: MsgShowLog.maximum("collected_at"))
			# update all counts
			collected_at = Time.now
			msg_show_logs.each do |m|
				m1 = MsgShowLog.new
				m1.msg_type = m.msg_type
				m1.count = m.count
				m1.message = m.message
				m1.collected_at = collected_at
				# probability of remaining unchanged is 0.2
				unless rand(5) == 0
					m1.count += rand(50)
				end
				m1.save
			end

		end
		
end
