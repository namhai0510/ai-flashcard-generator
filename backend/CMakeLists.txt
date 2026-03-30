cmake_minimum_required(VERSION 3.15)
project(FlashcardBackend)

set(CMAKE_CXX_STANDARD 17)
set(VCPKG_TARGET_TRIPLET "x64-mingw-dynamic" CACHE STRING "")

find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(cpr CONFIG REQUIRED)

add_executable(app src/main.cpp)

# LIÊN KẾT CÁC THƯ VIỆN
target_link_libraries(app PRIVATE 
    Crow::Crow 
    nlohmann_json::nlohmann_json 
    cpr::cpr
    ws2_32      # Các hàm socket cơ bản
    mswsock     # Giải quyết lỗi AcceptEx
    crypt32     # Cho HTTPS và bảo mật
)