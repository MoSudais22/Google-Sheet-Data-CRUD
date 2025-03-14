import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    experience: "",
    hireDate: "",
    active: "TRUE", // Default to "TRUE"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/data");
    setData(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = async () => {
    await axios.post("http://localhost:5000/add", form);
    fetchData();
  };

  const deleteEntry = async (rowIndex) => {
    await axios.delete("http://localhost:5000/delete", { data: { row: rowIndex } });
    fetchData();
  };

  return (
    <div className="container">
      <h1>Google Sheets CRUD</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Hire Date</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>
                  {i === 6 ? (cell === "TRUE" ? "Active" : "Inactive") : cell} 
                  {/* ✅ Converts TRUE/FALSE to Active/Inactive */}
                </td>
              ))}
              <td>
                <button onClick={() => deleteEntry(index + 2)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Entry</h2>
      <input type="text" name="id" placeholder="ID" onChange={handleChange} />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="role" placeholder="Role" onChange={handleChange} />
      <input type="number" name="experience" placeholder="Experience" onChange={handleChange} />
      <input type="date" name="hireDate" onChange={handleChange} />
      <select name="active" onChange={handleChange}>
        <option value="TRUE">Active</option>
        <option value="FALSE">Inactive</option>
      </select>
      <button onClick={addEntry}>Add</button>
    </div>
  );
}

export default App;
