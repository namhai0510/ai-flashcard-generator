#include "crow.h"
#include "crow/middlewares/cors.h"
#include "controllers/FlashcardController.h"
#include "controllers/StudyController.h"
#include <iostream>

int main() {
    // Khởi tạo App với Middleware CORS
    crow::App<crow::CORSHandler> app;

    // =========================
    // CẤU HÌNH CORS (NÂNG CAO)
    // =========================
    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global()
        .origin("http://localhost:5173") 
        .methods("POST"_method, "GET"_method, "OPTIONS"_method) // Cho phép OPTIONS cực kỳ quan trọng
        .headers("Content-Type", "Authorization", "Accept")    // Thêm Accept header
        .allow_credentials();

    // =========================
    // HEALTH CHECK
    // =========================
    CROW_ROUTE(app, "/ping")([](){
        return crow::response(200, "pong");
    });

    // =========================
    // MAIN API ROUTE: /generate
    // =========================
    CROW_ROUTE(app, "/generate")
    .methods("POST"_method, "OPTIONS"_method)
    ([&](const crow::request& req) {
        if (req.method == "OPTIONS"_method) return crow::response(204);

        if (req.body.empty()) {
            return crow::response(400, "Body is empty");
        }

        try {
            // Log nội dung để kiểm tra đầu vào từ Frontend
            auto body = crow::json::load(req.body);
            if (!body || !body.has("text")) {
                return crow::response(400, "Missing 'text' field");
            }
            std::string text = body["text"].s();
            std::cout << "Generating flashcards for: " << body["text"].s() << std::endl;

            // FlashcardController sẽ gọi AIService nội bộ
            return FlashcardController::generateFlashcards(req);
        }
        catch (const std::exception& e) {
            std::cerr << "Error: " << e.what() << std::endl;
            return crow::response(500, "Internal Server Error");
        }
    });

    // =========================
    // STUDY ROUTES
    // =========================
    CROW_ROUTE(app, "/study/start")
    .methods("POST"_method, "OPTIONS"_method)
    ([&](const crow::request& req) {
        if (req.method == "OPTIONS"_method) return crow::response(204);
        return StudyController::startStudy(req);
    });

    CROW_ROUTE(app, "/study/answer")
    .methods("POST"_method, "OPTIONS"_method)
    ([&](const crow::request& req) {
        if (req.method == "OPTIONS"_method) return crow::response(204);
        return StudyController::submitAnswer(req);
    });

    // Chạy server trên port 8080
    std::cout << "Server is running on http://localhost:8080" << std::endl;
    app.port(8080).multithreaded().run();
}