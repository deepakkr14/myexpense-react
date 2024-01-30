import "./App.css";
import { BrowserRouter, Routes, Route , useNavigate } from 'react-router-dom';
import {  lazy, Suspense } from "react";
import Singup from "./pages/singup";
import Hero from "./pages/Hero";
function App() {
  return (
    <BrowserRouter>
    
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/" element={<Singup />} />
       <Route path="/hero" element={<Hero />} />
           {/*   <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="/addMovie" element={<MovieAddForm />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/products/:name" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
   
  );
}

export default App;
