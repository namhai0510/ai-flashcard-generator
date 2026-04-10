#include "AIService.h"
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include <iostream>

using json = nlohmann::json;

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* userp) {
    userp->append((char*)contents, size * nmemb);
    return size * nmemb;
}

crow::json::wvalue AIService::generate(const std::string& text) {
    CURL* curl;
    CURLcode res;
    std::string readBuffer;
    
    // FIX 1: Khởi tạo finalResult với mảng rỗng ngay lập tức để tránh trả về 'null'
    crow::json::wvalue finalResult;
    finalResult["flashcards"] = crow::json::wvalue::list();

    curl = curl_easy_init();
    if(curl) {
        // Hãy đảm bảo API Key này còn hiệu lực và đã bật Gemini API trong Google AI Studio
        std::string apiKey = "AIzaSyCE9wpK5n-AQsmWl_Jw6oBZvpW8n70xHXU"; 
        std::string url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        json payload = {
            {"contents", json::array({
                {{"parts", json::array({
                    {{"text", "You are a flashcard assistant. Generate flashcards for the following text. "
                            "Return ONLY a JSON object with the format: "
                            "{\"flashcards\": [{\"question\": \"...\", \"answer\": \"...\"}]}. "
                            "Text: " + text}}
                })}}
            })}
        };
        std::string data = payload.dump();

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);

        if(res == CURLE_OK) {
            try {
                // FIX 2: Quan sát log này trong Terminal để xem Gemini có thực sự trả về data không
                std::cout << "--- GEMINI RAW RESPONSE ---\n" << readBuffer << "\n-----------------------" << std::endl;
                auto aiData = json::parse(readBuffer);

                if (aiData.contains("candidates") && !aiData["candidates"].empty()) {
                    // Kiểm tra cấu trúc an toàn để tránh crash
                    if (aiData["candidates"][0].contains("content") && 
                        !aiData["candidates"][0]["content"]["parts"].empty()) {
                        
                        std::string content = aiData["candidates"][0]["content"]["parts"][0]["text"];

                        // Fix lỗi Markdown
                        size_t startPos = content.find('{');
                        size_t endPos = content.find_last_of('}');
                        if (startPos != std::string::npos && endPos != std::string::npos) {
                            content = content.substr(startPos, endPos - startPos + 1);
                        }

                        auto flashcardJson = json::parse(content);
                        if (flashcardJson.contains("flashcards") && flashcardJson["flashcards"].is_array()) {
                            int i = 0;
                            for (auto& item : flashcardJson["flashcards"]) {
                                finalResult["flashcards"][i]["question"] = item.value("question", "N/A");
                                finalResult["flashcards"][i]["answer"] = item.value("answer", "N/A");
                                i++;
                            }
                        }
                    }
                } else if (aiData.contains("error")) {
                    std::cerr << "Gemini Error: " << aiData["error"]["message"] << std::endl;
                }
            } catch (const std::exception& e) {
                std::cerr << "Lỗi xử lý JSON Gemini: " << e.what() << std::endl;
            }
        } else {
            std::cerr << "CURL Error: " << curl_easy_strerror(res) << std::endl;
        }
    }
    return finalResult;
}