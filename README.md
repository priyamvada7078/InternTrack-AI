# InternTrack-AI

An AI-powered internship tracking and interview preparation platform built with the MERN stack and Google Gemini.

InternTrack-AI helps students manage internship applications, monitor their progress, gain career insights, and prepare for technical and HR interviews through AI-powered assistance.

## Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</p>

---

## Overview

Managing internship applications, tracking application statuses, and preparing for interviews can become difficult when everything is handled separately.

**InternTrack-AI** brings these activities together in one platform. It allows users to maintain their internship records, monitor application progress, analyze their career activity, and practice interviews with AI-generated feedback.

The platform combines a MERN-based web application with Google Gemini to provide AI-assisted career and interview preparation features.

## Features

### 1. Internship Management

- Add and manage internship applications.
- Store company names, job roles, locations, application dates, and other relevant details.
- Track application statuses.
- Update and delete internship records.
- Maintain application information in MongoDB.

### 2. Dashboard

- View an overview of internship applications.
- Monitor application progress.
- Access important application information from one place.
- Track career-related activity.

### 3. Application Analytics

- Analyze internship application activity.
- Understand application status distribution.
- Monitor progress through dashboard analytics.
- Use saved application data to understand application trends.

### 4. AI Career Insights

Powered by Google Gemini.

- Analyze the user's saved internship application data.
- Generate personalized career insights.
- Identify application trends and areas that may need improvement.
- Provide actionable suggestions based on available internship records.

### 5. AI Interview Preparation

- Configure interview preparation based on job role.
- Optionally provide a company name.
- Select interview type: Technical, HR, or Mixed.
- Choose difficulty: Beginner, Intermediate, or Advanced.
- Generate interview questions using Google Gemini.
- Answer questions one at a time.
- Receive AI-powered answer evaluations.

### 6. Interview Evaluation

Each evaluated answer can include:

- Score
- Verdict
- Strengths
- Missing points
- Suggestions for improvement

### 7. Interview Report

After completing an interview, the platform generates a report containing:

- Overall summary
- Strong areas
- Weak areas
- Revision topics
- Action plan
- Final feedback
- Average interview score

### 8. Interview History

- Save completed interview sessions in MongoDB.
- Retrieve previous interview attempts.
- Keep interview records associated with the authenticated user.
- Access individual interview records using their IDs.

### 9. Authentication and Security

- User authentication using JSON Web Tokens (JWT).
- Password hashing using bcrypt.
- Protected API routes.
- User-specific internship and interview records.
- CORS configuration.
- Helmet security middleware.

---

## Application Architecture

```text
                  React Frontend
                        |
                        | Axios API Requests
                        |
                  Express Backend
                        |
              ---------------------
              |                   |
         REST APIs            AI Services
              |                   |
              |              Google Gemini
              |
          MongoDB Atlas
              |
       Persistent Storage
```

The frontend communicates with the backend through REST APIs. The backend handles authentication, business logic, database operations, and AI service integration.

## Project Structure

```text
InternTrack-AI/
│
├── Backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── health.controller.js
│   │   │   ├── internship.controller.js
│   │   │   ├── organization.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── ai.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── admin.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── logger.middleware.js
│   │   │   └── validation.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── internship.model.js
│   │   │   ├── organization.model.js
│   │   │   ├── user.model.js
│   │   │   └── interview.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── health.routes.js
│   │   │   ├── internship.routes.js
│   │   │   ├── organization.routes.js
│   │   │   ├── ai.routes.js
│   │   │   └── interview.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   └── validators/
│   │
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── applications/
│   │   │   ├── analytics/
│   │   │   ├── resume/
│   │   │   ├── interview/
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Google Gemini API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/priyamvada7078/InternTrack-AI.git
```

Navigate into the project:

```bash
cd InternTrack-AI
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory.

Add the following environment variables, using the exact variable names expected by your backend configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend using the script configured in `Backend/package.json`. For example:

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local Vite URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## AI Integration

InternTrack-AI uses the Google Gemini API through the backend.

AI-related operations are handled by backend services rather than exposing the Gemini API key in the frontend.

### AI Career Insights

The backend retrieves internship records belonging to the authenticated user and passes the relevant information to the AI service.

The generated response provides career insights based on the available application data.

### AI Interview Preparation

The interview preparation workflow follows these steps:

```text
Interview Configuration
          |
          v
Generate Questions
          |
          v
Answer Questions
          |
          v
Evaluate Each Answer
          |
          v
Generate Final Report
          |
          v
Save Interview in MongoDB
          |
          v
Interview History
```

The AI service generates questions, evaluates submitted answers, and creates a final report. Completed interview sessions are stored in MongoDB for future retrieval.

---

## API Overview

The backend exposes REST API routes for authentication, internship management, AI features, and interview history.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Check backend health |
| `/api/auth` | Various | Authentication operations |
| `/api/users` | Various | User-related operations |
| `/api/internships` | Various | Internship management |
| `/api/admin` | Various | Admin operations |
| `/api/ai/insights` | GET | Generate career insights |
| `/api/interviews` | POST | Save a completed interview |
| `/api/interviews` | GET | Retrieve interview history |
| `/api/interviews/:id` | GET | Retrieve an individual interview |

Protected endpoints require a valid authentication token.

---

## Database Design

The application uses MongoDB with Mongoose for data modeling.

### Main Collections

**Users**
- Stores user account information and authentication-related data.

**Internships**
- Stores internship application details.
- Associates application records with the user who created them.

**Organizations**
- Stores organization-related information.

**Interviews**
- Stores interview configuration, questions, evaluations, average score, and final report.
- Associates each interview with its authenticated user.

---

## Security Considerations

- Passwords are hashed before storage.
- JWT authentication protects private API routes.
- User-specific queries help ensure that users access their own records.
- Gemini API credentials are stored in backend environment variables.
- Helmet is used to add HTTP security headers.
- CORS is configured to control frontend-backend communication.

Never commit `.env` files, API keys, database credentials, or authentication secrets to GitHub.

---

## Deployment

The project has been deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

### Live Project

- **Frontend:** https://intern-track-ai-p078.vercel.app
- **Backend:** https://interntrack-ai-ab3q.onrender.com

Deployment availability may depend on the hosting service and its configuration.

---

## Future Enhancements

Some features that can be explored in future versions:

- AI-powered Resume Analyzer.
- Resume feedback based on a target job description.
- Skill-gap analysis and personalized learning recommendations.
- More detailed application analytics.
- Interview performance tracking across multiple attempts.
- Additional career planning features.

---

## Author

**Priyamvada**

B.Tech Information Technology  
KIET Group of Institutions

- **GitHub:** https://github.com/priyamvada7078
- **LinkedIn:** https://linkedin.com/in/priyamvada7078/

---

## License

This project is developed for learning, portfolio building, and educational purposes.
