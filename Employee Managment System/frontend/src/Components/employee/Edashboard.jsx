import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Edashboard() {

  const [Data, setData] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("employeetoken");

    if (!token) {
      console.log("No token found, please login.");
      return;
    }

    axios.get('http://localhost:2005/employee/Profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        setData([response.data.data])
      })
      .catch((error) => {
        console.error("Error fetching manager:", error);
      });
  }, []);


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Empolyee Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Manage tasks</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-300 hover:text-white">Settings</a>
            </li>
          </ul>
        </nav>
        <div className="profile">
          {
            Data.map((e, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <label className="font-semibold text-lg">Name:</label>
                <p className="text-lg text-gray-700">{e.employeeName}</p>
                <label className="font-semibold text-lg">Email:</label>
                <p className="text-gray-500">{e.employeeEmail}</p>
                <label className="font-semibold text-lg">Password:</label>
                <p className="text-gray-500">.....</p>
                <img src={`http://localhost:2005/employee/${e.image}`} alt="Employee Profile" />
                <div className="actions flex gap-2 mt-1">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="red" d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m-5.477 2A6.47 6.47 0 0 0 11 17.5c0 1.644.61 3.146 1.617 4.29q-1.203.212-2.617.211c-2.89 0-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.844v-.907A2.25 2.25 0 0 1 4.254 14zm3.07.966l-.069.058l-.058.07a.5.5 0 0 0 0 .568l.058.07l1.77 1.769l-1.767 1.767l-.058.069a.5.5 0 0 0 0 .569l.058.069l.069.058a.5.5 0 0 0 .569 0l.069-.058l1.767-1.767l1.769 1.77l.069.057a.5.5 0 0 0 .569 0l.069-.058l.058-.07a.5.5 0 0 0 0-.568l-.058-.069l-1.77-1.77l1.773-1.768l.058-.07a.5.5 0 0 0 0-.568l-.058-.07l-.07-.057a.5.5 0 0 0-.568 0l-.07.057l-1.771 1.77l-1.77-1.77l-.069-.057a.5.5 0 0 0-.492-.044zM10 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></svg>
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 640 512"><path fill="#44c6f0" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9l1.2-11.1l7.9-7.9l77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5m45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8l137.9-137.9l-71.7-71.7zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8l-4.1 4.1l71.8 71.7l41.8-41.8c9.3-9.4 9.3-24.5 0-33.9" stroke="#44c6f0" /></svg>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
