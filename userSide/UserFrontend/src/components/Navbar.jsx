import { Menu, User2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Image from '../Assests/images/customer-service.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

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

        const handleStorageChange = () => {
            fetchUser();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [location]); // also refetch when route changes

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        setTimeout(() => {
            toast.success("Logged out successfully");
            fetchUser(); // force update state
            navigate('/login');
        },4500)

    };

    const routes = ['/', '/about', '/contact'];
    const labels = ['Home', 'About', 'Contact Us'];

    return (
        <nav className="w-full bg-gradient-to-r from-blue-500 to-blue-400">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center h-20">
                <Link to="/" className="flex items-center gap-3">
                    <img src={Image} width="40" alt="Logo" />
                    <h1 className="text-white text-2xl sm:text-3xl font-bold">Smart Contact Book</h1>
                </Link>

                <div className="hidden md:flex gap-6 items-center">
                    {routes.map((path, i) => (
                        <Link to={path} key={path}>
                            <button
                                className={`relative px-4 py-2 text-white font-bold border-2 rounded-md overflow-hidden group ${location.pathname === path ? 'border-white' : 'border-transparent'}`}
                            >
                                <span className="absolute inset-0 bg-gradient-to-l from-blue-600 to-blue-800 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">{labels[i]}</span>
                            </button>
                        </Link>
                    ))}

                    {isLoggedIn && user && (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/dashboard">
                                    <button className="px-8 py-4 text-white font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-hidden focus:ring-4 focus:ring-blue-400/50 transition-all duration-400 ease-in-out transform hover:brightness-110 hover:text-yellow-300">
                                        Dashboard
                                    </button>
                                </Link>
                            )}
                            <Link to="/profile">
                                <button className="px-8 py-4 text-white font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-hidden focus:ring-4 focus:ring-blue-400/50 transition-all duration-400 ease-in-out transform hover:brightness-110 hover:text-yellow-300">
                                    Profile
                                </button>
                            </Link>
                        </>
                    )}

                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                <div className="md:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-2">
                    {routes.map((path, i) => (
                        <Link to={path} key={path} onClick={() => setIsOpen(false)}>
                            <div className={`block py-2 font-semibold text-white ${location.pathname === path ? 'underline' : ''}`}>
                                {labels[i]}
                            </div>
                        </Link>
                    ))}

                    {isLoggedIn && user && (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                    <div className="py-2 font-semibold text-white">Dashboard</div>
                                </Link>
                            )}
                            <Link to="/profile" onClick={() => setIsOpen(false)}>
                                <div className="py-2 font-semibold text-white">Profile</div>
                            </Link>
                            <div className="py-2 font-semibold text-white flex items-center gap-2">
                                <User2 size={20} />
                                <span>{user.name}</span>
                            </div>
                        </>
                    )}

                    {isLoggedIn ? (
                        <div onClick={() => { setIsOpen(false); handleLogout(); }} className="py-2 font-semibold text-white cursor-pointer">
                            Logout
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <div className="py-2 font-semibold text-white">Login</div>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
