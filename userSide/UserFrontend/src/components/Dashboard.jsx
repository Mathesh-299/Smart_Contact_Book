import { useEffect, useState } from 'react';
import { FaChartBar, FaQuoteRight, FaUser, FaUsers } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (!token || !isLoggedIn || !storedUser || storedUser.role !== 'admin') {
                toast.error('Unauthorized access');
                navigate('/login');
                return;
            }

            setUser(storedUser);
            setLoading(true);

            try {
                const [userRes, countRes] = await Promise.all([
                    API.get('/user/all', { headers: { Authorization: `Bearer ${token}` } }),
                    API.get('/user/count', { headers: { Authorization: `Bearer ${token}` } }),

                ]);
                
                setUsers(userRes.data);
                setCount(countRes.data.count);
            } catch (err) {
                console.error(err);
                toast.error('Error fetching user data');
                setError('Unable to load user data');
                setUsers([]);
                setCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const SidebarButton = ({ icon, text, path }) => (
        <button
            onClick={() => navigate(path)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-200 hover:bg-gray-600 transition"
        >
            {icon}
            <span>{text}</span>
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans">
            <aside className="w-full md:w-1/4 bg-gradient-to-b from-blue-500 to-blue-400 text-white p-6 space-y-6 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold text-center md:text-left mb-4">Admin Dashboard</h2>
                    <p className="font-medium text-center md:text-left">
                        Registered Users: {loading ? <Skeleton width={80} /> : count}
                    </p>
                </div>

                <nav className="space-y-4">
                    <SidebarButton icon={<FaChartBar />} text="Dashboard" path="/dashboard" />
                    <SidebarButton icon={<FaUsers />} text="All Users" path="/dashboard/users" />
                    <SidebarButton icon={<FaUser />} text="Add New User" path="/dashboard/addNewUser" />
                    <SidebarButton icon={<FaQuoteRight />} text="Queries" path="/dashboard/QueryUser" />
                </nav>

                <div className="pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="w-full md:w-3/4 p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {loading ? <Skeleton width={80} /> : count}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
                        {error}
                    </div>
                )}
                <Outlet context={{ user, users, setUsers }} />
            </main>
        </div>
    );
};

export default Dashboard;
