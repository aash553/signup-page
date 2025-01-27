import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {

    const [signupInfo,setSignupInfo] = useState({
        name: '',
        email: '',
        password:''
    })
    const navigate = useNavigate();
    const handleChange= (e)=>{
        const {name,value} = e.target
        console.log(name,value);
        const copySignupInfo = {...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handleSignup = async(e) =>{
        e.preventDefault();

        const {name , email, password} = signupInfo

        if(!name || !email || !password){
            return handleError('name, email and password are required')
        }

        try {
            const url ="http://localhost:8080/auth/signup"
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name, email, password})
            })
            const result = await response.json()

            const {success,message,error} = result
            if(success){
               handleSuccess(message);
              setTimeout(()=>{
                navigate('/login')
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='name'>Name:</label>
            <input type="text" onChange={handleChange} name="name" autoFocus placeholder='Enter your Name'
             value={signupInfo.name}
             />
        </div>
        <div>
            <label htmlFor='email'>Email:</label>
            <input type="email" onChange={handleChange} name="email" autoFocus placeholder='Enter your email' 
            value={signupInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password:</label>
            <input type="text" onChange={handleChange} name="password" autoFocus placeholder='Enter Password' 
             value={signupInfo.password}
            />
        </div>
        <button type='submit'>Signup</button>
        <span>Already have an account ?
            <Link to="/login">Login</Link>
         </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
