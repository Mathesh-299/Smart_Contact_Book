import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

const ContactBook = () => {
    const [dataArray, setDataarray] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const formRef = useRef();

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, address } = contact;
        if (!name || !email || !phone || !address) {
            alert("Please fill all the fields");
            return;
        }

        if (isEditing) {
            // Update existing contact
            const updatedArray = [...dataArray];
            updatedArray[editingIndex] = contact;
            setDataarray(updatedArray);
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            // Add new contact
            setDataarray([...dataArray, contact]);
        }

        // Reset form and close
        setContact({ name: "", email: "", phone: "", address: "" });
        setFormVisible(false);
    };

    const handleEdit = (index) => {
        setContact(dataArray[index]);
        setIsEditing(true);
        setEditingIndex(index);
        setFormVisible(true);
    };

    return (
        <div className='w-screen min-h-[calc(100vh-5rem)] bg-gradient-to-l from-blue-200 to-blue-300 flex flex-col items-center pt-10'>
            <h1 className='text-3xl font-bold mb-6 text-blue-800'>Contact Book</h1>

            {/* Add Contact Button */}
            <button
                onClick={() => {
                    setFormVisible(true);
                    setIsEditing(false);
                }}
                className='mb-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'
            >
                Add Contact
            </button>

            {/* Form Section */}
            {formVisible && (
                <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md shadow-purple-600 relative">
                    <div className='w-full h-14 bg-purple-300 text-white flex justify-between items-center px-4 py-4 rounded-lg'>
                        <h2 className="text-2xl font-bold text-blue-700">{isEditing ? "Edit Contact" : "Add New Contact"}</h2>
                        <button onClick={() => setFormVisible(false)}>
                            <FontAwesomeIcon icon={faXmark} className='w-5 h-5 text-blue-600 hover:text-red-400 ' />
                        </button>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 pt-5">
                        <div className="space-y-2 mb-7">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={contact.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-hidden hover:bg-slate-200 hover:ring-3 hover:ring-teal-400 focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <div className="space-y-2 mb-7">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={contact.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-hidden hover:bg-slate-200 hover:ring-3 hover:ring-teal-400 focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <div className="space-y-2 mb-7">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={contact.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-hidden hover:bg-slate-200 hover:ring-3 hover:ring-teal-400 focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <div className="space-y-2 mb-7">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                value={contact.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-hidden hover:bg-slate-200 hover:ring-3 hover:ring-teal-400 focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-hidden focus:ring-2 focus:ring-green-500"
                        >
                            {isEditing ? "Save Changes" : "Save Contact"}
                        </button>
                    </form>
                </div>
            )}

            {/* Contact List */}
            <div className="w-full max-w-lg">
                {dataArray.map((data, index) => (
                    <div className='pt-5'>
                        <div key={index} className='w-full bg-white p-6 rounded-lg shadow-md mb-4'>
                            <div className='flex justify-between items-center'>
                                <p><strong>Name:</strong> {data.name}</p>
                                <p><strong>Email:</strong> {data.email}</p>
                                <p><strong>Phone:</strong> {data.phone}</p>
                                <p><strong>Address:</strong> {data.address}</p>
                            </div>

                            <div className='mt-4 flex justify-end'>
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-200 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        const updatedArray = dataArray.filter((_, i) => i !== index);
                                        setDataarray(updatedArray);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactBook;
