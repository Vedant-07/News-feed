import React from 'react'
import { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { useContext } from 'react';
const Login = () => {
    const {state,dispatch}=useContext(UserContext)

    const [ email, setEmail ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const navi=useNavigate();
    const  loginUser=async (e)=>{
        
        e.preventDefault()
        const res=await fetch('/login',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,pwd
            })

        })
        const data=await res.json()//chech here 
        if(res.status ===400 || !data)//check on register side
        {
            window.alert('invalid in login react')

        }
        else{
            dispatch({type:"USER",payload:true})
            window.alert('Login sucees from react side')
            navi('/')
        }

    }

    return (
        <div className="form-body container-fluid m-5 ">
            <div className="row ">
                <div className="form-holder justify-content-center">
                    <div className="form-content ">
                        <div className="form-items">
                            <h3> Login</h3>
                            <form className="requires-validation"  method='post'>

                                <div className="col-md-10">
                                    <input className="form-control" type="email" name="email" placeholder="E-mail Address" required autoComplete='off'
                                        value={email}
                                        onChange={(Event) => setEmail( Event.target.value)}
                                    />
                                    <div className="valid-feedback">Email field is valid!</div>
                                    <div className="invalid-feedback">Email field cannot be blank!</div>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="password" name="pwd" placeholder="Password" required autoComplete='off'
                                        value={pwd}
                                        onChange={(Event) => setPwd( Event.target.value)}
                                    />
                                    <div className="valid-feedback">Password field is valid!</div>
                                    <div className="invalid-feedback">Password field cannot be blank!</div>
                                </div>
                                <div className="form-button mt-3">
                                    <button id="submit" type="submit" className="btn btn-primary"
                                    onClick={loginUser}
                                    >Login</button>
                                    <NavLink to='/register' className='mx-3 btn btn-primary'>Create an account</NavLink >
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login