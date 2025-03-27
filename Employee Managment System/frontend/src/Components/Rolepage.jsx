import React from "react";
import { useNavigate } from "react-router-dom";

export default function Rolepage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-center border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6">Choose Your Role</h2>
        
        <button 
          className="w-full py-3 mb-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-lg shadow-md"
          onClick={() => navigate("/signup")}
        >
          Admin
        </button>
        <button 
          className="w-full py-3 mb-3 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300 rounded-lg shadow-md"
          onClick={() => navigate("/MSignuppage")}
        >
          Manager
        </button>
        <button 
          className="w-full py-3 text-lg font-semibold text-white bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-lg shadow-md"
          onClick={() => navigate("/ESignuppage")}
        >
          Employee
        </button>
      </div>
    </div>
  );
}
