#include "FlashcardController.h"
#include "../services/AIService.h"

crow::response generateFlashcards(const crow::request& req) {
    auto body = crow::json::load(req.body);

    crow::json::wvalue res;

    // Validate input
    if (!body || !body.has("text")) {
        res["success"] = false;
        res["message"] = "Invalid input";
        return crow::response(400, res);
    }

    std::string text = body["text"].s();

    // Gọi service
    auto cards = AIService::generate(text);

    res["success"] = true;
    res["data"]["cards"] = std::move(cards);

    return crow::response(res);
}