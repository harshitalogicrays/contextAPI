import React, { Component } from 'react'
import { toast } from 'react-toastify'
 //create context 
 export const DataContext=React.createContext()
export default class DataProvider extends Component {
    constructor(props) {
      super(props)  
      this.state = { cart:[],total:0 }    }
      addtocart=(product)=>{
        if(localStorage.getItem("login") != null){
          let {cart}=this.state
          let itemIndex=cart.findIndex((item)=>item.id==product.id)
          if(itemIndex == -1){
              // cart.push({...product,qty:1})
              this.setState({cart: [...this.state.cart,{...product,qty:1}]})
              toast.success(`${product.name} added to cart`)
          }
          else {
             toast.info(`${product.name} already added to cart`)
          }
        }
        else{
          toast.error("please login first")       
        }
        
        window.scrollTo(0,0)
        }
      increase=(product)=>{
        let {cart}=this.state
        let itemIndex=cart.findIndex((item)=>item.id==product.id)
        if(cart[itemIndex].qty < product.stock)
            cart[itemIndex].qty+=1
        else 
            toast.info(`${product.name} only ${product.stock} qty available `)
        this.setState({cart:cart})
        this.calculate_total()
      }
      decrease=(product)=>{
        let {cart}=this.state
        let itemIndex=cart.findIndex((item)=>item.id==product.id)
        if(cart[itemIndex].qty > 1)
            cart[itemIndex].qty-=1
        else 
           cart[itemIndex].qty=1
        this.setState({cart:cart})
        this.calculate_total()
      }
      removefromcart=(index)=>{
        let {cart}=this.state 
        cart.splice(index,1)
        this.setState({cart:cart})
        this.calculate_total()
      }
      emptycart=()=>{
        this.setState({cart:[],total:0})
      }
      calculate_total=()=>{
        let {cart}=this.state 
       let cartTotal=cart.reduce((prev,item)=>{return prev+=(item.qty*item.price) },0)
       this.setState({total:cartTotal})
      }
      componentDidMount(){
          let dataCart=localStorage.getItem("dataCart")
          let dataTotal=localStorage.getItem("dataTotal")
          if(dataCart != null){
            this.setState({cart:JSON.parse(localStorage.getItem("dataCart"))})
          }
          if(dataTotal !=null){
            this.setState({total:localStorage.getItem("dataTotal")})
          }
      }

      componentDidUpdate(){
          localStorage.setItem("dataCart",JSON.stringify(this.state.cart))
          localStorage.setItem("dataTotal",this.state.total)
      }
  render() {
    let {cart,total}=this.state
    let {addtocart,decrease,increase,emptycart,removefromcart,calculate_total}=this
    return (
      <DataContext.Provider value={{cart,total,addtocart,decrease,increase,emptycart,removefromcart,calculate_total}}>
            {this.props.children}
      </DataContext.Provider>
    )
  }
}
