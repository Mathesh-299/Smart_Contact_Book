import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/api';
import Email from '../Assests/images/email.png';
import Password from '../Assests/images/eye.png';
import Phone from '../Assests/images/phone-call.png';
import Username from '../Assests/images/profile.png';
import Register from '../Assests/images/register.jpg';
import Image from '../Assests/images/registration.png';
import Arrow from '../Assests/images/right-arrow.png';
const Registration = () => {
    const navigate = useNavigate();
    const formRef = useRef();

    const [username, setUsername] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true); // State for phone validation
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // 🔄 Loading state

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowPassword1 = () => setShowPassword1((prev) => !prev);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmailValue(value);
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(pattern.test(value));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        const phonePattern = /^[0-9]{10}$/; // A basic phone number pattern (10 digits)
        setPhoneValid(phonePattern.test(value)); // Check if phone number matches the pattern
    };

    const checkPassword = (value) => {
        if (value.length < 8) return false;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasUpper && hasLower && hasDigit && hasSpecial;
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPasswordValue(value);
        setPasswordValid(checkPassword(value));
        setPasswordMatch(value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMatch(passwordValue === value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValid) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!phoneValid) {
            toast.error('Please enter a valid phone number (10 digits).');
            return;
        }
        if (!passwordValid) {
            toast.error('Password must include uppercase, lowercase, number, special character, and be at least 8 characters.');
            return;
        }
        if (!passwordMatch) {
            toast.error('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const result = await API.post('/user/register', {
                username,
                email: emailValue,
                phoneNumber,
                password: passwordValue,
            });

            // toast.success('Registration successful! Please verify your email.');
            toast('Registration successful! Please verify your email.');

            setTimeout(() => {
                navigate('/verify-otp', { state: { email: emailValue } });
            }, 1500);

            setTimeout(() => {
                formRef.current?.reset();
                setUsername('');
                setEmailValue('');
                setPhone('');
                setPasswordValue('');
                setConfirmPassword('');
                setEmailValid(true);
                setPhoneValid(true); // Reset phone validation state
                setPasswordValid(true);
                setPasswordMatch(true);
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            const errMsg = error.response?.data?.error || 'User name already exist';
            if (error.response?.status >= 400 && error.response?.status < 500) {
                toast.error(errMsg);
            } else {
                toast.error('Server error. Please try again later.');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-cover bg-center flex justify-center items-center px-4" style={{ backgroundImage: `url(${Register})`, width:'100vw'}}>
            <div className="w-full max-w-lg bg-white/60 shadow-2xl rounded-3xl p-8">
                <div className="text-center mb-6">
                    <img src={Image} alt="Logo" className="mx-auto w-12 h-12" />
                    <h1 className="text-3xl font-extrabold text-gray-800 mt-2">Create Your Account</h1>
                    <p className="text-gray-500 mt-1">Join us and start your journey</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div className="relative mb-5 hover:bg-white/20 rounded-xl">
                        <img src={Username} alt="Username Icon" className="absolute left-3 top-3 w-5 h-5 opacity-60" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative mb-5  hover:bg-white/20 rounded-xl">
                        <img src={Email} alt="Email Icon" className="absolute left-3 top-3 w-5 h-5 opacity-60" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailValue}
                            onChange={handleEmailChange}
                            required
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition"
                        />
                        {!emailValid && emailValue && (
                            <p className="text-red-500 text-xs mt-1">Invalid email address</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="relative mb-5 hover:bg-white/20 rounded-xl">
                        <img src={Phone} alt="Phone Icon" className="absolute left-3 top-3 w-5 h-5 opacity-60" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            required
                            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition"
                        />
                        {!phoneValid && phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">Phone number must be 10 digits.</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative flex items-center mb-5 hover:bg-white/20 rounded-xl">
                        <img src={Password} alt="Password Icon" className="absolute left-3 top-3 w-5 h-5 opacity-60" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={passwordValue}
                            onChange={handlePasswordChange}
                            required
                            className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <button
                            type="button"
                            onClick={handleClickShowPassword}
                            className="absolute right-3 top-2 text-gray-600"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative flex items-center mb-5 hover:bg-white/20 rounded-xl">
                        <img src={Password} alt="Confirm Password Icon" className="absolute left-3 top-3 w-5 h-5 opacity-60" />
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <button
                            type="button"
                            onClick={handleClickShowPassword1}
                            className="absolute right-3 top-2 text-gray-600"
                        >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </button>
                    </div>
                    {!passwordMatch && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition duration-200 flex justify-center items-center gap-2
                            ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-[1.02]'}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8A8 8 0 0 1 4 12z" />
                                </svg>
                                <span>Registering...</span>
                            </>
                        ) : (
                            <>
                                <span>Register</span>
                                <img src={Arrow} alt="Arrow Icon" className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500">Already have an account?
                            <Link to="/login" className="text-blue-500"> Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
