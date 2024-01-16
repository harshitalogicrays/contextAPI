import React from 'react'
import Login from '../Login'
import { FaUserCircle } from 'react-icons/fa'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {
  let obj=JSON.parse(localStorage.getItem("login"))
  return (
    <>
    {(obj.isloggedIn && obj.role=="admin")
    ?
    <div className='row'>
        <div className='col-2'>
        <ul class="nav nav-pills flex-column mb-5">
      <li class="nav-item">
        <a href="#" class="nav-link link-dark text-center">
              <h1 className='text-center'><FaUserCircle size={45}/></h1>
                Dashboard
        </a>
      </li>
      <li>
        <Link to='addproduct' class="nav-link link-dark text-center">
              Add Product
        </Link>
      </li>
      <li>
        <Link to='viewproducts' class="nav-link link-dark text-center">
              View Products
        </Link>
      </li>
      <li>
      <Link to='viewusers' class="nav-link link-dark text-center">
              View Users
        </Link>
      </li>
      <li>
        <a href="#" class="nav-link link-dark text-center">
            View Orders
        </a>
      </li>
    </ul>
        </div>
        <div className='col-10'>
          <Outlet/>
        </div>
    </div>
    :
    <Login/>
  }
    </>
  )
}

export default Admin
