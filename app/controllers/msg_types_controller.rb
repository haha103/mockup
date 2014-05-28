class MsgTypesController < ApplicationController
  before_action :set_msg_type, only: [:show, :edit, :update, :destroy]

  # GET /msg_types
  # GET /msg_types.json
  def index
    @msg_types = MsgType.all
  end

  # GET /msg_types/1
  # GET /msg_types/1.json
  def show
  end

  # GET /msg_types/new
  def new
    @msg_type = MsgType.new
  end

  # GET /msg_types/1/edit
  def edit
  end

  # POST /msg_types
  # POST /msg_types.json
  def create
    @msg_type = MsgType.new(msg_type_params)

    respond_to do |format|
      if @msg_type.save
        format.html { redirect_to @msg_type, notice: 'Msg type was successfully created.' }
        format.json { render action: 'show', status: :created, location: @msg_type }
      else
        format.html { render action: 'new' }
        format.json { render json: @msg_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /msg_types/1
  # PATCH/PUT /msg_types/1.json
  def update
    respond_to do |format|
      if @msg_type.update(msg_type_params)
        format.html { redirect_to @msg_type, notice: 'Msg type was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @msg_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /msg_types/1
  # DELETE /msg_types/1.json
  def destroy
    @msg_type.destroy
    respond_to do |format|
      format.html { redirect_to msg_types_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_msg_type
      @msg_type = MsgType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def msg_type_params
      params.require(:msg_type).permit(:name)
    end
end
