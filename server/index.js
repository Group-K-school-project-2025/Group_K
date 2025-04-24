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
app.use(express.urlencoded({ extended: true }));

// Serve static files
const imagesPath = path.join(__dirname, '..', 'images');
app.use('/images', express.static(imagesPath));

// PostgreSQL connection
const openDb = () => {
const pool = new Pool({
  user: process.env.DB_USER,  
  host: process.env.DB_HOST,  
  database: process.env.DB_NAME,  
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,  
  ssl: process.env.SSL
})
return pool
}

async function checkDbConnection() {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Connection error', err);
  }
}
checkDbConnection();

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../registerPage.html'));
});
app.get('/upload-template', (req, res) => {
  res.sendFile(path.join(__dirname, '../templateUploadForm.html'));
});
app.get('/category-page', (req, res) => {
  res.sendFile(path.join(__dirname, '../categoryPage.html'));
});

// Get templates by category
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

// Upload template
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/upload-template', upload.single('image'), async (req, res) => {
  const { title, category, price, uploader } = req.body;
  const image_url = req.file ? '/images/' + path.basename(req.file.path) : null;

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

// Register new user
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

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Welcome to AMI web design service!' });
    } else {
      res.json({ success: false, message: 'Invalid username or password, please try again' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add item to cart
// Endpoint to add cart items to the database
app.post('/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { templateId, quantity } = req.body;

  try {
    // Insert cart item into the database
    await pool.query(`
      INSERT INTO cart_items (user_id, template_id, quantity)
      VALUES ($1, $2, $3)
    `, [userId, templateId, quantity]);

    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error inserting item into cart:', err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});



// Get cart items
app.get('/cart/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query(`
      SELECT t.id, t.title, t.image_url, t.price, ci.quantity
      FROM cart_items ci
      JOIN templates t ON ci.template_id = t.id
      WHERE ci.user_id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No items found in the cart' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// Submit design request
app.post('/submit-form', async (req, res) => {
  const { name, email, phone, deliveryDate, category, purpose } = req.body;

  if (!name || !email || !phone || !deliveryDate || !category || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO requests (name, email, phone, delivery_date, category, purpose) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, phone, deliveryDate, category, purpose]
    );
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Error inserting form data:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
});

//contact us
app.post('/submit-message', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      await pool.query(
          'INSERT INTO contactUs (name, email, message) VALUES ($1, $2, $3)',
          [name, email, message]
      );
      res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
      console.error('Error inserting message data:', error);
      res.status(500).json({ message: 'Failed to submit message' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
