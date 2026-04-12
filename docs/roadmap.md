# 🚀 Roadmap – AI Flashcard Generator

## 🎯 Goal

Build an AI-powered flashcard learning system with session-based repetition (5–60 minutes), using C++ backend (Crow) and AI-generated content.

---

## 🗓️ Timeline (30 days)

### Phase 1 – Setup (Day 1–2)

* CMake + Crow + Asio working
* Basic server running

### Phase 2 – AI Flashcard Generation (Day 3–6)

* Upload content
* Generate flashcards using AI

### Phase 3 – Session Engine (Day 7–12)

* SM-2 modified algorithm
* Scheduler system

### Phase 4 – Session Control (Day 13–15)

* Timer
* Progress tracking

### Phase 5 – Storage (Day 16–17)

* JSON save/load

### Phase 6 – Frontend MVP (Day 18–22)

* Upload + study UI

### Phase 7 – Advanced UX (Day 23–25)

* Flip card
* Timer UI

### Phase 8 – Testing (Day 26–30)

* Edge cases
* Performance

---

## 🧠 Key Features

* AI-generated flashcards
* Session-based learning (no database)
* Smart repetition (SM-2 modified)
* Flip-card UX

---

## ⚠️ Notes

* No long-term memory tracking
* Focus on intensive learning sessions

---

## 🛠️ Advanced Extensions (Adaptive AI Mentor)
### Phase 9 – Persistent Infrastructure & Sync (Day 31–35)
* Docker Orchestration: Containerize the system with docker-compose to run Crow, PostgreSQL, and Elasticsearch 8.x in parallel.
* Relational Schema: Design PostgreSQL tables for Users, Flashcards, and StudyLogs to move away from volatile JSON storage.
* Dual-Write Pipeline: Implement a repository pattern in C++ to sync every study event (Correct/Incorrect) to both PostgreSQL (for safety) and Elasticsearch (for analytics).

### Phase 10 – Knowledge Gap Analytics (Day 36–40)
* Automated Taxonomy: Update AI prompts to return structured Topic and Sub-topic metadata for every generated flashcard.
* ES Aggregations: Develop Elasticsearch queries to calculate "Knowledge Gaps" by aggregating error_rate over specific time windows (e.g., 7-day rolling average).
* Weakness Mapping: Identify topics where (error_count / total_views) > 0.6 to trigger automated intervention.

### Phase 11 – RAG & Personalized Mentoring (Day 41–47)
* Vector Embeddings: Integrate an embedding model (e.g., OpenAI text-embedding-3-small or Local Sentence-BERT) to convert cards into 1536-dimensional vectors.
* Semantic Retrieval: Build a Hybrid Search engine in Elasticsearch that retrieves cards based on both keyword matching and semantic similarity.
* RAG Prompt Engineering: Construct the "AI Mentor" prompt:
* Context: "User is struggling with [Topic X]. Past errors include cards [A, B, C]. Relevant successful context includes [D]."
* Goal: Generate a personalized 2-minute lecture to bridge the gap.

### Phase 12 – Insights Dashboard (Day 48–50)
* Visualizing Knowledge: Implement a Radar Chart or Heatmap in React to show the user's mastery levels across different subjects.
* Mentor Sidebar: Add a "Help me understand" button in the Study UI that triggers the RAG pipeline when a user hits a difficult card.

## 🏗️ Updated Key Features (v2.0)
* Long-term Mastery Tracking: Moves beyond "sessions" to track knowledge retention over weeks/months.
* Semantic Deduplication: ES prevents the AI from generating redundant cards that are phrased differently but have the same meaning.
* Adaptive RAG Feedback: Real-time AI tutoring based on the specific context of your mistakes.
* Intelligent Search: Advanced retrieval that understands "What was that card about memory allocation?" even without exact keywords.

## 📐 Extension Architecture Notes
* Abstraction: Use a DatabaseInterface in C++ so the main logic doesn't care if it's talking to Postgres, ES, or a Mock JSON file.
* Asynchronous Sync: Ensure that syncing to Elasticsearch happens on a background thread to prevent UI lag during study sessions.
* Embedding Cache: Store vectors in ES to avoid re-calling expensive AI embedding APIs for the same card multiple times.