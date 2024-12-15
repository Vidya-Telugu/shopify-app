import Home from './components/Home/Home/Home'
import Signup from './components/Authentication/Signup/Signup'
import Login from './components/Authentication/Login/Login'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Product from './components/Display/Product/Product'
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import DisplayCategory from "../src/components/Display/Category/DisplayCategory"
import 'react-toastify/dist/ReactToastify.css';
import FilterContextProvider from './contexts/FilterContext';
import AuthContextProvider from './contexts/Authcontext.jsx';
import Nav from './components/Home/Nav/Nav';
import Order from "../src/components/Orders/orderspage/Order";
import ForgotPassword from './components/Authentication/ForgotPassword/ForgotPassword';
import Footer from './components/Home/Footer/Footer';
import CartContextProvider from './contexts/CartContext';
import CartDisplay from './components/Display/CartDisplay/CartDisplay';
import PersonalInfo from './components/Display/PersonalInfo/PersonalInfo'
import SearchedProducts from './components/Display/SearchedProducts/SearchedProducts.jsx'
function App(){
  return (
  <Fragment>
   <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop/>
   <AuthContextProvider>
   <FilterContextProvider>
    <CartContextProvider>
   <BrowserRouter>
   <Nav></Nav> 
   <Routes>
   <Route path="/" element={<Login></Login>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/home" element={<Home></Home>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
    <Route path="/product/:productName" element={<Product></Product>}></Route>
    <Route path="/cart" element={<CartDisplay></CartDisplay>}></Route>
    <Route path="/orderspage" element={<Order></Order>}></Route>
    <Route path="/info" element={<PersonalInfo></PersonalInfo>}></Route>
    <Route path="/search" element={<SearchedProducts></SearchedProducts>}></Route>
    <Route path='/category/:categoryName' element={<DisplayCategory></DisplayCategory>}></Route>
   </Routes>
   <Footer></Footer>
   </BrowserRouter>
   </CartContextProvider>
   </FilterContextProvider>
   </AuthContextProvider>
   </Fragment>
  )
}

export default App
