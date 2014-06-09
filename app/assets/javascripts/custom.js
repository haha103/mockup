$(document).on('ready page:load', function() {
	$(".clickable.redirect").click(function () {
		window.document.location = $(this).attr("href");
	});

	var path = window.location.pathname;

	if (/^\/msg_show_logs\/.*/.test(path)) {
		generateChart();
		clickable_dots();
		searchResetBtnHandler();
		searchGoBtnHandler();
		searchAdvancedBtnHandler();
		$('.datetimepicker').datetimepicker();
		auto_refresh_toggle_handlers();
		alertCloseBtnHandler();
		msgLogsFilterBtnHandler();
		searchAdvancedGoBtnHandler();
		sortableColumnsHandler();
	} else {
		knwonIssueBtnHandler();
		createKnownIssueBtnHandler();
		createKnownIssueGoBtnHandler();
		addKnownIssueBtnHandler();
		addKnownIssueGoBtnHandler();
		removeKnownIssueBtnHandler();
		knownIssueRowToggleHandler();
	}

	panelCloseBtnHander();
	
});

function sortableColumnsHandler() {
	$('table#tbl-msg-details').on('click', 'th.clickable', function(e) {
		
		var orderby = $(this).attr('data-order');
		var desc = $(this).attr('data-order-desc');
		var active = $(this).attr('data-order-active');

		var end_ts = $("input#end-ts").val();
		var filter = {
			msid_from : $('div#filter-advanced input[name="msid-from"]').val(),
			msid_to : $('div#filter-advanced input[name="msid-to"]').val(),
			imsi_from : $('div#filter-advanced input[name="imsi-from"]').val(),
			imsi_to : $('div#filter-advanced input[name="imsi-to"]').val(),
			substring : $("div#msg-logs-filter").find('input#filter-content').val()
		}

		var orderby_str = orderby;
		
		if (active == "true") {
			if (desc == "true") {
				$(this).attr('data-order-desc', 'false');
				$(this).children('span.glyphicon').removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
				orderby_str = orderby;
			} else {
				$(this).attr('data-order-desc', 'true');
				$(this).children('span.glyphicon').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
				orderby_str = orderby + " DESC";
			}
			load_msg_logs_table(end_ts, 10, 1, filter, orderby_str);
		} else {
			var active_col = $('table#tbl-msg-details th.clickable[data-order-active="true"]');
			active_col.children('span.glyphicon').remove();
			active_col.attr('data-order-active', 'false');
			active_col.attr('data-order-desc', 'false');
			$(this).attr('data-order-active', 'true');
			$(this).append($('<span>').addClass('glyphicon glyphicon-sort-by-attributes'));
			load_msg_logs_table(end_ts, 10, 1, filter, orderby);
		}
		
	});
}

function knownIssueRowToggleHandler() {
	$('table tbody tr span.clickable[data-toggle="collapse"]').click(function() {
		var id = $(this).attr('id');
		$(this).closest('tr').siblings('tr#' + id).toggleClass("in");
	});
}

function panelCloseBtnHander() {
	$('.panel-heading > button.panel-close').click(function() {
		$(this).parents('.panel').toggleClass('hidden');
	});
}

function addKnownIssueBtnHandler() {
	$('button#add-known-issue').click(function(e) {
		$('div#add-known-issue').removeClass("hidden");
		$('select[name="existing-known-issues"]').empty();
		
		$.ajax({
			url: "/known_issues.json",
			type: 'GET',
			success: function(d) {
				console.log(d);
				_.each(d, function(i) {
					console.log(i);
					$('select[name="existing-known-issues"]').append($('<option>').val(i.id).html(i.name + ' - ' + i.patterns));
				});
			}
		});
		
		e.preventDefault();
	});
}

function loadKnownIssueTable() {
	id = $('input[name="msg-show-log-id"]').val();
	$.ajax({
		url: "/msg_show_logs/ajax_get_known_issues?msg_show_log_id=" + id,
		type: 'GET',
		success: function(d) {
			console.log(d);
			$('table#tbl-known-issue-details tbody').empty();
			for (var i = 0; i < d.length; i++) {
				console.log(d[i]);
				$('table#tbl-known-issue-details tbody')
					.append($('<tr>')
									.append($('<td>').html(i))
									.append($('<td>').html(d[i].name))
									.append($('<td>').html(d[i].patterns))
									.append($('<td>')
													.append($('<button>')
																	.attr('class', 'btn btn-xs btn-danger btn-remove-known-issue')
																	.attr('data-known-issue-id', d[i].id)
																	.attr('data-known-issue-name', d[i].name)
																	.append('<span class="glyphicon glyphicon-trash"></span>'))));
			}
		}
	});
}

function removeKnownIssueBtnHandler() {
	$("table#tbl-known-issue-details").on('click', 'button.btn-remove-known-issue', function() {
		var data = {
			known_issue_id : $(this).attr('data-known-issue-id'),
			msg_show_log_id : $('input[name="msg-show-log-id"]').val()
		};

		var known_issue_name = $(this).attr('data-known-issue-name');

		$.ajax({
			url: '/msg_show_logs/ajax_remove_known_issues',
			type: 'POST',
			data: data,
			success: function(d) {
				console.log(d);
				if (d.result == "ok" ) {
					$('div#known-issue-removed-alert').text("Known issue '" + known_issue_name + "' removed!");
					$('div#known-issue-removed-alert').fadeIn(800).delay(3000).fadeOut(800);
					loadKnownIssueTable();
				}
			}
		});
		
	});
}

function addKnownIssueGoBtnHandler() {
	$('button#add-known-issue-go').click(function(e) {
		$('div#add-known-issue').addClass("hidden");
		var data = {
			known_issue_id : $('select[name="existing-known-issues"] option:selected').val(),
			msg_show_log_id : $('input[name="msg-show-log-id"]').val()
		}

		var known_issue_name = $('select[name="existing-known-issues"] option:selected').text();

		$.ajax({
			url: '/msg_show_logs/ajax_add_known_issues',
			type: 'POST',
			data: data,
			success: function(d) {
				console.log(d);
				if (d.result == "ok" ) {
					$('div#known-issue-added-alert').text("Known issue '" + known_issue_name + "' added!");
					$('div#known-issue-added-alert').fadeIn(800).delay(3000).fadeOut(800);
					loadKnownIssueTable();
				}
			}
		});
		
		e.preventDefault();
	});
}

function createKnownIssueBtnHandler() {
	$('button#create-known-issue').click(function(e) {
		$('div#new-known-issue').removeClass("hidden");
		e.preventDefault();
	});
}

function createKnownIssueGoBtnHandler() {
	$('button#create-known-issue-go').click(function(e) {
		var known_issue_name = $('input[name="known-issue-name"]').val();

		if (known_issue_name == "") {
			alert("Name cannot be empty!");
			e.preventDefault();
			return false;
		}
		
		var url = "/known_issues";
		var patterns = $('select[name="known-issue-patterns"]').val().join(',');
		var msg_show_log_id = $('input[name="msg-show-log-id"]').val();

		var data = {
			name: known_issue_name,
			patterns: patterns,
			msg_show_log_id: msg_show_log_id
		}

		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(d) {
				console.log(d);
				if (d.result == "ok" ) {
					$('div#known-issue-saved-alert').text("Known issue '" + known_issue_name + "' saved!");
					$('div#known-issue-saved-alert').fadeIn(800).delay(3000).fadeOut(800);
					loadKnownIssueTable();
				}
			}
		});
		$('div#new-known-issue').addClass("hidden");
		e.preventDefault();
	});
}

function knwonIssueBtnHandler() {
	$('.btn-known-issue-details').click(function(e) {
		var message = $(this).parent().parent().find('td#full-message').text();
		$('pre#known-issue-context').text(message);
		var regexp = /.*(Expected: .*),\s*(Received: [^ ]+)\s*\((Cause: [^\)]*)\)\..*/;
		var patterns = message.match(regexp).slice(1,4);
		$('select[name="known-issue-patterns"]').empty();
		_.each(patterns, function(p) {
			$('select[name="known-issue-patterns"]').append('<option>' + p + '</option>')
		});
		$('input[name="msg-show-log-id"]').val($(this).attr('data-msg-show-log-id'));
		loadKnownIssueTable();
		$('#known-issue-modal').modal('show');
		e.preventDefault();
	});
}

function generateChart() {
	var data_count = ['Count'];
	data_count = data_count.concat($("#chart").attr("data-count").split(","));
	datax = $("#chart").attr("datax").split(",");
	
	var chart = c3.generate({
		size: { height: 400 },
		bindto: "#chart",
		data: {
			columns: [
				data_count
			]
		},
		tooltip: {
			format: {
				title: function(d) { return "Collected At: " + datax[d]; }
			}
		}
	});
}

function msgLogsFilterBtnHandler() {
	$("button#filter-go").click(function(e) {
		var filter = {
			substring : $(this).closest("div#msg-logs-filter").find('input#filter-content').val()
		};
		var end_ts = $("input#end-ts").val();
		var orderby = $('table th.clickable[data-order-active="true"]').attr('data-order');
		var orderdesc = $('table th.clickable[data-order-active="true"]').attr('data-order-desc');
		var orderby_str = orderby + (orderdesc == "true" ? " DESC" : "");
		load_msg_logs_table(end_ts, 10, 1, filter, orderby_str);
		e.preventDefault();
	});
}

function auto_refresh_toggle_handlers () {
	var auto_refresh_id = setInterval(ajax_refresh_graph, 3000);

	$("div.btn-parent").on('click', 'button#cancel_refresh', function() {
		clearInterval(auto_refresh_id);
		$("button#cancel_refresh").toggleClass("disabled");
		$("button#start_refresh").toggleClass("disabled");
		$("button#refresh").toggleClass("disabled");
	});

	$("div.btn-parent").on('click', 'button#start_refresh', function() {
		auto_refresh_id = setInterval(ajax_refresh_graph, 3000);
		$("button#start_refresh").toggleClass("disabled");
		$("button#cancel_refresh").toggleClass("disabled");
		$("button#refresh").toggleClass("disabled");
	});

	$("div.btn-parent").on('click', 'button#refresh', function() {
		ajax_refresh_graph();
	});
}

function update_chart (data) {
	$("#chart").html('');
	var data_count = ['Count'];
	var x = ['x'];
	data_count = data_count.concat($("#chart").attr("data-count").split(","));
	data_count = data_count.concat(parseInt(data_count[data_count.length - 1]) + data.increment)
	datax = $("#chart").attr("datax").split(",");
	datax = datax.concat(data.collected_at);
	var chart = c3.generate({
		size: { height: 400 },
		bindto: "#chart",
		data: {
			columns: [
				data_count
			]
		},
		tooltip: {
			format: {
				title: function(d) { return "Collected At: " + datax[d]; }
			}
		}
	});
	$("#chart").attr("data-count", $("#chart").attr("data-count") + "," + (parseInt(data_count[data_count.length - 1]) + data.increment));
	$("#chart").attr("datax", $("#chart").attr("datax") + "," + data.collected_at);
	clickable_dots();
}

function ajax_refresh_graph () {
	$.ajax({
		url: $("#chart").attr("data-refresh-url"),
		type: 'GET',
		async: false,
		success: function(data) {
			console.log(data);
			update_chart(data);
		}
	});
}

function clickable_dots () {
	d3.selectAll("rect.c3-event-rect").on("click", function (d, i) {
		collected_at = $("#chart").attr("datax").split(",")[i];
		console.log("collected_at: " + collected_at);

		var tb_start_ts = $("input#start-ts");
		var tb_end_ts = $("input#end-ts");


		var d = new Date(Date.parse(collected_at));
		
		if (tb_start_ts.val() == "" && tb_end_ts.val() == "") {
			tb_start_ts.val(collected_at);
			d3.select('circle.c3-shape-' + i).style('fill', 'red');
		} else if (tb_start_ts.val() == "") {
			var d2 = new Date(Date.parse(tb_end_ts.val()));
			if (d < d2) {
				tb_start_ts.val(collected_at);
			} else {
				tb_end_ts.val(collected_at);
			}
		} else if (tb_end_ts.val() == "") {
			var d1 = new Date(Date.parse(tb_start_ts.val()));
			if (d > d1) {
				tb_end_ts.val(collected_at);
				d3.select('circle.c3-shape-' + i).style('fill', 'red');
			} else {
				tb_start_ts.val(collected_at);
				d3.selectAll('circle.c3-shape').style('fill', 'rgb(31, 119, 180)');
				d3.select('circle.c3-shape-' + i).style('fill', 'red');
			}
		} else {
			d3.selectAll('circle.c3-shape').style('fill', 'rgb(31, 119, 180)');
			d3.select('circle.c3-shape-' + i).style('fill', 'red');
			tb_start_ts.val(collected_at);
			tb_end_ts.val('');
		}
		//show_msg_logs_modal(collected_at);
	});
}

function show_msg_logs_modal(collected_at) {
	page_limit = 10;
	var orderby = $('table th.clickable[data-order-active="true"]').attr('data-order');
	var orderdesc = $('table th.clickable[data-order-active="true"]').attr('data-order-desc');
	var orderby_str = orderby + (orderdesc == "true" ? " DESC" : "");
	load_msg_logs_table(collected_at, page_limit, 1, "", orderby_str);
	$("#details-modal").modal('show');
	$("ul.pagination").on("click", "a", function(e) {
		if (!$(this).parent().hasClass("disabled")) {
			page = parseInt($(this).attr("data-page"));
			var orderby = $('table th.clickable[data-order-active="true"]').attr('data-order');
			var orderdesc = $('table th.clickable[data-order-active="true"]').attr('data-order-desc');
			var orderby_str = orderby + (orderdesc == "true" ? " DESC" : "");
			var filter = {
				msid_from : $('div#filter-advanced input[name="msid-from"]').val(),
				msid_to : $('div#filter-advanced input[name="msid-to"]').val(),
				imsi_from : $('div#filter-advanced input[name="imsi-from"]').val(),
				imsi_to : $('div#filter-advanced input[name="imsi-to"]').val(),
				substring : $("div#msg-logs-filter").find('input#filter-content').val()
			}
			load_msg_logs_table(collected_at, page_limit, page, filter, orderby_str);
		}
		e.preventDefault();
		return false;
	});
}

function load_msg_logs_table(collected_at, page_limit, page, filter, orderby) {
	message = $("pre#msg-group").text();
	var data = {
		collected_at : collected_at,
		message : message,
		page_limit : page_limit,
		page: page,
		filter: filter,
		orderby: orderby
	};

	var msgLogUrl = "/msg_logs/search";

	$.ajax({
		type: 'POST',
		url: msgLogUrl,
		data: data,
		success: function(d) {
			m = d.detailed_messages;
			page_count = d.page_count;
			var tbody = $("table#tbl-msg-details tbody");
			tbody.html("");
			for (var i = 0; i < m.length; ++i) {
				//console.log(m);
				tbody.append($('<tr class="clickable" data-toggle="collapse" id="row' + i  + '" data-target="row' + i + '">')
										 .append($('<td>')
														 .append(i + (page - 1) * page_limit))
										 .append($('<td>')
														 .append(m[i].msg_type))
										 .append($('<td>')
														 .append(moment(m[i].recorded_at).format('YYYY-MM-DD hh:mm:ss')))
										 .append($('<td>')
														 .append(m[i].msid))
										 .append($('<td>')
														 .append(m[i].imsi))
										 .append($('<td>')
														 .append(m[i].last_event))
										 .append($('<td>')
														 .append(m[i].last_tcs)))
					   .append($('<tr class="collapse success" id="row' + i + '">')
										 .append($('<td colspan="7">')
														 .append(m[i].message.replace(/, /g, ",").replace(/,/g, ", "))));
			}

			$('table#tbl-msg-details tbody tr[data-toggle="collapse"]').click(function() {
				var id = $(this).attr('id');
				$(this).siblings('tr#' + id).toggleClass("in");
			});

			var p = $('ul.pagination');
			p.html("");
			prev_page = page - 1;
			if (prev_page <= 0) {
				p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", prev_page).append("&laquo;")));
			} else {
				p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", prev_page).append("&laquo;")));
			}

			if (page_count >= 10) {
				if (page <= 6) { // close to 1st page

					for (var i = 1; i <= 10; ++i) {
						if (i == page) {
							p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						} else {
							p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						}
					}
					p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", page_count).append("... " + page_count)));
					
				} else if (page < page_count - 5 ) { // in between
					
					p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", 1).append(1 + " ...")));
					for (var i = page - 5; i <= page + 4; ++i) {
						if (i == page) {
							p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						} else {
							p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						}
					}
					p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", page_count).append("... " + page_count)));
					
				} else { // close to last page

					p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", 1).append(1 + " ...")));
					for (var i = page - 5; i <= page_count; ++i) {
						if (i == page) {
							p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						} else {
							p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
						}
					}
					
				}
			} else {
				for (var i = 1; i <= page_count; ++i) {
					if (i == page) {
						p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
					} else {
						p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
					}
				}
			}
			next_page = page + 1;
			if (page == page_count) {
				p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", next_page).append("&raquo;")));
			} else {
				p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", next_page).append("&raquo;")));
			}
		}
	});
}

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function alertCloseBtnHandler() {
	$(".alert-close").click(function() {
		$(this).parent(".alert").remove();
	});
}

function searchResetBtnHandler() {
	$("#search-reset").click(function() {
		$(this).closest(".panel").find("input").val('');
		d3.selectAll('circle.c3-shape').style('fill', 'rgb(31, 119, 180)');
	});
}

function searchGoBtnHandler() {

	$("button#search-go").click(function(e) {
		var start_ts = $("input#start-ts").val();
		var end_ts = $("input#end-ts").val();
		show_msg_logs_modal(end_ts);
		e.preventDefault();
	});
}

function searchAdvancedBtnHandler() {
	$('button#filter-advanced').click(function(e) {
		$('div#filter-advanced').toggleClass('hidden');
		$('div#filter-advanced input').val('');
		e.preventDefault();
	});
}

function searchAdvancedGoBtnHandler() {
	$('button#filter-advanced-go').click(function(e) {
		var filter = {
			msid_from : $('div#filter-advanced input[name="msid-from"]').val(),
			msid_to : $('div#filter-advanced input[name="msid-to"]').val(),
			imsi_from : $('div#filter-advanced input[name="imsi-from"]').val(),
		  imsi_to : $('div#filter-advanced input[name="imsi-to"]').val()
		}
		var orderby = $('table th.clickable[data-order-active="true"]').attr('data-order');
		var orderdesc = $('table th.clickable[data-order-active="true"]').attr('data-order-desc');
		var orderby_str = orderby + (orderdesc == "true" ? " DESC" : "");
		console.log("filter: ");
		console.log(filter);
		$('div#filter-advanced').toggleClass('hidden');
		var end_ts = $("input#end-ts").val();
		load_msg_logs_table(end_ts, 10, 1, filter, orderby_str);
		e.preventDefault();
	});
}
