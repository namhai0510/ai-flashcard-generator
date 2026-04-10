#include "StudyController.h"
#include "../engine/SM2Engine.h"

// Định nghĩa static member
std::map<std::string, StudySession> StudyController::activeSessions;

crow::response StudyController::startStudy(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body || !body.has("flashcards")) {
        return crow::response(400, "Missing flashcards field");
    }

    StudySession newSession;
    newSession.sessionId = "session_001"; 
    newSession.currentIndex = 0; // QUAN TRỌNG: Phải khởi tạo index về 0

    try {
        for (auto& item : body["flashcards"]) {
            Flashcard card;
            card.question = item["question"].s();
            card.answer = item["answer"].s();
            // Khởi tạo các giá trị mặc định cho SM2
            card.interval = 0;
            card.ease = 2.5f;
            card.repetitions = 0;
            newSession.cards.push_back(card);
        }

        activeSessions[newSession.sessionId] = newSession;
        
        crow::json::wvalue res;
        res["status"] = "started";
        res["sessionId"] = newSession.sessionId;
        res["total_cards"] = (int)newSession.cards.size();
        return crow::response(res);
    } catch (const std::exception& e) {
        return crow::response(500, "Data parsing error");
    }
}

crow::response StudyController::submitAnswer(const crow::request& req) {
    auto body = crow::json::load(req.body);
    
    if (!body || !body.has("sessionId") || !body.has("score")) {
        return crow::response(400, "Missing sessionId or score");
    }

    std::string sId = body["sessionId"].s();
    int quality = (int)body["score"].i(); // Ép kiểu sang int

    if (activeSessions.find(sId) == activeSessions.end()) {
        return crow::response(404, "Session not found");
    }

    // Dùng con trỏ hoặc reference để chỉnh sửa trực tiếp trong map
    StudySession& session = activeSessions[sId];
    
    if (session.currentIndex >= session.cards.size()) {
        return crow::response(400, "Session already finished");
    }

    Flashcard& currentCard = session.cards[session.currentIndex];

    // Tính toán SM-2
    SM2Result nextState = SM2Engine::calculate(
        quality, 
        currentCard.interval, 
        currentCard.repetitions, 
        currentCard.ease
    );

    // Cập nhật thẻ
    currentCard.interval = nextState.interval;
    currentCard.ease = nextState.ease;
    currentCard.repetitions = nextState.repetitions;

    // Mixing Logic
    if (quality < 3) {
        session.cards.push_back(currentCard); // Đẩy card lỗi xuống cuối list
    }

    session.currentIndex++;

    crow::json::wvalue res;
    if (session.currentIndex >= session.cards.size()) {
        res["status"] = "finished";
        activeSessions.erase(sId); // Xóa session khi hoàn thành để giải phóng RAM
    } else {
        res["status"] = "next";
        res["next_card"]["question"] = session.cards[session.currentIndex].question;
    }

    return crow::response(res);
}