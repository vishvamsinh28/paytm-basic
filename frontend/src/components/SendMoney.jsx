import { useSearchParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"

export default function SendMoney(){
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const username = searchParams.get("username")
    const firstname = searchParams.get("firstname")
    const [amount, setAmount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            amount,
            to: username
        }
        const apiRoute = "http://localhost:3000/api/v1/account/transfer";
        await axios.post(apiRoute,data,{headers})

        navigate("/dashboard")
    }

    return (
        <div className="bg-white p-4 rounded-lg mt-16">
            <form className="flex flex-col">
                <label className="font-bold text-3xl text-center m-4" htmlFor="fn">Send Money to {firstname}</label>
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    name="firstname"
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="number"
                    id="fn"
                    placeholder="Enter amount"
                    value={amount}
                />

                <button onClick={handleSubmit} className="bg-black mt-6 p-2 rounded-md text-white">
                    Initiate Transfer
                </button>
            </form>
        </div>
    )
}