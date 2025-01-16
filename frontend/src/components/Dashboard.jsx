import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [userData, setUserData] = useState(null); // Initialize with null
    const [error, setError] = useState(null); // To handle any errors

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const apiRoute = "http://localhost:3000/api/v1/account/balance";
                const response = await axios.get(apiRoute, { headers });
                setUserData(response.data);
            } catch (err) {
                setError("Failed to fetch user data");
                console.error(err);
            }
        };

        getData();
    }, []);

    return (
        <div className="w-screen h-screen bg-white">
            <navbar className="flex justify-between p-4">
                <nav className="font-bold text-2xl">Payment App</nav>
                {/* conditional rendering to avoid blank screen when user refreshes quickly multiple times */}
                {userData ? (
                <h1 className="font-bold">
                    {userData.user.firstname} {userData.user.lastname}
                </h1>
            ) : (
                <div>Loading user info...</div>
            )}
            </navbar>
            <hr />
            <h1 className="font-bold text-lg m-4">
                {userData ? (
                    `Balance: ${userData.balance}`
                ) : (
                    <span>Loading balance...</span>
                )}
            </h1>


            {/* Error handling */}
            {error && <div className="text-red-500">{error}</div>}

            <div className="px-4">
                <input
                    type="text"
                    className="w-full outline-0 rounded-md border border-gray-300 px-4 py-2"
                    placeholder="Search User..."
                />
            </div>
        </div>
    );
}
