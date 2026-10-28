# 🛒 বাজার দর | BazarDor

### Smart Market Price Tracking & Comparison Platform

**BazarDor (বাজার দর)** is a modern web application designed to help people in Bangladesh stay informed about the latest prices of essential daily commodities. Users can explore products by category, monitor price changes, and compare prices across different local markets — all through an intuitive, Bengali-friendly interface.

The platform aims to make everyday shopping decisions easier by providing accessible and organized market price information.

---

## 🚀 Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework and routing |
| **React** | Component-based user interface |
| **TypeScript** | Type-safe application development |
| **Tailwind CSS** | Responsive styling and UI design |
| **Better Auth** | Authentication and session management |
| **MongoDB** | Database for user and authentication data |
| **React Hot Toast** | Success, error, and loading notifications |
| **Lucide React** | Modern UI icons |
| **REST API** | Fetching product categories, prices, and market information |

---

## ✨ 5 Key Features

### 1. 🛍️ Category-Based Product Browsing
Explore essential products organized into categories such as rice, lentils, oil, vegetables, fish, meat, dairy, and spices. Each category provides an easy-to-navigate product listing with prices and product information.

### 2. 📈 Daily Price Tracking
View today's prices alongside percentage changes from the previous day. Color-coded indicators make it easy to identify whether a product's price has increased, decreased, or remained unchanged.

### 3. 🏪 Market-Wise Price Comparison
Compare the minimum, maximum, and estimated average prices of products across markets in different regions of Bangladesh. This helps users understand regional price differences and make more informed purchasing decisions.

### 4. 🔐 Secure Authentication & User Profiles
Register or sign in using email and password, Google, or GitHub through Better Auth. Authenticated users can access their profiles, view account information, update their names, and securely sign out.

### 5. ⚡ Responsive UI & Smooth User Experience
Enjoy a mobile-friendly Bengali interface with product sorting, loading skeletons, interactive navigation, error notifications, and custom 404 pages for invalid routes.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and configure the variables required by your Better Auth, MongoDB, Google, and GitHub authentication setup.

Do not commit `.env.local` or authentication secrets to GitHub.

### 4. Run the development server

```