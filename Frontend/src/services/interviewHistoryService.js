import api from "./api";

/**
 * Fetch paginated interview history for the logged-in user.
 * @param {Object} params – search, interviewType, difficulty, dateFrom, dateTo, page, limit, sort
 */
export const getHistories = (params = {}) =>
  api.get("/interview-history", { params });

/**
 * Fetch a single session with full Q&A detail.
 * @param {string} id – MongoDB ObjectId
 */
export const getHistoryById = (id) =>
  api.get(`/interview-history/${id}`);

/**
 * Permanently delete a session (user must own it).
 * @param {string} id – MongoDB ObjectId
 */
export const deleteHistory = (id) =>
  api.delete(`/interview-history/${id}`);
