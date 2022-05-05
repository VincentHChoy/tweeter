// const { render } = require("express/lib/response");
$(document).ready(function () {

  const daysAgo = function (oldDate) {
    return Math.ceil((Date.now() - oldDate) / 86400000);
  };

  //creates the html template with personalized user data
  const createTweetElement = function (data) {
    const user = data.user;
    const date = daysAgo(data.created_at);
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
            <span> ${date} day(s) ago </span>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`;
    return markup;
  };

  //appends to html from tweet database
  const renderTweets = function (database) {
    for (const user of database) {
      $("#tweets-container").append(createTweetElement(user));
    }
  };

  renderTweets(tweetData);

  $(".tweet-form").submit(function (event) {
    event.preventDefault();
    $.post(
      "/tweets",
      $(this).serialize()
    );
  });

});
