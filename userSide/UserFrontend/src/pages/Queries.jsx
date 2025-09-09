import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import API from "../api/api";

const Queries = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState([]);
    const token = localStorage.getItem("token")
    useEffect(() => {
        fetchData();
    }, [token])
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await API.get("/query/getQuery", { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data.getQuery)
            console.log(response.data.getQueryCount)
            setQuery(response.data.getQuery)
            setCount(response.data.getQueryCount)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {
                query.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Query</h3>
                            <p className="text-3xl font-bold text-purple-600">
                                {loading ? <Skeleton width={80} /> : count}
                            </p>
                        </div>
                    </div>
                )
            }
            {query.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {query.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300"
                        >
                            <p className="text-lg font-bold text-gray-800">{item.user_name}</p>
                            <p className="text-sm text-gray-500">{item.user_email}</p>
                            <p className="text-sm text-gray-700 mt-2">{item.message}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-left ml-1 px-2 text-2xl font-medium font-serif">
                    No Query yet
                </p>
            )}

        </>
    )
}

export default Queries