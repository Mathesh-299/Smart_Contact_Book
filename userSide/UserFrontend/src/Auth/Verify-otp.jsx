import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/api';

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for OTP digits
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Handle OTP input change
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only digits
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input if current one is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    // Handle OTP submission
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.some(digit => digit === '')) {
            setMessage('Please enter all OTP digits');
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        try {
            const response = await API.post('/user/verify-otp', { email, otp: otp.join('') });
            setMessage(response.data.message);
            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Verification failed');
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP functionality
    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const response = await API.post('/user/resend-otp', { email });
            setMessage(response.data.message);
            setIsSuccess(true);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to resend OTP');
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    // Handle Backspace key press to focus previous input
    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">OTP Verification</h2>
                <p className="text-sm text-gray-600 text-center mb-4">Enter the OTP sent to <span className="font-medium text-blue-600">{email}</span></p>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="flex justify-between space-x-2 mb-5">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleBackspace(e, index)}
                                maxLength="1"
                                aria-label={`OTP digit ${index + 1}`}
                                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white font-semibold transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? <span className="loader"></span> : 'Verify OTP'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-center text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-sm text-blue-600 hover:underline font-bold"
                    >
                        {loading ? 'Sending OTP...' : 'Resend OTP'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
