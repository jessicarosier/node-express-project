USE node_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    dod_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(100),
    branch VARCHAR(100)
);