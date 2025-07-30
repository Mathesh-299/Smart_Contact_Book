import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/api';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", phoneNumber: "", location: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [currentContactId, setCurrentContactId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const iconMap = {
        fullName: <FaUser className="text-indigo-500" />,
        email: <MdEmail className="text-indigo-500" />,
        phoneNumber: <FaPhone className="text-indigo-500" />,
        location: <FaMapMarkerAlt className="text-indigo-500" />,
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchContacts = async () => {
        if (!token || !user?.userId) return;
        setIsLoading(true);
        try {
            const res = await API.get(`/contact/getContact/${user.userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts(res.data || []);
        } catch {
            toast.error("Failed to fetch contacts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, []);

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
            setIsOpen(true);
        }
    };

    const handleDelete = async (contactId) => {
        if (!token || !user?.userId) return toast.warn("Please login first...");
        try {
            const res = await API.delete(`/contact/deleteContact/${contactId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res?.status === 200) {
                toast.success("Contact successfully deleted");
                fetchContacts();
            } else toast.error("Failed to delete contact");
        } catch {
            toast.error("Error while deleting contact");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!token || !user?.userId) return toast.warn("Please login first...");
        try {
            const url = isEditing ? `/contact/updateContact/${currentContactId}` : '/contact/addContact';
            const method = isEditing ? 'put' : 'post';
            const res = await API[method](url, { ...formData, userId: user.userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(isEditing ? "Contact updated successfully" : "Contact added successfully");
            setIsOpen(false);
            setFormData({ fullName: "", email: "", phoneNumber: "", location: "" });
            setIsEditing(false);
            fetchContacts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error while saving contact");
        } finally {
            setLoading(false);
        }
    };

    const filteredContacts = contacts.filter(c => {
        const q = searchQuery.toLowerCase();
        return (
            c.fullName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phoneNumber.includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-6">
            <h1 className="text-3xl font-bold text-indigo-800 mb-6">Smart Contact Book – Manage Your Contacts Efficiently</h1>
            <section className="flex flex-col items-center">
                <div className="flex justify-between w-full max-w-5xl items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-105 transition"
                    >
                        <AddchartIcon className="text-xl" />
                        <span className="font-medium">Add Contact</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="text-xl text-gray-700 hover:text-indigo-600"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        {searchOpen && (
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ml-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center mt-10">
                        <span className="text-2xl text-indigo-600">Loading...</span>
                    </div>
                ) : filteredContacts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-7xl mx-auto">
                        {filteredContacts.map((contact, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <h3 className="text-xl font-semibold text-indigo-700 text-center mb-4">Contact {i + 1}</h3>
                                <ul className="text-gray-800 text-sm space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="font-medium text-indigo-600">Name:</span> {contact.fullName}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="font-medium text-indigo-600">Email:</span> {contact.email}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="font-medium text-indigo-600">Phone:</span> {contact.phoneNumber}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="font-medium text-indigo-600">Location:</span> {contact.location}
                                    </li>
                                </ul>
                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={() => handleEdit(contact._id)}
                                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium shadow-md focus:outline-none">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-all text-sm font-medium shadow-md focus:outline-none">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10 text-lg text-gray-600 flex flex-col items-center justify-center">
                        <span className="material-icons-outlined text-4xl text-gray-400">error_outline</span>
                        <p>No contacts found.</p>
                    </div>
                )}
            </section>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%] bg-white rounded-2xl p-8 shadow-2xl animate-fade-in-up"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-indigo-700">{isEditing ? "Edit Contact" : "Add Contact"}</h2>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-600 text-2xl">
                                <FontAwesomeIcon icon={faWindowClose} />
                            </button>
                        </div>

                        {["fullName", "email", "phoneNumber", "location"].map((field, i) => (
                            <div key={i} className="mb-4">
                                <label htmlFor={field} className="block text-sm text-gray-600 mb-1 capitalize">
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                                    <span>{iconMap[field]}</span>
                                    <input
                                        type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                                        // id={field}/
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                                        className="w-full focus:outline-none bg-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                )}
                                {loading
                                    ? isEditing
                                        ? "Updating..."
                                        : "Adding..."
                                    : isEditing
                                        ? "Update Contact"
                                        : "Add Contact"}
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    );
};

export default Form;
