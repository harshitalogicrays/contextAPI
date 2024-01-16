import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'

const Products = () => {
  let [products,setProducts]=useState([])
  useEffect(()=>{
    fetch("https://652a10c855b137ddc83f476c.mockapi.io/products")
    .then((res)=>{
      return res.json().then((result)=>{setProducts(result)})
    })
    .catch((err)=>toast.error(err))
  },[])
  return (
    <div className='container mt-5'>
        <ProductList products={products}/>
    </div>
  )
}

export default Products
