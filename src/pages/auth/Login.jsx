import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import AuthServce from "../../api/service/auth";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    // const handleSubmit = async (e) => {
    //     e.preventDefault();  // stop reload immediately

    //     if (!email || !password) {
    //         setError("Please fill all fields");
    //         return;
    //     }

    //     try {
    //         const res = await AuthServce.adminLogin({ email, password });
    //         console.log("res", res);
    //         setError(""); // clear error if success
    //     } catch (err) {
    //         console.error("error", err);
    //         setError("Login failed, please try again");
    //     }
    // };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Submit stopped!");
            if (!email || !password) {
                setError("Please fill all fields");
                return;
            }

            try {
                const res = await AuthServce.adminLogin({ email, password });
                console.log("res", res);
                setError(""); // clear error if success
            } catch (err) {
                console.error("error", err);
                setError("Login failed, please try again");
            }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Grocery Online Admin
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center border rounded-md px-3 py-2">
                        <FaUser className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            className="w-full outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center border rounded-md px-3 py-2">
                        <FaLock className="text-gray-400 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-6">
                    © {new Date().getFullYear()} Grocery Online | Admin Panel
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
