# 🌍 Smart Explorer Mazhavar Nadu

<div align="center">

## 🏛️ Discover Heritage • 🌿 Explore Nature • 🤖 Experience AI

### An AI-Powered Regional Tourism & Cultural Exploration Platform

🌐 **Live Demo:** https://smart-explore-mazhavr-nadu-ufp9.vercel.app/

</div>

---

## 📖 About The Project

**Smart Explorer Mazhavar Nadu** is a Region-Specific Web Application empowered by an Artificial Intelligence (AI) Chatbot, designed to showcase and guide users through the rich cultural, geographical, historical, industrial, and tourism landscape of **Mazhavar Nadu**.

Mazhavar Nadu is a historically and geographically significant region comprising:

🏙️ Salem District

🌄 Dharmapuri District

🌿 Krishnagiri District

🌾 Namakkal District

Situated strategically between the Kongu Region, Thondai Region, and Karnataka, Mazhavar Nadu serves as a unique blend of cultural heritage, natural resources, industrial growth, and historical significance.

This platform aims to digitally preserve, promote, and educate users about the identity and importance of this remarkable region through modern web technologies and AI-powered interaction.

---

## ✨ Key Features

### 🤖 AI Tourism Assistant

* Intelligent AI Chatbot
* Region-Specific Question Answering
* Tourist Guidance System
* Historical Information Retrieval
* Cultural Knowledge Assistance

### 🗺️ Regional Exploration

* District-wise Information
* Tourist Attractions
* Historical Monuments
* Religious Places
* Natural Destinations

### 🎥 Multimedia Content

* Tourism Videos
* Cultural Showcases
* Regional Information Gallery

### 👤 User Management

* User Registration
* Secure Login System
* JWT Authentication
* Profile Management

### 📱 Responsive User Interface

* Desktop Friendly
* Tablet Compatible
* Mobile Responsive

---

## 🛠️ Technology Stack

### Frontend Development

* ⚛️ React JS
* ⚡ Vite JS
* 🎨 Vanilla CSS
* 📡 Axios

### Backend Development

* 🐍 Python
* ⚡ FastAPI
* 🔐 JWT Authentication

### Database

* 🍃 MongoDB Atlas

### Artificial Intelligence

* 🤖 AI Chatbot Integration
* 🧠 NLP Processing
* 🔍 Semantic Search Engine
* 📚 all-MiniLM-L6-v2 Model

### Deployment & DevOps

* ▲ Vercel
* 🎨 Render
* 🚂 Railway
* ☁️ MongoDB Atlas
* 🐙 GitHub Actions

---

## 🤖 AI Model Information

### Chatbot Training Model

```text
all-MiniLM-L6-v2
```

Features:

✅ Semantic Search

✅ Context Understanding

✅ Natural Language Processing

✅ Tourism Information Retrieval

✅ Region-Specific Question Answering

---

## 🌐 Live Application

🚀 Explore the Project Here:

### https://smart-explore-mazhavr-nadu-ufp9.vercel.app/

---

## 📂 Project Structure

```text
Smart-Explorer-Mazhavar-Nadu/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── assets/
│   └── components/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── chatbot/
│   └── main.py
│
├── docs/
│   ├── deployment-env.md
│   └── production-runbook.md
│
├── scripts/
│   └── smoke_test.py
│
├── .github/
│   └── workflows/
│
└── README.md
```

---

## 🚀 Local Development Setup

### Clone Repository

```bash
git clone <repository-url>
cd Smart-Explorer-Mazhavar-Nadu
```

### Backend Setup

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

or

```bash
python backend/start_server.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📱 Mobile Testing

1️⃣ Start Backend Server

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

2️⃣ Start Frontend

```bash
npm run dev
```

3️⃣ Find Local IP Address

```bash
ipconfig
```

Example:

```text
192.168.1.25
```

4️⃣ Connect Mobile & PC to Same Wi-Fi

5️⃣ Open Browser:

```text
http://192.168.1.25:5173
```

---

## 🌍 Production Deployment

### ▲ Frontend Deployment (Vercel)

Build Command

```bash
npm run build
```

Publish Directory

```text
frontend/dist
```

Environment Variable

```env
VITE_API_BASE_URL=https://your-backend-domain
```

---

### ⚡ Backend Deployment (Render / Railway)

Start Command

```bash
uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

Required Environment Variables

```env
MONGO_URI=
JWT_SECRET_KEY=
QA_DATASET_PATH=
CORS_ALLOWED_ORIGINS=
```

Optional Variables

```env
GEMINI_API_KEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

## 🍃 Database Configuration

### MongoDB Atlas

* Create Atlas Cluster
* Configure Network Access
* Create Database User
* Obtain Connection String
* Update MONGO_URI

Required Collections:

```text
users
district_videos
```

---

## 🔒 Security Checklist

✅ Never commit .env files

✅ Use Secure JWT Secrets

✅ Enable HTTPS

✅ Restrict CORS Origins

✅ Rotate Exposed Credentials

✅ Secure MongoDB Access

---

## ⚙️ GitHub Actions Workflows

### 🧪 CI Pipeline

```text
.github/workflows/ci.yml
```

Features:

* Frontend Build Validation
* Backend Unit Testing
* Artifact Upload

---

### 🚀 Release Workflow

```text
.github/workflows/release.yml
```

Features:

* Release Candidate Validation
* Manual Production Approval
* Automated Release Process

---

### 🌙 Nightly Smoke Testing

```text
.github/workflows/nightly-smoke.yml
```

Features:

* Daily Health Monitoring
* Backend Availability Testing
* Deployment Verification

---

## 🎯 Project Objectives

🌍 Promote Regional Tourism

🏛️ Preserve Cultural Heritage

🤖 Integrate Artificial Intelligence

📚 Educate Users About Mazhavar Nadu

📱 Provide Modern Digital Accessibility

🚀 Encourage Regional Development

---

## 👨‍💻 Developer

### Madhavaraj P

🎓 M.Sc Computer Science

🏫 Government Arts College (Autonomous), Salem – 7

💻 MERN Stack & Python Developer

🌍 Regional Innovation Enthusiast

---

## 🔗 Project Links

🌐 Live Website

https://smart-explore-mazhavr-nadu-ufp9.vercel.app/

📂 GitHub Repository

https://github.com/madhavaraj-2004

---

## ⭐ Support The Project

If you found this project useful:

⭐ Star the Repository

🍴 Fork the Repository

🚀 Contribute to Development

📢 Share with Others

---

<div align="center">

# ❤️ Proudly Built for Mazhavar Nadu

### 🌍 Connecting Heritage, Tourism & Technology Through AI 🤖

</div>
