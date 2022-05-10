// const { render } = require("express/lib/response");
$(document).ready(function () {
  //creates the html template with personalized user data
  const createTweetElement = function (data) {
    const user = data.user;
    const date = timeago.format(data.created_at);

    //escape HTML characters
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const text = escape(data.content.text);

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
            ${text}
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
    let valid = true;
    newText = text.split("=")[1];
    let message = "";
    console.log('newText',newText)
    if (newText.length > 140) {
      message = "maximum 140 characters";
      valid = false;
    }
    if (newText.length <= 0) {
      message = "message empty";
      valid = false;
    }
    if (newText === null || newText === undefined) {
      message = "undefined";
      valid = false;
    }

    return { valid, message };
  };

  //appends to html from tweet database
  const renderTweets = function (database) {
    for (const user of database.reverse()) {
      $("#tweets-container").append(createTweetElement(user));
    }
  };

  //sends text it to the database post route
  $(".tweet-form").submit(function (event) {
    $(".error").slideUp();
    let serialized = $(this).serialize();
    event.preventDefault();
    const validation = isValid(serialized);
    if (!validation.valid) {
      console.log(validation.message)
      $(".error").text(validation.message).then($(".error").slideDown());
    } else {
      $.post("/tweets", serialized, () => {
        $.get("/tweets").then((data) => {
          $("#tweets-container").prepend(createTweetElement(data.slice(-1)[0]));
          $("#tweet-composer").val("");
        });
      });
    }
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  //loads the tweets onto the page without redirecting
  loadTweets();
});
