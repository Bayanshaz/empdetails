import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee({ fetchEmployees }) {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: "", email: "", status: "active" });

  const API_URL = "https://empserver-w58y.onrender.com";  

 
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/employees/${id}`);
        setEmployee(response.data);  
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/employees/${id}`, employee);  
      fetchEmployees(); 
      navigate("/");  
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          placeholder="Name"
          className="p-2 border border-gray-300"
          required
        />
        <input
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          placeholder="Email"
          className="p-2 border border-gray-300"
          required
        />
        <select
          value={employee.status}
          onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
          className="p-2 border border-gray-300"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-gray-300 text-black p-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;