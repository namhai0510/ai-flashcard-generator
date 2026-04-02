#pragma once

#include "crow.h"
#include <string>

class AIService {
public:
    static crow::json::wvalue generate(const std::string& text);
};