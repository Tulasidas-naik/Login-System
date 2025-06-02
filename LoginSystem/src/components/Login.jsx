import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
    const [ usernameReg, SetusernameReg ] = useState('');
    const [ passwordReg, SetpasswordReg ] = useState('') ;
    const [ usernameLogin, SetusernameLogin ] = useState('') 
    const [ passwordLogin, SetpasswordLogin ] = useState('')
    const [ resp, setresp ] = useState(false)
    const [logdedIn , setLoggedIn ] = useState(false)


    function handleRegister() {
        console.log("----------------")
        axios.post('http://localhost:3000/register', {username: usernameReg, password: passwordReg })
        .then((res) => {
            setresp(true)
        })
        .catch(err => {
            console.log(err, "????????????")
        })
    }

    function handleLogin() {
        axios.post('http://localhost:3000/login', {username: usernameLogin, password: passwordLogin }, { withCredentials: true })
        .then((res) => {
            console.log(res,"Loged In")
            setLoggedIn(true)
        })
        .catch(err => {
            console.log(err, "????????????")
        })
    }

    function handleProfileClick() {
        axios.get('http://localhost:3000/profile', { withCredentials: true })
        .then((res) => {
            console.log(res,"profile")
        })
        .catch(err => {
            console.log(err, "????????????")
        })
    }

    return (
        <>
        {/* <div> */}
            <form id='login'>
                <div className='Registration'>
                    <h1>Registration</h1>
                    <input type='text' placeholder='username' value={usernameReg} onChange={(e) => SetusernameReg(e.target.value)} />
                    <input type='text' placeholder='username' value={passwordReg} onChange={(e) => SetpasswordReg(e.target.value)} />
                    <button type='button' onClick={handleRegister}>Register</button>
                    {resp && <h3>User Registered Successfully</h3>}
                </div>
                <div className='Login'>
                    <h1>Login</h1>
                    <input type='text' placeholder='username' value={usernameLogin} onChange={(e) => SetusernameLogin(e.target.value)} />
                    <input type='text' placeholder='username' value={passwordLogin} onChange={(e) => SetpasswordLogin(e.target.value)} />
                    <button type='button' onClick={handleLogin}>Login</button>
                    {logdedIn && <button type='button' onClick={handleProfileClick}>profile</button>}
                </div>
            </form>
        {/* </div> */}
        </>
    )

}

export default Login;