# Trip Planner Pro - Frontend

The frontend of Trip Planner Pro is a React application that provides an interactive interface for users to plan trips, visualize routes on a Mapbox map, and download PDF logs. It communicates with the Django backend API and is deployed on Vercel.

## Deployed URL
- **Frontend:** [https://travel-planner-fend.vercel.app](https://travel-planner-fend.vercel.app)
- **Demo Credentials:** Username: `admin`, Password: `admin123`

## Features
- **Trip Planning Form:** Input current location, pickup, dropoff, and cycle hours.
- **Map Visualization:** Displays routes and stops using Mapbox GL JS.
- **PDF Download:** Downloads trip logs generated by the backend.
- **Authentication:** Login/logout with JWT tokens stored in local storage.
- **Responsive UI:** Built with Material-UI for a polished look.

## Prerequisites
- **Node.js 18+**: Required for React and npm.
- **Git**: For version control.
- **Vercel Account**: For deployment.
- **Mapbox Access Token**: Same as backend, used for map rendering (sign up at [Mapbox](https://www.mapbox.com)).

## Project Structure
```
travelplannerfend/
├── src/                  # React source code
│   ├── components/       # Reusable components (e.g., Dashboard.js, Login.js)
│   ├── slices/           # Redux slices (e.g., tripSlice.js)
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── public/               # Static assets
│   ├── index.html        # HTML template
│   └── favicon.ico       # App icon
├── package.json          # Node.js dependencies
├── vercel.json           # Vercel configuration (optional)
└── build/                # Compiled output (after build)
```

## Local Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/travel-planner-frontend.git
cd travel-planner-frontend
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the `frontend/` directory (not committed to Git):
```text
REACT_APP_API_URL=http://localhost:8000
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
```
`.env` is ignored by `.gitignore`.

### Run the Development Server
```bash
npm start
```
- Access at [http://localhost:3000](http://localhost:3000).
- Ensure the backend is running at [http://localhost:8000](http://localhost:8000).

## Deployment on Vercel

### Prepare the Repository
Ensure `.gitignore` excludes `.env`:
```text
.env
node_modules/
build/
*.log
.DS_Store
```
Commit changes:
```bash
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push origin main
```

### Set Up Vercel

#### Install Vercel CLI
```bash
npm install -g vercel
```
#### Deploy locally
```bash
vercel
```
Configure:
- **Framework**: Create React App
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `build`

### Environment Variables
In **Vercel > Project Settings > “Environment Variables”**, add:
```text
REACT_APP_API_URL=https://travel-planner-backend-savs.onrender.com
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
```

### Deploy to Production
```bash
vercel --prod
```
- Access at [https://travel-planner-fend.vercel.app](https://travel-planner-fend.vercel.app).

## Update Backend CORS
Ensure the backend allows the Vercel domain:
```python
# backend/backend/settings.py
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://travel-planner-fend.vercel.app',
]
```
Redeploy the backend if changed.

## Usage
- **Access the App:** Visit [https://travel-planner-fend.vercel.app](https://travel-planner-fend.vercel.app).
- **Navigate to login:** Visit [https://travel-planner-fend.vercel.app](https://travel-planner-fend.vercel.app/login/).
- **Log In:** Use `admin / admin123` to authenticate.
- **Plan a Trip:**
  - Fill out the form (e.g., Current: Chicago, Pickup: St Louis, Dropoff: Dallas, Cycle Used: 20).
  - Click “Plan Trip” to see the route and download logs.

## Technologies
- **React**: UI framework
- **Redux**: State management
- **Axios**: HTTP requests
- **Mapbox GL JS**: Map rendering
- **Material-UI**: Component library
- **Vercel**: Hosting platform
---
This README provides a complete guide for the frontend of Trip Planner Pro. 🚀
