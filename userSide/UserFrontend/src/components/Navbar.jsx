import { LogInIcon, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Image from '../Assests/images/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false); // Loading state for logout
    const location = useLocation();
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const toggleMenu = () => setIsOpen(!isOpen);

    const fetchUser = () => {
        if (isLoggedIn) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
        const handleStorageChange = () => fetchUser();
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [location]);

    const handleLogout = () => {
        setLoggingOut(true); // Set the logging out state
        setTimeout(() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            fetchUser();
            navigate('/login');
        }, 3000); // Wait 3 seconds before executing logout
    };

    const routes = ['/', '/about', '/contact'];
    const labels = ['Home', 'About', 'Contact Us'];

    return (
        <nav className="w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center h-20">
               
                <Link to="/" className="flex items-center gap-3">
                    <img src={Image} width="40" alt="Logo" />
                    <h1 className="text-white text-2xl sm:text-3xl font-bold font-mono tracking-wide">Smart Contact Book</h1>
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    {routes.map((path, i) => (
                        <Link to={path} key={path}>
                            <button
                                className={`relative px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/10 transition-all duration-300 ${location.pathname === path ? 'border-b-4 border-yellow-400' : ''
                                    }`}
                            >
                                {labels[i]}
                            </button>
                        </Link>
                    ))}

                    {isLoggedIn && user && (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/dashboard">
                                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:scale-105 hover:brightness-110 transition-all shadow-md">
                                        Dashboard
                                    </button>
                                </Link>
                            )}
                            <Link to="/profile">
                                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 hover:brightness-110 transition-all shadow-md">
                                    Profile
                                </button>
                            </Link>
                        </>
                    )}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className={`px-5 py-2 font-semibold rounded-lg transition ${loggingOut ? 'bg-red-400 text-white' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        >
                            {loggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    ) : (
                        <Link to="/login">
                            <button onMouseEnter={() => setShowMsg(true)}
                                onMouseLeave={() => setShowMsg(false)}
                                className="px-5 py-2 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                                <LogInIcon />
                                {showMsg && <p>Login</p>}
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle Icon */}
                <div className="md:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-indigo-700 px-6 pb-6 pt-2 space-y-3 text-white rounded-b-xl">
                    {routes.map((path, i) => (
                        <Link to={path} key={path} onClick={() => setIsOpen(false)}>
                            <div className={`block py-2 text-lg font-medium ${location.pathname === path ? 'underline' : ''}`}>
                                {labels[i]}
                            </div>
                        </Link>
                    ))}

                    {isLoggedIn && user && (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                    <div className="py-2 font-medium text-white">Dashboard</div>
                                </Link>
                            )}
                            <Link to="/profile" onClick={() => setIsOpen(false)}>
                                <div className="py-2 font-medium text-white">Profile</div>
                            </Link>
                            <div className="py-2 font-medium text-white flex items-center gap-2">
                                <span className="text-yellow-300">{user.name}</span>
                            </div>
                        </>
                    )}

                    {isLoggedIn ? (
                        <div
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="py-2 font-medium text-white cursor-pointer"
                        >
                            Logout
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <div className="py-2 font-medium text-white">Login</div>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;