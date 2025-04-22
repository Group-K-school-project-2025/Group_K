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

// Serve static image files from /images
const imagesPath = path.join(__dirname, '..', 'images');
app.use('/images', express.static(imagesPath));

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AMI',
  password: 'mi2360366',
  port: 5432,
});

// Check database connection
async function checkDbConnection() {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Connection error', err);
  }
}
checkDbConnection();

// Serve HTML pages
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

// Multer setup for file upload
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

// Upload a new template
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

// Register a new user
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

// Simple login route
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
// Assuming you have a cart_items table with user_id, template_id, and quantity columns
app.post('/cart', async (req, res) => {
  const { user_id, template_id, quantity } = req.body;

  if (!user_id || !template_id || quantity < 1) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  await pool.query(
    'INSERT INTO cart_items (user_id, template_id, quantity) VALUES ($1, $2, $3)',
    [user_id, template_id, quantity || 1]
  );
});

// Getting shopping cart item for unique user
// GET /cart/:userId - دریافت آیتم‌های سبد خرید برای یک کاربر خاص
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


//submit professional design request
app.use(express.json());  // برای پردازش درخواست‌های JSON
app.use(express.urlencoded({ extended: true }));  // برای پردازش فرم‌های urlencoded

// بررسی این که داده‌ها درست دریافت می‌شوند
app.post('/submit-form', async (req, res) => {
  console.log("Received form data:", req.body); // اینجا داده‌های فرم چاپ خواهند شد

  const { name, email, phone, deliveryDate, category, purpose } = req.body;

  if (!name || !email || !phone || !deliveryDate || !category || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO requests (name, email, phone, deliveryDate, category, purpose) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, phone, deliveryDate, category, purpose]
    );
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Error inserting form data:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
