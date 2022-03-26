import './App.css';
import { Routes, Route } from 'react-router-dom';

import {AllProducts,Auth,Home,MyCart,SingleProduct,Wishlist} from "./pages/index"

import {Footer,Navigation} from "./components/index"

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Auth" element={<Auth/>}/>
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
