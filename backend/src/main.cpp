#include "crow.h"
#include "crow/middlewares/cors.h"
#include "controllers/FlashcardController.h"

int main() {
    crow::App<crow::CORSHandler> app;

    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global()
        .origin("http://localhost:5173")
        .methods("POST"_method, "GET"_method, "OPTIONS"_method)
        .headers("Content-Type", "Authorization")
        .allow_credentials();

    // Route gọi controller
    CROW_ROUTE(app, "/generate").methods("POST"_method)
    ([](const crow::request& req) {
        return generateFlashcards(req);
    });

    CROW_ROUTE(app, "/ping")([](){
        crow::json::wvalue res;
        res["message"] = "pong";
        return crow::response(res);
    });

    app.port(8080).multithreaded().run();
}