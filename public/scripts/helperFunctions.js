//escape HTML characters
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//creates tweet html
export const createTweetElement = function (data) {
  const user = data.user;
  const date = timeago.format(data.created_at);
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

//validation of text area
export const isValid = function (text) {
  let valid = true;
  console.log('text',text)
  let message = "";
  if (text.length > 140) {
    message = "maximum 140 characters";
    valid = false;
  }
  if (text.length <= 0) {
    message = "message empty";
    valid = false;
  }
  if (!text) {
    message = "undefined";
    valid = false;
  }

  return { valid, message };
};

//appends to html container from tweet database
const renderTweets = function (database) {
  for (const user of database.reverse()) {
    $("#tweets-container").append(createTweetElement(user));
  }
};

//ajax "get" method for fetching tweets
export const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    renderTweets(tweets);
  });
};