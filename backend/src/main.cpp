#include "crow.h"
#include <nlohmann/json.hpp>

int main() {
    crow::SimpleApp app;

    // Route kiểm tra trạng thái
    CROW_ROUTE(app, "/health")([](){
        return "Backend is Healthy!";
    });

    // Route trả về JSON mẫu
    CROW_ROUTE(app, "/test-json")([](){
        nlohmann::json j;
        j["status"] = "connected";
        j["message"] = "Hello from C++ Backend!";
        return j.dump();
    });

    CROW_ROUTE(app, "/")([](){
        return "Chao mung ban den voi Backend Flashcard!";
    });

    app.port(8080).multithreaded().run();
}