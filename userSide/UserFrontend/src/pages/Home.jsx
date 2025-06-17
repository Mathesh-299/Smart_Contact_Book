import { motion } from 'framer-motion';
import {
    FaEdit,
    FaListAlt,
    FaLock,
    FaSearch,
    FaTrashAlt,
    FaUserPlus,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Reusable FeatureCard with animation
const FeatureCard = ({ icon, title, desc, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white shadow-lg hover:shadow-purple-400 hover:scale-105 p-6 rounded-2xl text-center transition-all duration-300"
    >
        <div className="text-4xl text-purple-600 mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{desc}</p>
    </motion.div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/addcontact');
    };

    const features = [
        {
            icon: <FaUserPlus />,
            title: 'Add Contacts',
            desc: 'Add new contacts with name, phone, and more.',
        },
        {
            icon: <FaListAlt />,
            title: 'View Contacts',
            desc: 'See all your contacts in one clean list.',
        },
        {
            icon: <FaTrashAlt />,
            title: 'Delete Contacts',
            desc: 'Remove contacts you no longer need.',
        },
        {
            icon: <FaEdit />,
            title: 'Edit Contacts',
            desc: 'Update names, phone numbers, and notes.',
        },
        {
            icon: <FaSearch />,
            title: 'Search & Filter',
            desc: 'Quickly find contacts using smart filters.',
        },
        {
            icon: <FaLock />,
            title: 'Secure & Private',
            desc: 'All your contact data is encrypted and safe.',
        },
    ];

    return (
        <div className="min-h-screen w-full bg-gray-50 font-sans">
            <section className="text-center bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-800 py-24 px-4 text-white relative overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl font-extrabold mb-4 drop-shadow-lg"
                >
                    📒 Smart Contact Book
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg max-w-2xl mx-auto mb-6 opacity-90"
                >
                    Manage your contacts effortlessly with speed, style, and security.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-purple-900 rounded-full text-lg font-bold shadow-lg transition"
                >
                    Get Started
                </motion.button>
            </section>
            <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} delay={index * 0.1} />
                ))}
            </section>

            <section className="text-center py-20 bg-white px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-purple-700 mb-4"
                >
                    Why Users Love Us ❤️
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-xl mx-auto"
                >
                    Thousands trust Smart Contact Book to manage their personal and professional connections with ease and security.
                </motion.p>
            </section>

            <footer className="bg-gradient-to-r from-purple-800 to-purple-700 text-white text-center py-6">
                <p>© 2025 Mathesh. All rights reserved.</p>
                <p>Made with ❤️ in React & Tailwind CSS</p>
            </footer>
        </div>
    );
};

export default Home;
