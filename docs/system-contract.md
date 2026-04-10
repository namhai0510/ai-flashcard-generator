# 🧠 SYSTEM CONTRACT – AI Flashcard Generator

## 1. CORE DATA MODEL

### Flashcard
{
  question: string,
  answer: string
}

---

## 2. API CONTRACT

### POST /upload

Request:
- file: multipart/form-data

Response (ONLY VALID FORMAT):

{
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}

---

## 3. RULES (CRITICAL)

- MUST ALWAYS return "flashcards"
- NEVER return "data"
- NEVER return raw array
- NEVER return null or undefined flashcards

---

## 4. ERROR FORMAT

If failure:

{
  "error": "string message"
}

## 5. BACKEND RESPONSE RULE

All endpoints MUST return:

- success response:
{
  "flashcards": [...]
}

- error response:
{
  "error": "string"
}