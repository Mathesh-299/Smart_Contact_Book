import { Github, LucideLink, Terminal } from 'lucide-react';
import { useRef } from 'react';
import {
    FaEdit,
    FaEnvelope,
    FaPaperPlane,
    FaRegCommentDots,
    FaUser
} from 'react-icons/fa';

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        alert("Your message has been sent!");
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">

            <div
                className="flex-grow flex items-center justify-center px-4 py-12 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1950&q=80')",
                }}
            >
                <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/30">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                            📬 Get In Touch
                        </h2>
                        <p className="text-black mt-2 text-sm sm:text-base">
                            We'd love to hear your questions, feedback or just a hello!
                        </p>
                    </div>
                    <form ref={form} onSubmit={sendEmail} className="space-y-5 text-gray-800">
                        <div className="relative">
                            <FaUser className="absolute top-3.5 left-4 text-indigo-400" />
                            <input
                                id="user_name"
                                name="user_name"
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-4 text-indigo-400" />
                            <input
                                id="user_email"
                                name="user_email"
                                type="email"
                                placeholder="Your Email"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div className="relative">
                            <FaEdit className="absolute top-3.5 left-4 text-indigo-400" />
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                placeholder="Subject"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div className="relative">
                            <FaRegCommentDots className="absolute top-3.5 left-4 text-indigo-400" />
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-transform hover:scale-105 shadow-lg"
                        >
                            <FaPaperPlane className="text-lg" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <footer className="bg-purple-500 text-white">
                <div className="flex justify-center gap-6 py-4">
                    <a href="https://github.com/Mathesh-299" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <Github className="hover:text-white" />
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <LucideLink className="hover:text-white" />
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target="_blank" rel="noopener noreferrer" title="Leetcode">
                        <Terminal className="hover:text-white" />
                    </a>
                </div>
                <div className="text-center text-sm py-2 border-t border-gray-600">
                    <p>© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
