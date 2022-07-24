import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const Logout = () => {
    const {state,dispatch}=useContext(UserContext)
    const nav=useNavigate()
    useEffect(() => {
         fetch('/logout', {
            method: "GET",
            headers: {
               Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            nav('/login',{replace:true})
            if(res.status !== 200)
            {
                console.log('logout then error ');
                throw new Error(res.error)
            }
        }).catch((err)=>{
            console.log("logout catch ka error");
            console.log(err);
        })
    })
    

  return (
  <>
  <h1>Logout done...</h1>
  
  </>
    
  )
}

export default Logout