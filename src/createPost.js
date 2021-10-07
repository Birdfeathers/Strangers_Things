import React, {useState} from 'react';
import { BaseUrl } from './constants';

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

const CreatePost = ({token}) => {
    let title;
    let description;
    let price;
    let location;
    let willDeliver;
    return<form onSubmit = {(e) => {
        e.preventDefault();
        if(!title || !description || !price ) console.log("Missing required fields");
        else{
            
            makePost(token, title, description, price, location, willDeliver);
        }
    }}>
        <div>
            <label>Title: </label>
            <input type = "text" onChange = {(e) => {title = e.target.value;
            e.target.value = title;
            }}/>
        </div>
        <div>
            <label>Description: </label>
            <input type = "text" onChange = {(e) => {description = e.target.value;
            e.target.value = description;}}/>
        </div>
        <div>
            <label>Price: </label>
            <input type = "text" onChange = {(e) => {price = e.target.value;
            e.target.value = price;}}/>
        </div>
        <div>
            <label>Location: </label>
            <input type = "text" onChange = {(e) => {location = e.target.value;
            e.target.value = location;}}/>
        </div>
        <div>
            <label>WillDeliver </label>
            <input type = "checkbox" onChange = {(e) => {willDeliver = e.target.checked;
            e.target.checked = willDeliver;}}/>
        </div>
        <input type = "submit" />
    </form>
}

export default CreatePost;