$(document).on('ready page:load', function() {
	$(".clickable").click(function () {
		window.document.location = $(this).attr("href");
	});

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

	clickable_dots();

	auto_refresh_toggle_handlers();

	alertCloseBtnHandler();

	searchResetBtnHandler();

	searchGoBtnHandler();

	$('.datetimepicker').datetimepicker();
	
});

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

		if (tb_start_ts.val() == "") {
			tb_start_ts.val(collected_at);
		} else if (tb_end_ts.val() == "") {
			tb_end_ts.val(collected_at);
		} else {
			
		}
		//show_msg_logs_modal(collected_at);
	});
}

function show_msg_logs_modal(collected_at) {
	page_limit = 10;
	load_msg_logs_table(collected_at, page_limit, 1);
	$("#details-modal").modal('show');
	$("ul.pagination").on("click", "a", function(e) {
		if (!$(this).parent().hasClass("disabled")) {
			page = parseInt($(this).attr("data-page"));
			load_msg_logs_table(collected_at, page_limit, page);
		}
		e.preventDefault();
		return false;
	});
}

function load_msg_logs_table(collected_at, page_limit, page) {
	message = $("pre#msg-group").text();
	var data = {
		collected_at : collected_at,
		message : message,
		page_limit : page_limit,
		page: page
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
				tbody.append($('<tr data-toggle="collapse" id="row' + i  + '" data-target="row' + i + '">')
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
