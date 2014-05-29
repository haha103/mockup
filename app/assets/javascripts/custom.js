$(document).on('ready page:load', function() {
	$(".clickable").click(function () {
		window.document.location = $(this).attr("href");
	});

	var data_count = ['Count'];
	data_count = data_count.concat($("#chart").attr("data-count").split(","));
	datax = $("#chart").attr("datax").split(",");
	
	var chart = c3.generate({
		size: { height: 500 },
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
	
});

function auto_refresh_toggle_handlers () {
	var auto_refresh_id = setInterval(ajax_refresh_graph, 3000);

	$("div.btn-parent").on('click', 'button#cancel_refresh', function() {
		clearInterval(auto_refresh_id);
		$("button#cancel_refresh").prop("id", "start_refresh").text("Start Auto Refresh");
	});

	$("div.btn-parent").on('click', 'button#start_refresh', function() {
		auto_refresh_id = setInterval(ajax_refresh_graph, 3000);
		$("button#start_refresh").prop("id", "cancel_refresh").text("Cancel Auto Refresh");
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
		size: { height: 500 },
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
		message = $("h3").text();

		console.log("collected_at: " + collected_at);
		console.log("message pattern: " + message);

		load_msg_logs_table(1);

		$("ul.pagination").on("click", "a", function(e) {
			page = $(this).attr("data-page");
			load_msg_logs_table(page);
			e.preventDefault();
			return false;
		});
		
	});
	
}

function load_msg_logs_table(page) {
	var data = {
		collected_at : collected_at,
		message : message,
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
				tbody.append($('<tr>')
										 .append($('<td>')
														 .append(i))
										 .append($('<td>')
														 .append(m[i].msg_type))
										 .append($('<td>')
														 .append(m[i].recorded_at))
										 .append($('<td>')
														 .append(m[i].message)));
			}

			var p = $('ul.pagination');
			p.html("");
			prev_page = page - 1;
			if (prev_page <= 0) {
				p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", prev_page).append("&laquo;")));
			} else {
				p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", prev_page).append("&laquo;")));
			}
			for (var i = 1; i <= page_count; ++i) {
				if (i == page) {
					p.append($("<li>").prop("class", "disabled").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
				} else {
					p.append($("<li>").append($("<a>").prop("href", "javascript::void()").attr("data-page", i).append(i)));
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
