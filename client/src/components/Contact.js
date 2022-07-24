import React from 'react'
import { useEffect, useState } from 'react'
const Contact = () => {

  //const navi=useNavigate()
  const [userData, setUserData] = useState({ name: "", email: "", message: "" })
  const userContactPage = async () => {
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
      console.log('contact us ka data');
      console.log(data)

      if (!res.status === 200)
        throw new Error(res.error)

      //setting user data
      setUserData({ ...userData, name: data.name, email: data.email })

    } catch (error) {
      console.log('error from contactpage ', error);

    }
  }

  useEffect(() => {
    userContactPage()
  }, [])


  //handling inputs
  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({ ...userData, [name]: value })
  }

  //send data to backend
  const Contactform = async (e) => {
    e.preventDefault()//added this statement
    const { name, email, message } = userData
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, message
      })
    })
    const data = await res.json()
    if (!data) {
      console.log('message wasnt send from contact');
    }
    else
      {
    
    alert('message sent')
    setUserData({ ...userData, message: "" })
  }
  }



  return (


    <div className='my-3 '>
      <div className="contact-form-wrapper d-flex justify-content-center ">
        <form method='POST' className="contact-form">
          <h5 className="title text-white">Contact us</h5>
          <p className="description">Feel free to contact us if you need any assistance, any help or another question.
          </p>
          <div>
            <input type="text" className="form-control rounded border-white mb-3 form-input" id="name" name='name'
              onChange={handleInputs} placeholder="Name" value={userData.name} required />
          </div>
          <div>
            <input type="email" className="form-control rounded border-white mb-3 form-input" name='email'
              onChange={handleInputs} placeholder="Email" required value={userData.email} />
          </div>
          <div>
            <textarea id="message" className="form-control rounded border-white mb-3 form-text-area" rows="5" cols="30"
              onChange={handleInputs} placeholder="Message" name='message'
              value={userData.message}
              required></textarea>
          </div>
          <div className="submit-button-wrapper">
            <input type="submit" value="Send" onClick={Contactform} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact