import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MSignuppage() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [managerId, setManagerId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("mtoken");

    if (!token) {
      console.log("No token found, please login.");
      return;
    }

    axios
      .get("http://localhost:2005/manager/Profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Manager Data:", response.data);
        setManagerId(response.data._id); // Store manager ID
      })
      .catch((error) => {
        console.error("Error fetching manager:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("mtoken");

    if (!employeePassword) {
      alert("Password is required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("employeeName", employeeName);
      formData.append("employeeEmail", employeeEmail);
      formData.append("employeePassword", employeePassword);
      formData.append("employeePhone", employeePhone);
      formData.append("gender", gender);
      formData.append("image", image);
      formData.append("managerId", managerId); 

      let response = await axios.post("http://localhost:2005/employee/Register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        navigate("/eloginpage");
      }
      console.log("Employee registered:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const elogin = () => {
    navigate("/eloginpage");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-5">Employee Signup</h2>

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            onChange={(e) => setEmployeeEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            onChange={(e) => setEmployeePassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="tel"
            onChange={(e) => setEmployeePhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>

     
        <input type="hidden" value={managerId} />

        <button
          type="submit"
          className="w-full mt-4 p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-300 active:scale-95"
        >
          Sign Up
        </button>

        <button
          onClick={elogin}
          className="w-full mt-2 p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300 active:scale-95"
        >
          Already have an account?
        </button>
      </form>
    </div>
  );
}
