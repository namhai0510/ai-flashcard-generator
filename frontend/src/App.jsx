import React, { useState, useEffect } from 'react';
import { 
  Brain, Send, Loader2, Zap, Trash2, PlusCircle, 
  X, Check, Clock, ArrowLeft, ArrowRight, Award, HelpCircle, BookOpen
} from 'lucide-react';

// ==========================================
// 1. COMPONENT THIẾT LẬP (CONFIG MODAL)
// ==========================================
const ConfigModal = ({ totalAvailable, onClose, onStart }) => {
  const [num, setNum] = useState(totalAvailable);
  const [time, setTime] = useState(30);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Clock className="text-indigo-600" /> Thiết lập việc học
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Số lượng thẻ học (Tối đa: {totalAvailable})
            </label>
            <input 
              type="number" 
              min="1" 
              max={totalAvailable}
              value={num}
              onChange={(e) => setNum(Math.min(totalAvailable, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Thời gian mỗi thẻ (giây)
            </label>
            <select 
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            >
              <option value={15}>15 giây (Nhanh)</option>
              <option value={30}>30 giây (Trung bình)</option>
              <option value={60}>60 giây (Kỹ lưỡng)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={onClose} className="py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Hủy</button>
          <button 
            onClick={() => onStart(num, time)}
            className="py-4 rounded-2xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Bắt đầu học
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. COMPONENT POPUP HƯỚNG DẪN (HELP MODAL)
// ==========================================
const HelpModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
    <div className="bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-indigo-600 font-bold">
          <BookOpen size={24} />
          <span className="text-xl">Hướng dẫn sử dụng</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
      </div>
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          <p><strong>Nhập nội dung:</strong> Dán văn bản kiến thức vào khung bên trái.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          <p><strong>Tạo thẻ:</strong> Bấm "Generate" để AI trích xuất câu hỏi và đáp án.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          <p><strong>Thiết lập:</strong> Chọn số lượng thẻ và thời gian mỗi câu để bắt đầu.</p>
        </div>
        <div className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          <p><strong>Ghi nhớ:</strong> Đánh giá mức độ thuộc bài để tối ưu hóa thuật toán SM-2.</p>
        </div>
      </div>
      <button onClick={onClose} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors">Đã hiểu!</button>
    </div>
  </div>
);

// ==========================================
// 3. COMPONENT POPUP HỌC TẬP (STUDY MODAL) - LOGIC CẬP NHẬT
// ==========================================
const StudyModal = ({ cards, initialTimer, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timer, setTimer] = useState(initialTimer);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, startTime: Date.now() });

  const currentCard = cards[currentIndex];

  useEffect(() => {
    if (timer > 0 && !isFinished) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isFlipped && !isFinished) {
      setIsFlipped(true);
    }
  }, [timer, isFinished, isFlipped]);

  const handleAnswer = async (score) => {
    // 1. Gọi API để cập nhật tiến độ học tập (SM-2)
    try {
      // Không dùng await nếu bạn muốn chuyển câu nhanh mà không đợi server
      fetch('http://localhost:8080/study/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cardId: currentCard.id, // ID của thẻ hiện tại
          score: score,           // 1 cho "Chưa biết", 5 cho "Đã biết"
          sessionId: "session_001" 
        })
        });
    } catch (e) {
      console.error("Lỗi cập nhật dữ liệu học tập:", e);
    }

    // 2. Cập nhật thống kê tạm thời tại Frontend
    if (score >= 3) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    // 3. Chuyển sang câu tiếp theo hoặc kết thúc
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setTimer(initialTimer);
    } else {
      setIsFinished(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}s`;
  };

  if (isFinished) {
    const totalTimeSec = Math.floor((Date.now() - stats.startTime) / 1000);
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl text-center animate-in zoom-in-95">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Tuyệt vời!</h2>
          <p className="text-slate-500 mb-8 font-medium">Bạn đã hoàn thành phiên học hôm nay.</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Điểm</p>
              <p className="text-2xl font-black text-indigo-600">{Math.round((stats.correct/cards.length)*10)}/10</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Đúng</p>
              <p className="text-2xl font-black text-emerald-600">{stats.correct}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sai</p>
              <p className="text-2xl font-black text-rose-500">{stats.wrong}</p>
            </div>
          </div>

          <button onClick={onClose} className="w-full bg-slate-900 text-white font-extrabold py-5 rounded-[24px] text-lg hover:bg-slate-800 transition-all active:scale-[0.98]">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95">
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-sm font-bold tracking-tight">
              Câu {currentIndex + 1}/{cards.length}
            </span>
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full font-bold">
              <Clock size={18} /> {formatTime(timer)}
            </div>
            <button onClick={onClose} className="text-slate-300 hover:text-rose-500 transition-colors">
              <X size={28} />
            </button>
          </div>

          {/* Nội dung câu hỏi */}
          <div className="text-center mb-12">
            <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">CÂU HỎI</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight px-4">
              {currentCard.question}
            </h2>

            {/* Đáp án chỉ hiện khi isFlipped là true */}
            {isFlipped && (
              <div className="mt-10 bg-emerald-50/50 p-8 rounded-[32px] border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">ĐÁP ÁN ĐÚNG</p>
                <p className="text-2xl md:text-3xl text-slate-700 font-black tracking-tight">{currentCard.answer}</p>
              </div>
            )}
          </div>

          {/* Phần nút bấm điều khiển */}
          <div className="mt-auto">
            {!isFlipped ? (
              /* Nút "Hiện đáp án" xuất hiện đầu tiên */
              <button 
                onClick={() => setIsFlipped(true)}
                className="w-full py-6 rounded-[24px] bg-indigo-600 text-white font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                <Zap size={24} fill="currentColor" /> Hiện đáp án
              </button>
            ) : (
              /* Sau khi hiện đáp án, hiện bộ nút đánh giá */
              <div className="grid grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-300">
                <button 
                  onClick={() => handleAnswer(1)} 
                  className="py-6 rounded-[24px] bg-white text-rose-500 border-2 border-rose-100 font-black text-xl flex items-center justify-center gap-2 hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
                >
                  <X size={24} /> Chưa biết
                </button>
                <button 
                  onClick={() => handleAnswer(5)} 
                  className="py-6 rounded-[24px] bg-emerald-500 text-white font-black text-xl flex items-center justify-center gap-2 hover:bg-emerald-600 shadow-xl shadow-emerald-100 transition-all active:scale-95"
                >
                  <Check size={24} /> Đã biết
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================
function App() {
  const [userInput, setUserInput] = useState('');
  const [cards, setCards] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [studyConfig, setStudyConfig] = useState({ num: 0, time: 30 });

  const handleGenerate = async () => {
    if (!userInput.trim()) return alert("Hãy nhập nội dung nhé!");
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput })
      });
      const data = await response.json();
      setCards(data.flashcards || []);
    } catch (error) {
      alert("Lỗi kết nối Backend C++!");
    } finally {
      setIsLoading(false);
    }
  };

  const startConfig = () => {
    if (cards.length === 0) return;
    setShowConfigModal(true);
  };

  const handleStartStudy = (num, time) => {
    const finalNum = num > 0 ? num : cards.length;
    setStudyConfig({ num: finalNum, time });
    setShowConfigModal(false);
    setShowStudyModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Brain className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">AI <span className="text-indigo-600">FLASHCARD</span></h1>
          </div>
          <button 
            onClick={startConfig} 
            disabled={cards.length === 0} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full font-bold transition-all disabled:opacity-50 shadow-lg shadow-indigo-100 active:scale-95"
          >
            Học ngay ({cards.length})
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[450px,1fr] gap-12">
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 h-fit">
            <h2 className="font-bold text-xl flex items-center gap-2 mb-6">
              <Zap className="text-amber-500" size={22} fill="currentColor" /> Generate by AI
            </h2>
            <textarea 
               className="w-full h-96 p-5 bg-slate-50 border border-slate-200 rounded-[24px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-slate-700 leading-relaxed"
               value={userInput}
               onChange={(e) => setUserInput(e.target.value)}
               placeholder="Dán nội dung hoặc kiến thức bạn muốn ghi nhớ vào đây..."
            />
            <button 
              onClick={handleGenerate} 
              disabled={isLoading} 
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-3 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {isLoading ? "Đang phân tích..." : "Generate Flashcards"}
            </button>
          </section>

          <section>
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-900">Your Cards <span className="text-indigo-600">({cards.length})</span></h3>
                {cards.length > 0 && (
                  <button onClick={() => setCards([])} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={20}/>
                  </button>
                )}
             </div>
             
             <div className="grid gap-5">
                {cards.length === 0 ? (
                  <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 bg-white/50">
                    <PlusCircle size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Chưa có thẻ nào. Hãy dán bài học vào khung bên trái!</p>
                  </div>
                ) : (
                  cards.map((card, i) => (
                    <div key={i} className="group bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm hover:border-indigo-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold font-mono">Q</span>
                        <div className="w-full">
                          <p className="font-bold text-slate-800 text-lg mb-4">{card.question}</p>
                          <div className="flex gap-4 border-t border-slate-50 pt-4 mt-4">
                            <span className="flex-shrink-0 w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold font-mono">A</span>
                            <p className="text-slate-600 leading-relaxed pt-2">{card.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </section>
        </div>
      </main>

      <button 
        onClick={() => setShowHelpModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white text-indigo-600 rounded-full shadow-2xl border border-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-95 z-40 group"
      >
        <HelpCircle size={28} />
        <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold shadow-xl">Hướng dẫn</span>
      </button>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      
      {showConfigModal && (
        <ConfigModal 
          totalAvailable={cards.length} 
          onClose={() => setShowConfigModal(false)} 
          onStart={handleStartStudy} 
        />
      )}

      {showStudyModal && cards.length > 0 && (
        <StudyModal 
          cards={cards.slice(0, studyConfig.num)} 
          initialTimer={studyConfig.time} 
          onClose={() => setShowStudyModal(false)} 
        />
      )}
    </div>
  );
}

export default App;