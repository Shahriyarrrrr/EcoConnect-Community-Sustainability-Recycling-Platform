# EcoConnect — Community Sustainability & Recycling Platform

EcoConnect is a dynamic, community-driven sustainability and recycling platform designed to connect residents with certified recyclers. The system promotes responsible waste management through item listings, recycler interactions, comments, reactions, and a modular PHP-based REST API — all built using pure web technologies.

This project was developed using **HTML5, CSS3, JavaScript, PHP, and MySQL**, following a clean MVC-like folder structure with modern UI design.

---

## 🌍 Project Vision

To empower urban communities to reduce waste and recycle more effectively by enabling smooth communication between citizens and recyclers. EcoConnect functions as a sustainable micro-network built with lightweight, accessible web technologies.

---

## ✨ Key Features

### **User Features**
- User registration & login
- Secure password hashing
- JWT-based authentication
- User profile with avatar support
- Dark/Light theme support
- Post recyclable items
- Comment and reaction system
- Search recyclers geographically
- Real-time updating dashboard widgets

### **Recycler Features**
- Recycler account system
- Accept item pickup requests
- View resident posts
- Manage activity logs

### **Admin Features**
- Manage users (ban/approve)
- Manage recyclers (verify/certify)
- Manage posts, comments & reactions
- View platform-wide activity dashboard
- System-wide moderation

### **Core System Features**
- Modular PHP REST API
- MySQL Database schema optimized for scalability
- Secure authentication middleware
- Sanitized input handling
- API routing using `.htaccess` rewrite rules
- JSON-based communication
- Lightweight front-end with modern UI components

---

## 🗂 Project Structure

EcoConnect/
│
├── api/
│ ├── config/
│ │ └── db.php
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── helpers/
│ └── index.php # Main API router
│
├── css/
│ ├── global.css
│ └── components.css
│
├── js/
│ ├── auth.js
│ ├── user.js
│ ├── items.js
│ ├── recyclers.js
│ ├── reactions.js
│ ├── comments.js
│ └── config.js
│
├── uploads/ # (Generated dynamically)
│
├── index.html # Website homepage
├── login.html
├── register.html
├── profile.html
├── post_item.html
├── recycler_dashboard.html
└── admin_dashboard.html


---

## 🛠️ Tech Stack

### **Frontend**
- HTML5
- CSS3 (Responsive, Mobile-first)
- Vanilla JavaScript (ES6+)
- Lucide Icons
- Modern UI/UX components

### **Backend**
- PHP 8+ (Native, no frameworks)
- Secure REST API architecture
- Custom JWT authentication
- Input sanitization & validation

### **Database**
- MySQL (XAMPP / phpMyAdmin)
- Relational schema:
  - `users`
  - `recyclers`
  - `items`
  - `comments`
  - `reactions`
  - `notifications`
  - `activity_logs`
  - etc.

---

## 🚀 Installation & Setup (XAMPP)

### **1. Clone the Repository**
```bash
git clone https://github.com/Shahriyarrrrr/EcoConnect-Community-Sustainability-Recycling-Platform.git
2. Move Project to XAMPP

Place folder inside:

C:\xampp\htdocs\

3. Import Database

Open phpMyAdmin

Create database: ecoconnect

Import the provided SQL file

4. Enable Apache Rewrite

In httpd.conf, ensure:

LoadModule rewrite_module modules/mod_rewrite.so
AllowOverride All

5. Ensure .htaccess Exists

Inside /api/:

RewriteEngine On
RewriteBase /EcoConnect/api/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ index.php [QSA,L]

6. Start the App

Visit:

http://localhost/EcoConnect/


API root:

http://localhost/EcoConnect/api/

🔐 Authentication Flow

User registers → stored with hashed password

Login returns a secure JWT token

All protected routes require header:

Authorization: <token>


Token verified in PHP middleware

User interacts with items, recyclers, comments, reactions, etc.
