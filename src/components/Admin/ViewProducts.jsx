import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {FaPen, FaTrash} from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'
const ViewProducts = () => {
  let [products,setProducts]=useState([])
  useEffect(()=>{
   fetch("https://652a10c855b137ddc83f476c.mockapi.io/products")
   .then((res)=>{
     return res.json().then((result)=>{setProducts(result)})
   })
   .catch((err)=>toast.error(err))
  },[])
  let handleDelete=async(id)=>{
    if(window.confirm("are you sure to delete this??")){
      try{
      await axios.delete(`https://652a10c855b137ddc83f476c.mockapi.io/products/${id}`)
      toast.success("product deleted")
      window.location.reload()
      }
      catch(err){
        toast.error(err)
      }
  }
  }
  return (
    <div className='container mt-2 p-2 shadow'>
      <h1>All Products</h1><hr/>
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category</th>
            <th scope="col">brand</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {products.length==0 && <tr><td colSpan={8}>No Product Found</td></tr>}
        {products.map((product)=>
            <tr key={product.id}>
              <td scope="row">{product.id}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td scope="row">{product.name}</td>
              <td><img src={product.imageURL} height='50px' width='50px'/></td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Link type="button" class="btn btn-success me-2" 
                to={`/admin/edit/${product.id}`}><FaPen/> </Link>
                <button type="button" class="btn btn-danger" onClick={()=>handleDelete(product.id)}><FaTrash/></button>            
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    </div>
  )
}

export default ViewProducts
