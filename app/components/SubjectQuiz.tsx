"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, RotateCcw, Star } from "lucide-react";

type Language = "en" | "hi";
type Question = { question: string; options: string[]; answer: number };

const subjects = [
  { id: "maths", en: "Maths", hi: "गणित", icon: "➗", color: "bg-blue-100" },
  { id: "science", en: "Science", hi: "विज्ञान", icon: "🔬", color: "bg-lime-100" },
  { id: "evs", en: "EVS", hi: "पर्यावरण अध्ययन", icon: "🌿", color: "bg-green-100" },
  { id: "english", en: "English", hi: "अंग्रेज़ी", icon: "📖", color: "bg-orange-100" },
  { id: "computer", en: "Computer", hi: "कंप्यूटर", icon: "💻", color: "bg-violet-100" },
  { id: "hindi", en: "Hindi", hi: "हिंदी", icon: "अ", color: "bg-pink-100" },
] as const;

const bank: Record<string, Record<Language, Question>> = {
  maths: {
    en: { question: "What is 8 × 7?", options: ["54", "56", "64", "48"], answer: 1 },
    hi: { question: "8 × 7 कितना होता है?", options: ["54", "56", "64", "48"], answer: 1 },
  },
  science: {
    en: { question: "Which gas do plants absorb from the air?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
    hi: { question: "पौधे हवा से कौन-सी गैस लेते हैं?", options: ["ऑक्सीजन", "कार्बन डाइऑक्साइड", "नाइट्रोजन", "हाइड्रोजन"], answer: 1 },
  },
  evs: {
    en: { question: "Which is a renewable source of energy?", options: ["Coal", "Petrol", "Sunlight", "Diesel"], answer: 2 },
    hi: { question: "ऊर्जा का नवीकरणीय स्रोत कौन-सा है?", options: ["कोयला", "पेट्रोल", "सूर्य का प्रकाश", "डीज़ल"], answer: 2 },
  },
  english: {
    en: { question: "Choose the plural of 'child'.", options: ["Childs", "Childes", "Children", "Child"], answer: 2 },
    hi: { question: "'Child' का सही बहुवचन क्या है?", options: ["Childs", "Childes", "Children", "Child"], answer: 2 },
  },
  computer: {
    en: { question: "Which device is used to type text?", options: ["Monitor", "Keyboard", "Speaker", "Printer"], answer: 1 },
    hi: { question: "टेक्स्ट टाइप करने के लिए किस उपकरण का उपयोग होता है?", options: ["मॉनिटर", "कीबोर्ड", "स्पीकर", "प्रिंटर"], answer: 1 },
  },
  hindi: {
    en: { question: "Which is a synonym of 'जल'?", options: ["आग", "पानी", "हवा", "धरती"], answer: 1 },
    hi: { question: "'जल' का समानार्थी शब्द कौन-सा है?", options: ["आग", "पानी", "हवा", "धरती"], answer: 1 },
  },
};

export default function SubjectQuiz({ language }: { language: Language }) {
  const [subject, setSubject] = useState("maths");
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const current = bank[subject][language];

  function reset(nextSubject = subject) {
    setSubject(nextSubject);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setRound(0);
  }

  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-xl sm:p-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-700"><BookOpen size={28} /></div>
        <h2 className="mt-4 text-3xl font-black text-[#102d62] sm:text-4xl">{language === "en" ? "Choose Your Subject" : "अपना विषय चुनें"}</h2>
        <p className="mt-3 text-slate-500">{language === "en" ? "Pick a subject and start practising." : "विषय चुनें और अभ्यास शुरू करें।"}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {subjects.map((item) => (
          <button key={item.id} onClick={() => reset(item.id)} className={`rounded-2xl border-2 p-4 text-center transition hover:-translate-y-1 ${subject === item.id ? "border-lime-500 bg-lime-50 shadow-md" : "border-slate-100 bg-slate-50"}`}>
            <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}>{item.icon}</span>
            <span className="mt-3 block text-sm font-extrabold text-[#102d62]">{language === "en" ? item.en : item.hi}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-[#f5f9ff] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#102d62]">{language === "en" ? "PRACTICE QUESTION" : "अभ्यास प्रश्न"}</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-2 text-sm font-bold text-yellow-700"><Star size={16} /> {language === "en" ? "Score" : "स्कोर"}: {score}</span>
        </div>
        <h3 className="mt-6 text-xl font-black text-[#102d62]">{current.question}</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {current.options.map((option, index) => {
            const correct = checked && index === current.answer;
            const wrong = checked && selected === index && index !== current.answer;
            return <button key={option} disabled={checked} onClick={() => setSelected(index)} className={`rounded-xl border-2 p-4 text-left font-semibold transition ${correct ? "border-green-500 bg-green-50 text-green-800" : wrong ? "border-red-500 bg-red-50 text-red-800" : selected === index ? "border-[#102d62] bg-blue-50 text-[#102d62]" : "border-slate-200 bg-white hover:border-lime-400"}`}>
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">{String.fromCharCode(65 + index)}</span>
              {option}
              {correct && <CheckCircle2 className="float-right" size={19} />}
            </button>;
          })}
        </div>
        {checked && <p className={`mt-5 rounded-xl p-4 text-sm font-bold ${selected === current.answer ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{selected === current.answer ? (language === "en" ? "Excellent! Correct answer." : "शानदार! सही जवाब।") : (language === "en" ? `Correct answer: ${current.options[current.answer]}` : `सही जवाब: ${current.options[current.answer]}`)}</p>}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"><RotateCcw size={16} /> {language === "en" ? "Reset" : "रीसेट"}</button>
          {!checked ? <button disabled={selected === null} onClick={() => { setChecked(true); if (selected === current.answer) setScore((value) => value + 1); }} className="rounded-full bg-lime-500 px-6 py-3 text-sm font-bold text-slate-950 disabled:opacity-40">{language === "en" ? "Check Answer" : "जवाब जाँचें"}</button> : <button onClick={() => { setRound((value) => value + 1); setSelected(null); setChecked(false); }} className="rounded-full bg-[#102d62] px-6 py-3 text-sm font-bold text-white">{language === "en" ? `Next Practice (${round + 2})` : `अगला अभ्यास (${round + 2})`}</button>}
        </div>
      </div>
    </div>
  );
}
