CREATE DATABASE IF NOT EXISTS ecoconnect CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecoconnect;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('resident','recycler','admin') NOT NULL DEFAULT 'resident',
  city VARCHAR(120),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  avatar LONGTEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE INDEX idx_users_city ON users(city);

CREATE TABLE recyclers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(200) NOT NULL,
  contact VARCHAR(100),
  email VARCHAR(200),
  city VARCHAR(120),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  verified TINYINT(1) NOT NULL DEFAULT 0,
  hours VARCHAR(120),
  services TEXT,
  notes TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_recyclers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_recyclers_city ON recyclers(city);
CREATE INDEX idx_recyclers_verified ON recyclers(verified);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category ENUM('plastic','glass','paper','metal','e-waste','other') NOT NULL DEFAULT 'other',
  quantity VARCHAR(120),
  description TEXT,
  city VARCHAR(120),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  image LONGBLOB,
  image_base64 LONGTEXT,
  status ENUM('pending','available','collected','removed') NOT NULL DEFAULT 'pending',
  is_deleted TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_city ON items(city);
CREATE INDEX idx_items_status ON items(status);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  recycler_id INT NOT NULL,
  requested_by INT,
  collected_by INT,
  status ENUM('requested','confirmed','accepted','completed','cancelled','rejected') NOT NULL DEFAULT 'requested',
  pickup_time DATETIME,
  notes TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tx_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  CONSTRAINT fk_tx_recycler FOREIGN KEY (recycler_id) REFERENCES recyclers(id) ON DELETE CASCADE,
  CONSTRAINT fk_tx_requested_by FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_tx_collected_by FOREIGN KEY (collected_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_tx_status ON transactions(status);
CREATE INDEX idx_tx_recycler ON transactions(recycler_id);

CREATE TABLE leaderboard (
  user_id INT PRIMARY KEY,
  points INT NOT NULL DEFAULT 0,
  last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lb_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  text TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  metadata JSON,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ntf_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_notifications_user ON notifications(user_id);

CREATE TABLE activity_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  meta JSON,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  ip VARCHAR(50),
  user_agent VARCHAR(500),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token(100));

INSERT INTO users (name, email, password_hash, role, city, avatar) VALUES
('Admin', 'admin@ecoconnect.local', '$2b$12$REPLACE_WITH_BCRYPT_HASH_FOR_Admin@123', 'admin', 'Dhaka', ''),
('Alice Resident', 'alice@local.test', '$2b$12$REPLACE_WITH_BCRYPT_HASH_FOR_alice123', 'resident', 'Dhaka', ''),
('Green Recycler', 'green@recycler.test', '$2b$12$REPLACE_WITH_BCRYPT_HASH_FOR_recycler123', 'recycler', 'Dhaka', '');

INSERT INTO recyclers (user_id, name, contact, email, city, latitude, longitude, verified, hours, services) VALUES
(3, 'GreenCollect Ltd', '01710000000', 'info@greencollect.local', 'Dhaka', 23.8103000, 90.4125000, 1, '09:00-18:00', 'e-waste,plastic,metal');

INSERT INTO items (user_id, title, category, quantity, description, city, latitude, longitude, status, image_base64) VALUES
(2, 'Old CRT Monitor', 'e-waste', '1 unit', 'Non-functional CRT monitor for disposal', 'Dhaka', 23.8103000, 90.4125000, 'available', ''),
(2, 'Mixed Plastic Bags', 'plastic', '10 kg', 'Assorted household plastics', 'Dhaka', 23.8110000, 90.4130000, 'available', '');

INSERT INTO transactions (item_id, recycler_id, requested_by, status, pickup_time, notes) VALUES
(1, 1, 2, 'requested', NULL, 'Pickup requested by resident'),
(2, 1, 2, 'requested', NULL, '');

INSERT INTO leaderboard (user_id, points) VALUES
(2, 10),
(3, 15);

INSERT INTO activity_logs (message) VALUES
('System initialized'),
('Sample data seeded');
