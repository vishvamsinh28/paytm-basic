import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

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
        <h1 className="font-bold">{userData.user.firstname} {userData.user.lastname}</h1>
      </navbar>
      <hr></hr>
      <h1 className="font-bold text-lg m-4">Balance : {userData.balance}</h1>

      {/* using a wrapper div cuz content was overflowing */}
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
