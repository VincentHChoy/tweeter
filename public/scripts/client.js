import { loadTweets, isValid, createTweetElement } from './helperFunctions.js';

$(document).ready(function () {

  //sends text it to the database post route, submit event handler
  $(".tweet-form").submit(function (event) {
    $(".error").slideUp();
    let serialized = $(this).serialize();
    event.preventDefault();
    const validation = isValid(serialized);
    //handles validation and error messages
    if (!validation.valid) {
      $(".error").text(validation.message).then($(".error").slideDown());
    } else {
      $.post("/tweets", serialized, () => {
        $.get("/tweets").then((data) => {
          //gets last element in database
          $("#tweets-container").prepend(createTweetElement(data.slice(-1)[0]));
          $("#tweet-composer").val("");
        });
      });
    }
  });

  //loads the tweets onto the page without redirecting
  loadTweets();

  //hides initial error container
  $(".error").hide();

  //hides inital compose tweet container
  $(".new-tweet").hide();

  /*--Navbar Toggle, click event handler--*/
  $(".navbar-menu").click(function () {
    $(".new-tweet").slideToggle();
    $(".tweet-input").focus();
  });

  /*--event handler for handling scrolling--*/

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $(".toTop").fadeIn();
    } else {
      $(".toTop").fadeOut();
    }
  });

  /*--animates going to the top of the screen on click--*/
  $(".toTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
});
