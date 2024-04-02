import * as hlp from './helper_functions.js';

const USERS = "https://jsonplaceholder.typicode.com/users";
const POSTS = "https://jsonplaceholder.typicode.com/posts?userId=";

fetch(USERS)
  .then(response => response.json())
  .then(json => {
    hlp.create_tabs(json);
    hlp.listen();
    hlp.fetchPosts(1, document.getElementsByClassName("tab")[0]);
  })
  .catch(error => console.log(error));
