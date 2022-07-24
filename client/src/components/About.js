import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
const About = () => {
  const navi=useNavigate()
  const [userData, setUserData] = useState({})
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json()
      console.log('about us ka data');
      console.log(data)

      if (!res.status === 200)
      throw new Error(res.error)

      //setting user data
      setUserData(data)

    } catch (error) {
      console.log('error from cllabtpge ', error);
      navi('/login')
    }
  }

  useEffect(() => {
    callAboutPage()
  }, [])


  return (
    <div class="container-fluid my-5 pt-5  ">
      <h1> Page for about </h1>
      <h1>This is some text for you {userData.name}</h1>
       
    </div>
  )
}

export default About