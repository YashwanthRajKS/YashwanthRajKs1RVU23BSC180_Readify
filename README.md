# Readify - Advanced Online Book Reading & Rental Platform

## 📌 Overview

**Readify** is a production-grade full-stack web application designed for managing a digital library. It features a robust **Book Management System**, a secure **Rental Workflow**, and an interactive **Reading Experience**.

The platform is built with a **Security-First** architecture, incorporating advanced protection layers like rate limiting, input sanitization, and strict validation to ensure data integrity and user safety.

---

## 🚀 Key Features

### 🛡️ **Advanced Security** (New!)
- **Rate Limiting**: Protects against Brute-Force and DDoS attacks.
    - **Auth Routes**: Max 10 attempts per 15 mins.
    - **API Routes**: Max 100 requests per 15 mins.
- **Input Sanitization**:
    - **NoSQL Injection**: Blocks malicious queries (removed `$` and `.`).
    - **XSS Protection**: Sanitizes HTML input to prevent script injection.
- **Strict Validation**:
    - **Joi Schemas**: Validates every single input field.
    - **Password Rules**: Enforces complex passwords (Min 6 chars, 1 Upper, 1 Lower, 1 Number).
    - **URL Params**: Validates MongoDB ObjectIDs to prevent server crashes.
- **Secure Headers**: Uses `Helmet.js` to set HTTP headers.

### 📚 **Core Functionalities**
- **User Authentication**: Secure Login/Register with JWT & Bcrypt.
- **Book Catalog**: Search, filter, and view book details.
- **Rental System**:
    - Request to rent books for specific hours.
    - Admin approval workflow.
    - Automatic expiry tracking.
    - Rental extension system.
- **PDF Reader**: Built-in viewer for reading rented books.
- **Interactions**: Rate and review books.
- **History**: Auto-tracking of reading progress.

### 📧 **Hybrid Email System**
- **Primary**: **Brevo API** (High deliverability).
- **Fallback**: **Nodemailer** (Gmail SMTP / OAuth2).
- **Alerts**:
    - New Book Alerts.
    - Rental Approvals/Rejections.
    - Extension Status Updates.

### ⭐ **New Features**
- **Wishlist**: Save books for later.
- **Payment Gateway**: Integrated QR payment collection.
- **Admin Logs**: Track administrative actions.

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: Vanilla JS, CSS3, HTML5 (No framework, pure performance).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Security**: Joi, Helmet, XSS-Clean, Express-Rate-Limit, Express-Mongo-Sanitize.

### Libraries & Dependencies

#### Backend Dependencies (16 packages)

| Library | Version | Purpose | Category |
|---------|---------|---------|----------|
| **express** | ^4.21.2 | Web application framework | Core |
| **mongoose** | ^7.8.7 | MongoDB ODM for data modeling | Database |
| **bcryptjs** | ^2.4.3 | Password hashing | Authentication |
| **jsonwebtoken** | ^9.0.2 | JWT token generation & verification | Authentication |
| **dotenv** | ^16.6.1 | Environment variables management | Configuration |
| **cors** | ^2.8.5 | Cross-Origin Resource Sharing | Middleware |
| **helmet** | ^6.2.0 | Security headers | Security |
| **express-rate-limit** | ^8.2.1 | Rate limiting (DDoS protection) | Security |
| **express-mongo-sanitize** | ^2.2.0 | NoSQL injection prevention | Security |
| **xss-clean** | ^0.1.4 | XSS attack prevention | Security |
| **joi** | ^18.0.2 | Input validation schemas | Security |
| **morgan** | ^1.10.1 | HTTP request logger | Logging |
| **pdfjs-dist** | ^5.4.394 | PDF processing | Utilities |
| **react-pdf** | ^10.2.0 | PDF rendering | Utilities |

#### Development Dependencies (1 package)

| Library | Version | Purpose |
|---------|---------|---------|
| **nodemon** | ^3.1.11 | Auto-restart server on file changes |

#### Frontend Libraries

- **Vanilla JavaScript** (ES6+) - No external frameworks
- **CSS3** - Custom styling with modern features
- **HTML5** - Semantic markup
- **PDF.js** - Client-side PDF rendering

### Dependency Categories Breakdown

#### 🔐 Security (5 packages)
- `helmet` - Sets secure HTTP headers
- `express-rate-limit` - Prevents brute-force attacks
- `express-mongo-sanitize` - Blocks NoSQL injection
- `xss-clean` - Prevents XSS attacks
- `joi` - Validates all user inputs

#### 🔑 Authentication (2 packages)
- `bcryptjs` - Hashes passwords with salt
- `jsonwebtoken` - Creates & verifies JWT tokens

#### 🗄️ Database (1 package)
- `mongoose` - MongoDB object modeling

#### 🌐 Web Framework (1 package)
- `express` - Fast, minimalist web framework

#### 🛠️ Utilities (6 packages)
- `cors` - Handles cross-origin requests
- `dotenv` - Loads environment variables
- `morgan` - Logs HTTP requests
- `pdfjs-dist` - PDF processing
- `react-pdf` - PDF rendering
- `nodemon` - Development auto-reload

### Installation Commands

```bash
# Install all backend dependencies
cd backend
npm install

# Install specific dependency
npm install express mongoose bcryptjs

# Install dev dependencies
npm install --save-dev nodemon
```

### Workflow Diagrams

#### User Journey
```mermaid
flowchart TD
    Login[Login/Register] --> Auth[JWT Authentication]
    Auth --> Dashboard[User Dashboard]
    
    Dashboard --> Browse[Browse Books]
    Browse --> Rent[Request Rental]
    Rent --> Validation{Validation}
    
    Validation -->|Fail| Error[400 Bad Request]
    Validation -->|Pass| Pending[Status: Pending]
    
    Pending --> Admin{Admin Approval}
    Admin -->|Approve| Active[Active Rental]
    Admin -->|Reject| Rejected[Rejected & Email Sent]
    
    Active --> Read[Read PDF]
    Active --> Extend[Request Extension]
```

### Folder Structure
```bash
readify_final/
├── backend/
│   ├── controllers/
│   │   ├── adminLogController.js  # Admin Activity Logs
│   │   ├── authController.js      # Register, Login logic
│   │   ├── bookController.js      # Book CRUD (Create, Read, Update, Delete)
│   │   ├── historyController.js   # User Reading History
│   │   ├── paymentController.js   # Payment Processing
│   │   ├── ratingController.js    # Book Rating logic
│   │   ├── rentalController.js    # Rental Logic
│   │   ├── reviewController.js    # User Reviews logic
│   │   └── wishlistController.js  # Wishlist Logic
│   ├── middleware/
│   │   ├── adminMiddleware.js     # Admin role verification
│   │   ├── authMiddleware.js      # JWT Token verification
│   │   ├── errorMiddleware.js     # Global Error Handler (Sanitized 500s)
│   │   ├── rateLimiter.js         # Rate Limiting (DDoS Protection)
│   │   ├── validate.js            # Joi Request Validation
│   │   └── validateId.js          # MongoDB ObjectID Validation
│   ├── models/
│   │   ├── AdminLog.js            # Admin Activity Schema
│   │   ├── Book.js                # Book Schema
│   │   ├── History.js             # Reading History Schema
│   │   ├── Payment.js             # Payment Schema
│   │   ├── Rating.js              # Rating Schema
│   │   ├── Rental.js              # Rental request/status Schema
│   │   ├── Review.js              # Review Schema
│   │   ├── User.js                # User & Role Schema
│   │   └── Wishlist.js            # Wishlist Schema
│   ├── routes/
│   │   ├── adminLogRoutes.js      # /api/admin-logs
│   │   ├── authRoutes.js          # /api/auth
│   │   ├── bookRoutes.js          # /api/books
│   │   ├── historyRoutes.js       # /api/history
│   │   ├── paymentRoutes.js       # /api/payments
│   │   ├── ratingRoutes.js        # /api/ratings
│   │   ├── rentalRoutes.js        # /api/rentals
│   │   ├── reviewRoutes.js        # /api/reviews
│   │   └── wishlistRoutes.js      # /api/wishlist
│   ├── utils/
│   │   ├── asyncHandler.js        # Wrapper for async routes (Try-Catch killer)
│   │   ├── emailService.js        # Brevo/Nodemailer Hybrid Service
│   │   └── validationSchemas.js   # Joi Validation Rules (Strict)
│   ├── uploads/                   # Stored PDF files
│   │   └── pdfs/
│   ├── .env                       # Environment Variables (Secrets)
│   ├── db.js                      # Database Connection Logic
│   ├── package.json               # Backend Dependencies
│   └── server.js                  # Main Server Entry Point
│
├── frontend/
│   ├── assets/                    # Images and Icons
│   ├── admin.html                 # Admin Dashboard UI
│   ├── admin.js                   # Admin Dashboard Logic
│   ├── config.js                  # API Base URL Config
│   ├── dashboard.html             # User Dashboard UI
│   ├── history.html               # Reading History UI
│   ├── history.js                 # Reading History Logic
│   ├── index.html                 # Landing Page
│   ├── login.html                 # Login Page
│   ├── login.js                   # Login Logic
│   ├── payment.html               # Payment UI
│   ├── payment.js                 # Payment Logic
│   ├── profile.html               # Profile UI
│   ├── profile.js                 # Profile Logic
│   ├── reader.html                # PDF Reader UI
│   ├── signup.html                # Signup Page
│   ├── signup.js                  # Signup Logic
│   ├── style.css                  # Global Stylesheet
│   ├── wishlist.html              # Wishlist UI
│   └── wishlist.js                # Wishlist Logic
```

---

## 🔒 Security Implementation Details

### 1. Rate Limiting (`middleware/rateLimiter.js`)
We prevent abuse by throttling requests using `express-rate-limit`.
- **Auth Limiter**: Strict throttling on `/api/auth` to prevent password guessing.
- **API Limiter**: General throttling on content routes to prevent scraping.

### 2. Input Validation (`middleware/validate.js`)
All incoming data is validated against strict **Joi** schemas defined in `utils/validationSchemas.js`.
- **Example Rule**: Passwords must be `>6 chars` AND have `A-Z`, `a-z`, `0-9`.

### 3. Global Error Handling (`middleware/errorMiddleware.js`)
We replaced `try-catch` blocks with a wrapper `asyncHandler`.
- Catches all asynchronous errors.
- Returns a consistent JSON error format: `{ "error": "Message" }`.
- Prevents the server from crashing on unhandled exceptions.

### 4. Sanitization (`server.js`)
- `express-mongo-sanitize`: Strips keys containing `$`.
- `xss-clean`: Converts HTML characters to safe entities.

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Connection String
- Brevo API Key (Optional, for emails) or Gmail Credentials

### 2. Environment Variables & API Configuration

#### Required Environment Variables

Create a `.env` file in the `backend/` directory with the following configuration:

```env
# ========================================
# CORE CONFIGURATION (Required)
# ========================================

# Server Configuration
PORT=5000                              # Server port (Render sets this automatically in production)
NODE_ENV=development                   # Environment: development | production

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/readify?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# ========================================
# EMAIL SERVICE CONFIGURATION
# ========================================

# Primary Email Service - Brevo API (Recommended)
BREVO_API_KEY=xkeysib-your_brevo_api_key_here
EMAIL_FROM=noreply@yourdomain.com      # Sender email address

# Fallback Email Service - Gmail OAuth2 (Optional)
CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token
EMAIL_USER=your-email@gmail.com        # Gmail address for fallback

# Alternative Fallback - Gmail SMTP (Optional)
EMAIL_PASS=your_gmail_app_password     # Gmail App Password (if not using OAuth2)

# ========================================
# OPTIONAL CONFIGURATION
# ========================================

# Debug Email Testing
DEBUG_TEST_EMAIL=test@example.com      # Email for debug testing (optional)
```

#### Environment Variables Breakdown

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| **PORT** | ✅ Yes | Server port number | `5000` |
| **MONGO_URI** | ✅ Yes | MongoDB connection string | `mongodb+srv://...` |
| **JWT_SECRET** | ✅ Yes | Secret key for JWT tokens (min 32 chars) | `your_secret_key_here` |
| **BREVO_API_KEY** | ✅ Yes | Brevo API key for email service | `xkeysib-...` |
| **EMAIL_FROM** | ✅ Yes | Sender email address | `noreply@domain.com` |
#### How to Get API Keys

##### 1. MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

##### 2. Brevo API Key (Email Service - Primary)
1. Sign up at [Brevo](https://www.brevo.com/) (formerly Sendinblue)
2. Go to **Settings** → **SMTP & API**
3. Click **Create a new API key**
4. Copy the key (starts with `xkeysib-`)
5. Add a verified sender email in Brevo settings

##### 3. Gmail OAuth2 (Email Backup - Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Gmail API**
4. Create **OAuth 2.0 credentials**
5. Use [OAuth2 Playground](https://developers.google.com/oauthplayground) to get refresh token
6. Select Gmail API v1 scope: `https://mail.google.com/`
7. Exchange authorization code for tokens

##### 4. Gmail App Password (Alternative Backup - Optional)
1. Enable 2-Step Verification on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** and **Other (Custom name)**
4. Copy the 16-character password

#### Minimum Configuration (Recommended)

For a working production setup, you only need these **6 variables**:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
BREVO_API_KEY=xkeysib-your_brevo_api_key
EMAIL_FROM=noreply@yourdomain.com
REFRESH_TOKEN=your_google_refresh_token
```

#### Production Deployment (Render)

When deploying to Render, add these environment variables in the Render Dashboard:

1. Go to your service → **Environment**
2. Add each variable as a **Secret File** or **Environment Variable**
3. Render automatically sets `PORT` - you don't need to add it
4. Make sure `NODE_ENV=production` for production builds

### 3. Install & Run
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
# Run using any static server (e.g., Live Server)
```

---

## 🧪 Testing the Security Layers

You can verify the security implementation with these tests:

1.  **Rate Limit Test**: Try logging in 11 times rapidly.
    - *Result*: `429 Too Many Requests`.
2.  **NoSQL Injection Test**: Send `{ "email": { "$gt": "" } }` to login.
    - *Result*: Sanitizer removes `$gt`, login fails safely.
3.  **XSS Test**: Send `<script>alert(1)</script>` as a book title.
    - *Result*: Saved as `&lt;script&gt;...` (harmless text).
4.  **Validation Test**: Try to signup with password "123".
    - *Result*: `400 Bad Request` ("Password must contain uppercase, lowercase...").

---

## 📝 API Documentation

### API Overview
- **Total Endpoints:** 43+
- **Base URL (Local):** `http://localhost:5000`
- **Base URL (Production):** `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com`
- **Authentication:** JWT Bearer Token
- **Authorization:** Role-based (User/Admin)

### Quick Reference

| Category | Endpoints | Public | User Auth | Admin Only |
|----------|-----------|--------|-----------|------------|
| Basic & Debug | 3 | 3 | 0 | 0 |
| Authentication | 4 | 1 | 3 | 0 |
| Books | 5 | 2 | 0 | 3 |
| Rentals | 12 | 0 | 4 | 8 |
| Reviews | 3 | 2 | 1 | 0 |
| Ratings | 4 | 1 | 3 | 0 |
| Wishlist | 3 | 0 | 3 | 0 |
| Payments | 2 | 0 | 2 | 0 |
| History | 3 | 0 | 3 | 0 |
| Email Testing | 3 | 1 | 1 | 1 |
| Admin Logs | 1 | 0 | 0 | 1 |
| **TOTAL** | **43** | **10** | **20** | **13** |

### Detailed Endpoints

#### 🔧 Basic & Debug (3 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/test` | None | Test backend connection |
| GET | `/api/debug-env` | None | Check environment variables |
| GET | `/health` | None | Health check & MongoDB status |

#### 🔐 Authentication (4 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | User login (returns JWT token) |
| GET | `/api/users/profile` | User | Get current user profile |
| PUT | `/api/users/profile` | User | Update profile (image, phone) |

#### 📖 Books (5 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/books` | None | Get all books (public) |
| GET | `/api/books/:id` | None | Get single book details |
| POST | `/api/books` | Admin | Create new book |
| PUT | `/api/books/:id` | Admin | Update book details |
| DELETE | `/api/books/:id` | Admin | Delete book |

#### 🏠 Rentals (12 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/rentals/request` | User | Create rental request |
| GET | `/api/rentals/my-rentals` | User | Get user's rentals |
| PUT | `/api/rentals/extend/:id` | User | Request rental extension |
| GET | `/api/rentals/pending` | Admin | Get pending rental requests |
| GET | `/api/rentals/active` | Admin | Get active rentals |
| PUT | `/api/rentals/approve/:id` | Admin | Approve rental request |
| PUT | `/api/rentals/reject/:id` | Admin | Reject rental request |
| GET | `/api/rentals/pending-extensions` | Admin | Get pending extensions |
| PUT | `/api/rentals/approve-extension/:id` | Admin | Approve extension |
| PUT | `/api/rentals/reject-extension/:id` | Admin | Reject extension |
| PUT | `/api/rentals/toggle-rentable/:bookId` | Admin | Toggle book rentable status |
| DELETE | `/api/rentals/:id` | Admin | Delete rental |

#### ⭐ Reviews (3 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/reviews` | User | Create book review |
| GET | `/api/reviews` | None | Get all reviews |
| GET | `/api/reviews/:bookId` | None | Get reviews for specific book |

#### ⭐ Ratings (4 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/ratings` | User | Add/update book rating |
| GET | `/api/ratings` | None | Get all ratings |
| GET | `/api/ratings/mine` | User | Get my ratings |
| GET | `/api/ratings/my/:bookId` | User | Get my rating for book |

#### ❤️ Wishlist (3 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/wishlist` | User | Get user's wishlist |
| POST | `/api/wishlist` | User | Add book to wishlist |
| DELETE | `/api/wishlist/:id` | User | Remove from wishlist |

#### 💳 Payments (2 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payments` | User | Create payment record |
| GET | `/api/payments/my-payments` | User | Get user's payments |

#### 📜 History (3 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/history` | User | Add book to history |
| GET | `/api/history` | User | Get reading history |
| DELETE | `/api/history` | User | Clear reading history |

#### 📧 Email Testing (3 endpoints)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/rentals/test-email` | Admin | Test email configuration |
| POST | `/send-test-email` | None | Send test email |
| POST | `/debug/send-test-email` | None | Debug Brevo email |

#### 📝 Admin Logs (1 endpoint)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin-logs` | Admin | Get admin activity logs |

### Security Features by Endpoint

| Feature | Applied To | Description |
|---------|-----------|-------------|
| **Rate Limiting** | `/api/auth/*` | Max 10 requests per 15 mins |
| **Rate Limiting** | `/api/books/*`, `/api/rentals/*` | Max 100 requests per 15 mins |
| **Input Validation** | All POST/PUT | Joi schema validation |
| **Sanitization** | All endpoints | NoSQL injection & XSS protection |
| **ID Validation** | All `/:id` routes | MongoDB ObjectID validation |
| **JWT Auth** | Protected routes | Bearer token required |
| **Role Check** | Admin routes | Admin role verification |

### Example API Usage

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "John Doe", "role": "user" }
}
```

#### Create Rental Request
```bash
POST /api/rentals/request
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "bookId": "507f1f77bcf86cd799439011",
  "hours": 24,
  "transactionId": "UTR123456789"
}
```

---

---

## 📚 Book Database Reference

This section contains all the book details for admin reference. Use this information when adding books through the admin panel.

### Available Books (5 PDFs)

All PDF files are located in `backend/uploads/pdfs/` and accessible via the `/pdfs/` endpoint.

#### Book 1: Fiction - The Great Adventure

| Field | Value |
|-------|-------|
| **Title** | The Great Adventure |
| **Author** | John Doe |
| **Description** | An epic tale of courage, friendship, and discovery. Follow the protagonist on a journey through mystical lands filled with challenges and wonder. |
| **Categories** | `Fiction`, `Adventure` |
| **Rent Price** | `5` (₹5 per hour) |
| **PDF URL (Local)** | `http://localhost:5000/pdfs/fiction.pdf` |
| **PDF URL (Production)** | `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com/pdfs/fiction.pdf` |
| **Cover Image** | `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400` |
| **Is Rentable** | `true` |

---

#### Book 2: Motivation - Think and Grow Rich

| Field | Value |
|-------|-------|
| **Title** | Think and Grow Rich |
| **Author** | Napoleon Hill |
| **Description** | A timeless classic on personal achievement and success. Discover the 13 principles that have helped millions achieve their dreams and build lasting wealth. |
| **Categories** | `Motivation`, `Self-Help`, `Business` |
| **Rent Price** | `10` (₹10 per hour) |
| **PDF URL (Local)** | `http://localhost:5000/pdfs/motivation.pdf` |
| **PDF URL (Production)** | `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com/pdfs/motivation.pdf` |
| **Cover Image** | `https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400` |
| **Is Rentable** | `true` |

---

#### Book 3: Recipes - Cooking Masterclass

| Field | Value |
|-------|-------|
| **Title** | Cooking Masterclass |
| **Author** | Gordon Ramsay |
| **Description** | Master the art of cooking with professional techniques and delicious recipes. From basic skills to advanced dishes, become a culinary expert. |
| **Categories** | `Cooking`, `Recipes`, `Food` |
| **Rent Price** | `8` (₹8 per hour) |
| **PDF URL (Local)** | `http://localhost:5000/pdfs/recipes.pdf` |
| **PDF URL (Production)** | `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com/pdfs/recipes.pdf` |
| **Cover Image** | `https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400` |
| **Is Rentable** | `true` |

---

#### Book 4: Science - A Brief History of Time

| Field | Value |
|-------|-------|
| **Title** | A Brief History of Time |
| **Author** | Stephen Hawking |
| **Description** | Explore the mysteries of the universe, from the Big Bang to black holes. A groundbreaking work that makes complex physics accessible to everyone. |
| **Categories** | `Science`, `Physics`, `Astronomy` |
| **Rent Price** | `12` (₹12 per hour) |
| **PDF URL (Local)** | `http://localhost:5000/pdfs/science.pdf` |
| **PDF URL (Production)** | `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com/pdfs/science.pdf` |
| **Cover Image** | `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400` |
| **Is Rentable** | `true` |

---

#### Book 5: Technology - Clean Code

| Field | Value |
|-------|-------|
| **Title** | Clean Code: A Handbook of Agile Software Craftsmanship |
| **Author** | Robert C. Martin |
| **Description** | Learn to write clean, maintainable code that stands the test of time. Essential reading for every software developer who wants to improve their craft. |
| **Categories** | `Technology`, `Programming`, `Software Engineering` |
| **Rent Price** | `15` (₹15 per hour) |
| **PDF URL (Local)** | `http://localhost:5000/pdfs/tech.pdf` |
| **PDF URL (Production)** | `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com/pdfs/tech.pdf` |
| **Cover Image** | `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400` |
| **Is Rentable** | `true` |

---

### Quick Copy-Paste Format (JSON)

For API testing or bulk import, here's the JSON format for all books:

```json
[
  {
    "title": "The Great Adventure",
    "author": "John Doe",
    "description": "An epic tale of courage, friendship, and discovery. Follow the protagonist on a journey through mystical lands filled with challenges and wonder.",
    "categories": ["Fiction", "Adventure"],
    "rentPrice": 5,
    "pdfUrl": "http://localhost:5000/pdfs/fiction.pdf",
    "coverImage": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    "isRentable": true
  },
  {
    "title": "Think and Grow Rich",
    "author": "Napoleon Hill",
    "description": "A timeless classic on personal achievement and success. Discover the 13 principles that have helped millions achieve their dreams and build lasting wealth.",
    "categories": ["Motivation", "Self-Help", "Business"],
    "rentPrice": 10,
    "pdfUrl": "http://localhost:5000/pdfs/motivation.pdf",
    "coverImage": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    "isRentable": true
  },
  {
    "title": "Cooking Masterclass",
    "author": "Gordon Ramsay",
    "description": "Master the art of cooking with professional techniques and delicious recipes. From basic skills to advanced dishes, become a culinary expert.",
    "categories": ["Cooking", "Recipes", "Food"],
    "rentPrice": 8,
    "pdfUrl": "http://localhost:5000/pdfs/recipes.pdf",
    "coverImage": "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400",
    "isRentable": true
  },
  {
    "title": "A Brief History of Time",
    "author": "Stephen Hawking",
    "description": "Explore the mysteries of the universe, from the Big Bang to black holes. A groundbreaking work that makes complex physics accessible to everyone.",
    "categories": ["Science", "Physics", "Astronomy"],
    "rentPrice": 12,
    "pdfUrl": "http://localhost:5000/pdfs/science.pdf",
    "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    "isRentable": true
  },
  {
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert C. Martin",
    "description": "Learn to write clean, maintainable code that stands the test of time. Essential reading for every software developer who wants to improve their craft.",
    "categories": ["Technology", "Programming", "Software Engineering"],
    "rentPrice": 15,
    "pdfUrl": "http://localhost:5000/pdfs/tech.pdf",
    "coverImage": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    "isRentable": true
  }
]
```

### How to Add Books as Admin

1. **Login to Admin Panel**: Navigate to `admin.html` and login with admin credentials
2. **Go to "Add Book" Section**: Click on "Add New Book" button
3. **Fill in the Details**: Use the information from the tables above
4. **Submit**: Click "Add Book" to save to database

**Note:** For production, replace all `http://localhost:5000` URLs with `https://yashwanthrajks1rvu23bsc180-readify-3.onrender.com`

---

**Developed with ❤️ by the Readify Team**

