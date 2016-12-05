/* globals document $ toastr */

$(document).ready(function() {
    $("#register-form").on("submit", function(ev) {

        ev.preventDefault();

        $.ajax({
            url: "/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: $("#username-input").val(),
                firstname: $("#firstname-input").val(),
                lastname: $("#lastname-input").val(),
                password: $("#password-input").val(),
                email: $("#email-input").val(),
                country: $("#country-input").val(),
                city: $("#city-input").val(),
                age: $("#age-input").val(),
                gender: $("#select").val(),
                phone: $("#phone").val()
            }),
            cache: false,
            timeout: 10000,
            success: function() {
                document.location.href = "/profile";
            },
            statusCode: {
                400: function(response) {
                    toastr.warning(response.responseText, "Invalid input");
                }
            }
        });

        return false;
    });
});