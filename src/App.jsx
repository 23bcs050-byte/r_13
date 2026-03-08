import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = () => {
    axios.post("http://localhost:5000/add-user", {
      name: name,
      phone: phone
    }).then(() => {
      fetchStudents();
      setName("");
      setPhone("");
    });
  };

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{textAlign:"center"}}>
      <h2>Student Admission</h2>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <h3>Student List</h3>

      <ul>
        {students.map((s)=>(
          <li key={s.id}>{s.name} - {s.phone}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;