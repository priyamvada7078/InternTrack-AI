
import { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  Building2,
  BriefcaseBusiness,
  Loader2,
  AlertCircle,
  MessageSquareText,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Target,
  Lightbulb,
  BookOpen,
} from "lucide-react";

import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewReport,
  saveInterview,
} from "../../services/aiService";

export default function InterviewPreparation() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    interviewType: "Mixed",
    difficulty: "Intermediate",
  });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock interview states
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [results, setResults] = useState([]);
  const [completed, setCompleted] = useState(false);

  // AI final report states
  const [report, setReport] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate interview questions
  const handleGenerateQuestions = async (e) => {
    e.preventDefault();

    if (!formData.role.trim()) {
      setError("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setQuestions([]);
      setPracticeStarted(false);
      setCompleted(false);
      setResults([]);
      setReport(null);

      const result = await generateInterviewQuestions({
        ...formData,
        role: formData.role.trim(),
        company: formData.company.trim(),
      });

      if (!Array.isArray(result.questions) || result.questions.length === 0) {
        throw new Error("No interview questions were generated.");
      }

      setQuestions(result.questions);
    } catch (err) {
      console.error("Interview preparation error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to generate interview questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Start practice
  const handleStartPractice = () => {
    setCurrentQuestionIndex(0);
    setAnswer("");
    setEvaluation(null);
    setResults([]);
    setCompleted(false);
    setReport(null);
    setError("");
    setPracticeStarted(true);
  };

  // Evaluate submitted answer
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please write your answer before submitting.");
      return;
    }

    try {
      setEvaluating(true);
      setError("");
      setEvaluation(null);

      const result = await evaluateInterviewAnswer({
        question: currentQuestion.question,
        expectedPoints: currentQuestion.expectedPoints || [],
        answer: answer.trim(),
        role: formData.role,
        difficulty: currentQuestion.difficulty || formData.difficulty,
      });

      setEvaluation(result);

      // Store complete evaluation for the final AI report
      setResults((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          score: result.score,
          verdict: result.verdict,
          strengths: result.strengths || [],
          missingPoints: result.missingPoints || [],
          suggestions: result.suggestions || [],
        },
      ]);
    } catch (err) {
      console.error("Answer evaluation error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to evaluate your answer. Please try again."
      );
    } finally {
      setEvaluating(false);
    }
  };

  // Move to next question or generate final report
  const handleNextQuestion = async () => {
  // Move to the next question if this isn't the last one
  if (currentQuestionIndex !== questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
    setAnswer("");
    setEvaluation(null);
    setError("");
    return;
  }

  try {
    setGeneratingReport(true);
    setError("");

    // Generate the final report only if it doesn't already exist
    const finalReport =
      report ||
      (await generateInterviewReport({
        role: formData.role,
        company: formData.company,
        difficulty: formData.difficulty,
        evaluations: results,
      }));

    setReport(finalReport);

    // Calculate the average score as a number
    const calculatedAverage =
      results.reduce((total, item) => total + item.score, 0) /
      results.length;

    // Save the completed interview in MongoDB
    await saveInterview({
      role: formData.role,
      company: formData.company,
      interviewType: formData.interviewType,
      difficulty: formData.difficulty,
      evaluations: results,
      averageScore: Number(calculatedAverage.toFixed(1)),
      report: finalReport,
    });

    // Show the completed screen after successful saving
    setCompleted(true);
  } catch (err) {
    console.error("Interview completion error:", err);

    setError(
      err.response?.data?.message ||
        "Your report could not be saved. Please try again."
    );
  } finally {
    setGeneratingReport(false);
  }
};

  // Restart practice
  const handleRestartPractice = () => {
    setCurrentQuestionIndex(0);
    setAnswer("");
    setEvaluation(null);
    setResults([]);
    setCompleted(false);
    setReport(null);
    setGeneratingReport(false);
    setError("");
  };

  // Reset entire page
  const handleReset = () => {
    setQuestions([]);
    setError("");
    setPracticeStarted(false);
    setCurrentQuestionIndex(0);
    setAnswer("");
    setEvaluation(null);
    setResults([]);
    setCompleted(false);
    setReport(null);
    setGeneratingReport(false);

    setFormData({
      role: "",
      company: "",
      interviewType: "Mixed",
      difficulty: "Intermediate",
    });
  };

  // Calculate average score locally
  const averageScore =
    results.length > 0
      ? (
          results.reduce((total, item) => total + item.score, 0) /
          results.length
        ).toFixed(1)
      : "0";

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-950">
            <BrainCircuit className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            AI Career Assistant
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Interview Preparation
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Prepare smarter with AI-generated questions and personalized
          interview feedback.
        </p>
      </div>

      {/* Configuration Form */}
      {!practiceStarted && !completed && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-indigo-50 p-2.5 dark:bg-indigo-950">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Configure your interview
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your preparation preferences
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateQuestions} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Job Role *
                </label>

                <div className="relative">
                  <BriefcaseBusiness className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. MERN Stack Developer Intern"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Company Name (Optional)
                </label>

                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Example Company"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Interview Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Interview Type
                </label>

                <select
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Technical">Technical</option>
                  <option value="HR">HR</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Difficulty Level
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Questions
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Generated Questions */}
      {questions.length > 0 && !practiceStarted && !completed && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your Interview Questions
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {questions.length} questions generated for {formData.role}
              </p>
            </div>

            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              AI Generated
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    Question {index + 1}
                  </span>

                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.category}
                  </span>

                  <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="flex items-start gap-2 text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                  <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                  {item.question}
                </h3>

                {Array.isArray(item.expectedPoints) &&
                  item.expectedPoints.length > 0 && (
                    <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        What a good answer should cover
                      </p>

                      <ul className="space-y-2">
                        {item.expectedPoints.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Start Practice */}
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <h2 className="text-xl font-bold">
                  Ready to test your knowledge?
                </h2>
                <p className="mt-2 text-sm text-indigo-100">
                  Answer each question and get personalized AI feedback.
                </p>
              </div>

              <button
                onClick={handleStartPractice}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Start Practice
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Mock Interview */}
      {practiceStarted && !completed && currentQuestion && (
        <div className="space-y-5">
          {/* Progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Mock Interview
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>

              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(
                  ((currentQuestionIndex + 1) / questions.length) * 100
                )}%
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                Question {currentQuestionIndex + 1}
              </span>

              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {currentQuestion.category}
              </span>

              <span className="rounded-lg bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                {currentQuestion.difficulty}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-relaxed text-slate-900 dark:text-white">
              {currentQuestion.question}
            </h2>

            {!evaluation && (
              <div className="mt-7 space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your Answer
                </label>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Explain your answer here. Try to include examples wherever possible..."
                  rows={7}
                  disabled={evaluating}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950"
                />

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tip: Explain the concept clearly and include a practical
                  example if possible.
                </p>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmitAnswer}
                  disabled={evaluating || !answer.trim()}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Gemini is evaluating your answer...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Submit Answer for Evaluation
                    </>
                  )}
                </button>
              </div>
            )}

            {/* AI Evaluation */}
            {evaluation && (
              <div className="mt-7 space-y-5">
                {/* Score */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/40">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                        Your AI Evaluation
                      </p>

                      <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                        {evaluation.verdict}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
                        {evaluation.score}
                      </span>
                      <span className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
                        / 10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    What you did well
                  </h3>

                  <ul className="space-y-2">
                    {evaluation.strengths?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Points */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Target className="h-5 w-5 text-amber-500" />
                    Concepts you missed
                  </h3>

                  <ul className="space-y-2">
                    {evaluation.missingPoints?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Suggestions to improve
                  </h3>

                  <ul className="space-y-2">
                    {evaluation.suggestions?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved Answer */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
                    <BookOpen className="h-5 w-5" />
                    Improved Interview Answer
                  </h3>

                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {evaluation.improvedAnswer}
                  </p>
                </div>

                {/* Next Question / Final Report */}
                <button
                  onClick={handleNextQuestion}
                  disabled={generatingReport}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {generatingReport ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating AI Performance Report...
                    </>
                  ) : currentQuestionIndex === questions.length - 1 ? (
                    <>
                      Generate Final Report
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final Performance Report */}
      {completed && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/40">
                <Trophy className="h-10 w-10 text-amber-500" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                Interview Completed!
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Here's your performance summary for {formData.role}.
              </p>
            </div>

            {/* Score Cards */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-indigo-50 p-5 text-center dark:bg-indigo-950/40">
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Average Score
                </p>

                <p className="mt-2 text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                  {averageScore}/10
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-5 text-center dark:bg-emerald-950/40">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Questions Evaluated
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                  {results.length}/{questions.length}
                </p>
              </div>
            </div>

            {/* Question-wise Performance */}
            <div className="mt-7">
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                Question-wise Performance
              </h3>

              <div className="space-y-3">
                {results.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Question {index + 1}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {item.verdict}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      {item.score}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Report */}
            {report && (
              <div className="mt-8 space-y-5">
                {/* Overall Summary */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/30">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
                    <Sparkles className="h-5 w-5" />
                    AI Interview Analysis
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {report.overallSummary}
                  </p>
                </div>

                {/* Strong Areas */}
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    Your Strong Areas
                  </h3>

                  <ul className="space-y-2">
                    {report.strongAreas?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weak Areas */}
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Target className="h-5 w-5 text-amber-500" />
                    Areas to Improve
                  </h3>

                  <ul className="space-y-2">
                    {report.weakAreas?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Revision Topics */}
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Topics to Revise
                  </h3>

                  <ul className="space-y-2">
                    {report.revisionTopics?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-300"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Plan */}
                <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
                  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Your Improvement Plan
                  </h3>

                  <ol className="list-decimal space-y-2 pl-5">
                    {report.actionPlan?.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 dark:text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Final Feedback */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
                  <h3 className="mb-3 font-bold text-emerald-700 dark:text-emerald-300">
                    Final Interviewer Feedback
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {report.finalFeedback}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRestartPractice}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <RotateCcw className="h-4 w-4" />
                Practice Again
              </button>

              <button
                onClick={handleReset}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Generate New Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
