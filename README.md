# SwiftDrop - DeliveryApp

SwiftDrop is a full-stack delivery application designed for **Bangladesh**, providing customers with a convenient platform to order **vegetables, groceries, and daily essential items**. The platform consists of three main interfaces:

1. **User Mobile App (React Native)** – for customers to browse products, place orders, and track deliveries.
2. **Admin Web Dashboard (React.js)** – for administrators to manage products, orders, users, and analyze data.
3. **Delivery Agent Mobile App (React Native)** – for delivery personnel to manage assigned orders and update statuses in real-time.

The project follows a **modular architecture** with a shared backend API to serve all three applications.

---

## 📂 Folder Structure

DeliveryApp/
│
├── backend/ # Backend for APIs
├── user-app/ # Customer Mobile App (React Native)
├── admin-panel/ # Admin Web Dashboard (React.js)
├── delivery-app/ # Delivery Agent Mobile App (React Native)
├── docs/ # Documentation, API Docs
├── .gitignore
└── README.md




---

## 🛠 Features

### User App
- Browse products by category
- Add products to cart
- Checkout with payment integration
- Order tracking with real-time status updates
- Profile management (edit profile, view order history)
- Authentication (signup/login)

### Admin Panel
- Product management (add/edit/delete products)
- Category management
- View all orders and update statuses
- User management
- Visual analytics with charts and tables
- Admin authentication

### Delivery Agent App
- View assigned orders
- Update order status (Picked, On the way, Delivered)
- Location tracking with Google Maps integration
- Profile and earnings management
- Login/logout functionality

---

## ⚙️ Backend Overview

- **Technology Stack:** Node.js, Express, MongoDB / MySQL
- **Responsibilities:** Handles API requests, authentication, product management, orders, and payments.
- **API Endpoints:**
  - `/api/users` – user management
  - `/api/products` – product listing
  - `/api/orders` – order management
  - `/api/delivery` – delivery agent actions
  - `/api/admin` – admin panel actions

- **Other Integrations:**
  - Stripe / SSLCommerz for payments
  - Firebase Cloud Messaging for notifications
  - Cloudinary for image uploads

---

## 🔗 Backend & Frontend Connection

- **User App, Admin Panel, and Delivery App** all connect to the backend using:
  - **Axios** for API requests
  - **WebSocket** for real-time updates (order tracking)
  - **Firebase Notifications** for delivery status updates

---

## 📝 Installation & Setup

### Pre-requisites:
- Node.js >= 18
- npm / yarn
- MongoDB server (local or cloud)
- React Native CLI
- Git

### Steps:

1. Clone the repository:

  git clone https://github.com/Rocky-Dewan/SwiftDrop.git
  
  cd SwiftDrop

2. Setup backend:

  cd backend
  npm install
  # configure .env with DB credentials, API keys, etc.
  node server.js


3. Setup Admin Panel:

  cd ../admin-panel
  npm install
  npm run dev


4. Setup User App:

  cd ../user-app
  npm install
  npx react-native run-android   # or run-ios


5. Setup Delivery App:

  cd ../delivery-app
  npm install
  npx react-native run-android   # or run-ios

📄 Documentation

  Documentation is available in the docs/ folder:

  API_REFERENCE.md – Full API reference for backend

  DATABASE_SCHEMA.md – Database tables/models overview

  DEPLOYMENT_GUIDE.md – Step-by-step deployment instructions

🔧 Tech Stack
  Layer	Technology
  Backend	Node.js, Express, MongoDB / MySQL
  User App	React Native, Redux
  Admin Panel	React.js, Axios, Charts.js
  Delivery App	React Native, Redux
  Notifications	Firebase Cloud Messaging
  Payment Gateway	Stripe / SSLCommerz
  Image Storage	Cloudinary

👨‍💻 Contribution

  Fork the repository

  Create a feature branch: git checkout -b feature-name

  Commit changes: git commit -m "Add feature"

  Push to your branch: git push origin feature-name

  Create a Pull Request

📧 Contact

  Developer: Rocky Dewan
  Email: [dewanrocky250@gmail.com]
  GitHub: https://github.com/Rocky-Dewan

  SwiftDrop – Delivering essentials from A to Z across Bangladesh!

