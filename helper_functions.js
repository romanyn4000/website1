const USERS = "https://jsonplaceholder.typicode.com/users";
const POSTS = "https://jsonplaceholder.typicode.com/posts?userId=";

// a function to create tabs
export function create_tabs(User_data) {
    // create a container for the page with class container
    let container = document.createElement("div");
    container.classList.add("container");

    let isFirstTab = false;

    // create a div.tab-container to hold tabs
    let tab_container = document.createElement("div");
    tab_container.classList.add("tab-container");

    // loop over each user and create their tabs
    for (let user of User_data) {
  
      let tab = document.createElement("div");
      tab.classList.add("tab");

    //  check for first tab and make it clicked by defaults
      if(!isFirstTab){
          tab.classList.add("clicked");
          isFirstTab = true;
      }
      
    //  append created tabs to their container
      tab.id = user.id;
      let tabName = document.createTextNode(user.username);
      tab.appendChild(tabName);
  
      tab_container.append(tab);
      container.append(tab_container);
  }
    // append everything to body
    let body = document.getElementsByTagName("body")[0];
    body.append(container);
  }

// an event listener for tab clicks
export function listen() {
    let container = document.getElementsByClassName("container")[0];
    container.addEventListener("click", handleClick,);
}

// a function to handle tab clicks
export function handleClick(event) {
    let id = event.target.id;
    
    // make sure clicked target is a tab
    if (!event.target.classList.contains("tab")) {
        console.log("click on the tabs!");
    }
    else {
        // remove clicked class from other tabs
        remove_click(this);

        // toggle clicked class for target tab
        event.target.classList.toggle("clicked");

        // fetch target posts, display them and hider others
        if(!event.target.classList.contains("fetched")){
            fetchPosts(id, event.target)
            .then(post_div => post_div.style.display = "flex");
            event.target.classList.add("fetched");
        }
        else{
            let posts = document.querySelectorAll(".posts");
            let post_div = posts.forEach(
                (element) => {if(element.id == id) element.style.display = "flex"}
            )

        }
    }
}

// a function to fetch target posts
export async function fetchPosts(id, target) {
    let post_response = await fetch(POSTS + id);
    let post_json = await post_response.json();
    return create_posts(post_json, target);

}

// a function to create posts
export function create_posts(posts_data, target){
    // create div.posts for target posts
    let post_div = document.createElement("div");
    post_div.classList.add("posts");
    post_div.id = posts_data[0].userId;
    let posts_container;

    // check if post-container exists if not create it
    if(document.getElementsByClassName("posts-container")[0]){
        posts_container = document.getElementsByClassName("posts-container")[0];
    }else{
        
        posts_container = document.createElement("div");
        posts_container.classList.add("posts-container");
    }

    // create p for each post and add it to div.posts
    for(let post of posts_data){
        let content = document.createElement("p");
        let text = document.createTextNode(post.body);
        content.appendChild(text);
        post_div.append(content);
    }

    // append everything to container
    posts_container.append(post_div)
    let container = document.getElementsByClassName("container")[0];
    container.append(posts_container);

    // make first target's posts appear by default
    if(post_div.id == 1){
        post_div.style.display = "flex";
    }
    return post_div;
}

// a function to reset tabs and posts
export function remove_click(container){

        let tabs = container.children[0].childNodes;
        let posts = container.children[1].childNodes;

        // remove clicked class from tabs
        for(let tab of tabs){
            if (tab.classList.contains("clicked")){
                tab.classList.remove("clicked")
            }
        }

        // hide posts
        for(let post of posts){
            if (post.style.display == "flex"){
                
                post.style.display = "none";
            }
        }


}