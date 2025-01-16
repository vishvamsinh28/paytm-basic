import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [allUserData, setAll] = useState([]);
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

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
                console.error(err);
            }
        };

        const allData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const apiRoute = `http://localhost:3000/api/v1/user/bulk?filter=${search}`;
                const response = await axios.get(apiRoute, { headers });
                
                setAll(response.data.msg.filter(user => userData.user.username != user.username));
            } catch (err) {
                console.error(err);
            }
        };

        allData();
        getData();
    }, [userData]);

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


            <div className="px-4">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="w-full outline-0 rounded-md border border-gray-300 px-4 py-2"
                    placeholder="Search User..."
                    value={search}
                />
            </div>

            <div>
                {allUserData && allUserData.map((user) => {
                    return (
                        <div className="flex justify-between m-6" key={user._id}>
                            <h1 className="font-bold">{user.firstname} {user.lastname}</h1>
                            <button onClick={() => navigate("/send?username=" + user.username + "&firstname=" + user.firstname)} className="bg-black text-white p-2 rounded-md">Send Money</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
