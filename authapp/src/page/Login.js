import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [loginInfo,setLoginInfo] = useState({
        email: '',
        password:''
    })
    const navigate = useNavigate();
    const handleChange= (e)=>{
        const {name,value} = e.target
        console.log(name,value);
        const copyloginInfo = {...loginInfo };
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }
    const handlelogin = async(e) =>{
        e.preventDefault();

        const{email, password} = loginInfo

        if(!email || !password){
            return handleError('email and password are required')
        }

        try {
            const url =`https://signuppage-liard.vercel.app/auth/login`
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
            })
            const result = await response.json()

            const {success,message,jwtToken,name,error} = result
            if(success){
               handleSuccess(message);
               localStorage.setItem('token',jwtToken)
               localStorage.setItem('loggedInUser',name)

              setTimeout(()=>{
                navigate('/home')
              },1000)
                }else if(error){
                    handleError(error.message || " an error occured")
                }
                else if(!success){
                    handleError(message)
                }
            console.log(result);
        } catch (error) {
            handleError(error.message || "something went wrong")
        }
    }

  return (
    <div className='container'> 
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div>
            <label htmlFor='email'>Email:</label>
            <input type="email" onChange={handleChange} name="email" autoFocus placeholder='Enter your email' 
            value={loginInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password:</label>
            <input type="text" onChange={handleChange} name="password" autoFocus placeholder='Enter Password' 
             value={loginInfo.password}
            />
        </div>
        <button type='submit'>Signup</button>
        <span>Dont have an account ?
            <Link to="/signup">Signup</Link>
         </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
