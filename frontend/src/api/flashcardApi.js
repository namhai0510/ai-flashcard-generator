// src/api/flashcardApi.js
import apiClient from './axios';

// Centralized routes
const ROUTES = {
  GENERATE: '/generate',
  HISTORY: '/history',
  DELETE: (id) => `/flashcard/${id}`,
};

// Generate flashcards
export const generateFlashcards = (payload) => {
  if (!payload || !payload.text) {
    throw new Error('Payload must contain text');
  }
  return apiClient.post(ROUTES.GENERATE, payload);
};

// Get history
export const getFlashcardHistory = () => {
  return apiClient.get(ROUTES.HISTORY);
};

// Delete flashcard
export const deleteFlashcard = (id) => {
  if (!id) {
    throw new Error('Flashcard ID is required');
  }
  return apiClient.delete(ROUTES.DELETE(id));
};