import React from 'react'
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loginpage() {
    const [data, setData] = useState()
    const [email, setEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
        let response =  await axios.post("http://localhost:2005/Login", {
                Email: email,
                adminPassword: adminPassword
            }, {
                headers: { "Content-Type": "application/json" } 
            });

            console.log(response.data);
            setData(response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate('/mainpage');
            } else {
                alert("Login failed! Please check your credentials.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                encType='multipart/form-data'
            >
                <h2 className="text-2xl font-bold text-white text-center mb-5">Admin login</h2>



                <input
                    type="email"
                    name='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name='adminPassword'
                    onChange={(e) => setAdminPassword(e.target.value)}
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
