🚀 AI-Powered Customer Support CRM

A full-stack Customer Support CRM system built using React, FastAPI, SQLite, and SQLAlchemy. The application helps organizations manage customer support tickets efficiently through ticket tracking, status management, dashboard analytics, search/filtering, and AI-powered ticket categorization.

🌐 Live Demo
Frontend (Vercel)

🔗 https://support-crm-git-main-deepak-vishwakarma-s-projects.vercel.app/

Backend API (Render)

🔗 https://support-crm-yo12.onrender.com

API Documentation (Swagger)

🔗 https://support-crm-yo12.onrender.com/docs

GitHub Repository

🔗 https://github.com/Imdpkk/support-crm

📌 Problem Statement

Organizations receive hundreds of customer support requests daily.

Examples:

Payment Failed
Login Issues
Refund Requests
Account Access Problems
Technical Errors

Managing these tickets manually can lead to:

Slow response times
Poor ticket tracking
Incorrect prioritization
Reduced customer satisfaction
✅ Solution

This CRM system centralizes customer support operations by:

Creating and managing support tickets
Tracking ticket status
Searching and filtering tickets
Providing dashboard analytics
Automatically categorizing tickets using AI logic
Improving support team productivity
✨ Features
Ticket Management
Create support tickets
View all tickets
Update ticket status
Track ticket lifecycle
Dashboard Analytics
Total Tickets
Open Tickets
In Progress Tickets
Closed Tickets
Search & Filter
Search by Ticket ID
Search by Customer Name
Search by Subject
Filter by Status
AI-Powered Ticket Analysis

Automatically analyzes customer descriptions and provides:

Category
Priority
Summary

Example:

Input:

Payment deducted but order not confirmed

Output:

Category: Payment
Priority: High
Summary: Customer reported a payment-related issue.
🏗 System Architecture
React Frontend
       ↓
Axios API Calls
       ↓
FastAPI Backend
       ↓
SQLAlchemy ORM
       ↓
SQLite Database
💻 Tech Stack
Frontend
React.js
Vite
Axios
Bootstrap
CSS
Backend
Python
FastAPI
Uvicorn
Database
SQLite
SQLAlchemy
Deployment
Vercel (Frontend)
Render (Backend)
Version Control
Git
GitHub
📂 Project Structure
support-crm
│
├── backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── ai_service.py
│   ├── requirements.txt
│   └── support_crm.db
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
📡 API Endpoints
Create Ticket
POST /api/tickets
Get All Tickets
GET /api/tickets
Get Ticket By ID
GET /api/tickets/{ticket_id}
Update Ticket Status
PUT /api/tickets/{ticket_id}
Analyze Ticket
POST /api/analyze-ticket
🚀 Installation & Setup
Clone Repository
git clone https://github.com/Imdpkk/support-crm.git
cd support-crm
Backend Setup
cd backend

Create Virtual Environment

python -m venv venv

Activate Environment

.\venv\Scripts\activate

Install Dependencies

pip install -r requirements.txt

Run Backend

uvicorn main:app --reload

Backend URL:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs
Frontend Setup
cd frontend

Install Dependencies

npm install

Run Frontend

npm run dev

Frontend URL:

http://localhost:5173
🧠 AI Ticket Analysis

The system includes an AI-powered ticket analysis module that automatically classifies support tickets and assigns priorities.

Supported Categories:

Payment Issues
Authentication Issues
Refund Requests
Technical Errors
General Inquiries

Benefits:

Faster ticket processing
Reduced manual effort
Better prioritization
Improved customer support efficiency
🎯 Industry Use Cases
E-Commerce
Amazon
Flipkart
Meesho
Banking
SBI
HDFC
ICICI
SaaS Platforms
Salesforce
Zoho
Freshworks
Cloud Platforms
AWS Support
Azure Support
Google Cloud Support
🚧 Challenges Faced
CORS Issues

Solved using FastAPI CORS Middleware.

Frontend-Backend Communication

Integrated React with FastAPI using Axios.

Deployment Challenges

Successfully deployed:

Frontend on Vercel
Backend on Render
AI API Quota Limitations

Implemented a local AI-based ticket classification engine to ensure uninterrupted functionality and demonstration capability.

📈 Future Improvements
User Authentication (JWT)
Role-Based Access Control
Email Notifications
AI Model Integration (Gemini/OpenRouter)
Ticket Attachments
Admin Dashboard
Cloud Database (PostgreSQL)
👨‍💻 Developer

Deepak Vishwakarma

Software Engineering Student | Cloud & AI Enthusiast | Full Stack Developer

GitHub:

🔗 https://github.com/Imdpkk
