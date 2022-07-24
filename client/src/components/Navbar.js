import React from 'react'
import logo from "./../images/logo1.svg"
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'
import { useContext } from 'react'
const Navbar = () => {

  const {state,dispatch}=useContext(UserContext)

  const RenderMenu=()=>{
    if(state){
      return(
        <>
          
            <li className="nav-item ">
            <NavLink className="nav-link" to="/contact">Contact us</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>
        </>
      )

    }
    else
    {
      return(
        <>
          <li className="nav-item">
            <NavLink className="nav-link  " to="/login">Login</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item ">
            <NavLink className="nav-link" to="/contact">Contact us</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          
        </>
      )
    }
  }
  return (
    <nav className="navbar fixed-top navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand p-sm-4" to="/">Mern</NavLink>
      <img src={logo} alt='logo' height={70} width={70}  />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
        <ul className="navbar-nav  ">
        <RenderMenu/>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar