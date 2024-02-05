import "./App.css";
import { BrowserRouter, Routes, Route , useNavigate } from 'react-router-dom';
import {  lazy, Suspense } from "react";
import Singup from "./pages/singup";
import EmailVerification from "./pages/EmailVerification";
// import Hero from "./pages/Hero";
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Hero = lazy(() => import("./pages/Hero") );
// import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
    
      <Suspense fallback={<div className="loader"></div>}>
        <Routes>

          <Route path="/" element={<Singup />} />
       <Route path="/hero" element={<Hero />} />
       <Route path="/forget" element={<ForgotPassword />} />
       <Route path="/verify" element={<EmailVerification />} />
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
