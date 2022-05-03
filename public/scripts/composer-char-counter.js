$(document).ready(function () {
    $("#tweet-composer").on('input',function () {
      const value = $(this).val().length ;
      const counter = $(this).parent().find('.counter')
      counter.val(140 - value)
      if (140 - value < 0) {
        $(".tweet-box").css("color", "red");
      } else{
        $(".tweet-box").css("color", "#545149");
      }
    });
});
