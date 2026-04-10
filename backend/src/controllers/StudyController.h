#pragma once
#include "crow.h"
#include "../engine/FlashcardModel.h" // Đảm bảo file này định nghĩa Flashcard và StudySession
#include <map>
#include <string>

class StudyController {
public:
    // Thêm phạm vi namespace rõ ràng nếu cần
    static std::map<std::string, StudySession> activeSessions;

    static crow::response startStudy(const crow::request& req);
    static crow::response submitAnswer(const crow::request& req);
};