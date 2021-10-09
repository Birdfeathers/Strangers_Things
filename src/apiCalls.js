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

export {getUserName, getPosts};