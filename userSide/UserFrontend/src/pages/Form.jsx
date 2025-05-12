import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FORM from '../Assests/images/form.jpg';
import API from '../api/api';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        location: ""
    });
    const [contacts, setContacts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token || !user) {
            toast.warn("Please login first...");
            navigate("/login");
            return;
        }

        try {
            const response = await API.post('/contact/addContact',
                { ...formData, userId: user.userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                toast.success("Contact Successfully added");
                setIsOpen(false);
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    location: ""
                });
                fetchContacts(); // refresh contact list
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Error while saving contact");
        }
    };

    const formChange = () => {
        setIsOpen(true);
    };

    const fetchContacts = async () => {
        if (!token || !user) return;
        try {
            const res = await API.get(`/contact/getContact/${user.userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts(res.data);
        } catch (error) {
            toast.error("Failed to fetch contacts");
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-5rem)]">
            {/* Blurred Background Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md z-0"
                style={{ backgroundImage: `url(${FORM})` }}
            ></div>

            <section className="relative z-10 flex flex-col justify-start items-center py-10">
                {/* Add Contact Button */}
                <div className="h-20 w-fit bg-green-200 hover:bg-green-400 px-8 py-7 font-bold text-2xl rounded-full mb-6">
                    <button onClick={formChange}>Add to Contact</button>
                </div>

                {/* Contact List */}
                {contacts.length > 0 ? (
                    <div className="w-full max-w-4xl bg-white/70 p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-bold mb-4 text-center">Your Contacts</h2>
                        <ul className="space-y-4">
                            {contacts.map((contact, index) => (
                                <li key={index} className="p-4 bg-white rounded-md shadow-sm mb-5">
                                    <p><strong>Name:</strong> {contact.fullName}</p>
                                    <p><strong>Email:</strong> {contact.email}</p>
                                    <p><strong>Phone:</strong> {contact.phoneNumber}</p>
                                    <p><strong>Location:</strong> {contact.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-white text-lg mb-8">No contacts added yet.</p>
                )}
            </section>

            {/* Contact Form */}
            {isOpen && (
                <section className='relative z-10 flex justify-center items-center mt-4'>
                    <form onSubmit={handleSubmit} className='h-96 w-90 bg-white/40 flex flex-col justify-start px-4'>
                        <div className='pt-2 font-extrabold text-2xl mb-3 flex justify-between'>
                            <h1>Contact Form</h1>
                            <Link to='#' onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faWindowClose} />
                            </Link>
                        </div>
                        <div className='mb-4 pl-4'>
                            <input type='text' name='fullName' placeholder='Enter Full Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='w-full h-10 bg-white focus:border-2 focus:border-black rounded-md' required />
                        </div>
                        <div className='mb-4 pl-4'>
                            <input type='email' name='email' placeholder='Enter Email' value={formData.email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='w-full h-10 bg-white focus:border-2 focus:border-black rounded-md' required />
                        </div>
                        <div className='mb-4 pl-4'>
                            <input type='number' name='phoneNumber' placeholder='Enter Phone Number' value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='w-full h-10 bg-white focus:border-2 focus:border-black rounded-md' required />
                        </div>
                        <div className='mb-4 pl-4'>
                            <input type='text' name='location' placeholder='Enter Location' value={formData.location} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='w-full h-10 bg-white focus:border-2 focus:border-black rounded-md' required />
                        </div>
                        <div className='text-center w-32 h-12 bg-black text-white px-3 py-2 rounded-full font-bold text-xl'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
};

export default Form;
