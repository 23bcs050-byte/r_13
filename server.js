const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect SQLite Database
const db = new sqlite3.Database("./students.db");

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT
)
`);

// API to add student
app.post("/add-user", (req, res) => {
    const { name, phone } = req.body;

    const query = "INSERT INTO students (name, phone) VALUES (?, ?)";
    db.run(query, [name, phone], function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: "Student Added Successfully" });
        }
    });
});

// API to get students
app.get("/students", (req, res) => {
    db.all("SELECT * FROM students", [], (err, rows) => {
        if (err) res.status(500).send(err);
        else res.send(rows);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});