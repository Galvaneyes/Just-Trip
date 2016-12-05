/* globals io $ Handlebars */

var socket = io();

let $notification = $("#notification");
socket.on('newTour', function(data) {
    // data model for newTour
    // {city, country, date, headline, tourId}
    new Promise((reject, resolve) => {
        $.ajax({
            url: "/static/templates/notification-template.handlebars",
            method: "GET",
            success: resolve,
            error: reject
        }).then(htmlTemplate => {
            let template = Handlebars.compile(htmlTemplate);

            $notification.append(template(data));
        });
    });
});