import AddchartIcon from '@mui/icons-material/Addchart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const Addcontact = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const handleForm = () => {
        navigate('/form');
    }
    useEffect(() => {
        const fetchData = () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            const isUser = JSON.parse(localStorage.getItem("user"));

            if (isLoggedIn) {
                // If the user is logged in, and if they are an admin, stay on the dashboard
                if (isUser && isUser.role === "user") {
                    setUser(isUser);
                    console.log(isUser.role);
                } else {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("user");
                    toast.success("Logged out successfully");
                    navigate("/login");
                }
            } else {
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);


    // const userValue = user?.role;
    // console.log(userValue)
    return (
        <>
            <div className=' w-screen min-h-[calc(100vh-5rem)]  bg-gradient-to-r from-blue-300 to-blue-100'>
                <section className='text-center flex flex-col justify-center items-center py-20'>
                    <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
                        📒 Start building Your Smart Contact List Today.
                    </h2>
                    <button className='gap-2 w-60 h-16 mt-6 px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-blue-700 transform transition duration-300 ' onClick={handleForm}>
                        <AddchartIcon className='text-3xl text-white' />
                        <span className='text-xl font-bold'>Add to Contact</span>
                    </button>
                </section>
            </div>
        </>
    )
}

export default Addcontact