import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {AllProducts,Login,SignUp,Home,MyCart,SingleProduct,Wishlist} from "./pages/index"

import {Footer,Navigation} from "./components/index"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/AllProducts" element={<AllProducts/>} />
        <Route path="/MyCart" element={<MyCart/>} />
        <Route path="/SingleProduct" element={<SingleProduct/>} />
        <Route path="/Wishlist" element={<Wishlist/>} />
      </Routes>
        <Footer/>
      
    </div>
  );
}

export default App;
