import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/api';
const Forgot_Password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userFound, setUserFound] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);

    const handleSearch = async () => {
        if (!email) return toast.error("Enter a email first");
        try {
            console.log(email)
            setLoading(true);
            const res = await API.post("/user/findUserName", { email });
            console.log(res)
            if (res.status === 200) {
                toast.success("User found. You can now reset the password.");
                setUserFound(true);
            } else {
                toast.error("User not found.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error verifying user.");
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        if (!newPassword) return toast.error("Please enter a new password");

        try {
            setReset(true);
            const res = await API.post("/user/reset-password", {
                email,
                newPassword
            });
            console.log(res)
            if (res.status === 200) {
                toast.success("Password reset successfully!");
                setEmail('');
                setNewPassword('');
                setUserFound(false);
                navigate("/login")
            } else {
                toast.error("Failed to reset password");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setReset(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-blue-100 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2">Forgot Password</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Recover access to your account</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition placeholder:text-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {userFound && (
                    <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-gray-400"
                                placeholder="Enter new password"
                            />
                        </div>
                        <button
                            onClick={handleReset}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {reset ? "Resetting..." : "Reset Password"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Forgot_Password;
