$(document).ready(function() {
  $("#tweet-composer").on("input", function() {
    const value = $(this).val().length;
    const counter = $(this).parent().find(".counter");
    counter.val(140 - value);
    if (140 - value < 0) {
      $(".counter").css("color", "red");
      $(".error").text("maximum 140 characters");
      $(".error").slideDown();
    } else {
      $(".counter").css("color", "#545149");
      $(".error").slideUp();
    }
  });
});
