import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());

app.listen(8800, () => {
    console.log("connected to backend...");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "GoodPassword",
    database: "fullstack-test",
});

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)";
    const values = [req.body.title, req.body.description, req.body.cover];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully.");
    });
});
