import { loadTweets, isValid, createTweetElement } from './helperFunctions.js';

$(document).ready(function () {

  //sends text it to the database post route, submit event handler
  $(".tweet-form").submit(function (event) {
    $(".error").slideUp();
    let serialized = $(this).serialize();
    event.preventDefault();
    const validation = isValid($("#tweet-composer").val());
    //handles validation and error messages
    if (!validation.valid) {
      console.log('message',validation.message)
      console.log("message", typeof validation.message);
      $(".error").text(validation.message).then($(".error").slideDown())
      .catch(console.log('invalid input'));
    } else {
      $.post("/tweets", serialized, () => {
        $.get("/tweets").then((data) => {
          //gets last element in database
          $("#tweets-container").prepend(createTweetElement(data.slice(-1)[0]));
          $("#tweet-composer").val("");
          $('.counter').val(140)
        })
        .catch(console.log('failed to AJAX "GET"'));
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
