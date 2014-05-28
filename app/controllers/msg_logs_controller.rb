require 'time'
require 'json'

class MsgLogsController < ApplicationController
  before_action :set_msg_log, only: [:show, :edit, :update, :destroy]

  def	ajax_search
		collected_at = Time.parse(params[:collected_at])
		message = params[:message]
		detailed_messages = []

		msg_logs = MsgLog.where("message LIKE ? AND recorded_at < ?", "%#{message}%", collected_at)

		msg_logs.each do |l|
			detailed_message = {}
			detailed_message[:msg_type] = l.msg_type.name
			detailed_message[:recorded_at] = l.recorded_at
			detailed_message[:message] = l.message
			detailed_messages << detailed_message
		end
		
		respond_to do |f|
			f.json { render :json => detailed_messages }
		end
	end
	
  # GET /msg_logs
  # GET /msg_logs.json
  def index
    @msg_logs = MsgLog.all
  end

  # GET /msg_logs/1
  # GET /msg_logs/1.json
  def show
  end

  # GET /msg_logs/new
  def new
    @msg_log = MsgLog.new
  end

  # GET /msg_logs/1/edit
  def edit
  end

  # POST /msg_logs
  # POST /msg_logs.json
  def create
    @msg_log = MsgLog.new(msg_log_params)

    respond_to do |format|
      if @msg_log.save
        format.html { redirect_to @msg_log, notice: 'Msg log was successfully created.' }
        format.json { render action: 'show', status: :created, location: @msg_log }
      else
        format.html { render action: 'new' }
        format.json { render json: @msg_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /msg_logs/1
  # PATCH/PUT /msg_logs/1.json
  def update
    respond_to do |format|
      if @msg_log.update(msg_log_params)
        format.html { redirect_to @msg_log, notice: 'Msg log was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @msg_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /msg_logs/1
  # DELETE /msg_logs/1.json
  def destroy
    @msg_log.destroy
    respond_to do |format|
      format.html { redirect_to msg_logs_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_msg_log
      @msg_log = MsgLog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def msg_log_params
      params.require(:msg_log).permit(:recorded_at, :message)
    end
end
