import { useRef } from 'react';
import { FaEdit, FaEnvelope, FaPaperPlane, FaRegCommentDots, FaUser } from 'react-icons/fa';
import { FaGlobe, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        // Add actual email logic or integration with service like EmailJS
    };

    return (
        <div
            className="min-h-[calc(100vh-5rem)]w-full flex items-center justify-center px-6 py-6 bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1950&q=80')",
            }}
        >
            <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/30 transition-all duration-300">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">Get In Touch</h2>
                    <p className="text-purple-400 text-base">We’d love to hear your thoughts, questions, or feedback!</p>
                </div>

                {/* Form */}
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="relative mb-4">
                        <FaUser className="absolute top-3 left-4 text-indigo-100" />
                        <input
                            name="user_name"
                            type="text"
                            placeholder="Your Name"
                            required
                            className="pl-12 pr-4 py-3 w-full bg-white/80 text-gray-800 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    <div className="relative mb-4">
                        <FaEnvelope className="absolute top-3 left-4 text-indigo-100" />
                        <input
                            name="user_email"
                            type="email"
                            placeholder="Your Email"
                            required
                            className="pl-12 pr-4 py-3 w-full bg-white/80 text-gray-800 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    <div className="relative mb-4">
                        <FaEdit className="absolute top-3 left-4 text-indigo-100" />
                        <input
                            name="subject"
                            type="text"
                            placeholder="Subject"
                            className="pl-12 pr-4 py-3 w-full bg-white/80 text-gray-800 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    <div className="relative mb-4">
                        <FaRegCommentDots className="absolute top-3 left-4 text-indigo-100" />
                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Your Message"
                            required
                            className="pl-12 pr-4 py-3 w-full bg-white/80 text-gray-800 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-transform hover:scale-105 shadow-lg"
                    >
                        <FaPaperPlane className="text-lg" /> Send Message
                    </button>
                </form>

                {/* Social Icons */}
                <div className="flex justify-center mt-10 space-x-6 text-white text-2xl drop-shadow-md">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:text-pink-400 transition-all duration-300 mr-4" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="hover:text-black transition-all duration-300 mr-4" />
                    </a>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                        <FaGlobe className="hover:text-green-400 transition-all duration-300 mr-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
