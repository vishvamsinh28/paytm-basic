import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiRoute = "http://localhost:3000/api/v1/user/login";

        const response = await axios.post(apiRoute, data);

        if (response.data.proceed) {
            localStorage.setItem("token", response.data.token)
            setData({
                username: "",
                password: "",
            });
            navigate("/dashboard");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg mt-16">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <h1 className="font-bold text-3xl text-center">Sign In</h1>
                <h2 className="text-gray-500 mt-2 text-center">
                    Enter Your information to login
                </h2>

                <label className="my-4" htmlFor="un">Username</label>
                <input
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    name="username"
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                    id="un"
                    value={data.username}
                />

                <label className="my-4" htmlFor="pass">Password</label>
                <input
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    name="password"
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="password"
                    id="pass"
                    value={data.password}
                />

                <button onClick={handleSubmit} className="bg-black mt-6 p-2 rounded-md text-white">
                    Login
                </button>


                <div className="flex m-4">
                    <h3 className="text-center mx-2">Don't have an account?</h3>
                    <a onClick={() => navigate("/signup")} className="underline">
                        Sign Up
                    </a>
                </div>
            </form>
        </div>
    );
}
