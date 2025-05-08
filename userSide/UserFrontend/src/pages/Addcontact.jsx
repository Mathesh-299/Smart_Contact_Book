import AddchartIcon from '@mui/icons-material/Addchart';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
const Addcontact = () => {
    const navigate = useNavigate();

    const handleForm = () =>{
        navigate('/form');
    }
    useEffect(()=>{
        const isLoggedIn = localStorage.getItem("isLoggedIn")==="true";
        if(!isLoggedIn){
            navigate("/login");
        }
    },[navigate]);
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