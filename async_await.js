import * as hlp from './helper_functions.js';

const USERS = "https://jsonplaceholder.typicode.com/users";
const POSTS = "https://jsonplaceholder.typicode.com/posts?userId=";

async function load_page(){
    // fetch user data
    let user_response = await fetch(USERS);
    let user_json = await user_response.json();

    // create tabs using usernames
    hlp.create_tabs(user_json);

    // load default posts
    hlp.fetchPosts(1, document.getElementsByClassName("tab")[0]);

    // listen for any clicks on tabs
    hlp.listen();
}





load_page();