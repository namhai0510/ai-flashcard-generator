#pragma once
#include <cmath>
#include <algorithm>

struct SM2Result {
    int interval;    // Số ngày/phút tới lần học tiếp theo
    float ease;      // Độ dễ của thẻ
    int repetitions; // Số lần đã học thành công liên tiếp
};

class SM2Engine {
public:
    // score: 0 (quên sạch) -> 5 (nhớ cực rõ)
    static SM2Result calculate(int quality, int prevInterval, int prevRepetitions, float prevEase) {
        SM2Result result;
        
        if (quality >= 3) { // User nhớ thẻ
            if (prevRepetitions == 0) result.interval = 1;
            else if (prevRepetitions == 1) result.interval = 6;
            else result.interval = std::round(prevInterval * prevEase);
            
            result.repetitions = prevRepetitions + 1;
        } else { // User quên thẻ
            result.repetitions = 0;
            result.interval = 1;
        }

        // Cập nhật Ease Factor (EF)
        result.ease = prevEase + (0.1f - (5 - quality) * (0.08f + (5 - quality) * 0.02f));
        if (result.ease < 1.3f) result.ease = 1.3f; // Min ease là 1.3

        return result;
    }
};