import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Post from './post.js';
import Login from './login.js';
import CreatePost from './createPost.js';
import Search from './search.js';
import Me from './me.js';
import { getUserName, getPosts } from './apiCalls.js';
import { BaseUrl } from './constants.js';




const AlreadyIn = ({setToken}) =>{
    return<div>
        <p>You are logged in, would you like to log out?</p>
        <button type = "button" onClick = {() => {
            setToken("");
            localStorage.setItem("token", "");}} >
                Log out</button>
    </div>
}




const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const t = localStorage.getItem("token");
        if(t) setToken(t);
        getPosts(setPosts, t, setPostsToDisplay);
        if(t)getUserName(token || t, setUsername);
      
    }, [token]);
  return <Router >
      {!!token ? <h1 className = "greeting" >Welcome {username}</h1> : <p>You are not signed in.</p>}
      <nav className ="navbar navbar-default gray-background">
         <div className="container">
            
            <Link to = "/"> <button className = "btn btn-default navbar-btn">Home</button> </Link>
            <Link to = "/posts"> <button className = "btn btn-default navbar-btn" >Posts</button> </Link>
            <Link to = "/login"> <button className = "btn btn-default navbar-btn">Login / Logout</button> </Link>
            <Link to = "/register"> <button className = "btn btn-default navbar-btn">Register</button> </Link>
            {!!token ? <Link to = "/newpost"> <button className = "btn btn-default navbar-btn">Make New Post</button> </Link>: null}
            
        </div>
      </nav>
      <Route path = "/posts">
        <Search setSearchTerm = {setSearchTerm} searchTerm = {searchTerm} setPostsToDisplay = {setPostsToDisplay} posts = {posts}/>
        {postsToDisplay.map((element, index) => {
            return<Post key = {index} element = {element} token = {token} setPosts = {setPosts} setPostsToDisplay = {setPostsToDisplay}/>})}
      </Route>
      <Route path = "/login">
         { !!token ? <AlreadyIn setToken = {setToken}/> : <Login mode = "login" setToken = {setToken} />}
        </Route>
      <Route path = "/register">
          {!!token ? <AlreadyIn setToken = {setToken}/> : <Login mode = "register" setToken = {setToken}/>}
        </Route>
      <Route path = "/newpost" render = {(routeProps)=> 
        <CreatePost token = {token} {...routeProps} setPosts = {setPosts} setPostsToDisplay = {setPostsToDisplay}/>
        }/>
            {/* {!!token ? <CreatePost token = {token} />: <p>You can only make posts when logged in.</p>}
      </Route> */}
      {!!token ? <Route exact path = "/" render = {(routeProps) => <Me  {...routeProps} token = {token}/>}/>: null}
            
      
  </Router>
}
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);