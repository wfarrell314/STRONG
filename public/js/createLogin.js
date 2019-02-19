import {callAjax, clearform} from './helpers.js';

$(document).ready(function () {
 
    $('#createPage').on('click', function (e) {
        e.preventDefault();
        window.location.replace('/user/createAccount');
    });

    $('#loginPage').on('click', function (e) {
        e.preventDefault();
        window.location.replace('/user/login');
    });

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let formData = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        callAjax('POST', '/user/checkPassword', formData)
            .then((response) => {
                window.location.replace("/");
            })
            .catch(() => {
                $('#message').html('<small class="text-danger"> You have entered an invalid username or password </small>');
            });
        clearform();
    });

    $('#uaForm').on('submit', function (e) {
        e.preventDefault();
        let password = $('#password').val();
        let pwCheck = $('#reenter').val();
        if (password == pwCheck) {
            let formData = {
                email: $('#email').val(),
                password: $('#password').val()
            };
            callAjax('POST', '/user/insertUser', formData)
                .then((response) => {
                    window.location.replace(response.redirect);
                }).catch((e) => {
                    $('#message').html('<small class="text-danger">'+ e +'</small>');
                });
            clearform();
            $('#message').html('');
        } else {
            $('#message').html('<small class="text-danger"> Please check password and try again </small>');
        }
    });
 });
