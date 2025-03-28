import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signuppage() {
    const [adminName, setAdminName] = useState('');
    const [Email, setEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminPhone, setAdminPhone] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!adminPassword) {
            alert("Password is required!");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('adminName', adminName);
            formData.append('Email', Email);
            formData.append('adminPassword', adminPassword);  
            formData.append('adminPhone', adminPhone);
            formData.append('gender', gender);
            formData.append('image', image);
    
            console.log("FormData:", Object.fromEntries(formData)); 
    
            const response = await axios.post('http://localhost:2005/Register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
         
            console.log(response.data);
            if(response){
                navigate('/login');

            }
        } catch (error) {
            
            console.error('Error during registration:', error);
        }
    };
    const login = ()=>{
        navigate('/login')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form 
                onSubmit={handleSubmit} 
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                encType='multipart/form-data'
            >
                <h2 className="text-2xl font-bold text-white text-center mb-5">Admin Signup</h2>

                <input 
                    type="text" 
                    onChange={(e) => setAdminName(e.target.value)} 
                    placeholder="Name" 
                    name='adminName'
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required 
                />

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

                <input 
                    type="tel" 
                    name='adminPhone'
                    onChange={(e) => setAdminPhone(e.target.value)} 
                    placeholder="Phone Number" 
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required 
                />

                <select 
                    onChange={(e) => setGender(e.target.value)} 
                    name='gender'
                    className="w-full p-3 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input 
                    type="file" 
                    name='image'
                    onChange={(e) => setImage(e.target.files[0])} 
                    accept="image/*" 
                    className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    type="submit" 
                    className="w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 active:scale-95"
                >
                    Sign Up
                </button>
                <button
          onClick={login}
          className="w-full mt-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300 active:scale-95"
        >
          Already have an account?
        </button>
            </form>
        </div>
    );
}
