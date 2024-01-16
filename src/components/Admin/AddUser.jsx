import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddUser = () => {
    const {id}=useParams()
    let initialState={username:'',email:'',password:'',cpassword:'',role:'user'}
    let [user,setUser]=useState({...initialState})

  const navigate=useNavigate()
  useEffect(()=>{
        if(id){
            axios.get(`https://652a10c855b137ddc83f476c.mockapi.io/users/${id}`).then((res)=>
                setUser(res.data)
            ).catch(err=>console.log(err))
        }
        else {
            setUser({...initialState})
        }
  },[id])

  let registerUser=(e)=>{
    e.preventDefault()
    if(!id){
        axios.post("https://652a10c855b137ddc83f476c.mockapi.io/users",user).then(()=>{ 
        toast.success('user added')
        navigate('/admin/viewusers')
        }).catch((err)=>{
            toast.error(err)
        })
    }
    else{
        axios.put(`https://652a10c855b137ddc83f476c.mockapi.io/users/${id}`,user).then(()=>{ 
            toast.success('user updated')
            navigate('/admin/viewusers')
            }).catch((err)=>{
                toast.error(err)
            })
    }
  }
  return (
    <div>   
       
         <div className='row shadow p-2 mt-5'>
        <div className='col-8'>
        <h1>{id ? "Edit" : "Add"} User</h1>
          <form onSubmit={registerUser}>
            <div class="mb-3">
              <label for="" class="form-label">Username</label>
              <input type="text" name="username" id="" class="form-control" placeholder="" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">email</label>
              <input type="text" name="email" id="" class="form-control" placeholder="" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">password</label>
              <input type="password" name="password" id="" class="form-control" placeholder="" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Confirm password</label>
              <input type="password" name="cpassword" id="" class="form-control" placeholder="" value={user.cpassword} onChange={(e)=>setUser({...user,cpassword:e.target.value})}/>
           
            </div>
            <button type="submit" class="btn btn-primary">{id ?"Update User" : "Submit"}</button>
            <br/>
            
            </form>
        </div>

    </div>
    </div>
  )
}

export default AddUser
