import React, {useState} from 'react';
import { RegisterUser, LoginUser} from './apiCalls';

const Message = () => {
    return<div className = "error">Error, passwords do not match! </div>
}

const Incorrect = () => {
    return<div className = "error">Error, username or password are incorrect!</div>
}


const Login = ({mode, setToken}) => {
    const isLogin = mode == "login";
    const [message, setMessage] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
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
            LoginUser(username, password, setToken, setIncorrect);
        }
    } }>
        {isLogin ? <div className = "title"><h1>Login</h1></div>: <div className = "title"><h1>Register</h1></div>}
        <div className = "mb-3">
            <label htmlFor = "username" className = "form-label"> UserName: </label>
            <input id = "username" type = "text" className = "form-control" required="required"/>
        </div>
        <div className = "mb-3"> 
            <label htmlFor = "password" className = "form-label"> Password: </label>
            <input id = "password" type = "password" className = "form-control" required="required"/>
        </div>
    
        {isLogin ? null : <div className = "mb-3">
            <label htmlFor = "confirmPassword" className = "form-label"> Confirm Password : </label>
            <input id = "confirmPassword" type = "password" className = "form-control" required="required"/>
            </div>}
        <input type = "submit"/>
        {message ? <Message /> : null}
        {incorrect ? <Incorrect />:null}

    </form>
}

export default Login;