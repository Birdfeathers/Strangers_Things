import React, {useState, useEffect} from 'react'
import { getMyInfo } from './apiCalls';
import Post from './post';


const ViewMessage = ({message, id, token}) => {
    const isMe = id === message.fromUser._id;
    console.log(message.post);
    if(isMe){
    return( <div className = "post">
        <p><b>Post: </b>{message.post.title}</p>
        <p><b>Content: </b>{message.content}</p>
    </div>)}
    else return null;
}


const Me = ({ token}) =>{
   const [myInfo, setMyInfo] = useState({});
   useEffect(() => {
    if(token)getMyInfo(token, setMyInfo)
   }, [token])
   let data = myInfo.data;
    return<div>
        <div className = "title"><h1>Home</h1></div>
        {myInfo.data? <div>
            <p><b>Posts:</b></p>
            {myInfo.data.posts.map((element, index) => {
            return<Post key = {index} element = {element} token = {token} me = {true}/>})}
            <p><b>Messages Sent: </b></p>
            {myInfo.data.messages.map((element, index) => {
            return<ViewMessage className = "post" key = {index} message = {element} id = {data._id} token = {token}/>})}
        </div> : <p>You are not logged in.</p>}
    </div>
}

export default Me;