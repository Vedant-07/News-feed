import React, { createContext, useReducer } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom"
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import ErrorPage from './components/ErrorPage'
import Logout from './components/Logout'
import { initialState,reducer } from './reducer/UseReducer'//deletein reducer from here
export const UserContext=createContext()
//import { Reducer } from 'react'
//import { useReducer } from 'react'
const Routing=()=>{
  return(
    
    <Routes>
    <Route  path="/" element={<Home/>} ></Route>

      <Route exact path='/login' element={<Login/>} ></Route>

      <Route path='/register' element={<Register/>} ></Route>

      <Route path='/contact' element={<Contact/>} ></Route>
  
      <Route path='/about' element={<About/>} ></Route>
    
       <Route path='/logout'element={<Logout/>}></Route>
   
       <Route path='*' element={<ErrorPage/>} ></Route> 
      {/* <ErrorPage/> */}
    </Routes>
  )
}
const App = () => {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (//removing /routes ,only 2 allowd trial mehod
  
    <>
       <UserContext.Provider value={{state,dispatch}}>
     <Navbar/>
     <Routing/>
      </UserContext.Provider>

    </>
  )
}

export default App