
export function callAjax(type, url, data) {
    return $.ajax({
        type: type,
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
    });
};

export function clearform() {
    $('input').val('');
};

export function getOneRepMax(weight, reps) {
    let max = Math.round(weight / (1.0278 - (.0278 * reps)));
    return max;
};