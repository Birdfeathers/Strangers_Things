import React from 'react';
import { getPosts } from './apiCalls';
import { makePost } from './apiCalls';


const CreatePost = ({token, history, setPosts, setPostsToDisplay}) => {
    let title;
    let description;
    let price;
    let location;
    let willDeliver;
    return<div>
        <div className = "title"><h1>Create Post</h1></div>
    {!!token ? <form onSubmit = {(e) => {
        e.preventDefault();
        if(!title || !description || !price ) console.log("Missing required fields");
        else{
            
            makePost(token, title, description, price, location, willDeliver);
            getPosts(setPosts,token, setPostsToDisplay);
            history.push("/posts")
        }
    }}>
        <div className = "mb-3">
            <label className = "form-label">Title: </label>
            <input type = "text" onChange = {(e) => {title = e.target.value;
            e.target.value = title;
            }} className = "form-control" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Description: </label>
            <textarea onChange = {(e) => {description = e.target.value;
            e.target.value = description;}} className = "form-control" rows = "3" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Price: </label>
            <input type = "text" onChange = {(e) => {price = e.target.value;
            e.target.value = price;}} className = "form-control" required = "required"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">Location: </label>
            <input type = "text" onChange = {(e) => {location = e.target.value;
            e.target.value = location;}} className = "form-control"/>
        </div>
        <div className = "mb-3">
            <label className = "form-label">WillDeliver</label>
            <input type = "checkbox" onChange = {(e) => {willDeliver = e.target.checked;
            e.target.checked = willDeliver;}} />
        </div>
        <input type = "submit" />
    </form>: <p>You can only create posts when you are signed in.</p>}
    </div>
}

export default CreatePost;