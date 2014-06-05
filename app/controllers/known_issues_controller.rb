class KnownIssuesController < ApplicationController
  before_action :set_known_issue, only: [:show, :edit, :update, :destroy]

  # GET /known_issues
  # GET /known_issues.json
  def index
    @known_issues = KnownIssue.all
  end

  # GET /known_issues/1
  # GET /known_issues/1.json
  def show
  end

  # GET /known_issues/new
  def new
    @known_issue = KnownIssue.new
  end

  # GET /known_issues/1/edit
  def edit
  end

  # POST /known_issues
  # POST /known_issues.json
  def create
    @known_issue = KnownIssue.new(known_issue_params)

    respond_to do |format|
      if @known_issue.save
        format.html { redirect_to @known_issue, notice: 'Known issue was successfully created.' }
        format.json { render action: 'show', status: :created, location: @known_issue }
      else
        format.html { render action: 'new' }
        format.json { render json: @known_issue.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /known_issues/1
  # PATCH/PUT /known_issues/1.json
  def update
    respond_to do |format|
      if @known_issue.update(known_issue_params)
        format.html { redirect_to @known_issue, notice: 'Known issue was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @known_issue.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /known_issues/1
  # DELETE /known_issues/1.json
  def destroy
    @known_issue.destroy
    respond_to do |format|
      format.html { redirect_to known_issues_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_known_issue
      @known_issue = KnownIssue.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def known_issue_params
      params.require(:known_issue).permit(:name)
    end
end
