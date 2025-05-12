import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [isEditing, setIsEditing] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [currentContactId, setCurrentContactId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchContacts = async () => {
            if (!token || !user?.userId) return;
            try {
                const res = await API.get(`/contact/getContact/${user.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContacts(res.data || []);
            } catch (error) {
                toast.error("Failed to fetch contacts");
            }
        };
        fetchContacts();
    }, []);

    const handleEdit = (contactId) => {
        const contact = contacts.find(c => c._id === contactId);
        if (contact) {
            setFormData({
                fullName: contact.fullName,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                location: contact.location
            });
            setCurrentContactId(contactId);
            setIsEditing(true);
            setIsOpen(true); // Open the form when editing
        }
    };

    const handleDelete = async (contactId) => {
        if (!token || !user?.userId) {
            navigate("/login");
            return toast.warn("Please login first...");
        }

        try {
            const response = await API.delete(`/contact/deleteContact/${contactId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response?.status === 200) {
                toast.success("Contact successfully deleted");
                // Optionally remove the contact from UI manually if not using fetchContacts
            } else {
                toast.error("Failed to delete contact");
            }
        } catch (error) {
            toast.error("Error while deleting contact");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token || !user?.userId) {
            navigate("/login");
            return toast.warn("Please login first...");
        }

        try {
            const url = isEditing ? `/contact/updateContact/${currentContactId}` : '/contact/addContact';
            const method = isEditing ? 'put' : 'post';

            const response = await API[method](url,
                { ...formData, userId: user.userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // only show toast if the status is 200 AND no other toasts were already triggered
            if (response?.status === 200) {
                setIsOpen(false);
                setFormData({ fullName: "", email: "", phoneNumber: "", location: "" });
                setIsEditing(false);
                fetchContacts();
                toast.success(isEditing ? "Contact successfully updated" : "Contact successfully added");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            // avoid double toast by checking if error already has a toast
            if (!error?.toastShown) {
                toast.error("Error while saving contact");
            }
        }
    };


    return (
        <div className="relative h-screen overflow-x-hidden">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-cover bg-center filter blur-md z-0" style={{ backgroundImage: `url(${FORM})` }}></div>

            <section className="relative z-10 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-10">
                <button className='gap-2 w-60 h-16 mt-6 px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-blue-700 transform transition duration-300 ' onClick={() => { setIsOpen(true) }}>
                    <AddchartIcon className='text-3xl text-white' />
                    <span className='text-xl font-bold'>Add to Contact</span>
                </button>

                {contacts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                        {contacts.map((contact, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                                <div className="flex justify-center items-center mb-4">
                                    <span className="text-3xl text-purple-600">📇</span>
                                </div>
                                <h3 className="text-xl font-semibold text-center text-purple-600 mb-2">Contact {index + 1}</h3>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li><strong>Name:</strong> {contact.fullName}</li>
                                    <li><strong>Email:</strong> {contact.email}</li>
                                    <li><strong>Phone:</strong> {contact.phoneNumber}</li>
                                    <li><strong>Location:</strong> {contact.location}</li>
                                </ul>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleEdit(contact._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-all"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-base sm:text-lg mb-8 text-center mt-5">No contacts added yet.</p>
                )}
            </section>

            {isOpen && (
                <section className="relative z-10 flex justify-center items-center px-4 sm:px-0">
                    <form onSubmit={handleSubmit} className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white/40 flex flex-col px-6 py-8 rounded-lg backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl mb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Contact Form</h1>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-xl sm:text-2xl text-gray-700 hover:text-black transition-colors duration-200">
                                <FontAwesomeIcon icon={faWindowClose} />
                            </button>
                        </div>

                        {["fullName", "email", "phoneNumber", "location"].map((field, i) => (
                            <div key={i} className="mb-5">
                                <label htmlFor={field} className="block text-sm font-medium text-gray-600 mb-2">
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    id={field}
                                    type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                                    name={field}
                                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    className="w-full h-12 bg-white focus:outline-none focus:ring-2 focus:ring-black rounded-md px-3 text-lg transition duration-300 ease-in-out border border-gray-300 hover:border-gray-400"
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-32 h-12 bg-black text-white rounded-full font-semibold text-lg self-center hover:bg-gray-800 transition-colors duration-200"
                        >
                            {isEditing ? "Update" : "Submit"}
                        </button>
                    </form>
                </section>
            )}
        </div>
    );
};

export default Form;
