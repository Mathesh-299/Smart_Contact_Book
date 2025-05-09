import { useNavigate } from 'react-router';

const About = () => {
    const navigate = useNavigate();
    const handleNavigate = () =>{
        navigate('/contact');
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-blue-200 to-indigo-400 flex flex-col justify-center items-center text-white p-8">
            {/* Title Section */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-purple-800">About Smart Contact Book</h1>
                <p className="text-xl mt-4 text-gray-100">Your simple and easy way to manage contacts effortlessly.</p>
            </div>

            {/* Information Section */}
            <div className="max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-semibold text-purple-600">What We Do</h2>
                <p className="text-lg mt-4 text-gray-200">
                    Smart Contact Book is a user-friendly application that helps you organize and manage all your personal or professional contacts.
                    You can easily add, view, edit, and delete contacts with a clean and modern interface. Our goal is to make your contact management
                    as seamless and simple as possible.
                </p>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-purple-600">💾 Save Contacts</h3>
                    <p className="text-gray-700 mt-2">Store contact details securely with easy retrieval anytime.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-purple-600">🔍 Search Contacts</h3>
                    <p className="text-gray-700 mt-2">Find your contacts quickly and efficiently with a powerful search feature.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-purple-600">✂️ Delete Contacts</h3>
                    <p className="text-gray-700 mt-2">Easily delete outdated or unnecessary contacts in just a few clicks.</p>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-semibold text-purple-600">Get Started Today</h2>
                <p className="text-lg text-gray-200 mt-4">Join thousands of users who are simplifying their contact management. Start using Smart Contact Book now!</p>
                <button className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-full text-lg font-semibold hover:bg-purple-800 transition"
                onClick={handleNavigate}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default About;
