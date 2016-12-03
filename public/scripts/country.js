function afterGet() {
  $(".country-name_")
    .mouseover(function (e) {
      let id = $(this).attr("id");
      let mouseX = e.pageX;
      let mouseY = e.pageY;
      $("#ShowInfo").load("/countries/ajax/getDescriptionById/" + id)
        .css({ "position": "absolute", "top": mouseY + "px", "left": mouseX + "px" });
    })
    .mouseout(function () {
      $("#ShowInfo").html("");
    });
  $(".country-name").click(function () {
    let name = $(this).attr("name");
    $("#Left").load("/cities/ajax/getCityListInCountry/" + name, function () {
      $(".city-name_").mouseover(function (e) {
        let id = $(this).attr("id");
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        $("#ShowInfo").load("/cities/ajax/getDescriptionById/" + id)
          .css({ "position": "absolute", "top": mouseY + "px", "left": mouseX + "px" });
      })
    })
  });

  $(".del")
    .click(function () {
      var id = $(this).parent().attr("id");
      alert("Del" + id);
    });

  $(".edit")
    .click(function () {
      var id = $(this).parent().attr("id");
      alert("Edit" + id);
    })
};

$(document).ready(function () {
  $("#searchCountry")
    .click(function (e) {
      let mask = $("#mask").val();
      // alert(mask);

      $.get("/countries/ajax/getCountryList/" + mask, function (data, status) {
        //  alert("Data: " + data + "\nStatus: " + status);
        $("#countryListContainer").html(data);
        afterGet();
        //   .css({ "position": "absolute", "top": mouseY + "px", "left": mouseX + "px" });
      });
    })
})

