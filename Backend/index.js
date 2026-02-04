import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 5000;
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//bcrypt salt rounds
const saltRaounds = 10;
//GET all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
 
});

//ADD user
app.post("/api/users", async (req, res) => {
  const {username, email, password} = req.body;
  
  console.log(req.body);
  const passwordHash = await bcrypt.hash(password, saltRaounds); // In a real application, hash the password before storing it
  try {
    const result = await pool.query("INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email", [username,email, passwordHash]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("User not created", error.message);
    res.status(500).json({error: "User not created"});
  }
});

// UPDATE user
app.put("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;
  
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "username and email are required" });
  }
try {
  const result = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email", [username,  email, userId]);
  if (result.rowCount === 0) {
    return res.status(404).json({ message: `User not found with id ${userId}` });
  }
  console.log(result.rowCount);
  res.status(200).json(result.rows[0]);
} catch (error) {
  console.error("Update user error: ", error.message);
  res.status(500).json({message : `Interval server error while updating user By ${userId}`})
}
});

//Delete User
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
     await pool.query("DELETE FROM users WHERE id = $1", [id]);
     res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User not found", error.message);
    res.status(500).json({ error: "User not found" });
  }
});

app.listen(PORT, () =>{
    console.log(`Server is running on port : http://localhost:${PORT}`);
});