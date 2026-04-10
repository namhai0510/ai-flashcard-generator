#include "FlashcardController.h"
#include "../services/AIService.h"

crow::response FlashcardController::generateFlashcards(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body || !body.has("text")) return crow::response(400, "Missing text");

    std::string userInput = body["text"].s();
    
    // Gọi service xử lý
    crow::json::wvalue result = AIService::generate(userInput);

    return crow::response(std::move(result));
}