import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const {proid}=useParams()
  let categories=["Men","Women","Kids","Grocery","Electronics"]
  let initialState={name:'',category:'',brand:'',price:0,stock:0,imageURL:'',desc:''}
  let [product,setProduct]=useState({...initialState})
  const navigate=useNavigate()
  let handleImage=(e)=>{
    console.log(e.target.files)
    setProduct({...product,imageURL:`/src/assets/images/${e.target.files[0].name}`})
  }

  useEffect(()=>{
    if(proid){
      axios.get(`https://652a10c855b137ddc83f476c.mockapi.io/products/${proid}`)
      .then(res=>{
        setProduct(res.data)
      }).catch((err)=>console.log(err))
    }
    else {
    setProduct({...initialState})
    }
  },[proid])

  let handleProduct=(e)=>{
    e.preventDefault()
    if(!proid){
        fetch("https://652a10c855b137ddc83f476c.mockapi.io/products",{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(product)
        }).then(()=>{
          toast.success("product added")
          navigate('/admin/viewproducts')
        }).catch((err)=>{toast.error(err)})
  }
  // else {
  //       fetch(`https://652a10c855b137ddc83f476c.mockapi.io/products/${proid}`,{
  //         method:'PUT',
  //         headers:{'content-type':'application/json'},
  //         body:JSON.stringify(product)
  //       }).then(()=>{
  //         toast.success("product updated")
  //         navigate('/admin/viewproducts')
  //       }).catch((err)=>{toast.error(err)})
  // }
  }
  return (
    <div className='container mt-2 shadow p-2'>
      <h1>Add Product</h1><hr></hr>
      <form onSubmit={handleProduct}>
        <div class="mb-3">
          <label for="" class="form-label">Categories</label>
          <select class="form-select" name="category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
            <option value=''>------choose one--------</option>
            {categories.map((c,i)=><option key={i}>{c}</option>)}
          </select>
        </div>
        <div class="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">Name</label>
          <input type="text" name="name" id="" class="form-control" placeholder=""  value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">Brand</label>
          <input type="text" name="brand" id="" class="form-control" placeholder=""  value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
        </div>
        </div>
        <div class="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">Price</label>
          <input type="number" name="price" id="" class="form-control" placeholder=""  value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">Stock</label>
          <input type="number" name="stock" id="" class="form-control" placeholder=""  value={product.stock} onChange={(e)=>setProduct({...product,stock:e.target.value})}/>
        </div>
        </div>
        <div class="mb-3">
          <label for="" class="form-label">Choose file</label>
          <input type="file" class="form-control" name="imageURL" id="" placeholder="" onChange={handleImage} />
        </div>
        {proid  && <img src={product.imageURL} height='50px' width='50px'/>}
        <div class="mb-3">
          <label for="" class="form-label">desc</label>
          <textarea class="form-control" name="desc" id="" rows="3"  value={product.desc} onChange={(e)=>setProduct({...product,desc:e.target.value})}>{product.desc}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
