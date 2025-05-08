import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router"
// import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"
import './Assests/css/index.css'
import Login from "./Auth/Login"
import Registration from "./Auth/Registration"
import VerifyOtp from "./Auth/Verify-otp"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import About from "./pages/About"
import Addcontact from "./pages/Addcontact"
import ContactUs from "./pages/ContactUs"
import Dashboard from "./pages/Dashboard"
import Form from "./pages/Form"
import Home from "./pages/Home"

export default function App() {
    return (
        <>
            <Router>
                <div className="app-wrapper">
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<ContactUs/>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/addcontact" element={<Addcontact/>}/>
                        <Route path="/form" element={<Form/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/verify-otp" element={<VerifyOtp/>}/>
                    </Routes>
                </div>
            </Router>
            {/* Toast Container */}
            <ToastContainer/>

        </>
    )
}