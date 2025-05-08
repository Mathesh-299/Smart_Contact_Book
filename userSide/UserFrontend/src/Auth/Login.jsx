import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Email from '../Assests/images/email.png';
import Password from '../Assests/images/eye.png';
import Image from '../Assests/images/log-in.png';
import Arrow from '../Assests/images/right-arrow.png';
import API from '../api/api';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            navigate('/profile');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setSuccessMessage('');

        if (!emailValid) return setLoginError("Enter a valid email.");
        if (!passwordValid) return setLoginError("Enter a valid password.");

        try {
            setLoading(true);
            const res = await API.post("/user/login", {
                email: emailValue,
                password: passwordValue
            });

            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));

            setSuccessMessage("✅ Login Successful! Redirecting...");
            formRef.current.reset();
            setEmailValue('');
            setPasswordValue('');
            setEmailValid(false);
            setPasswordValid(false);

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong.";
            setLoginError(errorMessage);
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
        <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-400 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl hover:shadow-purple-400 transform transition duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                    <img src={Image} width="45" height="45" alt="Logo" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-purple-600">Login</h1>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                            <img src={Email} alt="email" width="22" className="mr-2 opacity-70" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={emailValue}
                                onChange={handleEmailChange}
                                className="w-full bg-transparent outline-hidden text-sm"
                                required
                            />
                        </div>
                        {!emailValid && emailValue && (
                            <p className="text-red-500 text-xs mt-1 pl-1 animate-pulse">Please enter a valid email address.</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                            <img src={Password} alt="password" width="22" className="mr-2 opacity-70" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={passwordValue}
                                onChange={handlePasswordChange}
                                className="w-full bg-transparent outline-hidden text-sm pr-10"
                                autoComplete="current-password"
                                required
                            />
                            <IconButton
                                onClick={handleClickShowPassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                size="small"
                            >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </div>
                        {!passwordValid && passwordValue && (
                            <p className="text-red-500 text-xs mt-1 pl-1 animate-pulse">Password must include uppercase, lowercase, number, and special character.</p>
                        )}
                    </div>

                    {/* Error & Success Messages */}
                    {loginError && (
                        <p className="text-red-600 text-center text-sm font-semibold animate-shake">{loginError}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-600 text-center text-sm font-semibold animate-pulse">{successMessage}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
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
                <div className="pt-5 text-center text-sm font-medium">
                    <span className="text-gray-600">Don’t have an account?</span>
                    <Link to="/register" className="text-blue-700 font-semibold ml-1 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
