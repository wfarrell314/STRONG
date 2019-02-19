import { callAjax, clearform, getOneRepMax } from './helpers.js';



$(document).ready(function () {
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'yyyy/mm/dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
});

$('#nav_list li').on('click', function (e) {
    onNavigationClick($(this));
});

//Toggle mobile nav
$('#i_menu').on('click', () => {
    $('#nav').toggle();
    $('#message').html('');
});

function onNavigationClick(listItem) {
    $("#logForm").data("currentLift", listItem.select().html());
    $('#heading').hide().fadeIn("slow").text(listItem.select().html());
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('#nav').hide();
    }
    buildHistory();
    $(".hist_row").remove();
    $('#message').html('');
};

//Post form for inserting lift
$('#logForm').on('submit', (e) => {
    e.preventDefault();
    let lift = $("#logForm").data("currentLift");
    if (lift) {
        let formData = {
            lift: lift,
            weight: $('#enter_weight').val(),
            reps: $('#enter_reps').val(),
            date: $('#date').val(),
        };
        callAjax('POST', '/lifts/log', formData)
            .then($(".hist_row").remove())
            .then(buildHistory())
            .catch((e) => {
            });
        $('#message').html('');
        clearform();
    } else {
        $('#message').html('<small class="text-danger"> Please select a lift from menu. </small>');
    }
});

// Get data and populate table
function buildHistory() {
    if (!$("#logForm").data("currentLift"))
        return;
    callAjax('POST', '/lifts/history', {lift: $("#logForm").data("currentLift")})
        .then((data) => {
            $.each(data.recordset, (i, item) => {
                var row = $('<tr class="hist_row">').append(
                    $('<td class="text-center">').hide().fadeIn("slow").text(item.liftDate),
                    $('<td class="text-center">').hide().fadeIn("slow").text(item.weight),
                    $('<td class="text-center">').hide().fadeIn("slow").text(item.reps),
                    $('<td class="text-center">').hide().fadeIn("slow").text(getOneRepMax(item.weight, item.reps))
                );
                $('#history tbody').after(row);
            });
        })
        .catch();
};









