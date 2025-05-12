import { FaEdit, FaListAlt, FaLock, FaSearch, FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Reusable FeatureCard component
const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white shadow-lg hover:shadow-purple-300 hover:scale-105 p-6 rounded-2xl text-center transition-all duration-300">
        <div className="text-4xl text-purple-600 mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{desc}</p>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/addcontact');
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 font-sans">
            {/* Hero Section */}
            <section className="text-center bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-800 py-24 px-4 text-white">
                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md animate-fade-in">
                    📒 Smart Contact Book
                </h1>
                <p className="text-lg max-w-2xl mx-auto mb-6 opacity-90">
                    Manage your contacts effortlessly with speed, style, and security.
                </p>
                <button
                    onClick={handleClick}
                    className="mt-4 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full text-lg font-bold shadow-md transition"
                >
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <FeatureCard icon={<FaUserPlus />} title="Add Contacts" desc="Add new contacts with name, phone, and more." />
                <FeatureCard icon={<FaListAlt />} title="View Contacts" desc="See all your contacts in one clean list." />
                <FeatureCard icon={<FaTrashAlt />} title="Delete Contacts" desc="Remove contacts you no longer need." />
                <FeatureCard icon={<FaEdit />} title="Edit Contacts" desc="Update names, phone numbers, and notes." />
                <FeatureCard icon={<FaSearch />} title="Search & Filter" desc="Quickly find contacts using smart filters." />
                <FeatureCard icon={<FaLock />} title="Secure & Private" desc="All your contact data is encrypted and safe." />
            </section>

            {/* Testimonials Section */}
            <section className="text-center py-20 bg-white px-4">
                <h2 className="text-3xl font-bold text-purple-700 mb-4">Why Users Love Us ❤️</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Thousands trust Smart Contact Book to manage their personal and professional connections with ease and security.
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-purple-800 to-purple-700 text-white text-center py-6">
                <p className="text-sm">© 2025 Smart Contact Book. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
