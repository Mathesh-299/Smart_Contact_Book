import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/api';
import Email from '../Assests/images/email.png';
import Password from '../Assests/images/eye.png';
import Image from '../Assests/images/log-in.png';
import LoginPic from '../Assests/images/login.jpg';
import Arrow from '../Assests/images/right-arrow.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const token = localStorage.getItem("token");
        if (isLoggedIn && token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await API.post("/user/login", {
                email: emailValue.trim(),
                password: passwordValue.trim()
            });

            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login Successful! Redirecting...");
            formRef.current.reset();
            setEmailValue('');
            setPasswordValue('');
            setEmailValid(false);
            setPasswordValid(false);

            setTimeout(() => {
                // Optional: role-based redirection
                if (user.role === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Invalid email or password";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailValue(value);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const passwordCheck = (value) => {
        if (value.length < 8) return false;
        let upper = false, lower = false, digit = false, special = false;
        const specials = "!@#$%^&*()_+[]{}|;:',.<>?/`~\"\\-=";
        for (let ch of value) {
            if (ch >= 'A' && ch <= 'Z') upper = true;
            else if (ch >= 'a' && ch <= 'z') lower = true;
            else if (ch >= '0' && ch <= '9') digit = true;
            else if (specials.includes(ch)) special = true;
        }
        return upper && lower && digit && special;
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPasswordValue(value);
        setPasswordValid(passwordCheck(value));
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-cover bg-center flex justify-center items-center px-4" style={{ backgroundImage: `url(${LoginPic})`, width: '100vw' }}>
            <div className="w-full max-w-md bg-white/35 p-8 rounded-2xl shadow-2xl transition-transform hover:scale-[1.02] pt-3">
                <div className="flex items-center gap-3 mb-6">
                    <img src={Image} width="45" height="45" alt="Logo" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-purple-600">Login</h1>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className='mb-5'>
                        <label className="block text-xl font-medium text-black mb-1">Email</label>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                            <img src={Email} alt="email" width="20" height="20" className="mr-2 opacity-70" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={emailValue}
                                onChange={handleEmailChange}
                                className="w-full bg-transparent outline-none text-sm"
                                required
                            />
                        </div>
                        {!emailValid && emailValue && (
                            <p className="text-red-500 text-xs mt-1 pl-1 animate-pulse">Please enter a valid email address.</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className='mb-5'>
                        <label className="block text-xl font-medium text-black mb-1">Password</label>
                        <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                            <img src={Password} alt="password" width="20" height="20" className="mr-2 opacity-70" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={passwordValue}
                                onChange={handlePasswordChange}
                                className="w-full bg-transparent outline-none text-sm pr-10"
                                autoComplete="current-password"
                                required
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <IconButton onClick={handleClickShowPassword} size="small" aria-label="Toggle password visibility">
                                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                </IconButton>
                            </div>
                        </div>
                        {!passwordValid && passwordValue && (
                            <p className="text-red-500 text-xs mt-1 pl-1 animate-pulse">
                                Password must include uppercase, lowercase, number, and special character.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !emailValid || !passwordValid}
                        className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 pt-2 pb-3 mb-5
                            ${loading
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg'
                            }`}
                    >
                        {loading ? "Logging in..." : (
                            <>
                                <img src={Arrow} width="20" alt="arrow" className="animate-bounce" />
                                Login
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center text-sm font-bold w-full h-10 bg-white px-5 py-3 rounded-full">
                    <span className="text-black">Don’t have an account?</span>
                    <Link to="/register" className="text-blue-700 font-semibold ml-1 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
