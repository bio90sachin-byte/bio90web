
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IndiaMap } from "vardhan-maps/react";
import "leaflet/dist/leaflet.css";

import {
  Map,
  Brain,
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Star,
  CheckCircle2,
  XCircle,
  Play,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

type Language = "en" | "hi";
type Level = "beginner" | "advanced";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const hindiNames: Record<string, string> = {
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Arunachal Pradesh": "अरुणाचल प्रदेश",
  Assam: "असम",
  Bihar: "बिहार",
  Chhattisgarh: "छत्तीसगढ़",
  Goa: "गोवा",
  Gujarat: "गुजरात",
  Haryana: "हरियाणा",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  Jharkhand: "झारखंड",
  Karnataka: "कर्नाटक",
  Kerala: "केरल",
  "Madhya Pradesh": "मध्य प्रदेश",
  Maharashtra: "महाराष्ट्र",
  Manipur: "मणिपुर",
  Meghalaya: "मेघालय",
  Mizoram: "मिजोरम",
  Nagaland: "नागालैंड",
  Odisha: "ओडिशा",
  Punjab: "पंजाब",
  Rajasthan: "राजस्थान",
  Sikkim: "सिक्किम",
  "Tamil Nadu": "तमिलनाडु",
  Telangana: "तेलंगाना",
  Tripura: "त्रिपुरा",
  "Uttar Pradesh": "उत्तर प्रदेश",
  Uttarakhand: "उत्तराखंड",
  "West Bengal": "पश्चिम बंगाल",
  "Andaman and Nicobar Islands": "अंडमान और निकोबार द्वीप समूह",
  Chandigarh: "चंडीगढ़",
  "Dadra and Nagar Haveli and Daman and Diu":
    "दादरा और नगर हवेली तथा दमन और दीव",
  Delhi: "दिल्ली",
  "Jammu and Kashmir": "जम्मू और कश्मीर",
  Ladakh: "लद्दाख",
  Lakshadweep: "लक्षद्वीप",
  Puducherry: "पुदुचेरी",
};

function shuffle<T,>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function IndiaMapQuiz() {
  const [started, setStarted] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [level, setLevel] = useState<Level>("beginner");
  const [soundOn, setSoundOn] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const [questions, setQuestions] = useState<string[]>(() =>
    shuffle(states)
  );

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Correct and wrong states remain coloured until restart.
  const [correctStates, setCorrectStates] = useState<string[]>([]);
  const [wrongStates, setWrongStates] = useState<string[]>([]);

  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);

  // Timer reference prevents old question timers affecting a restarted quiz.
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const target = questions[current];

  const accuracy = attempts
    ? Math.round((score / attempts) * 100)
    : 0;

  const displayName = (name: string) =>
    language === "hi" ? hindiNames[name] || name : name;

  useEffect(() => {
    return () => {
      if (nextTimer.current) {
        clearTimeout(nextTimer.current);
      }
    };
  }, []);

  function clearNextTimer() {
    if (nextTimer.current) {
      clearTimeout(nextTimer.current);
      nextTimer.current = null;
    }
  }

  function playSound(correct: boolean) {
    if (!soundOn || typeof window === "undefined") return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext;

      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = correct ? 880 : 220;

      gain.gain.setValueAtTime(0.15, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.25
      );

      oscillator.start();
      oscillator.stop(context.currentTime + 0.25);

      oscillator.onended = () => context.close();
    } catch {
      // Audio is optional.
    }
  }

  // Read state name from map feature.
  function getFeatureName(feature: any): string {
    if (typeof feature === "string") return feature;

    return (
      feature?.name ||
      feature?.props?.name ||
      feature?.properties?.name ||
      feature?.feature?.name ||
      feature?.feature?.properties?.name ||
      ""
    );
  }

  // Correct states remain green; wrong states remain red.
function getStateFill(name: string) {
  if (correctStates.includes(name)) {
    return {
      fillColor: "#22c55e",
      fillOpacity: 0.9,
      color: "#15803d",
      weight: 1.5,
    };
  }

  if (wrongStates.includes(name)) {
    return {
      fillColor: "#ef4444",
      fillOpacity: 0.9,
      color: "#b91c1c",
      weight: 1.5,
    };
  }

  return {
    fillColor: "#dbeafe",
    fillOpacity: 0.85,
    color: "#64748b",
    weight: 1,
  };
}



  function goToNextQuestion() {
    if (current >= questions.length - 1) {
      setFinished(true);
      setSolved(false);
      return;
    }

    setCurrent((previous) => previous + 1);
    
    setSolved(false);
  }

  function answerState(name: string) {
    if (!name || solved || finished) return;

    setAttempts((previous) => previous + 1);

    if (name === target) {
      // Correct answer: permanently mark this state green.
      setSolved(true);

      setCorrectStates((previous) =>
        previous.includes(name) ? previous : [...previous, name]
      );

      setScore((previous) => previous + 1);
      playSound(true);

      // Automatically open the next question after 1 second.
      clearNextTimer();

      nextTimer.current = setTimeout(() => {
        goToNextQuestion();
      }, 1000);

    } else {
      // Wrong answer: mark state red.
      setWrongStates((previous) =>
        previous.includes(name) ? previous : [...previous, name]
      );

      playSound(false);

      // Vibrate on every wrong attempt, including repeated attempts.
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.vibrate === "function"
      ) {
        navigator.vibrate([180, 80, 180]);
      }
    }
  }

  function restartQuiz() {
    clearNextTimer();

    setQuestions(shuffle(states));
    setCurrent(0);
    setScore(0);
    setAttempts(0);
    setCorrectStates([]);
    setWrongStates([]);
    setSolved(false);
    setFinished(false);
    setShowMap(false);
  }

  function changeLevel(nextLevel: Level) {
    clearNextTimer();
    setLevel(nextLevel);
    restartQuiz();
  }

  const rank =
    score === 36
      ? language === "en" ? "India Champion" : "भारत चैंपियन"
      : score >= 30
        ? language === "en" ? "Gold Explorer" : "गोल्ड एक्सप्लोरर"
        : score >= 20
          ? language === "en" ? "Silver Explorer" : "सिल्वर एक्सप्लोरर"
          : language === "en" ? "Young Explorer" : "यंग एक्सप्लोरर";

  const progress = finished
    ? 100
    : (current / states.length) * 100;

  // START SCREEN
  if (!started) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl">
        <div className="bg-gradient-to-r from-[#102d62] to-[#176b80] px-6 py-10 text-center text-white sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15">
            <Map size={42} className="text-lime-300" />
          </div>

          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            {language === "en"
              ? "India Map Quiz Practice"
              : "भारत मैप क्विज़ अभ्यास"}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
            {language === "en"
              ? "Explore all 28 States and 8 Union Territories with interactive map challenges."
              : "इंटरैक्टिव मैप के साथ भारत के 28 राज्य और 8 केंद्रशासित प्रदेश सीखें।"}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-5 py-2 text-sm font-bold ${
                language === "en"
                  ? "bg-lime-400 text-slate-950"
                  : "bg-white/15 text-white"
              }`}
            >
              English
            </button>

            <button
              onClick={() => setLanguage("hi")}
              className={`rounded-full px-5 py-2 text-sm font-bold ${
                language === "hi"
                  ? "bg-lime-400 text-slate-950"
                  : "bg-white/15 text-white"
              }`}
            >
              हिंदी
            </button>

            <button
              onClick={() => setSoundOn(!soundOn)}
              className="rounded-full bg-white/15 p-2 text-white"
              aria-label="Toggle sound"
            >
              {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>
          </div>
        </div>

        <div className="p-6 text-center sm:p-9">
          <div className="mx-auto grid max-w-xl grid-cols-2 gap-4">
            <button
              onClick={() => setLevel("beginner")}
              className={`rounded-2xl border-2 p-5 text-left ${
                level === "beginner"
                  ? "border-lime-500 bg-lime-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <Map size={28} className="mb-3 text-lime-700" />

              <strong className="block text-[#102d62]">
                {language === "en" ? "Beginner" : "शुरुआती स्तर"}
              </strong>

              <span className="mt-2 block text-xs text-slate-500">
                {language === "en"
                  ? "Map assistance available"
                  : "नक्शे की सहायता उपलब्ध"}
              </span>
            </button>

            <button
              onClick={() => setLevel("advanced")}
              className={`rounded-2xl border-2 p-5 text-left ${
                level === "advanced"
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <Brain size={28} className="mb-3 text-violet-600" />

              <strong className="block text-[#102d62]">
                {language === "en" ? "Advanced" : "एडवांस स्तर"}
              </strong>

              <span className="mt-2 block text-xs text-slate-500">
                {language === "en"
                  ? "No map assistance"
                  : "बिना नक्शे की सहायता"}
              </span>
            </button>
          </div>

          <button
            onClick={() => {
              restartQuiz();
              setStarted(true);
            }}
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-lime-500 px-9 py-4 font-black text-slate-950 shadow-lg transition hover:-translate-y-1 hover:bg-lime-400"
          >
            <Play size={20} />
            {language === "en"
              ? "Start Map Quiz Practice"
              : "मैप क्विज़ शुरू करें"}
          </button>
        </div>
      </section>
    );
  }

  // QUIZ SCREEN
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-[#102d62] to-[#176b80] px-5 py-8 text-center text-white sm:px-8">
        <button
          onClick={() => {
            clearNextTimer();
            setStarted(false);
          }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold"
        >
          <ArrowLeft size={15} />
          {language === "en" ? "Back to Practice" : "वापस जाएँ"}
        </button>

        <h2 className="text-3xl font-black sm:text-4xl">
          {language === "en"
            ? "Explore Incredible India"
            : "भारत को पहचानें"}
        </h2>

        <p className="mt-3 text-sm text-blue-100">
          {language === "en"
            ? "Find the correct state on the map!"
            : "नक्शे में सही राज्य ढूँढें!"}
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              language === "en"
                ? "bg-lime-400 text-slate-950"
                : "bg-white/15 text-white"
            }`}
          >
            English
          </button>

          <button
            onClick={() => setLanguage("hi")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              language === "hi"
                ? "bg-lime-400 text-slate-950"
                : "bg-white/15 text-white"
            }`}
          >
            हिंदी
          </button>

          <button
            onClick={() => setSoundOn(!soundOn)}
            className="rounded-full bg-white/15 p-2 text-white"
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {/* LEVEL SELECTOR */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => changeLevel("beginner")}
            className={`rounded-2xl border-2 p-4 text-left ${
              level === "beginner"
                ? "border-lime-500 bg-lime-50"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <Map className="mb-2 text-lime-700" size={25} />

            <strong className="block text-[#102d62]">
              {language === "en" ? "Beginner" : "शुरुआती स्तर"}
            </strong>

            <span className="mt-1 block text-xs text-slate-500">
              {language === "en" ? "Show Map help" : "नक्शे की सहायता"}
            </span>
          </button>

          <button
            onClick={() => changeLevel("advanced")}
            className={`rounded-2xl border-2 p-4 text-left ${
              level === "advanced"
                ? "border-violet-500 bg-violet-50"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <Brain className="mb-2 text-violet-600" size={25} />

            <strong className="block text-[#102d62]">
              {language === "en" ? "Advanced" : "एडवांस स्तर"}
            </strong>

            <span className="mt-1 block text-xs text-slate-500">
              {language === "en" ? "No Map help" : "बिना नक्शे की सहायता"}
            </span>
          </button>
        </div>

        {/* SCORE CARDS */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-blue-50 p-3 text-center">
            <strong className="block text-xl text-[#102d62]">
              {finished ? 36 : current + 1}/36
            </strong>
            <span className="text-xs text-slate-500">
              {language === "en" ? "Question" : "सवाल"}
            </span>
          </div>

          <div className="rounded-xl bg-green-50 p-3 text-center">
            <strong className="block text-xl text-green-700">
              {score}
            </strong>
            <span className="text-xs text-slate-500">
              {language === "en" ? "Correct" : "सही"}
            </span>
          </div>

          <div className="rounded-xl bg-orange-50 p-3 text-center">
            <strong className="block text-xl text-orange-700">
              {accuracy}%
            </strong>
            <span className="text-xs text-slate-500">
              {language === "en" ? "Accuracy" : "सटीकता"}
            </span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-lime-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!finished ? (
          <div className="mt-7 rounded-2xl bg-[#f5f9ff] p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#102d62]">
                {level === "beginner"
                  ? language === "en"
                    ? "BEGINNER MAP TEST"
                    : "शुरुआती मैप टेस्ट"
                  : language === "en"
                    ? "ADVANCED MAP TEST"
                    : "एडवांस मैप टेस्ट"}
              </span>

              <span className="text-xs font-semibold text-slate-500">
                {language === "en" ? "Find this state" : "इस राज्य को ढूँढें"}
              </span>
            </div>

            {/* QUESTION */}
            <h3 className="text-center text-2xl font-black text-[#102d62]">
              {language === "en"
                ? `Find ${displayName(target)}`
                : `${displayName(target)} को ढूँढें`}
            </h3>

            {/* BEGINNER SHOW MAP BUTTON */}
            {level === "beginner" && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#102d62] shadow-sm"
                >
                  {showMap ? <EyeOff size={17} /> : <Eye size={17} />}

                  {showMap
                    ? language === "en"
                      ? "Hide Map Help"
                      : "नक्शा छिपाएँ"
                    : language === "en"
                      ? "Show Map"
                      : "नामों वाला नक्शा दिखाएँ"}
                </button>
              </div>
            )}

            {/* LABELLED MAP HELP: BEGINNER ONLY */}
            {level === "beginner" && showMap && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-white p-3">
                <h4 className="mb-3 text-center font-extrabold text-[#102d62]">
                  {language === "en"
                    ? "India Map – State Names"
                    : "भारत का नामों वाला नक्शा"}
                </h4>

                <div className="overflow-hidden rounded-lg">
                  <IndiaMap
                    mode="leaflet"
                    level="state"
                    labels
                    style={{ height: 480, width: "100%" }}
                  />
                </div>

                <p className="mt-2 text-center text-xs text-slate-500">
                  {language === "en"
                    ? "Use this labelled map as a learning guide."
                    : "इस नक्शे से राज्यों के नाम सीखें।"}
                </p>
              </div>
            )}

            {/* MAIN CLICKABLE MAP: BOTH MODES */}
            <div className="mt-5 overflow-hidden rounded-xl border border-blue-100 bg-white p-2">
              
  
              <IndiaMap
               mode="leaflet"
               fitTo="india"
               dataKey={`${current}-${correctStates.join("|")}-${wrongStates.join("|")}`}
                level="state"
                resolution="high"
                boundaryTooltips={false}
                tiles={false}
           markers={[
  {
    lat: 11.94,
    lng: 79.83,
    label: "Puducherry",
    color: correctStates.includes("Puducherry") ? "#22c55e" : "#f59e0b",
    radius: 9,
  },
  {
    lat: 10.92,
    lng: 79.83,
    label: "Karaikal",
    color: correctStates.includes("Puducherry") ? "#22c55e" : "#f59e0b",
    radius: 9,
  },
  {
    lat: 11.70,
    lng: 75.53,
    label: "Mahe",
    color: correctStates.includes("Puducherry") ? "#22c55e" : "#f59e0b",
    radius: 9,
  },
  {
    lat: 16.73,
    lng: 82.22,
    label: "Yanam",
    color: correctStates.includes("Puducherry") ? "#22c55e" : "#f59e0b",
    radius: 9,
  },
]}
onMarkerClick={() => answerState("Puducherry")}
                stateFill={(name) => getStateFill(name)}
                onStateClick={(name: string) => answerState(name)}
              />
            </div>

            {/* COLOUR LEGEND */}
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-2 text-green-700">
                <span className="h-3 w-3 rounded-sm bg-green-500" />
                {language === "en" ? "Correct" : "सही"}
              </span>

              <span className="flex items-center gap-2 text-red-700">
                <span className="h-3 w-3 rounded-sm bg-red-500" />
                {language === "en" ? "Wrong attempt" : "गलत जवाब"}
              </span>

              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-3 w-3 rounded-sm bg-blue-200" />
                {language === "en" ? "Not selected" : "अभी नहीं चुना"}
              </span>
            </div>
            {/* SKIP QUESTION BUTTON */}
<div className="mt-5 flex justify-center">
  <button
    onClick={() => {
      clearNextTimer();
      goToNextQuestion();
    }}
    className="rounded-full bg-orange-500 px-7 py-3 font-bold text-white shadow-md transition hover:bg-orange-600"
  >
    {language === "en" ? "Skip Question →" : "अगला सवाल →"}
  </button>
</div>

            {/* WRONG ANSWER MESSAGE */}
            {wrongStates.length > 0 && !solved && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                <XCircle className="mr-2 inline" size={19} />

                {language === "en"
                  ? "Wrong answer! The selected state is RED. Try again. The next question will not open until you find the correct state."
                  : "गलत जवाब! चुना गया राज्य लाल हो गया है। दोबारा कोशिश करें। सही राज्य मिलने तक अगला सवाल नहीं खुलेगा।"}
              </div>
            )}

            {/* CORRECT ANSWER MESSAGE */}
            {solved && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-800">
                <CheckCircle2 className="mx-auto mb-2" size={28} />

                <strong>
                  {language === "en"
                    ? "Excellent! Correct Answer."
                    : "शानदार! सही जवाब।"}
                </strong>

                <p className="mt-1 text-sm">
                  {language === "en"
                    ? "Loading next question..."
                    : "अगला सवाल आ रहा है..."}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* FINAL RESULT */
          <div className="relative mt-7 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-yellow-50 to-lime-100 p-7 text-center">
            <div className="text-6xl">🏆</div>

            {score === 36 && (
              <div className="mt-3 text-3xl">
                🎉 ✨ 🎊 🌟 🎉
              </div>
            )}

            <h3 className="mt-4 text-3xl font-black text-[#102d62]">
              {language === "en"
                ? "Quiz Completed!"
                : "क्विज़ पूरा हुआ!"}
            </h3>

            <div className="mt-5 text-5xl font-black text-green-700">
              {score}/36
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-extrabold text-[#102d62] shadow-sm">
              <Star className="text-yellow-500" />
              {rank}
            </div>

            <p className="mt-4 text-slate-600">
              {language === "en" ? "Accuracy: " : "सटीकता: "}
              {accuracy}%
            </p>

            {score === 36 && (
              <p className="mt-4 font-bold text-violet-700">
                {language === "en"
                  ? "Amazing! You are an India Map Champion!"
                  : "शानदार! आप भारत मैप चैंपियन हैं!"}
              </p>
            )}

            <button
              onClick={restartQuiz}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#102d62] px-7 py-3 font-bold text-white"
            >
              <RotateCcw size={18} />
              {language === "en" ? "Play Again" : "फिर खेलें"}
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
          <Trophy size={18} className="text-yellow-500" />
          BIO90 India Learning Challenge
        </div>

        <button
          onClick={restartQuiz}
          className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={16} />
          {language === "en" ? "Restart Quiz" : "क्विज़ दोबारा शुरू करें"}
        </button>
      </div>
    </section>
  );
}
