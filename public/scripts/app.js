// There was a bug with jquery code conflicting with some of the other libraries, setting
// the $ to a different variable name seems to solve that problem
const JJ= jQuery.noConflict();
JJ('.back').click(function (){
    window.history.back();
});

jQuery(document).ready(function(){

  //Slide down on date-time options in new-event
  JJ(".forms #input_datetime2").hide();
  JJ(".forms #input_datetime3").hide();

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

  // Edit page Update buttons to appear and dissappear on focus of textarea
  JJ("#edit1, #edit2, #edit3").hide();

  JJ("#tr1").on("click", function(){
    JJ("#edit1").show();
  });
  JJ("#tr2").on("click", function(){
    JJ("#edit2").show();
  });
  JJ("#tr3").on("click", function(){
    JJ("#edit3").show();
  });
});

