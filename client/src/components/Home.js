import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const Home = () => {

  const [userName, setUserName] = useState('')
  const [show,setShow]=useState(false)


  const userHomePage = async () => {
    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        //credentials: "include"
      })
      const data = await res.json()
      console.log('home ka data');
      console.log(data)


      //setting user data
      setUserName(data.name)

      //set show
      setShow(true)

    } catch (error) {
      console.log('error from contactpage ', error);

    }
  }

  useEffect(() => {
    userHomePage()
  }, [])


  /* //handling inputs commeting it in home
  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({ ...user, [name]: value })
  } */




  return (
    <div class="center container-fluid my-5 pt-5">
    <h1 >WELCOME</h1>
    <h1>{userName}</h1>
    <h1>{show ? "happy to see you":"sign in to continue"}</h1>
    <div class="btn mt-5 ">Enter to the mern project </div>
  </div>
  )
}

export default Home