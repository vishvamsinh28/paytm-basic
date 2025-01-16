export default function Signup() {
    return (
        <div className="bg-white p-4 rounded-lg mt-16">
            <form className="flex flex-col">
                <h1 className="font-bold text-3xl text-center">Sign Up</h1>
                <h2 className="text-gray-500 mt-2">
                    Enter Your information to create an account
                </h2>

                <label className="my-4">First Name</label>
                <input
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                ></input>

                <label className="my-4">Last Name</label>
                <input
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                ></input>

                <label className="my-4">Username</label>
                <input
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="text"
                ></input>

                <label className="my-4">Password</label>
                <input
                    className="outline-0 border border-gray-300 p-2 rounded-md text-gray-500"
                    type="password"
                ></input>

                <button onClick={"some funcion"} className="bg-black mt-6 p-2 rounded-md text-white">
                    Sign Up
                </button>

                <div className="flex m-4">
                    <h3 className="text-center mx-2">Already have an account ?</h3>
                    <a href="/signin" className="underline">Login</a>
                </div>
            </form>
        </div>
    );
}
