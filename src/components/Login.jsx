import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [isLoading,setIsLoading]=useState(false)
   let navigate= useNavigate()
  let loginUser=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    axios.get(`https://652a10c855b137ddc83f476c.mockapi.io/users?email=${email}`)
    .then((res)=>{
      setIsLoading(false)
      console.log(res.data[0])
      if(res.data[0].password == password){
        let obj={isLoggedIn:true,email:email,role:res.data[0].role}
        localStorage.setItem("login",JSON.stringify(obj))
        toast.success("loggedIn successfully")
        if(res.data[0].role=="admin")
            navigate('/admin')
        else 
          navigate('/')
      }
      else
        toast.error("invalid crenditals")
    })
    .catch((err)=>{
      setIsLoading(false)
      toast.error(err)
    })
  }
  return (
    <div className='row shadow p-2 mt-5'>
    <div className='col-4 offset-1'>
      <img src="/src/assets/login.png" className='img-fluid' />
    </div>
    <div className='col-6'>
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label for="" class="form-label">email</label>
          <input type="text" name="email" id="" class="form-control" placeholder="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       
        </div>
        <div class="mb-3">
          <label for="" class="form-label">password</label>
          <input type="password" name="password" id="" class="form-control" placeholder="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
       
        </div>
      <div class="d-grid gap-2">
        <button type="submit" name="" id="" class="btn btn-primary">Login</button>
      </div>
        <p>create an account???  <Link to='/login'>Register</Link></p>
        </form>
    </div>
</div>
  )
}

export default Login
