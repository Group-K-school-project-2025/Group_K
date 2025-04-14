const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
  // Serve static files (CSS, JS)




const imagesPath = path.join(__dirname, '..', 'images');  // set the path to your images directory
app.use('/images', express.static(imagesPath));  // use express.static to serve images




// connect to PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AMI',
  password: 'mi2360366',
  port: 5432,
});

// check database connection
async function checkDbConnection() {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Connection error', err);
  }
}
checkDbConnection();

// pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../registerPage.html'));
});

app.get('/upload-template', (req, res) => {
  res.sendFile(path.join(__dirname, '../templateUploadForm.html'));
});

// receive templates from database
app.get('/templates/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const result = await pool.query('SELECT * FROM templates WHERE category = $1', [category]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });



// new template upload
app.post('/upload-template', upload.single('image'), async (req, res) => {
  const { title, category, price, uploader } = req.body;
  const image_url = req.file ? '/images/' + path.basename(req.file.path) : null;  // imeg_url is the path to the image file
  try {
    await pool.query(
      'INSERT INTO templates (title, image_url, category, price, uploader) VALUES ($1, $2, $3, $4, $5)',
      [title, image_url, category, price, uploader]
    );
    res.status(201).json({ message: 'Template uploaded successfully' });
  } catch (error) {
    console.error('Error inserting template:', error);
    res.status(500).json({ message: 'Failed to upload template' });
  }
});

app.get('/category-page', (req, res) => {
  res.sendFile(path.join(__dirname, '../categoryPage.html'));
});

// register new user
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

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
