import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Importing moon and sun icons
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
        <div className={`min-h-screen w-full transition-colors duration-500 ease-in-out ${isDark ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-300 to-indigo-700'} flex flex-col items-center text-white p-8`}>

            {/* Dark/Light Mode Toggle */}
            <div className="w-full flex justify-end mb-4">
                <button
                    onClick={toggleMode}
                    className="p-3 rounded-full bg-purple-700 hover:bg-purple-800 transition text-sm font-medium shadow-md"
                >
                    {isDark ? (
                        <FaSun className="text-yellow-400 text-2xl" /> // Sun icon for light mode
                    ) : (
                        <FaMoon className="text-gray-100 text-2xl" /> // Moon icon for dark mode
                    )}
                </button>
            </div>

            {/* Title Section */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-purple-800 dark:text-purple-400">About Smart Contact Book</h1>
                <p className="text-xl mt-4 text-gray-100 dark:text-gray-300">Your simple and easy way to manage contacts effortlessly.</p>
            </div>

            {/* Info Section */}
            <div className="max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-semibold text-purple-600 dark:text-purple-400">What We Do</h2>
                <p className="text-lg mt-4 text-gray-200 dark:text-gray-300">
                    Smart Contact Book is a user-friendly application that helps you organize and manage all your personal or professional contacts.
                    You can easily add, view, edit, and delete contacts with a clean and modern interface. Our goal is to make your contact management
                    as seamless and simple as possible.
                </p>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center w-full max-w-6xl">
                {[
                    {
                        title: '💾 Save Contacts',
                        desc: 'Store contact details securely with easy retrieval anytime.',
                    },
                    {
                        title: '🔍 Search Contacts',
                        desc: 'Find your contacts quickly and efficiently with a powerful search feature.',
                    },
                    {
                        title: '✂️ Delete Contacts',
                        desc: 'Easily delete outdated or unnecessary contacts in just a few clicks.',
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">{item.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-semibold text-purple-600 dark:text-purple-400">Get Started Today</h2>
                <p className="text-lg text-gray-200 dark:text-gray-300 mt-4 max-w-xl mx-auto">
                    Join thousands of users who are simplifying their contact management. Start using Smart Contact Book now!
                </p>
                <button
                    className="mt-6 px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg rounded-full font-semibold shadow-lg transition"
                    onClick={handleNavigate}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default About;
