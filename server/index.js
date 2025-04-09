const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// connect to PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AMI',
  password: 'mi2360366',
  port: 5432,
});

// Function to check DB connection
async function checkDbConnection() {
  try {
    await pool.connect(); // Try connecting to the database
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Connection error', err);
  }
}

// Call the function to check DB connection
checkDbConnection();

// Route: Serve registerPage.html from one level up
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../registerPage.html'));
});

// Route: Handle POST request to /new (user registration)
app.post('/new', async (req, res) => {
  const { first_name, last_name, email, mobile, username, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (first_name, last_name, email, mobile, username, password) VALUES ($1, $2, $3, $4, $5, $6)',
      [first_name, last_name, email, mobile, username, password]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});

