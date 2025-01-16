import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstname:"",
        lastname:"",
        username:"",
        password:""
    })
    const [submitSuccess, setSubmitSuccess] = useState("")

    const handleSubmit = async (e) =>{        
        e.preventDefault();

        const apiRoute = "http://localhost:3000/api/v1/user/signup";
        await axios.post(apiRoute, data).then((value) => {
            setData({
                firstname:"",
                lastname:"",
                username:"",
                password:""
            })
            
            setSubmitSuccess(value.data.msg)
        })
    }

    return (
        <div className="bg-white p-4 rounded-lg mt-16">
            <form className="flex flex-col">
                <h1 className="font-bold text-3xl text-center">Sign Up</h1>
                <h2 className="text-gray-500 mt-2 text-center">
                    Enter Your information to create an account
                </h2>
                {submitSuccess && <h2 className="text-gray-500 mt-2 text-center font-bold">{submitSuccess}</h2>}
                <label className="my-4" htmlFor="fn">First Name</label>
                <input
                    onChange={(e) => setData({...data, firstname: e.target.value})}
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                    name="firstname"
                    id="fn"
                    value={data.firstname}
                ></input>

                <label className="my-4" htmlFor="ln">Last Name</label>
                <input
                    onChange={(e) => setData({...data, lastname: e.target.value})}
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                    name="lastname"
                    id="ln"
                    value={data.lastname}
                ></input>

                <label className="my-4" htmlFor="un">Username</label>
                <input
                    onChange={(e) => setData({...data, username: e.target.value})}
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                    name="username"
                    id="un"
                    value={data.username}
                ></input>

                <label className="my-4" htmlFor="pass">Password</label>
                <input
                    onChange={(e) => setData({...data, password: e.target.value})}
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="password"
                    name="password"
                    id="pass"
                    value={data.password}
                ></input>

                <button onClick={handleSubmit} className="bg-black mt-6 p-2 rounded-md text-white">
                    Sign Up
                </button>

                <div className="flex m-4">
                    <h3 className="text-center mx-2">Already have an account ?</h3>
                    <a onClick={() => navigate("/signin")} className="underline">Login</a>
                </div>
            </form>
        </div>
    );
}
