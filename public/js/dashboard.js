import { callAjax, clearform, getOneRepMax } from './helpers.js';

$(document).ready(function () {
    hookUpDatePicker();
    hookUpNavigation();
    hookUpLogFormSubmission();
});

function hookUpDatePicker() {
    var date_input = $('input[name="date"]');
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'yyyy/mm/dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
};

function hookUpNavigation() {
    $('#nav_list li').on('click', function (e) {
        onNavigationClick($(this));
    });
    $('#i_menu').on('click', () => {
        $('#nav').toggle();
        $('#message').html('');
    });
};

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

function hookUpLogFormSubmission() {
    $('#logForm').on('submit', (e) => {
        e.preventDefault();
        onLogFormSubmission();
    });
};

function onLogFormSubmission() {
    if ($("#logForm").data("currentLift")) {
        logForm();
     } else {
        $('#message').html('<small class="text-danger"> Please select a lift from menu. </small>');
    }
};

function logForm() {
    let formData = {
        lift: $("#logForm").data("currentLift"),
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
};

function buildHistory() {
    if (!$("#logForm").data("currentLift"))
        return;
    callAjax('POST', '/lifts/history', { lift: $("#logForm").data("currentLift") })
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









