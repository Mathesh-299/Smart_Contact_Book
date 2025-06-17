import { Github, LucideLink, Terminal } from 'lucide-react';
import { useState } from 'react';
import { FaArrowRight, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const About = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);

    const handleNavigate = () => {
        navigate('/contact');
    };

    const toggleMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <>
            <div
                className={`min-h-screen w-full transition-colors duration-500 ease-in-out ${isDark
                    ? 'bg-gray-900 text-white'
                    : 'bg-gradient-to-br from-blue-300 via-indigo-500 to-purple-700 text-white'
                    } flex flex-col items-center px-4 md:px-10 py-10`}
            >
                <div className="w-full flex justify-end mb-4">
                    <button
                        onClick={toggleMode}
                        className="p-3 rounded-full bg-purple-700 hover:bg-purple-800 transition duration-300 shadow-md"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <FaSun className="text-yellow-300 text-2xl" />
                        ) : (
                            <FaMoon className="text-white text-2xl" />
                        )}
                    </button>
                </div>

                <div className="text-center max-w-3xl mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 dark:text-purple-400 mb-3">
                        About Smart Contact Book
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 dark:text-gray-300">
                        Your simple and easy way to manage contacts effortlessly.
                    </p>
                </div>

                <div className="text-center max-w-4xl mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400">
                        What We Do
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-100 dark:text-gray-300">
                        Smart Contact Book helps you organize and manage personal or professional contacts.
                        Add, view, edit, or delete contacts in a sleek and user-friendly interface.
                        Our mission is to make contact management seamless and stress-free.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                    {[
                        {
                            title: '💾 Save Contacts',
                            desc: 'Securely store contact details with instant access.',
                        },
                        {
                            title: '🔍 Search Contacts',
                            desc: 'Quickly locate contacts using powerful search.',
                        },
                        {
                            title: '✂️ Delete Contacts',
                            desc: 'Remove outdated or unwanted contacts effortlessly.',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center max-w-2xl">
                    <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400">
                        Get Started Today
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-100 dark:text-gray-300">
                        Join thousands of users simplifying contact management with Smart Contact Book.
                    </p>
                    <button
                        onClick={handleNavigate}
                        className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg font-semibold rounded-full shadow-lg transition"
                    >
                        Get Started <FaArrowRight />
                    </button>
                </div>
            </div>
            <footer className="bg-purple-500 text-white">
                <div className="flex justify-center gap-6 py-4 ">
                    <a href="https://github.com/Mathesh-299" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <Github className="hover:text-purple-500" />

                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <LucideLink className="hover:text-purple-500" />
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target="_blank" rel="noopener noreferrer" title="Leetcode">
                        <Terminal className="hover:text-purple-500" />
                    </a>
                </div>
                <div className="text-center text-sm py-2 border-t border-gray-600">
                    <p>© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </>
    );
};

export default About;
