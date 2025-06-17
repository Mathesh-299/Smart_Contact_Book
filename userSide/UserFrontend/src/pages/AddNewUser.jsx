import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../api/api";

const AddNewUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const token = localStorage.getItem("token");
    const isLogged = localStorage.getItem("isLoggedIn");

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        if (!token || isLogged !== "true" || !user || user.role !== 'admin') {
            toast.warn("Admin only access");
            nav('/login');
        }
    }, [token, isLogged, nav]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.phoneNumber || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await API.post("/user/register", formData);

            if (res.status === 200) {
                toast.warn("Check user email!");
                setFormData({ username: "", email: "", phoneNumber: "", password: "" });
                setTimeout(() => {
                    nav("/verify-otp", { state: { email: formData.email } });
                }, 1000);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error registering user");
        }
    };

    return (
        <div className="w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center">
            <div className="w-fit h-20 bg-blue-400 text-center px-5 py-5 shadow-md mt-4 rounded-md">
                <h1 className="text-4xl font-bold text-white tracking-wide">Admin - Add New User</h1>
            </div>

            <div className="bg-blue-200 shadow-2xl w-[90%] sm:w-[400px] mt-7 rounded-xl p-6 relative transition-all duration-300 ease-in-out">
                <button
                    onClick={() => nav("/dashboard")}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
                    title="Back to Dashboard"
                >
                    <FaTimes size={20} />
                </button>

                <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
                    
                    <div className="flex flex-col mb-2">
                        <label className="font-semibold text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="font-semibold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col relative mb-2">
                        <label className="font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="bg-gray-100 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-600 hover:text-gray-900"
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-200 hover:bg-blue-600 text-blue-600 hover:text-white w-30 py-2.5 rounded-md font-bold hover:font-bold transition-all mt-2"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewUser;
