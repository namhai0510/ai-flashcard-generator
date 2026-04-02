cmake_minimum_required(VERSION 3.20)
project(AI_Flashcard_Backend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_definitions(-D_WIN32_WINNT=0x0601)

set(CMAKE_PREFIX_PATH "${CMAKE_CURRENT_SOURCE_DIR}/vcpkg_installed/x64-windows" ${CMAKE_PREFIX_PATH})

include(FetchContent)

set(CROW_USE_BOOST OFF CACHE BOOL "" FORCE)
set(ASIO_STANDALONE ON CACHE BOOL "" FORCE)
add_definitions(-DASIO_STANDALONE)

set(CROW_USE_ASIO ON CACHE BOOL "" FORCE)

FetchContent_Declare(
  crow
  GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
  GIT_TAG v1.1
)

FetchContent_MakeAvailable(crow)

find_package(Threads REQUIRED)

file(GLOB_RECURSE SOURCES src/*.cpp)

add_executable(${PROJECT_NAME} ${SOURCES})

target_link_libraries(${PROJECT_NAME}
  PRIVATE
  Crow::Crow
  Threads::Threads
)

if(WIN32)
  target_link_libraries(${PROJECT_NAME}
    PRIVATE
    ws2_32
    mswsock
  )
endif()