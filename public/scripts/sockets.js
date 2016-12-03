/* globals io $ */

var socket = io.connect('http://localhost:3001');

let $notification = $("#notification");
socket.on('newTour', function(data) {
    // data model for newTour
    // {city, country, date, headline, tourId}
    $notification.append(`
      <div class="notifications">
        <p><a href="/tours/${data.tourId}">${data.headline}</a> on ${data.date}</p>
        <p>Destination ${data.city}, ${data.country}</p>
        <p>Created by <a href="/profile/${data.creator}">${data.creator}</a>
      </div>`);

});