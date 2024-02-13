import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Singup from "./pages/singup";
import EmailVerification from "./pages/EmailVerification";
import { useSelector } from "react-redux";
// import Hero from "./pages/Hero";
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Hero = lazy(() => import("./pages/Hero"));
// import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const loginState = useSelector((state) => state.auth.IsloggedIn);
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loader"></div>}>
        <Routes>
          <Route path="/" element={<Singup />} />
          <Route
            path="/hero"
            element={loginState ? <Hero /> : <Navigate to="/" />}
          />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/verify" element={<EmailVerification />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
