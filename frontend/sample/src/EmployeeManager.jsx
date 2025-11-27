import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeManager() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
  });

  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch all employees
  const getAll = async () => {
    const res = await axios.get("http://localhost:8000/employees/all");
    setEmployees(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  // Form input
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Add employee
  const addEmployee = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/employees/add-emp", formData);
    alert("Employee Added!");
    setFormData({ name: "", email: "", phone: "", age: "", city: "" });
    getAll();
  };

  // Get employee by ID
  const getEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/employees/singleemp/${searchId}`);
      setSingleEmployee(res.data);
      setEditMode(false);
    } catch (err) {
      alert("Employee not found");
    }
  };

  // Update employee
  const updateEmployee = async () => {
    await axios.put(
      `http://localhost:8000/employees/updateemp/${singleEmployee._id}`,
      formData
    );
    alert("Employee Updated!");
    setEditMode(false);
    getAll();
    setSingleEmployee(null);
  };

  // Delete employee
  const deleteEmployee = async () => {
    await axios.delete(`http://localhost:8000/employees/deleteemp/${singleEmployee._id}`);
    alert("Employee Deleted!");
    setSingleEmployee(null);
    getAll();
  };

  return (
    <div style={{ width: "600px", margin: "auto", fontFamily: "Arial" }}>

      <h2>Add Employee</h2>
      <form onSubmit={addEmployee}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>

      <hr />

      {/* Search by ID */}
      <h2>Search Employee by ID</h2>
      <input
        placeholder="Enter ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={getEmployee}>Get Info</button>

      {singleEmployee && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Employee Details</h3>
          {!editMode ? (
            <>
              <p><b>Name:</b> {singleEmployee.name}</p>
              <p><b>Email:</b> {singleEmployee.email}</p>
              <p><b>Phone:</b> {singleEmployee.phone}</p>
              <p><b>Age:</b> {singleEmployee.age}</p>
              <p><b>City:</b> {singleEmployee.city}</p>

              <button onClick={() => {
                setEditMode(true);
                setFormData(singleEmployee);
              }}>
                Update
              </button>

              <button onClick={deleteEmployee} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </>
          ) : (
            <>
              <h4>Edit Employee</h4>
              <input name="name" value={formData.name} onChange={handleChange} />
              <input name="email" value={formData.email} onChange={handleChange} />
              <input name="phone" value={formData.phone} onChange={handleChange} />
              <input name="age" value={formData.age} onChange={handleChange} />
              <input name="city" value={formData.city} onChange={handleChange} />

              <button onClick={updateEmployee}>Save</button>
            </>
          )}
        </div>
      )}

      <hr />

      {/* Show all employees */}
      <h2>All Employees</h2>
      {employees.map((emp) => (
        <div key={emp._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "8px" }}>
          <p><b>{emp.name}</b> — {emp.city}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeManager;
