import React, { useContext, useEffect } from 'react'
import { DataContext } from './DataProvider'
import { FaTrash } from 'react-icons/fa'

const Cart = () => {
  const context=useContext(DataContext)
  useEffect(()=>{     
        context.calculate_total()
  },[context.cart])
  return (
    <div className='container mt-5 shadow p-3'>
      <h1>Cart Page </h1> <hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Name</th>
              <th>Image</th>
              <th scope="col">Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {context.cart.length==0 && <tr><td colSpan={7}>No Item in Cart</td></tr>}
            {context.cart.map((c,i)=>
              <tr class="">
                <td scope="row">{i+1}</td>
                <td>{c.name}</td>
                <td><img src={c.imageURL} height='50px' width='50px' /></td>
                <td scope="row">{c.price}</td>
                <td>
                  <button onClick={()=>context.decrease(c)}>-</button>
                  <input type="text" style={{width:'40px',textAlign:'center'}} value={c.qty} readOnly/>
                  <button onClick={()=>context.increase(c)}>+</button>
                  </td>
                <td>{c.qty * c.price}</td>
                <td>
                  <button type="button" class="btn btn-danger" 
                  onClick={()=>context.removefromcart(i)}><FaTrash/></button>
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='row'>
        <div className='col-8'>
          <button type="button" class="btn btn-danger btn-lg" 
          onClick={()=>context.emptycart()}>Empty Cart</button>
        </div>
        <div className='col-4'>
              <div className="card">
                <h2>Total: <span class="float-end">${context.total}</span></h2><hr/>
                <button type="button" class="btn btn-warning">Checkout</button>
              </div>
        </div>
        </div>
    </div>
  )
}

export default Cart
