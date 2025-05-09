import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import './Assests/css/index.css'
import Login from "./Auth/Login"
import Registration from "./Auth/Registration"
import VerifyOtp from "./Auth/Verify-otp"
import Dashboard from "./components/Dashboard"
import DashboardHome from "./components/DashboardHome"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import User from "./components/User"
import About from "./pages/About"
import Addcontact from "./pages/Addcontact"
import ContactUs from "./pages/ContactUs"
import Form from "./pages/Form"
import Home from "./pages/Home"

export default function App() {
    return (
        <>
            <Router>
                <div className="app-wrapper">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/addcontact" element={<Addcontact />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/verify-otp" element={<VerifyOtp />} />

                        {/* Dashboard route with nested user route */}
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<DashboardHome />} /> {/* default content */}
                            <Route path="users" element={<User />} />
                        </Route>

                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}
