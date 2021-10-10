import { BaseUrl } from "./constants";

function getUserName(token, setUsername)
{
    fetch(BaseUrl + '/test/me', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    }).then(response => response.json())
    .then(result => {
        setUsername(result.data.user.username);
    })
    .catch(console.error);
}

function getPosts(setPosts, token, setPostsToDisplay)
{
    fetch(BaseUrl + '/posts',  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(response => response.json())
        .then(result => {
            setPosts(result.data.posts);
            setPostsToDisplay(result.data.posts);
            console.log(result.data.posts)
        }).catch(console.error);
        
}

function DeletePost(post_id, token, setPosts, setPostsToDisplay)
{
    fetch(BaseUrl + '/posts/' + post_id, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        getPosts(setPosts, token, setPostsToDisplay);
        
    })
    .catch(console.error);
}

function SendMessageAPI(post_id, token, message)
{
    console.log(BaseUrl +  '/posts/' + post_id + '/messages')
    fetch(BaseUrl +  '/posts/' + post_id + '/messages',{
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        message: {
        content: message
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(console.error);
}

function RegisterUser(username, password, setToken)
{
    fetch(BaseUrl + '/users/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username: username,
        password: password
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setToken(result.data.token);
        console.log(result.data.token);
        localStorage.setItem("token", result.data.token);
    })
    .catch(console.error);
}

function LoginUser(username, password, setToken, setIncorrect)
{
    fetch(BaseUrl + '/users/login', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username: username,
        password: password
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result.success);
        if(result.success)
        { console.log(result);
            setToken(result.data.token);
            localStorage.setItem("token", result.data.token);
            console.log(result.data.token);
            setIncorrect(false);
        }
        else{
            setIncorrect(true);
        }
    })
    .catch(console.error);
}

function getMyInfo(token, setMyInfo)
{    fetch(BaseUrl + '/users/me', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setMyInfo(result);

    })
    .catch(console.error);
}

function makePost(token, title, description, price, location, willDeliver)
{
        fetch( BaseUrl + '/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            post: {
            title,
            description,
            price,
            location,
            willDeliver
            }
        })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(console.error);
}

function editPost(postid, token, title, description, price, location, willDeliver)
{
    fetch(BaseUrl + '/posts/' + postid, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        post: {
        title,
        description,
        price,
        location,
        willDeliver
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(console.error);
}

export {getUserName, getPosts, DeletePost, SendMessageAPI, RegisterUser, LoginUser, getMyInfo, makePost, editPost};