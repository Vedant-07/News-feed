import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../App.css'
const Register = () => {
    //let navigate=useNavigate()
    //const history = useHistory()
    //[current state,updated function]=initial values
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", pwd: "", cpwd: ""
    })

    let name, value
    const handleInputs = (e) => { //changing even to e
        console.log("in handleinputs");
        console.log(e)
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
        //...user is a spread function ,e for event
        //here [name] is dynamic data
    }
    const navigate = useNavigate()
    const PostData = async (e) => { //adding e to papramter and e.prevdef
        e.preventDefault()
        //call fetch api
        //Event.preventDefault();
        const { name, email, phone, work, pwd, cpwd } = user
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, pwd, cpwd
            })
        })
        console.log("in Postdta ");
        console.log(res.status)

        const data = await res.json()
        if (res.status === 422 || !data) { //here isn the data.status
            window.alert(res.status)
            window.alert('Registration failed :(')
            console.log('registration not possible')
        }
        else {
            window.alert(res.status)
            window.alert('Registered :)')
            console.log('registration  possible')
            navigate('/login')
            //history.push('/login')
            /* const done=await */// navigate("/login")
            /* if(done)
            console.log('register data sent using navigator');
            else
             console.log('not sent using navigator'); */
        }
    }

    return (
        <>
            <div className="form-body my-5">
                <div className="row">
                    <div className="form-holder mx-5 ">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Register Today</h3>
                                <p>Fill in the data below.</p>
                                <form className="requires-validation " method='post'>

                                    <div className="col-md-11">
                                        <input className="form-control" type="text" name="name" placeholder="Full Name" required autoComplete='off'
                                            value={user.name}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Username field is valid!</div>
                                        <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-11">
                                        <input className="form-control" type="email" name="email" placeholder="E-mail Address" required autoComplete='off'
                                            value={user.email}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-11">
                                        <input className="form-control" type="text" name="phone" placeholder="Phone number" required autoComplete='off'
                                            value={user.phone}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Phone number field is valid!</div>
                                        <div className="invalid-feedback">Phone number cannot be blank!</div>
                                    </div>

                                    <div className="col-md-11">
                                        <input className="form-control" type="text" name="work" placeholder="Work" required autoComplete='off'
                                            value={user.work}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Work field is valid!</div>
                                        <div className="invalid-feedback">Work field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-11">
                                        <input className="form-control" type="password" name="pwd" placeholder="Password" required autoComplete='off'
                                            value={user.pwd}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Password field is valid!</div>
                                        <div className="invalid-feedback">Password field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-11">
                                        <input className="form-control" type="password" name="cpwd" placeholder="Confirm Password" required autoComplete='off'
                                            value={user.cpwd}
                                            onChange={handleInputs}
                                        />
                                        <div className="valid-feedback">Confirm Password field is valid!</div>
                                        <div className="invalid-feedback">Confirm Password field cannot be blank!</div>
                                    </div>
                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary" onClick={PostData} >Register</button>
                                        <NavLink to='/login' className='mx-3 btn btn-primary'>Already Signed</NavLink >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register