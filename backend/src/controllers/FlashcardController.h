#pragma once
#include "crow.h"

class FlashcardController {
public:
    static crow::response generateFlashcards(const crow::request& req);
};