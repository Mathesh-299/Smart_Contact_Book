import { useEffect, useState } from 'react';
import { FaChartBar, FaUsers } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No token");
                navigate("/login");
                return;
            }
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!isLoggedIn || !storedUser || storedUser.role !== 'admin') {
                navigate('/login');
            } else {
                setUser(storedUser);
            }

            try {
                setLoading(true);
                const userStored = await API.get('/user/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(userStored.data);

                const response = await API.get('/user/count', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCount(response.data.count);
                setLoading(false);
            } catch (error) {
                setError("Error fetching user data...");
                toast.error("Error fetching user data...");
                setCount(0);
                setUsers([]);
                setLoading(false);
            }
        };
        fetchData();
    }, [isLoggedIn, navigate]);

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center md:text-left">Admin Dashboard</h2>
                <div className="mb-4 md:mb-6 text-center md:text-left">
                    <p className="text-base md:text-lg font-semibold">
                        Registered Users: {loading ? <Skeleton width={100} /> : count}
                    </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-2 text-left text-gray-200 hover:bg-gray-600 rounded-md flex items-center gap-2 px-2"
                    >
                        <FaChartBar />
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/dashboard/users')}
                        className="w-full py-2 text-left text-gray-200 hover:bg-gray-600 rounded-md flex items-center gap-2 px-2"
                    >
                        <FaUsers />
                        All Users
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem("isLoggedIn");
                            localStorage.removeItem("user");
                            navigate('/login');
                        }}
                        className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold">Total Users</h3>
                        <p className="text-2xl sm:text-3xl font-semibold">
                            {loading ? <Skeleton width={100} /> : count}
                        </p>
                    </div>
                </div>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <Outlet context={{ user, users, setUsers }} />
            </div>
        </div>
    );
};

export default Dashboard;
