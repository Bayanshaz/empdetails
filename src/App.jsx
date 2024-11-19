import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");

  const API_URL = "https://empserver-w58y.onrender.com"; // Use the deployed server URL

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data); // Update the employees state with the fetched data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Add a new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = { name, email, status };
    try {
      await axios.post(`${API_URL}/employees`, newEmployee);
      setName("");
      setEmail("");
      setStatus("active");
      fetchEmployees(); // Refresh the employee list after adding
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete an employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/employees/${id}`);
      fetchEmployees(); // Refresh the employee list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <Router>
      <div className="bg-gray-800 min-h-screen p-6">  
        <div className="max-w-7xl mx-auto bg-black shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-center text-red-800 mb-8">Employee Details</h1>

          {/* Add Employee Form */}
          <div className="mb-8  p-6 rounded-lg shadow-md">
            <form onSubmit={handleAddEmployee} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className='text-green-600' value="active">Active</option>
                <option className='text-red-600' value="inactive">Inactive</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors col-span-1 sm:col-span-1 lg:col-span-1 text-lg font-medium"
              >
                Add Employee
              </button>
            </form>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto mt-8 bg-gray-50 rounded-lg shadow-md">
            <table className="table-auto w-full border-collapse bg-white">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 text-white-700">{index + 1}</td>
                    <td className="px-6 py-4 text-white-700">{employee.name}</td>
                    <td className="px-6 py-4 text-white-700">{employee.email}</td>
                    <td className="px-6 py-4 text-white-700">{employee.status}</td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <Link
                        to={`/edit/${employee.id}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Routes */}
          <Routes>
            <Route
              path="/edit/:id"
              element={<EditEmployee fetchEmployees={fetchEmployees} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
