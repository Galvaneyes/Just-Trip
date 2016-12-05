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

    $("#publicate-form").on("submit", function(ev) {

        ev.preventDefault();

        $.ajax({
            url: "/publicate",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                headline: $("#headline-input").val(),
                country: $("#select").val(),
                city: $("#selectCity").val(),
                endJoinDate: $("#datepicker").val(),
                beginTourDate: $("#from").val(),
                endTourDate: $("#to").val(),
                maxUser: $("#max-user-input").val(),
                price: $("#price-input").val(),
                description: $("#textarea").val()
            }),
            cache: false,
            timeout: 10000,
            success: function(response) {
                //$("html").replaceWith(response);
                document.open();
                document.write(response);
                document.close();
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