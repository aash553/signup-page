import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser,setLoggedInUser] = useState('');
    const [products,setProducts] = useState('');
    useEffect(()=>{
       setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[])
    const navigate = useNavigate()
    const handleLogout = (e)=>{
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess ('Logged out successfully');
      setTimeout(()=>{
        navigate('/Login')
      },1000)
    }

    const fetchProducts = async()=>{
      try {
        const url = "http://localhost8080/products";
        const headers = {
          headers :{
            'Authorization': localStorage.getItem('token')
          }
        }
        const response = await fetch(url,headers);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        handleError(error)
      }
    }
    useEffect(()=>{
      fetchProducts()
    })

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <div>
        {
         products && products?.map((item)=>{
            <ul>
              <span>{item.name}:{item.price}</span>
            </ul>
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
