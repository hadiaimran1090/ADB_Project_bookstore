# MERN_Project_bookstore

**Frontend Setup Steps**
Clone or unzip the project folder.

Open terminal and navigate to frontend:
cd frontend

Create .env.local in the root of the frontend (where package.json is).

**Paste your Firebase config into .env.local:**
VITE_API_KEY="AIzaSyCXvDIC4MPrkaMdeg_O2iij88wLpfj3qBA"
VITE_Auth_Domain="book-store-mern-app.firebaseapp.com"
VITE_PROJECT_ID="book-store-mern-app"
VITE_STORAGE_BUCKET="book-store-mern-app.appspot.com"
VITE_MESSAGING_SENDERID="205632822247"
VITE_APPID="1:205632822247:web:b0db0ec66bf6de0bbb3b42"

**Run the following command to install frontend dependencies:**
npm install
Start the frontend development server:
npm run dev

🛠️ **Backend Setup Steps**
Clone or unzip the project folder.
Open terminal and navigate to backend:

cd backend
**Run this command to install backend dependencies:**
npm install
**Create .env in the root of the backend (same level as package.json).**

Paste  your environment variables into .env:

DB_URL="mongodb+srv://helpyourassistant:pqam0Mwv3Vwv8Off@cluster0.qc3bq.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0"

JWT_SECRET_KEY="bc992a20cb6706f741433686be814e3df45e57ea1c2fc85f9dbb0ef7df12308a669bfa7c976368ff32e32f6541480ce9ec1b122242f9b1257ab669026aeaf16"
Make sure your MongoDB cluster is setup and the URL is correct.

**Start the backend server:**
npm run start:dev
Let me know if you want this in .md file format or need Docker setup steps too.
