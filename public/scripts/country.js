/* globals window document alert $ */

function afterGet() {
 
  $(".country-name").click(function () {
    let id = $(this).attr("id");
    //alert(id);
    $("#Left").load("/countries/ajax/getCountryDetail/" + id, function (data, status) {
      $(".country-edit").click(function (e) {
        $(".modal").css("display", "block");

        $("#pictureUrl").val($("#pUrl").attr('src'));
        $("#countryUrl").val($("#cUrl").attr('href'));

        $("#save").unbind('click').click(function () {
          $.post("/countries/ajax/setCountryDetail/",
            {
              id: $(".country-edit").attr("idd"),
              name: $(".country-detail").attr("name"),
              description: $("#country-description").text(),
              pictureUrl: $("#pictureUrl").val(),
              countryUrl: $("#countryUrl").val(),
              scity: $(".country-detail").attr("scity")
            },
            function (data, status) {
              //alert("Data: " + data + "\nStatus: " + status);
              $("#" + id).click();
            });
          $("#myModal").css("display", "none");
        })
      });
      $("#delete").unbind('click').click(function () {
        $.post("/countries/ajax/removeCountry/",
          {
            id: $(".country-edit").attr("idd"),
          },
          function (data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
            //$("#" + id).click();
          });
        $("#myModal").css("display", "none");
      })
    })
  });
}

$(document).ready(function () {
  $("#addCountry")
    .click(function () {
      alert("addCountry");
    })

  $("#addCity")
    .click(function () {
      alert("addCity");
    })

  $("#searchCountry")
    .click(function (e) {
      let countryPattern = $("#countryPattern").val();
      if (countryPattern === '') {
        countryPattern = "*";
      }

      $.get("/countries/ajax/getCountryList/" + countryPattern, function (data, status) {
        $("#countryListContainer").html(data);
        afterGet();
        $(".country-name:first").click();
        //   .css({ "position": "absolute", "top": mouseY + "px", "left": mouseX + "px" });
      });
    }).click();

  // When the user clicks on <span> (x), close the modal
  $("#modalclose, #save, #cancel").click(function () {
    $("#myModal").css("display", "none");
  })

  // When the user clicks anywhere outside of the modal, it closes
  var modal = document.getElementById('myModal');
  window.onclick = function (event) {
    if (event.target == modal) {
      $("#myModal").css("display", "none");
    }
  }

})