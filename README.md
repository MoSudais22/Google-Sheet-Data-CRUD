📌 Google Sheets CRUD App
This project is a full-stack CRUD application that integrates Google Sheets API with a React frontend and an Express.js backend. It allows users to add, update, delete, and retrieve data stored in a Google Sheets spreadsheet.

🔹 Tech Stack:
Frontend: React.js
Backend: Node.js, Express.js
Database: Google Sheets (via Google Sheets API)
📦 Installation Guide
1️⃣ Backend Setup (Express + Google Sheets API)
📌 Navigate to the backend folder

cd google-sheets-backend
📌 Install required dependencies

npm install express cors dotenv googleapis
📌 Run the backend server

node server.js
The server will run at http://localhost:5000.

2️⃣ Frontend Setup (React)
📌 Navigate to the frontend folder


cd google-sheets-frontend
📌 Install required dependencies

npm install axios
📌 Run the React app

bash
Copy
Edit
npm start
The frontend will be available at http://localhost:3000.

🔹 Features:
✅ Fetch data from Google Sheets
✅ Add new entries
✅ Update existing entries
✅ Delete entries

⚠️ Important Notes:
Google Service Account JSON file (your-service-account.json) is required but should NOT be pushed to GitHub.
Share the Google Sheet with the service account email to allow access.
🚀 Run the backend on http://localhost:5000 and frontend on http://localhost:3000.
