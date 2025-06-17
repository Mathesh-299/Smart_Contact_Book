import AddchartIcon from '@mui/icons-material/Addchart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // fix: useRouter was incorrectly imported
import { toast } from 'react-toastify';

const Addcontact = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleForm = () => {
        navigate('/form');
    };

    useEffect(() => {
        const fetchData = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const isUser = JSON.parse(localStorage.getItem('user'));

            if (isLoggedIn && isUser?.role === 'user') {
                setUser(isUser);
            } else {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                toast.success('Logged out successfully');
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 flex items-center justify-center px-4">
            <section className="bg-white bg-opacity-90 shadow-2xl p-10 rounded-3xl text-center max-w-2xl w-full animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6">
                    📒 Start building your Smart Contact List today
                </h2>
                <p className="text-gray-600 mb-6">
                    Organize your life — add your contacts and never lose touch again.
                </p>

                <button
                    onClick={handleForm}
                    className="flex items-center justify-center gap-3 w-full sm:w-60 h-14 mx-auto px-6 py-3 rounded-full bg-green-500 hover:bg-blue-700 text-white text-lg font-semibold shadow-md transition-all duration-300"
                >
                    <AddchartIcon className="text-2xl" />
                    Add to Contact
                </button>
            </section>
        </div>
    );
};

export default Addcontact;
