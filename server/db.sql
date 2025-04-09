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
