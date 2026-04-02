#include "AIService.h"

crow::json::wvalue AIService::generate(const std::string& text) {
    crow::json::wvalue cards;

    cards[0]["question"] = "Generated from: " + text;
    cards[0]["answer"] = "This is AI response";

    cards[1]["question"] = "Example question?";
    cards[1]["answer"] = "Example answer";

    return cards;
}