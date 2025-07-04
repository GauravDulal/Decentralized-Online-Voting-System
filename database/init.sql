CREATE DATABASE IF NOT EXISTS voting_system;
USE voting_system;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nid VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    password_hash VARCHAR(300) NOT NULL
);

-- Campaigns Table
CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Candidates Table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    wallet_address VARCHAR(150) NOT NULL,
    campaign_id INT NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);
