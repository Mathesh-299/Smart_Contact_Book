import React from 'react';
import { useOutletContext } from 'react-router-dom';

const DashboardHome = () => {
    const { user, users } = useOutletContext();

    return (
        <>
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold">Admin Info</h2>
                <p>Name: {user?.username}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
            </div>
        </>
    );
};

export default DashboardHome;
