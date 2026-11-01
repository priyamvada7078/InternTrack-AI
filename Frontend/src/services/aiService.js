
import api from "./api";

// Fetch AI-generated career insights
export const getCareerInsights = async () => {
  const response = await api.get("/ai/insights");
  return response.data.data;
};

// Generate AI interview questions
export const generateInterviewQuestions = async ({
  role,
  company = "",
  interviewType = "Mixed",
  difficulty = "Intermediate",
}) => {
  const response = await api.post("/ai/interview/questions", {
    role,
    company,
    interviewType,
    difficulty,
  });

  return response.data.data;
};

// Evaluate candidate's interview answer
export const evaluateInterviewAnswer = async ({
  question,
  expectedPoints = [],
  answer,
  role,
  difficulty = "Intermediate",
}) => {
  const response = await api.post("/ai/interview/evaluate", {
    question,
    expectedPoints,
    answer,
    role,
    difficulty,
  });

  return response.data.data;
};

// Generate AI-powered interview performance report
export const generateInterviewReport = async ({
  role,
  company = "",
  difficulty = "Intermediate",
  evaluations,
}) => {
  const response = await api.post("/ai/interview/report", {
    role,
    company,
    difficulty,
    evaluations,
  });

  return response.data.data;
};
// Save completed interview to MongoDB
export const saveInterview = async ({
  role,
  company = "",
  interviewType = "Mixed",
  difficulty = "Intermediate",
  evaluations,
  averageScore,
  report,
}) => {
  const response = await api.post("/interviews", {
    role,
    company,
    interviewType,
    difficulty,
    evaluations,
    averageScore,
    report,
  });

  return response.data;
};

// Get logged-in user's interview history
export const getInterviewHistory = async () => {
  const response = await api.get("/interviews");
  return response.data.data;
};

// Get a particular interview by ID
export const getInterviewById = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data.data;
};