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
		
	});
	/*
	$("div#chart svg rect.c3-event-rect").click(function () {
		console.log($(this).prop("class"));
	});
	*/
}
