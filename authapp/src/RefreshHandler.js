import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({SetisAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            SetisAuthenticated(true)

            if(location.pathname ==='/'||
                location.pathname ==='/login' ||
                location.pathname ==='/signup'
            ) {
                navigate('/home',{replace:false})
            }
        }
    },[location,navigate,SetisAuthenticated])
  return (
    <div>
    </div>
  )
}

export default RefreshHandler
