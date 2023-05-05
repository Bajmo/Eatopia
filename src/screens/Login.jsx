import React ,{useState}from 'react'
import '../css/login.css'
import Logo from '../assets/logo.png'
import axios from 'axios'
const Login = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")

  const handlePress =()=>{
    const body={
        "username":username,
        "password":password
    }
    axios.post("/endpoint",body)
}
  return (
    <div className='loginpage flex items-center justify-center'>
      <div className='loginbox w-80 h-96 bg-white flex flex-col items-center rounded-3xl p-8'>
        <img className='w-24' src={Logo}/>
        <p className='p-4 font-semibold text-xl'>Welcome back !</p>
        <input onChange={(e)=>setUsername(e.target.value)} className='border border-black w-56 rounded-3xl placeholder:text-xs placeholder:px-3 placeholder:text-red-600 py-2' type='text' placeholder='Username'/>
        <input onChange={(e)=>setPassword(e.target.value)} className='border border-black w-56 rounded-3xl placeholder:text-xs placeholder:px-3 placeholder:text-red-600 py-2 mt-2' type='text' placeholder='Password'/>
        <button className='text-white bg-black rounded-3xl w-56 py-3 text-sm mt-4'>Log In</button>
      </div>
    </div>
  )
}

export default Login