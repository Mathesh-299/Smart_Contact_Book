import React, { useEffect, useState } from 'react';
import { FaBirthdayCake, FaEnvelope, FaHome, FaPhone, FaSignOutAlt, FaTimes, FaTransgender, FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BG from '../Assests/images/contact.jpg';
import API from '../api/api';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        address: ''
    });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUser = localStorage.getItem("user");
        if (!isLoggedIn || !storedUser) {
            navigate("/login");
        } else {
            const userData = JSON.parse(storedUser);

            setUser(userData);
            setFormData({
                username: userData.username,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                gender: userData.gender || '',
                dob: userData.dob || '',
                address: userData.address || ''
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        toast.success("You have successfully logged out!");
        navigate("/login");
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await API.put('/user/update', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem("user", JSON.stringify(formData));
            setUser(formData);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Error updating profile");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${BG})` }}>
            <div className="absolute inset-0 bg-black/60 z-0" />

            <div className="relative z-10 bg-white rounded-3xl shadow-2xl backdrop-blur-lg max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">

                {/* Close Icon */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl z-20"
                    title="Close Profile"
                >
                    <FaTimes />
                </button>

                {/* Sidebar */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-28 h-28 rounded-full bg-white text-blue-800 flex items-center justify-center text-4xl font-bold mb-4 shadow-lg">
                        {getInitials(user.username)}
                    </div>
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-sm mt-1">Welcome back to your dashboard!</p>

                    <button
                        className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:w-2/3 p-8 bg-white">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Profile Information</h3>
                    <div className="space-y-4 text-gray-700">
                        {isEditing ? (
                            <>
                                {['username', 'email', 'phoneNumber', 'gender', 'dob', 'address'].map((field) => (
                                    <div key={field}>
                                        <label className="block font-medium capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
                                        <input
                                            type={field === 'dob' ? 'date' : 'text'}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-between gap-4 mt-6">
                                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md" onClick={handleSaveChanges}>
                                        Save Changes
                                    </button>
                                    <button className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3"><FaEnvelope className="text-blue-600" /><span>{user.email}</span></div>
                                <div className="flex items-center gap-3"><FaPhone className="text-green-600" /><span>{user.phoneNumber || 'N/A'}</span></div>
                                <div className="flex items-center gap-3"><FaTransgender className="text-purple-600" /><span>{user.gender || 'Not specified'}</span></div>
                                <div className="flex items-center gap-3"><FaBirthdayCake className="text-pink-500" /><span>{user.dob || 'N/A'}</span></div>
                                <div className="flex items-center gap-3"><FaHome className="text-yellow-600" /><span>{user.address || 'Not provided'}</span></div>

                                <div className="flex justify-between gap-4 mt-6">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md" onClick={() => navigate("/")}>
                                        <FaHome className="inline mr-1" /> Home
                                    </button>
                                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md" onClick={() => setIsEditing(true)}>
                                        <FaUserEdit className="inline mr-1" /> Edit Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
