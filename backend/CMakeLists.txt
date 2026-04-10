cmake_minimum_required(VERSION 3.20)
project(AI_Flashcard_Backend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Hỗ trợ UTF-8 cho MSVC (nếu bạn đổi sang dùng Visual Studio sau này)
if(MSVC)
    add_compile_options(/utf-8)
endif()

add_definitions(-D_WIN32_WINNT=0x0601)

# ==========================================
# TÌM KIẾM CÁC GÓI ĐÃ CÓ TRONG VCPKG
# ==========================================
find_package(CURL REQUIRED)
find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(Threads REQUIRED)

# ==========================================
# CẤU HÌNH SOURCE CODE
# ==========================================
set(SOURCES
    src/main.cpp
    src/controllers/FlashcardController.cpp
    src/controllers/StudyController.cpp
    src/services/AIService.cpp
)

add_executable(${PROJECT_NAME} ${SOURCES})

# ==========================================
# LINKING
# ==========================================
target_link_libraries(${PROJECT_NAME}
    PRIVATE
    Crow::Crow
    nlohmann_json::nlohmann_json
    Threads::Threads
    CURL::libcurl
)

# Thêm các thư viện hệ thống cần thiết cho Networking trên Windows
if(WIN32)
    target_link_libraries(${PROJECT_NAME}
        PRIVATE
        ws2_32
        mswsock
        crypt32
        wldap32
        normaliz
    )
endif()