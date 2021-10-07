import React, {useState} from 'react';
import { BaseUrl } from './constants';

function DeletePost(post_id, token)
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

const SendMessage = ({ setOpenM, post_id, token}) => {
    let currentMessage = "";
    return(
        <form onSubmit = {(e) => {
            e.preventDefault();
            SendMessageAPI(post_id, token, currentMessage);
            console.log(post_id)
            setOpenM(false);
        }}>
            <div>
                <label> Message: </label>
                <input type = "text" onChange = {(e) => {currentMessage = e.target.value;
                    e.target.value = currentMessage;}}/>
            </div>
            
            <input type = "submit"/>
            
        </form>
    )
}

const Post = ({element, token, me}) =>{
    const [openM, setOpenM] = useState(false);
    return(
        <div className = "post" > 
            <h1> {element.title}</h1>
            <p> <b>Price: </b> {element.price}</p>
            <p><b>Location: </b> {element.location}</p>
            <p><b>Will Deliver: </b>{element.willDeliver ? "yes" : "no"}</p>
            <p> <b>Description: </b>{element.description}</p>
            {element.isAuthor ? <div> 
                <p><b>Messages: </b></p>
                {element.messages.map((message, index) => {return(<div key = {index}>{message.content}</div>)})}
                <button onClick = {() =>{
                    DeletePost(element._id,token);
                }}>Delete Post </button>
            </div> : null}
            {(!element.isAuthor && token && !me) ? <div>
                <button onClick = {() => {
                    setOpenM(true);
                }}>Send Message to Poster</button>
            </div>:null}
            {openM ? <SendMessage setOpenM = {setOpenM} post_id = {element._id} token = {token}/> : null}
        </div>
    )
}

export default Post;
