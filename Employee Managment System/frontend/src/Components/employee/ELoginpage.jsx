import React from 'react'
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Eloginpage() {
    const [data, setData] = useState()
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2005/employee/Login", {
                employeeEmail,
                employeePassword
            });

            console.log("Full Response:", response);
            console.log("Response Data:", response.data);
            console.log("Token Received:", response.data.token);

            if (response.data.token) {
                localStorage.setItem("employeetoken", response.data.token);
                console.log("Stored Token:", localStorage.getItem("employeetoken"));
                navigate('/edashboard');
            } else {
                console.error("Login failed! No token received.");
                alert("Login failed! Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("An error occurred during login. Please try again.");
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                method='post'
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                encType='multipart/form-data'
            >
                <h2 className="text-2xl font-bold text-white text-center mb-5">employee login</h2>
                <input
                    type="email"
                    name='employeeEmail'
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name='employeePassword'
                    onChange={(e) => setEmployeePassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />


                <button
                    type="submit"
                    className="w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 active:scale-95"
                >login

                </button>
            </form>
        </div>
    )
}
