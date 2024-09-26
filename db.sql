CREATE DATABASE IF NOT EXISTS email_engine;

USE email_engine;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(256) UNIQUE NOT NULL,
  outlook_id VARCHAR(256),
  access_token TEXT,
  refresh_token TEXT,
  token_expiry DATETIME
);

CREATE TABLE emails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_id VARCHAR(256) UNIQUE NOT NULL,
  subject VARCHAR(256),
  sender VARCHAR(256),
  body TEXT,
  received_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
