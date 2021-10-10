import React, {useState} from 'react';
import { DeletePost, SendMessageAPI} from './apiCalls';


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

const Post = ({element, token, me, setPosts, setPostsToDisplay, history}) =>{
    const [openM, setOpenM] = useState(false);
    return(
        <div className = "post" > 
           <div className = "titleBox">
            <h2> {element.title}</h2>
            <p> <b>Price: </b> {element.price}</p>
            <p><b>Will Deliver: </b>{element.willDeliver ? "yes" : "no"}</p>
           </div>
            <div>
            {me ? <p><b>Active:</b>{element.active ? "yes": "no"}</p>: <p><b>Author: </b> {element.author.username}</p>}
            </div>
            <div><p><b>Location: </b> {element.location}</p></div>
            <div><p><b>Description: </b>{element.description}</p></div>
            {element.isAuthor || me ? <div> 
                <p><b>Messages: </b></p>
                {element.messages.map((message, index) => {return(<div key = {index} className = "message">
                    <div className = "border"><b>Author:</b> {message.fromUser.username} </div>
                    <div>{message.content} </div>
                    </div>)})}
                {element.isAuthor ? <div><button onClick = {() =>{
                    DeletePost(element._id,token, setPosts, setPostsToDisplay);
                }}>Delete Post </button>
                <button onClick = {() => {
                    history.push("/edit/" + element._id)}}>Edit Post</button>
                </div>: null}
            </div> : null}
            {(!element.isAuthor && token && !me) ? <div>
                <button onClick = {() => {
                    setOpenM(true);
                }}>Send Message to Poster</button>
            </div>:null}
            {openM ? <SendMessage setOpenM = {setOpenM} post_id = {element._id} token = {token} /> : null}
        </div>
    )
}

export default Post;
