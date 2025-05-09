import { useNavigate } from 'react-router-dom';

// Reusable FeatureCard component
const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white shadow-xl p-6 rounded-xl text-center hover:scale-105 transition-transform">
        <div className="text-3xl mb-3">{icon}</div>
        <h2 className="text-xl font-bold text-purple-700 mb-2">{title}</h2>
        <p className="text-gray-600">{desc}</p>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/addcontact');
    };

    return (
        <div className="min-h-screen w-full bg-gray-100">
            {/* Header/Navbar */}

            {/* Hero Section */}
            <section className="text-center bg-gradient-to-r from-purple-700 to-indigo-600 py-20 text-white px-4">
                <h1 className="text-5xl font-extrabold mb-4">📒 Smart Contact Book</h1>
                <p className="text-xl max-w-2xl mx-auto">
                    Your all-in-one solution to manage personal and professional contacts effortlessly.
                </p>
                <button
                    onClick={handleClick}
                    className="mt-6 px-8 py-3 bg-yellow-400 text-purple-800 rounded-full text-lg font-bold hover:bg-yellow-500 transition"
                >
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <FeatureCard icon="➕" title="Add Contacts" desc="Add new contacts with name, phone, and more." />
                <FeatureCard icon="📋" title="View Contacts" desc="See all your contacts in one clean list." />
                <FeatureCard icon="🗑️" title="Delete Contacts" desc="Remove contacts you no longer need." />
                <FeatureCard icon="📝" title="Edit Contacts" desc="Update names, phone numbers, and notes." />
                <FeatureCard icon="🔍" title="Search & Filter" desc="Quickly find contacts using smart filters." />
                <FeatureCard icon="🔐" title="Secure & Private" desc="All your contact data is encrypted and safe." />
            </section>

            {/* Testimonials / Benefits Section */}
            <section className="text-center py-16 bg-white">
                <h2 className="text-3xl font-bold text-purple-700 mb-4">Why Users Love Us ❤️</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Thousands trust Smart Contact Book to manage their personal and professional connections with ease and security.
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-purple-700 text-white text-center py-6">
                <p>© 2025 Smart Contact Book. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
