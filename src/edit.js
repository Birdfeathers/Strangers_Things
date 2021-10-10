import React, {useEffect} from "react";
import { getPosts, editPost } from "./apiCalls";
import { BaseUrl } from "./constants";

const EditPost = ({token, history,match, setPosts, setPostsToDisplay, findPost, posts}) => {
    let title;
    let description;
    let price;
    let location;
    let willDeliver;
   
    
    const post = findPost(posts, match.params.postid);
    if(post)
    {
    title = post.title;
    description = post.description;
    price = post.price;
    location = post.location;
    willDeliver = post.willDeliver;}
   
    return<div>
        <div className = "title"><h1>Edit Post</h1></div>
    <form onSubmit = {(e) => {
        e.preventDefault();
           editPost(match.params.postid, token, title, description, price, location, willDeliver);
            getPosts(setPosts,token, setPostsToDisplay);
            history.push("/posts")
        
    }}>
       <div className = "mb-3">
            <label className = "form-label">Title: </label>
            <input type = "text" defaultValue = {title} onChange = {(e) => { title = e.target.value;
            e.target.value = title;
            }} className = "form-control" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Description: </label>
            <textarea defaultValue = {description} onChange = {(e) => {description = e.target.value;
            e.target.value = description;}} className = "form-control" rows = "3" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Price: </label>
            <input defaultValue = {price} type = "text" onChange = {(e) => {price = e.target.value;
            e.target.value = price;}} className = "form-control" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Location: </label>
            <input type = "text" defaultValue = {location} onChange = {(e) => {location = e.target.value;
            e.target.value = location;}} className = "form-control"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">WillDeliver</label>
            <input type = "checkbox" defaultChecked = {willDeliver} onChange = {(e) => {willDeliver = e.target.checked;
            e.target.checked = willDeliver;}} />
        </div>
        <input type = "submit" />
    </form>
    </div>
}

export default EditPost;