import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Products from './components/Products'
import Register from './components/Register'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/Admin/Admin'
import AddProduct from './components/Admin/AddProduct'
import ViewProducts from './components/Admin/ViewProducts'
import Cart from './components/Cart'
import AddUser from './components/Admin/AddUser'
import ViewUsers from './components/Admin/ViewUsers'
import DataProvider from './components/DataProvider'
  
function App() {
  return (
  <>
  <ToastContainer position="top-center" autoClose={2000}/>
  <DataProvider>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}>
            <Route path='addproduct' element={<AddProduct/>}/>
            <Route path='viewproducts' element={<ViewProducts/>}/>
            <Route path='edit/:proid' element={<AddProduct/>}/>
            <Route path='adduser' element={<AddUser/>}/>
            <Route path='viewusers' element={<ViewUsers/>}/>
            <Route path='edituser/:id' element={<AddUser/>}/>
        </Route>

        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes> 
  </DataProvider>
   </>
  )
}

export default App
