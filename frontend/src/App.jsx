import React, { useState } from 'react';
import { Brain, Send, Loader2, Zap, Trash2, PlusCircle } from 'lucide-react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [cards, setCards] = useState([
    { question: 'What is AI FLASHCARD?', answer: 'An AI-powered tool to generate study cards from any text.' },
    { question: 'How to use it?', answer: 'Paste your text on the left and click Generate.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!userInput.trim()) return alert("Hãy nhập nội dung nhé!");
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Brain className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI <span className="text-indigo-600">FLASHCARD</span></h1>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-all bg-slate-100 px-4 py-2 rounded-full">
            <PlusCircle size={18} /> Create Manual
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-10">
          
          {/* Left: Input */}
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-amber-500" size={20} />
                <h2 className="font-bold text-lg text-slate-800">Generate by AI</h2>
              </div>
              <textarea
                className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
                placeholder="Dán kiến thức vào đây..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {isLoading ? "Analyzing..." : "Generate Flashcards"}
              </button>
            </div>
          </section>

          {/* Right: Results */}
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Your Cards ({cards.length})</h3>
              <button onClick={() => setCards([])} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              {cards.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex gap-4 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">Q</span>
                    <p className="font-semibold text-slate-800 pt-1">{card.question}</p>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">A</span>
                    <p className="text-slate-600 pt-1 leading-relaxed">{card.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;