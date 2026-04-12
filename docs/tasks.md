# 📋 Task Breakdown – AI Flashcard Generator

## 🧱 Phase 1 – Core Data

* [ ] 1.1 Define Flashcard
* [ ] 1.2 Define CardState
* [ ] 1.3 Define Session
* [ ] 1.4 Time Utils

---

## 🧠 Phase 2 – SM-2 Logic

* [ ] 2.1 Score Input
* [ ] 2.2 Reset Logic
* [ ] 2.3 Interval Calculation
* [ ] 2.4 Ease Update
* [ ] 2.5 Next Due Calculation
* [ ] 2.6 Full SM-2 Integration

---

## 🔁 Phase 3 – Scheduler

* [ ] 3.1 Priority Queue
* [ ] 3.2 Add Review Card
* [ ] 3.3 New Card Pool
* [ ] 3.4 Get Next Review Card
* [ ] 3.5 Get New Card
* [ ] 3.6 Mixing Logic
* [ ] 3.7 Update After Answer
* [ ] 3.8 Session Loop

---

## ⏱️ Phase 4 – Session Control

* [ ] 4.1 Start Session
* [ ] 4.2 Timer Logic
* [ ] 4.3 Duration Options
* [ ] 4.4 Progress Tracking
* [ ] 4.5 End Session

---

## 📁 Phase 5 – JSON Storage

* [ ] 5.1 JSON Setup
* [ ] 5.2 Serialize Flashcard
* [ ] 5.3 Deserialize Flashcard
* [ ] 5.4 Save Session
* [ ] 5.5 Load Session
* [ ] 5.6 Temp File Handling

---

## 🤖 Phase 6 – AI Generation

* [ ] 6.1 HTTP Client
* [ ] 6.2 Prompt Template
* [ ] 6.3 Call AI API
* [ ] 6.4 Parse Response
* [ ] 6.5 Validate Output
* [ ] 6.6 Limit Cards

---

## 🌐 Phase 7 – API (Crow)

* [ ] 7.1 Init Server
* [ ] 7.2 /ping endpointa
* [ ] 7.3 /content/upload
* [ ] 7.4 /flashcards/generate
* [ ] 7.5 /study/start
* [ ] 7.6 /study/next
* [ ] 7.7 /study/answer
* [ ] 7.8 Session Memory

---

## 🔗 Phase 8 – Integration

* [ ] 8.1 AI → Flashcards
* [ ] 8.2 Flashcards → Session
* [ ] 8.3 API → Engine
* [ ] 8.4 Full Flow Test

---

## 🔐 Full-stack Authentication (Phase 8.6)

### Frontend (React)
- [ ] Create an Auth layout with a modern, glassmorphism design.
- [ ] Implement Login/Signup form toggle with smooth transitions.
- [ ] Setup Axios interceptors to include JWT in header for authorized requests.

### Backend (C++ Crow)
- [ ] Implement User Schema in PostgreSQL (id, username, email, password_hash, created_at).
- [ ] Setup password hashing logic using a secure library.
- [ ] Create `/api/auth/signup` and `/api/auth/login` endpoints.
- [ ] Implement JWT generation for successful logins.

## 🤖 AI Mentor UI Integration (Phase 8.7)
- [ ] Design/Source a robot mascot asset (leaning/peeking pose).
- [ ] Position the mascot overlapping the right edge of the Session Result Modal.
- [ ] Implement an animated Speech Bubble for proactive suggestions based on SM-2 data.

---

## 🧪 Phase 9 – Testing

* [ ] 9.1 Empty Input
* [ ] 9.2 All Wrong
* [ ] 9.3 All Correct
* [ ] 9.4 Large Input
* [ ] 9.5 Timer Test

