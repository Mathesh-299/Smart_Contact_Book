import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'react-toastify';
import API from '../api/api';

const User = () => {
    const { users, setUsers } = useOutletContext();
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        _id: '',
        email: '',
        username: '',
        phoneNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    console.log(users);


    const handleDelete = async (id, userEmail) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const adminEmail = localStorage.getItem("email"); // ✅ Get the admin's email
            console.log(adminEmail)
            const res = await API.delete(`/user/delete/${id}`, {
                data: { email: userEmail }, // ✅ Send admin's email for validation
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("User successfully deleted");

            setTimeout(() => {
                window.location.reload(); // ✅ Refresh the page
            }, 1500);

        } catch (e) {
            console.log(e.response?.data || e.message);
            toast.error(
                e.response?.data?.message === "Admin can't delete themselves"
                    ? "Admin cannot delete their own account"
                    : "Something went wrong during deletion"
            );
        }
    };






    const handleEdit = (username, userId) => {
        const selectedUser = users.find(user => user._id === userId);
        if (selectedUser) {
            setFormData({ ...selectedUser });
            setIsEditing(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await API.put(`/user/edit/${formData._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("User updated successfully");
            const updatedUsers = users.map(u =>
                u._id === formData._id ? formData : u
            );
            setUsers(updatedUsers);
            setIsEditing(false);
        } catch (err) {
            if (err.response?.status === 403) {
                toast.error("Admin can't edit");
            } else {
                toast.error("Error editing user");
            }
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-md mb-6 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">All Registered Users</h3>
            <table className="min-w-full table-auto text-sm sm:text-base">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.phoneNumber}</td>
                            {/* <td>{user.role}</td> */}
                            <td className="px-4 py-2">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleEdit(user.username, user._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                        onClick={() => handleDelete(user._id, user.email)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-md sm:max-w-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border p-2 mb-4 rounded"
                            placeholder="Phone Number"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
