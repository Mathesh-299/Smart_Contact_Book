import { Github, Loader, LucideLink, Terminal } from 'lucide-react';
import { useState } from 'react';
import {
    FaEnvelope,
    FaPaperPlane,
    FaRegCommentDots,
    FaUser
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import API from '../api/api';
const ContactUs = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        user_name: "",
        user_email: "",
        message: ""
    })
    const id = JSON.parse(localStorage.getItem("user"));
    // console.log(id.userId)
    const [loading, setLoading] = useState(false);
    const sendEmail = async (e) => {
        e.preventDefault();
        if (!id || !id.userId) {
            toast.error("You need to login");
            return;
        }
        setLoading(true);
        const { user_email, user_name, message } = form;
        // if (!user_email || !user_name || !message) {
        //     toast.warn("Please fill all the fields");
        //     return;
        // }
        try {
            const response = await API.post(`/query/addQuery/${id.userId}`, form);
            // console.log(response)
            if (response.status === 200 || response.status === 201) {
                toast.success("Query Successfully Posted");
                navigate("/");
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        } finally {
            console.log(form);
            setForm({
                user_name: "",
                user_email: "",
                message: ""
            })
            setLoading(false);
        }
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
                <div className="w-full max-w-xl bg-white/20 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/30">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 drop-shadow-lg">
                            📬 Get In Touch
                        </h2>
                        <p className="text-black mt-2 text-sm sm:text-base">
                            We'd love to hear your questions, feedback or just a hello!
                        </p>
                    </div>
                    <form onSubmit={sendEmail} className="space-y-5 text-gray-800">
                        <div className="relative">
                            <FaUser className="absolute top-3.5 left-4 text-indigo-400" />
                            <input
                                id="user_name"
                                name="user_name"
                                type="text"
                                placeholder="Your Name"
                                value={form.user_name}
                                onChange={(e) => setForm({ ...form, user_name: e.target.value })}
                                // required
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
                                value={form.user_email}
                                onChange={(e) => setForm({ ...form, user_email: e.target.value })}
                                // required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div className="relative">
                            <FaRegCommentDots className="absolute top-3.5 left-4 text-indigo-400" />
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="Your Message"
                                // required
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        {
                            loading ? (
                                <span className='w-full animate-spin h-12 flex justify-center items-center'><Loader size={40} color='black'/></span>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 
                                    to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-transform hover:scale-105 shadow-lg"
                                >
                                    <FaPaperPlane className="text-lg" />
                                    Send Message
                                </button>
                            )
                        }
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
