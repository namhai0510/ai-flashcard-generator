import { useState } from 'react';
import { generateFlashcardService } from '../services/flashcardService';

export const useFlashcard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async (text) => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateFlashcardService(text);
      setCards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    cards,
    loading,
    error,
    generate,
  };
};