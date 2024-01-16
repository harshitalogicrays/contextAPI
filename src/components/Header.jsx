import React, { useContext, useEffect, useState } from 'react'
import {FaArrowAltCircleLeft, FaHome, FaPenNib, FaShoppingBag, FaShoppingCart, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DataContext } from './DataProvider'
const Header = () => {
    const context=useContext(DataContext)
    const navigate=useNavigate()
    const [user,setUser]=useState({isLoggedIn:null,email:null,role:null})
    
    let logoutUser=()=>{
        localStorage.removeItem('login')
        navigate('/')
    }
    useEffect(()=>{
        if(localStorage.getItem('login')){
           let obj= JSON.parse(localStorage.getItem('login'))//{isLoggedIn:true,email:admin@gmail.com,role:admin}
           setUser({...obj})
        }
        else{
            setUser({isLoggedIn:null,email:null,role:null})
        }
    },[localStorage.getItem("login")])
  return (
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MyShop</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' aria-current="page">
                        <FaHome/> Home <span class="visually-hidden">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/products'><FaShoppingBag/> Products</Link>
                </li>
            </ul>
            <form class="d-flex my-2 my-lg-0">
                <div className='input-group'>
                <input class="form-control" type="text" placeholder="Search"/>
                <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
                </div>
            </form>
            
            <ul class="navbar-nav mt-2 mt-lg-0">
             

                {user.isLoggedIn==true ?
                    <>
                      <li class="nav-item">
                    <Link class="nav-link" to='/cart'><FaShoppingCart size={30}/>
                    <span class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>{context.cart.length}</span>
                    </Link>
                </li>
                    <li class="nav-item">
                        <a class="nav-link">Welcome {user.email.slice(0,-10)}</a>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" onClick={logoutUser}><FaArrowAltCircleLeft/> Logout</button>
                    </li>
                    </>
                    :
                    <>
                     <li class="nav-item">
                    <Link class="nav-link" to='/register'><FaPenNib/> Register</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/login'><FaUser/> Login</Link>
                    </li>
                    </>
                }
            </ul>
        </div>
    </div>
  </nav>
  
  )
}

export default Header
