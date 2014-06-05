class MsgShowLogHistoriesController < ApplicationController
  before_action :set_msg_show_log_history, only: [:show, :edit, :update, :destroy]

  # GET /msg_show_log_histories
  # GET /msg_show_log_histories.json
  def index
    @msg_show_log_histories = MsgShowLogHistory.all
  end

  # GET /msg_show_log_histories/1
  # GET /msg_show_log_histories/1.json
  def show
  end

  # GET /msg_show_log_histories/new
  def new
    @msg_show_log_history = MsgShowLogHistory.new
  end

  # GET /msg_show_log_histories/1/edit
  def edit
  end

  # POST /msg_show_log_histories
  # POST /msg_show_log_histories.json
  def create
    @msg_show_log_history = MsgShowLogHistory.new(msg_show_log_history_params)

    respond_to do |format|
      if @msg_show_log_history.save
        format.html { redirect_to @msg_show_log_history, notice: 'Msg show log history was successfully created.' }
        format.json { render action: 'show', status: :created, location: @msg_show_log_history }
      else
        format.html { render action: 'new' }
        format.json { render json: @msg_show_log_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /msg_show_log_histories/1
  # PATCH/PUT /msg_show_log_histories/1.json
  def update
    respond_to do |format|
      if @msg_show_log_history.update(msg_show_log_history_params)
        format.html { redirect_to @msg_show_log_history, notice: 'Msg show log history was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @msg_show_log_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /msg_show_log_histories/1
  # DELETE /msg_show_log_histories/1.json
  def destroy
    @msg_show_log_history.destroy
    respond_to do |format|
      format.html { redirect_to msg_show_log_histories_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_msg_show_log_history
      @msg_show_log_history = MsgShowLogHistory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def msg_show_log_history_params
      params.require(:msg_show_log_history).permit(:count, :collected_at)
    end
end
