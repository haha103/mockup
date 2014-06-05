class KnownIssuePatternsController < ApplicationController
  before_action :set_known_issue_pattern, only: [:show, :edit, :update, :destroy]

  # GET /known_issue_patterns
  # GET /known_issue_patterns.json
  def index
    @known_issue_patterns = KnownIssuePattern.all
  end

  # GET /known_issue_patterns/1
  # GET /known_issue_patterns/1.json
  def show
  end

  # GET /known_issue_patterns/new
  def new
    @known_issue_pattern = KnownIssuePattern.new
  end

  # GET /known_issue_patterns/1/edit
  def edit
  end

  # POST /known_issue_patterns
  # POST /known_issue_patterns.json
  def create
    @known_issue_pattern = KnownIssuePattern.new(known_issue_pattern_params)

    respond_to do |format|
      if @known_issue_pattern.save
        format.html { redirect_to @known_issue_pattern, notice: 'Known issue pattern was successfully created.' }
        format.json { render action: 'show', status: :created, location: @known_issue_pattern }
      else
        format.html { render action: 'new' }
        format.json { render json: @known_issue_pattern.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /known_issue_patterns/1
  # PATCH/PUT /known_issue_patterns/1.json
  def update
    respond_to do |format|
      if @known_issue_pattern.update(known_issue_pattern_params)
        format.html { redirect_to @known_issue_pattern, notice: 'Known issue pattern was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @known_issue_pattern.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /known_issue_patterns/1
  # DELETE /known_issue_patterns/1.json
  def destroy
    @known_issue_pattern.destroy
    respond_to do |format|
      format.html { redirect_to known_issue_patterns_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_known_issue_pattern
      @known_issue_pattern = KnownIssuePattern.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def known_issue_pattern_params
      params.require(:known_issue_pattern).permit(:content)
    end
end
