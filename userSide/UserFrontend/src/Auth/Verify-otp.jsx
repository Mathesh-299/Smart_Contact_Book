import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/api';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [timer]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.some(digit => digit === '')) {
            toast.error('Please enter all OTP digits');
            return;
        }

        setLoading(true);
        try {
            const response = await API.post('/user/verify-otp', {
                email,
                otp: otp.join('')
            });
            toast.success(response.data.message || 'OTP Verified!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.error || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;

        setLoading(true);
        try {
            const response = await API.post('/user/resend-otp', { email });
            toast.success(response.data.message || 'OTP resent successfully');
            setOtp(['', '', '', '', '', '']);
            setTimer(60);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 px-4">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">🔐 OTP Verification</h2>
                <p className="text-sm text-center text-gray-700 mb-6">
                    Enter the 6-digit OTP sent to <span className="text-blue-700 font-medium">{email}</span>
                </p>

                <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="flex justify-between gap-2 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleBackspace(e, index)}
                                maxLength="1"
                                inputMode="numeric"
                                className="w-12 h-14 text-center text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white/70 backdrop-blur-sm"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white rounded-lg font-semibold text-lg transition-all duration-300 ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleResendOtp}
                        disabled={timer > 0 || loading}
                        className={`text-sm font-semibold ${timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-700 hover:underline'}`}
                    >
                        {timer > 0 ? `Resend OTP in 0:${timer.toString().padStart(2, '0')}` : 'Resend OTP'}
                    </button>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default VerifyOtp;
