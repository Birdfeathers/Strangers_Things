import React, {useState} from 'react';
import { BaseUrl } from './constants';


function postMatches(post, text) {
    text = text.toLowerCase();
    if(post.title.toLowerCase().includes(text))return true;
    if(post.description.toLowerCase().includes(text)) return true;
    return false;
}



const Search = ({setSearchTerm,searchTerm, setPostsToDisplay, posts}) => {
    let st = "";
    return(
        <form >
            <label>Search:</label>
            <input id = "searchbox"type = "text" onChange = {(e) => {
                st = e.target.value;
                e.target.value = st;
                setSearchTerm(st);
                const filteredPosts = posts.filter(post => postMatches(post, st));
                setPostsToDisplay(searchTerm.length ? filteredPosts : posts)

            }}/>
            <button onClick = {() => { setSearchTerm("");
            setPostsToDisplay(posts);
            document.getElementById("searchbox").value = "";}}>Remove Filter</button>
            {searchTerm ? <div>
                <p> Posts filtered by term "{searchTerm}"</p>
            </div>: null}
        </form>
    )
}

export default Search;