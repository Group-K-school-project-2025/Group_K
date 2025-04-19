-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile VARCHAR(20),
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Insert a sample user
INSERT INTO users (first_name, last_name, email, mobile, username, password)
VALUES 
('Minou', 'Vahedi', 'minoovahedinezhad@gmail.com', '+453229161', 'minoovn', 'minoovn');

-- Add more sample data as needed
-- Example:
-- INSERT INTO users (first_name, last_name, email, mobile, username, password)
-- VALUES ('John', 'Doe', 'john.doe@example.com', '+123456789', 'johndoe', 'password123');


CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    image_url TEXT,
    category VARCHAR(50),
    price NUMERIC(10, 2), 
    uploader VARCHAR(100), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    likes INTEGER DEFAULT 0 
);


-- Insert templates data


INSERT INTO templates (title, image_url, category, price, uploader)
VALUES 
  ('e-commerce Template 1', 'images/business1_template.jpg', 'ecommerce', 15.00, 'Minou'),
    ('e-commerce Template 2', 'images/business2_template.jpg', 'ecommerce', 20.00, 'Minou'),
    ('e-commerce Template 3', 'images/business3_template.jpg', 'ecommerce', 15.00, 'Minou'),
    ('e-commerce Template 4', 'images/business4_template.jpg', 'ecommerce', 22.00, 'Minou'),
    ('e-commerce Template 5', 'images/business5_template.jpg', 'ecommerce', 20.00, 'Minou'),
    ('e-commerce Template 6', 'images/business6_template.jpg', 'ecommerce', 30.00, 'Minou'),
    ('e-commerce Template 7', 'images/business7_template.jpg', 'ecommerce', 20.00, 'Minou'),
    ('e-commerce Template 8', 'images/business8_template.jpg', 'ecommerce', 12.00, 'Minou'),

  ('Business Template 1', 'images/e-commerceWebsite1.jpg', 'business', 15.00, 'Minou'),
    ('Business Template 2', 'images/e-commerceWebsite2.jpg', 'business', 20.00, 'Minou'),
    ('Business Template 3', 'images/e-commerceWebsite3.jpg', 'business', 15.00, 'Minou'),
    ('Business Template 4', 'images/e-commerceWebsite4.jpg', 'business', 22.00, 'Minou'),
    ('Business Template 5', 'images/e-commerceWebsite5.jpg', 'business', 20.00, 'Minou'),
    ('Business Template 6', 'images/e-commerceWebsite6.jpg', 'business', 30.00, 'Minou'),
  
  ('Education Template 1', 'images/EducationWebsite1.jpg', 'education', 15.00, 'Minou'),
    ('Education Template 2', 'images/EducationWebsite2.jpg', 'education', 20.00, 'Minou'),
    ('Education Template 3', 'images/EducationWebsite3.jpg', 'education', 15.00, 'Minou'),

  ('Event Template 1', 'images/EventWebsite1.jpg', 'event', 15.00, 'Minou'),
    ('Event Template 2', 'images/EventWebsite2.jpg', 'event', 20.00, 'Minou'),
    ('Event Template 3', 'images/EventWebsite3.jpg', 'event', 15.00, 'Minou'),

  ('Non-profit Template 1', 'images/Non-profitWebsite1.jpg', 'nonprofit', 15.00, 'Minou'),
    ('Non-profit Template 2', 'images/Non-profitWebsite2.jpg', 'nonprofit', 20.00, 'Minou'),
    ('Non-profit Template 3', 'images/Non-profitWebsite3.jpg', 'nonprofit', 15.00, 'Minou'),

  ('Portfolio Template 1', 'images/PortfolioWebsite1.jpg', 'portfolio', 15.00, 'Minou'),
    ('Portfolio Template 2', 'images/PortfolioWebsite2.jpg', 'portfolio', 20.00, 'Minou'),
    ('Portfolio Template 3', 'images/PortfolioWebsite3.jpg', 'portfolio', 15.00, 'Minou'),
    ('Portfolio Template 4', 'images/PortfolioWebsite4.jpg', 'portfolio', 12.00, 'Minou'),
    ('Portfolio Template 5', 'images/PortfolioWebsite5.jpg', 'portfolio', 20.00, 'Minou'),


  ('Real-Estate Template 1', 'images/RealEstateWebsite1.jpg', 'realestate', 15.00, 'Minou'),
    ('Real-Estate Template 2', 'images/RealEstateWebsite2.jpg', 'realestate', 20.00, 'Minou'),
    ('Real-Estate Template 3', 'images/RealEstateWebsite3.jpg', 'realestate', 15.00, 'Minou'),
    ('Real-Estate Template 4', 'images/RealEstateWebsite4.jpg', 'realestate', 12.00, 'Minou'),
    ('Real-Estate Template 5', 'images/RealEstateWebsite5.jpg', 'realestate', 20.00, 'Minou'),


  ('Restaurant Template 1', 'images/ResturantWebsite1.jpg', 'restaurant', 15.00, 'Minou'),
    ('Restaurant Template 2', 'images/ResturantWebsite2.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 3', 'images/ResturantWebsite3.jpg', 'restaurant', 15.00, 'Minou'),
    ('Restaurant Template 4', 'images/ResturantWebsite4.jpg', 'restaurant', 12.00, 'Minou'),
    ('Restaurant Template 5', 'images/ResturantWebsite5.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 6', 'images/ResturantWebsite6.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 7', 'images/ResturantWebsite7.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 8', 'images/ResturantWebsite8.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 9', 'images/ResturantWebsite9.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 10', 'images/ResturantWebsite10.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 11', 'images/ResturantWebsite11.jpg', 'restaurant', 20.00, 'Minou'),
    ('Restaurant Template 12', 'images/ResturantWebsite12.jpg', 'restaurant', 20.00, 'Minou');
  


   
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    template_id INTEGER REFERENCES templates(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 
