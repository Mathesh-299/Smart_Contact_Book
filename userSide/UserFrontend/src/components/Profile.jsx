import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css'; // import first
import { toast } from 'react-toastify'; // Make sure toast is correctly imported // Import the toast styles
import BG from '../Assests/images/contact.jpg'; // Ensure correct path for image
import API from '../api/api';
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: ''
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
                phoneNumber: userData.phoneNumber
            });
        }
    }, [navigate]);

    if (!user) return null;

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/login");
        toast('You have successfully logged out!');
    };

    const getInitials = (name) => {
        return name
            ? name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
            : 'U';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem("token");  // Assuming JWT token is stored in localStorage

            const response = await API.put(
                '/user/update',  // Your backend API URL
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Update localStorage with new user data
            localStorage.setItem("user", JSON.stringify(formData));
            setUser(formData);
            setIsEditing(false); // Disable editing mode after saving changes
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    return (
        <div
            className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${BG})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md w-full">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                        {getInitials(user.username)}
                    </div>
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-1">
                        {user.username || 'User'}
                    </h1>
                    <p className="text-sm text-gray-600">Profile Details</p>
                </div>

                {/* Profile Information or Edit Form */}
                <div className="text-left space-y-4 text-gray-700 text-lg">
                    {isEditing ? (
                        <>
                            <div>
                                <label className="block font-semibold text-blue-600">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-blue-600">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-blue-600">Phone:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div className="mt-4 flex justify-between gap-4">
                                <button
                                    className="w-1/2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                <button
                                    className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p><span className="font-semibold text-blue-600">📱 Phone:</span> {user.phoneNumber || 'N/A'}</p>
                            <p><span className="font-semibold text-blue-600">📧 Email:</span> {user.email || 'N/A'}</p>
                            <div className="mt-4 flex justify-between gap-4">
                                <button
                                    className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                                    onClick={() => navigate("/")}>
                                    Home
                                </button>
                                <button
                                    className="w-1/2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-200"
                                    onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-8 flex justify-between gap-4">
                    <button
                        className="w-1/2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Profile;
