// const { render } = require("express/lib/response");
$(document).ready(function () {
  //creates the html template with personalized user data
  const createTweetElement = function (data) {
    const user = data.user;
    const date = timeago.format(data.created_at);
    const markup = `
          <article class="main-tweet">
          <header class="main-tweet-head">
            <div class="username">
              <img src= ${user.avatars} />
              <span> ${user.name} </span>
            </div>
            <span class="handle"> ${user.handle}</span>
          </header>
          <p class="tweet">
            ${data.content.text}
          </p>
          <footer class="main-tweet-footer">
            <span> ${date}</span>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`;
    return markup;
  };

  const isValid = function (text) {
    let valid = false;
    text = text.split("=")[1];
    valid = text.length < 140 ? true : false;
    valid = text.length > 0 ? true : false;
    valid = text === null ? false : valid;
    valid = text === undefined ? true : valid;
    return valid;
  };

  //appends to html from tweet database
  const renderTweets = function (database) {
    for (const user of database.reverse()) {
      $("#tweets-container").append(createTweetElement(user));
    }
  };

  //sends text it to the database post route
  $(".tweet-form").submit(function (event) {
    let serialized = $(this).serialize();
    event.preventDefault();
    if (!isValid(serialized)) {
      alert("invalid input");
    }
    $.post("/tweets", serialized,() => {
      $.get("/tweets")
      .then((data) => {
        $("#tweets-container").prepend(createTweetElement(data.slice(-1)[0]));
        $("#tweet-composer").val("");
      });
    })
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  //loads the tweets onto the page without redirecting
  loadTweets();
});