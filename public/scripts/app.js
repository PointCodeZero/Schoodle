
const JJ= jQuery.noConflict(); 
JJ('.back').click(function (){
    window.history.back();
}); 

jQuery(document).ready(function(){

    console.log('aaaaaaaaa')
//   // JJ.ajax({
//   //   method: "GET",
//   //   url: "/api/users"
//   // }).done((users) => {
//   //   for(user of users) {
//   //     JJ("<div>").text(user.name).appendTo(JJ("body"));
//   //   }
//   // });


  //Slide down on date-time options
  JJ("#form02 #input_datetime2").hide();
  JJ("#form02 #input_datetime3").hide();

  JJ("#input_datetime1").click(function(){
    JJ("#input_datetime2").slideDown("slow");
  });
  JJ("#input_datetime1").focus(function(){
    JJ("#input_datetime2").slideDown("slow");
  });
  JJ("#input_datetime2").click(function(){
    JJ("#input_datetime3").slideDown("slow");
  });
  JJ("#input_datetime2").focus(function(){
    JJ("#input_datetime3").slideDown("slow");
  });

})(jQuery);

