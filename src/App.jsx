import Home from './components/Home/Home/Home'
import Nav from './components/Nav'
import Signup from './components/Authentication/Signup/Signup'
import Login from './components/Authentication/Login/Login'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { Fragment } from 'react'
function App() {
 
  return (
    <Fragment>
   <BrowserRouter> 
   <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
   </Routes>
   </BrowserRouter>
   </Fragment>
  )
}

export default App
