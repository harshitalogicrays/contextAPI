import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ViewUsers = () => { 
    let [users,setUsers]=useState([])
    let getdata=async()=>{
        try{
        let res= await axios.get("https://652a10c855b137ddc83f476c.mockapi.io/users")
        setUsers(res.data)
        }
        catch(err){toast.error(err)}
    }
    useEffect(()=>{
            getdata()
    },[])
    
    let deleteuser=(id)=>{
        if(window.confirm("are you sure you want to delete this user")){
            axios.delete(`https://652a10c855b137ddc83f476c.mockapi.io/users/${id}`).then(()=>{ 
                toast.success('user deleted')
                window.location.reload()
                }).catch((err)=>{
                    toast.error(err)
                })
        }
    }
  return (
    <div className='container mt-5 p-2'>
    <div className='card'>
        <div className='card-header'>
            <h1>View Users 
                <Link type="button" to='/admin/adduser' class="btn btn-primary float-end">Add User</Link></h1>
        </div>
        <div className='card-body'>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">USername</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length==0 && <tr><td colSpan={4}>No user found</td></tr>}
                        {users.map((user)=>
                            <tr key={user.id}>
                                <td scope="row">{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link type="button" to={`/admin/edituser/${user.id}`} class="btn btn-success me-2"><FaPenAlt/></Link>
                                    <button type="button" class="btn btn-danger" 
                                    onClick={()=>deleteuser(user.id)}><FaTrashAlt/></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default ViewUsers
