import React, {useState, useEffect} from 'react'
import { BaseUrl } from './constants';
import Post from './post';

const ViewMessage = (message) => {
    return(<div className = "post">
      
        <h4>From: {message.message.fromUser.username}</h4>
        <p>{message.message.content}</p>
    </div>)
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

const Me = ({ token}) =>{
   const [myInfo, setMyInfo] = useState({});
   useEffect(() => {
    if(token)getMyInfo(token, setMyInfo)
   }, [token])
   let data = myInfo.data;
    return<div>
        {myInfo.data? <div>
            <p><b>Posts:</b></p>
            {myInfo.data.posts.map((element, index) => {
            return<Post key = {index} element = {element} token = {token} me = {true}/>})}
            <p><b>Messages Sent and Received: </b></p>
            {myInfo.data.messages.map((element, index) => {
            return<ViewMessage className = "post" key = {index} message = {element}/>})}
        </div> : null}
    </div>
}

export default Me;