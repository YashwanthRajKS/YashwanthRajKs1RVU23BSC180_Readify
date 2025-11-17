# Readify -- Online Book Reading Platform

## 📌 Overview

Readify is a full‑stack web application that allows users to: - Sign up
/ log in using JWT authentication\
- Browse books\
- Read books online\
- Upload reviews & ratings\
- Track reading history\
- Admin can upload, update, or delete books (CRUD)

The frontend is built using **HTML, CSS, JS**, and backend uses
**Node.js + Express + MongoDB**.

------------------------------------------------------------------------

## 🚀 Project Flow

### **1. User Flow**

1.  User signs up → Data stored in MongoDB\
2.  Logs in → Receives JWT token\
3.  Views dashboard → Books fetched from backend\
4.  Clicks a book → Reads content (PDF/HTML/JSON)\
5.  Adds review → Stored in DB\
6.  Reading history updated

### **2. Admin Flow**

Admin can: - Add new books\
- Upload cover image + PDF\
- Edit book details\
- Delete books

All operations require admin JWT token.

------------------------------------------------------------------------

## 📂 Folder Structure

    readify/
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── uploads/ (PDFs)
    │   ├── server.js
    │   └── .env
    └── frontend/
        ├── index.html
        ├── login.html
        ├── signup.html
        ├── dashboard.html
        ├── reader.html
        └── assets/

------------------------------------------------------------------------

## 🗄️ Database Schema (ER Diagram)

### **User Schema**

    User {
      _id: ObjectId
      name: String
      email: String (unique)
      password: String (hashed)
      createdAt: Date
    }

### **Book Schema**

    Book {
      _id: ObjectId
      title: String
      author: String
      description: String
      coverImage: String
      pdfUrl: String
      genre: String
      rating: Number
    }

### **Review Schema**

    Review {
      _id: ObjectId
      userId: ObjectId (ref: User)
      bookId: ObjectId (ref: Book)
      rating: Number
      comment: String
      createdAt: Date
    }

### **History Schema**

    History {
      userId: ObjectId
      bookId: ObjectId
      lastReadAt: Date
    }

### **Relations**

-   **User ↔ Reviews** → One‑to‑Many\
-   **User ↔ History** → One‑to‑Many\
-   **Book ↔ Reviews** → One‑to‑Many

------------------------------------------------------------------------

## 🛠️ API Endpoints (Postman Format)

### **Auth Routes**

  Method   Endpoint             Description
  -------- -------------------- -----------------------------
  POST     `/api/auth/signup`   Create user
  POST     `/api/auth/login`    Authenticate + return token

------------------------------------------------------------------------

### **Book Routes**

  Method   Endpoint           Description
  -------- ------------------ --------------------
  GET      `/api/books`       Get all books
  GET      `/api/books/:id`   Get single book
  POST     `/api/books`       **Admin** add book
  PUT      `/api/books/:id`   **Admin** update
  DELETE   `/api/books/:id`   **Admin** delete

------------------------------------------------------------------------

### **Review Routes**

  Method   Endpoint                 Description
  -------- ------------------------ -----------------
  POST     `/api/reviews/:bookId`   Add review
  GET      `/api/reviews/:bookId`   Get all reviews

------------------------------------------------------------------------

### **History Routes**

  Method   Endpoint                 Description
  -------- ------------------------ --------------------
  POST     `/api/history/:bookId`   Add history
  GET      `/api/history`           Get user's history

------------------------------------------------------------------------

## 🛠️ Admin Dashboard (Planned)

Admin can: - Upload book (title, author, coverImage, pdf) - Update book
info - Delete book - View users - View reviews

------------------------------------------------------------------------

## 🌐 Deployment (Render)

Frontend: - Deploy static website → Connect GitHub repo

Backend: - Create a Render Web Service\
- Add environment variables:

    PORT=5000
    MONGO_URI=your_cloud_mongo
    JWT_SECRET=your_secret
    JWT_EXPIRES_IN=7d

-   Add build command: `npm install`
-   Start command: `node server.js`

------------------------------------------------------------------------

## 🧪 Testing with Postman

1.  Import routes\
2.  Add JWT token → Authorization → Bearer Token\
3.  Test book upload + review flow

------------------------------------------------------------------------

## ✨ Credits

Developed by **Yashwanth Raj KS**\
Full‑stack Web Application Project (Readify)
