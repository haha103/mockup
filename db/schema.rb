# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140610075728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "known_issue_patterns", force: true do |t|
    t.string   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "known_issue_patterns_known_issues", id: false, force: true do |t|
    t.integer "known_issue_id",         null: false
    t.integer "known_issue_pattern_id", null: false
  end

  create_table "known_issues", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "known_issues_msg_show_logs", id: false, force: true do |t|
    t.integer "known_issue_id",  null: false
    t.integer "msg_show_log_id", null: false
  end

  create_table "logs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "msg_logs", force: true do |t|
    t.datetime "recorded_at"
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "msg_type_id"
    t.string   "msid"
    t.string   "imsi"
    t.text     "last_event"
    t.text     "last_tcs"
  end

  add_index "msg_logs", ["msg_type_id"], name: "index_msg_logs_on_msg_type_id", using: :btree

  create_table "msg_show_log_histories", force: true do |t|
    t.integer  "count"
    t.datetime "collected_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "msg_show_log_id"
  end

  add_index "msg_show_log_histories", ["msg_show_log_id"], name: "index_msg_show_log_histories_on_msg_show_log_id", using: :btree

  create_table "msg_show_logs", force: true do |t|
    t.integer  "count"
    t.text     "message"
    t.datetime "collected_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "msg_type_id"
    t.integer  "test_run_id"
  end

  add_index "msg_show_logs", ["msg_type_id"], name: "index_msg_show_logs_on_msg_type_id", using: :btree
  add_index "msg_show_logs", ["test_run_id"], name: "index_msg_show_logs_on_test_run_id", using: :btree

  create_table "msg_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "test_runs", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "welcomes", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
