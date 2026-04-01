#include "crow.h"
#include "crow/middlewares/cors.h"
#include <iostream>


int main() {
    // Khởi tạo app với Middleware CORS
    crow::App<crow::CORSHandler> app;

    // Cấu hình CORS cho phép Frontend gọi vào
    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors
      .global()
        .origin("http://localhost:5173") // Cổng của Frontend bạn đang chạy
        .methods("POST"_method, "GET"_method)
        .allow_credentials();

    CROW_ROUTE(app, "/")([](){
        return "AI FLASHCARD Backend is Ready!";
    });

    // Route trả về dữ liệu giả cho Frontend
    CROW_ROUTE(app, "/generate").methods("POST"_method)([](const crow::request& req){
        return crow::response(R"([{"term": "AI", "definition": "Tri tue nhan tao"}, {"term": "Backend", "definition": "Hau dai cua he thong"}])");
    });

    // Chạy ở cổng 8080 như log của bạn
    app.port(8080).multithreaded().run();
}