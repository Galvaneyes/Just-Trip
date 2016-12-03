$.onload(
  
 // $(".country-name").click(function(){
  $(".country-name").mouseover(function(){
    var id=$(this).attr("id");
   $("#ShowInfo").load("/countries/ajax/getDescriptioById/"+id);
  })
)