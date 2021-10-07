import React, {useState} from 'react';
import { BaseUrl } from './constants';

const Message = () => {
    return<div className = "error">Error, passwords do not match! </div>
}

function RegisterUser(username, password, setToken)
{
    fetch(BaseUrl + '/users/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username: username,
        password: password
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setToken(result.data.token);
        console.log(result.data.token);
        localStorage.setItem("token", result.data.token);
    })
    .catch(console.error);
}

function LoginUser(username, password, setToken)
{
    fetch(BaseUrl + '/users/login', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
        username: username,
        password: password
        }
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        console.log(result.data.token);
    })
    .catch(console.error);
}




const Login = ({mode, setToken}) => {
    const isLogin = mode == "login";
    const [message, setMessage] = useState(false);
    return<form onSubmit = {(event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if(!isLogin)
        {
            const confirmPassword = document.getElementById("confirmPassword").value;
            if(password != confirmPassword)
            {
                setMessage(true);
            }
            else{
                RegisterUser(username, password, setToken);
                setMessage(false);
            }
        }
        else{
            LoginUser(username, password, setToken)
        }
    } }>
        <div>
            <label > UserName: </label>
            <input id = "username" type = "text" />
        </div>
        <div>
            <label > Password: </label>
            <input id = "password" type = "password" />
        </div>
    
        {isLogin ? null : <div>
            <label > Confirm Password : </label>
            <input id = "confirmPassword" type = "password" />
            </div>}
        <input type = "submit"/>
        {message ? <Message /> : null}

    </form>
}

export default Login;