# AI Flashcard Generator (C++ Backend)

## 🚀 Overview

This project is a C++ backend for an AI-powered flashcard generator.
It uses the **Crow C++ web framework** and is built with **CMake**.

---

## 🧰 Requirements

Before running the project, make sure you have:

* CMake ≥ 3.20
* C++17 compatible compiler (MSVC / GCC / Clang)
* Git
* (Optional) vcpkg installed

---

## 📦 Dependencies

* Crow (fetched automatically via CMake FetchContent)
* Threads (system)

👉 You **do NOT need to install Crow manually**.

---

## ⚙️ Setup & Build

### 1. Clone repository

```bash
git clone <your-repo-url>
cd ai-flashcard-generator
```

---

### 2. Create build folder

```bash
mkdir build
cd build
```

---

### 3. Run CMake

```bash
cmake ..
```

👉 This step will:

* Download Crow automatically
* Configure the project
* Generate build files

---

### 4. Build project

```bash
cmake --build .
```

---

## ▶️ Run

After build:

### On Windows (MSVC)

```bash
./AI_Flashcard_Backend.exe
```

---

## 📁 Project Structure

```
ai-flashcard-generator/
│
├── src/                # Source code
├── build/              # Build output (ignored)
├── CMakeLists.txt
└── README.md
```

---

## ⚠️ Notes

* Do NOT commit the `/build` folder
* Crow is fetched at configure time → internet required on first build
* If errors occur, try deleting `/build` and re-running CMake

---

## 🧠 Tech Stack

* C++17
* Crow (C++ Web Framework)
* CMake

---

## 📌 Future Improvements

* Add database integration (Redis / PostgreSQL)
* API authentication
* AI integration (OpenAI / local models)

---
