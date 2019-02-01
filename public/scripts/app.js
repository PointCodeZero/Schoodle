$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });

  
  //Slide down on date-time options 
  $("#form02 #input_datetime2").hide();
  $("#form02 #input_datetime3").hide();

  $("#input_datetime1").click(function(){
    $("#input_datetime2").slideDown("slow");
  });
  $("#input_datetime1").focus(function(){
    $("#input_datetime2").slideDown("slow");
  });
  $("#input_datetime2").click(function(){
    $("#input_datetime3").slideDown("slow");
  });
  $("#input_datetime2").focus(function(){
    $("#input_datetime3").slideDown("slow");
  });



});
