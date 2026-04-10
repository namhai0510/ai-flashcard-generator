#pragma once
#include <string>
#include <vector>
#include "crow.h"

struct Flashcard {
    std::string question;
    std::string answer;
    int interval = 0;
    float ease = 2.5f;
    int repetitions = 0;

    // Chuyển card thành JSON để lưu file hoặc gửi về frontend
    crow::json::wvalue to_json() const {
        crow::json::wvalue j;
        j["question"] = question;
        j["answer"] = answer;
        j["interval"] = interval;
        j["ease"] = ease;
        j["repetitions"] = repetitions;
        return j;
    }
};

struct StudySession {
    std::string sessionId;
    std::vector<Flashcard> cards;
    size_t currentIndex = 0; // Quản lý vị trí thẻ hiện tại trong phiên học
};