import React, { useContext } from 'react'
import { DataContext } from './DataProvider'

const ProductItem = ({product}) => {
  const context=useContext(DataContext)
  return (
    <div className='col-3'>
        <div class="card">
            <img class="card-img-top" src={product.imageURL} />
            <div class="card-body">
                <h4 class="card-title">{product.name}</h4>
                <p class="card-text">{product.category} ({product.brand})</p>
                <p>{product.price}</p>
                <button type="button" class="btn btn-danger" 
                onClick={()=>context.addtocart(product)}>Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
