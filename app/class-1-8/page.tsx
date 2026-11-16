
"use client";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import IndiaMapQuiz from "../components/IndiaMapQuiz";
import {
  ArrowRight, ArrowLeft, BookOpen, Calculator, FlaskConical,
  Globe, Languages, GraduationCap, Trophy, Brain, Map,
  ChevronRight, ClipboardList, LockKeyhole, Sparkles, Play,
  Star, Users, Video, Headphones, BarChart3, Smartphone,
  CheckCircle2, X, RotateCcw, Image as ImageIcon,
} from "lucide-react";

const classes = [
  { name: "Class 1", icon: "🎒", color: "from-blue-500 to-cyan-400" },
  { name: "Class 2", icon: "📚", color: "from-violet-500 to-purple-400" },
  { name: "Class 3", icon: "✏️", color: "from-orange-500 to-amber-400" },
  { name: "Class 4", icon: "🚀", color: "from-pink-500 to-rose-400" },
  { name: "Class 5", icon: "🎯", color: "from-green-500 to-emerald-400" },
  { name: "Class 6", icon: "🔬", color: "from-cyan-600 to-blue-400" },
  { name: "Class 7", icon: "🧠", color: "from-indigo-600 to-violet-400" },
  { name: "Class 8", icon: "🏆", color: "from-emerald-600 to-green-400" },
];

const exams = [
  { name: "Navodaya", subtitle: "JNV Entrance Preparation", icon: GraduationCap, color: "from-orange-400 to-amber-500" },
  { name: "Sainik School", subtitle: "AISSEE Preparation", icon: Trophy, color: "from-blue-500 to-indigo-500" },
  { name: "GK Quiz", subtitle: "General Knowledge Practice", icon: Globe, color: "from-purple-500 to-pink-500" },
];

const subjects = [
  { name: "Mathematics", hindi: "गणित", icon: Calculator, color: "bg-blue-50 text-blue-700" },
  { name: "English", hindi: "अंग्रेजी", icon: Languages, color: "bg-purple-50 text-purple-700" },
  { name: "Hindi", hindi: "हिंदी", icon: BookOpen, color: "bg-orange-50 text-orange-700" },
  { name: "Science", hindi: "विज्ञान", icon: FlaskConical, color: "bg-green-50 text-green-700" },
  { name: "Social Studies", hindi: "सामाजिक अध्ययन", icon: Globe, color: "bg-cyan-50 text-cyan-700" },
  { name: "EVS", hindi: "पर्यावरण अध्ययन", icon: Sparkles, color: "bg-pink-50 text-pink-700" },
];

const classSubjects: Record<number, string[]> = {
  1: ["Mathematics", "English", "Hindi", "EVS"],
  2: ["Mathematics", "English", "Hindi", "EVS"],
  3: ["Mathematics", "English", "Hindi", "EVS"],
  4: ["Mathematics", "English", "Hindi", "EVS"],
  5: ["Mathematics", "English", "Hindi", "EVS"],
  6: ["Mathematics", "English", "Hindi", "Science", "Social Studies"],
  7: ["Mathematics", "English", "Hindi", "Science", "Social Studies"],
  8: ["Mathematics", "English", "Hindi", "Science", "Social Studies"],
};

const chapters: Record<string, string[]> = {
  Mathematics: ["Numbers and Counting", "Addition and Subtraction", "Multiplication", "Fractions", "Shapes and Geometry"],
  English: ["Alphabet and Words", "Grammar", "Vocabulary", "Reading Comprehension", "Sentence Formation"],
  Hindi: ["वर्णमाला", "मात्राएँ", "शब्द ज्ञान", "हिंदी व्याकरण", "अपठित गद्यांश"],
  Science: ["Living Things", "Plants and Animals", "Human Body", "Matter and Materials", "Environment"],
  "Social Studies": ["History", "Geography", "Civics", "Map Practice"],
  EVS: ["Plants and Animals", "Our Environment", "Family and Society", "Our Surroundings"],
};

const examTopics: Record<string, string[]> = {
  Navodaya: ["Mental Ability Test", "Arithmetic Test", "Language Test", "Mock Test"],
  "Sainik School": ["Mathematics", "General Knowledge", "Language", "Intelligence Test", "Mock Test"],
  "GK Quiz": ["India GK", "World GK", "Science GK", "History", "Geography", "Current Affairs"],
};

const quizBank: Record<number, { subject: string; question: string; options: string[]; answer: number }[]> = {
  1: [
    { subject: "Mathematics", question: "What comes after 9?", options: ["8", "10", "11", "12"], answer: 1 },
    { subject: "English", question: "Which is a vowel?", options: ["B", "C", "A", "D"], answer: 2 },
    { subject: "EVS", question: "Which animal gives us milk?", options: ["Lion", "Cow", "Tiger", "Fox"], answer: 1 },
    { subject: "Hindi", question: "हिंदी वर्णमाला का पहला स्वर कौन-सा है?", options: ["अ", "क", "म", "त"], answer: 0 },
    { subject: "Mathematics", question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: 1 },
  ],
  2: [
    { subject: "Mathematics", question: "What is 12 + 8?", options: ["18", "19", "20", "21"], answer: 2 },
    { subject: "English", question: "What is the plural of 'Book'?", options: ["Bookes", "Books", "Book's", "Booking"], answer: 1 },
    { subject: "EVS", question: "Which part of a plant absorbs water?", options: ["Flower", "Fruit", "Root", "Leaf"], answer: 2 },
    { subject: "Hindi", question: "'दिन' का विलोम शब्द क्या है?", options: ["सुबह", "रात", "शाम", "दोपहर"], answer: 1 },
    { subject: "Mathematics", question: "How many tens make 100?", options: ["5", "10", "20", "2"], answer: 1 },
  ],
  3: [
    { subject: "Mathematics", question: "What is 7 × 6?", options: ["36", "40", "42", "48"], answer: 2 },
    { subject: "English", question: "Choose the correct past tense of 'Go'.", options: ["Goed", "Going", "Gone", "Went"], answer: 3 },
    { subject: "Science", question: "Which organ helps us breathe?", options: ["Heart", "Lungs", "Stomach", "Kidney"], answer: 1 },
    { subject: "Hindi", question: "'जल' का समानार्थी शब्द क्या है?", options: ["अग्नि", "पवन", "पानी", "आकाश"], answer: 2 },
    { subject: "EVS", question: "Which is a source of natural light?", options: ["Sun", "Table", "Chair", "Book"], answer: 0 },
  ],
  4: [
    { subject: "Mathematics", question: "What is 125 ÷ 5?", options: ["20", "25", "30", "35"], answer: 1 },
    { subject: "English", question: "Which word is an adjective?", options: ["Run", "Beautiful", "Quickly", "Jump"], answer: 1 },
    { subject: "Science", question: "Which planet is known as the Red Planet?", options: ["Venus", "Earth", "Mars", "Saturn"], answer: 2 },
    { subject: "Hindi", question: "'सूर्य' का समानार्थी शब्द कौन-सा है?", options: ["चंद्रमा", "रवि", "तारा", "बादल"], answer: 1 },
    { subject: "EVS", question: "Which direction does the Sun rise from?", options: ["West", "North", "South", "East"], answer: 3 },
  ],
};

const features = [
  { title: "Interactive Learning", description: "Engaging activities, animations and badges make learning enjoyable.", icon: Video },
  { title: "Personalised Practice", description: "Practice activities designed around the learner's class and subjects.", icon: BookOpen },
  { title: "Homework Assistance", description: "Structured learning support to build independent study habits.", icon: Headphones },
  { title: "Progress Tracking", description: "Track practice, scores and learning progress over time.", icon: BarChart3 },
];

const experiments = [
  {
    title: "Magic Milk Experiment",
    description: "Discover how colours move and create beautiful patterns.",
    image: "/images/experiments/magic-milk.jpg",
    video: "/videos/magic-milk.mp4",
    tag: "Chemistry",
  },
  {
    title: "Dancing Raisins",
    description: "Watch raisins move up and down in fizzy water.",
    image: "/images/experiments/dancing-raisins.jpg",
    video: "/videos/dancing-raisins.mp4",
    tag: "Science",
  },
  {
    title: "Walking Water",
    description: "See how water travels between glasses.",
    image: "/images/experiments/walking-water.jpg",
    video: "/videos/walking-water.mp4",
    tag: "Experiments",
  },
  {
    title: "Balloon Electricity",
    description: "Explore the fun of static electricity.",
    image: "/images/experiments/balloon-electricity.jpg",
    video: "/videos/balloon-electricity.mp4",
    tag: "Physics",
  },
];

const stories = [
  { name: "Student Achievement", className: "Class 6", quote: "I improved my grades in school!", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500" },
  { name: "Young Learner", className: "Class 3", quote: "I love learning new things every day!", image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500" },
  { name: "Happy Learning", className: "Class 8", quote: "Practice has made me more confident!", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500" },
];

export default function ClassOneToEightPage() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showMapQuiz, setShowMapQuiz] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const [showIntro, setShowIntro] = useState(false);

useEffect(() => {
  const timer = window.setTimeout(() => {
    setShowIntro(true);
  }, 3000);

  return () => window.clearTimeout(timer);
}, []);

  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [notice, setNotice] = useState("");

  const resetPractice = () => {
    setSelectedClass(null);
    setSelectedExam(null);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setShowMapQuiz(false);
    setNotice("");
    resetQuiz();
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setAnswer(null);
    setChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  const goToPractice = () => {
    setTimeout(() => {
      document.getElementById("practice-area")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const openClass = (n: number) => {
    resetPractice();
    setSelectedClass(n);
    goToPractice();
  };

  const openExam = (name: string) => {
    resetPractice();
    setSelectedExam(name);
    goToPractice();
  };

  const openMapPractice = () => {
    resetPractice();
    setShowMapQuiz(true);
    goToPractice();
  };

  const questions = selectedClass ? quizBank[selectedClass] : [];
  const currentQuestion = questions[questionIndex];

  const checkAnswer = () => {
    if (answer === null || checked || !currentQuestion) return;
    if (answer === currentQuestion.answer) setScore((s) => s + 1);
    setChecked(true);
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((n) => n + 1);
      setAnswer(null);
      setChecked(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff] text-slate-800">
      <SiteHeader />

     
{/* HERO */}
<section className="relative z-20 isolate min-h-[680px] overflow-visible bg-[#071b49] px-5 pb-12 pt-24 text-white sm:min-h-[760px] sm:pb-16">
  {/* BACKGROUND VIDEO */}
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <iframe
      className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
      src="https://www.youtube-nocookie.com/embed/XQDMsl5ADKA?autoplay=1&mute=1&controls=0&loop=1&playlist=XQDMsl5ADKA%2Ca8jWJWBvzeY&playsinline=1&rel=0"
      title="BIO90 Kids Learning Background Video"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>

  {/* DARK OVERLAY */}
  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#071b49]/55 via-[#071b49]/35 to-[#071b49]/75" />

  {/* GLASS INTRO CARD */}
  <div className="relative z-20 mx-auto flex min-h-[560px] max-w-7xl items-end justify-center sm:min-h-[620px]">
    {showIntro && (
      <div className="relative w-full max-w-3xl animate-[fadeIn_.8s_ease-out] rounded-[2rem] border border-white/30 bg-white/15 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <button
          type="button"
          onClick={() => setShowIntro(false)}
          aria-label="Close introduction"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xl text-white transition hover:bg-white/25"
        >
          ×
        </button>

        <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/15 px-4 py-2 text-xs font-bold tracking-wider text-lime-200">
          <Sparkles size={15} /> BIO90 KIDS LEARNING
        </span>

        <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">
          Learning Made Fun for
          <span className="block text-lime-300">Curious Minds!</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
          Explore, practise and discover the joy of learning with BIO90.
          Build strong foundations in Maths, English, Science and more.
        </p>

        <p className="mt-4 text-sm font-bold text-lime-200">
          For Classes 1st to 8th
        </p>

        <a
          href="#popular"
          onClick={() => setShowIntro(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg transition hover:-translate-y-1 hover:bg-lime-300"
        >
          Explore Learning <ArrowRight size={18} />
        </a>
      </div>
    )}
  </div>
</section>



      {/* BENEFITS */}
      <section className="relative z-10 px-4 py-7">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 rounded-2xl border border-white bg-white/80 p-4 shadow-lg backdrop-blur-xl md:grid-cols-4">
          {[
            { icon: Video, title: "Live Interactive", sub: "Learning" },
            { icon: Headphones, title: "Mentor Support", sub: "Guidance" },
            { icon: BarChart3, title: "Daily", sub: "Progress Tracking" },
            { icon: Trophy, title: "Practice Led", sub: "Learning" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center justify-center gap-3 rounded-xl p-3 transition hover:bg-green-50">
                <Icon className="text-green-600" size={26} />
                <div>
                  <p className="text-sm font-bold text-[#102d62]">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      
{/* LEARNING PROGRAMS */}
<section className="relative overflow-hidden bg-gradient-to-b from-white via-green-50/40 to-white px-5 py-16 sm:py-20">
  <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
  <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">
    <div className="mb-12 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-green-800">
        <Sparkles size={15} /> Discover BIO90
      </span>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-[#102d62] sm:text-4xl">
        Pick a Learning Program
        <span className="block text-green-700"> & Get Started!</span>
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        Every child is unique. Choose a learning path that makes education
        exciting, enjoyable and meaningful.
      </p>
    </div>

    <div className="grid gap-7 md:grid-cols-3">
      {[
        {
          title: "After-School Learning",
          desc: "Build academic confidence with structured learning.",
          image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700",
          detail: "Classes 1st to 8th",
          icon: BookOpen,
          color: "from-blue-600 to-indigo-700",
          tag: "COMPLETE LEARNING",
        },
        {
          title: "Learn English",
          desc: "Improve grammar, vocabulary, reading and speaking.",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700",
          detail: "English Skills",
          icon: Languages,
          color: "from-green-600 to-emerald-700",
          tag: "COMMUNICATION SKILLS",
        },
        {
          title: "Maths Learning",
          desc: "Build problem-solving skills with fun Maths practice.",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700",
          detail: "Maths Practice",
          icon: Calculator,
          color: "from-orange-500 to-amber-600",
          tag: "SMART MATHS",
        },
      ].map((program) => {
        const Icon = program.icon;

        return (
          <article
            key={program.title}
            className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071b49]/80 via-transparent to-black/10" />

              <div className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${program.color} px-3 py-2 text-[10px] font-black tracking-wider text-white shadow-lg`}>
                {program.tag}
              </div>

              <div className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/90 text-[#102d62] shadow-lg backdrop-blur">
                <Icon size={24} />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-[#102d62] transition group-hover:text-green-700">
                {program.title}
              </h3>

              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                {program.desc}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-800">
                <Sparkles size={14} />
                {program.detail}
              </div>

              <a
                href="#popular"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102d62] px-5 py-4 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Explore Program
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  </div>
</section>


      {/* HANDS ON LEARNING */}
      <section className="bg-gradient-to-br from-[#f0f9f4] to-[#f1f7ff] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-black text-[#102d62] sm:text-3xl">Hands-on Learning and More!</h2>
            <p className="mt-2 text-sm text-slate-500">Explore engaging ways to learn and grow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-[.8fr_1.5fr]">
            <div className="space-y-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button key={feature.title} onClick={() => setActiveFeature(index)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${activeFeature === index ? "border-green-300 bg-white shadow-md" : "border-transparent hover:bg-white/70"}`}>
                    <Icon size={22} className="shrink-0 text-green-700" />
                    <div>
                      <p className="text-sm font-bold text-[#102d62]">{feature.title}</p>
                      {activeFeature === index && <p className="mt-1 text-xs leading-5 text-slate-500">{feature.description}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-white bg-white p-3 shadow-lg">
              <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1000" alt="Learning activities" className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-xl object-cover" />
              <div className="absolute inset-3 rounded-xl bg-[#071b49]/30" />
              <div className="relative max-w-md rounded-2xl border border-white/60 bg-white/90 p-7 text-center shadow-xl backdrop-blur-md">
                <Sparkles className="mx-auto text-green-600" size={32} />
                <h3 className="mt-4 text-xl font-black text-[#102d62]">{features[activeFeature].title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{features[activeFeature].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SACHIN SIR DESK */}
      <section className="relative isolate overflow-hidden bg-white px-5 py-16">
        <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-80 w-80 animate-pulse rounded-full bg-green-100 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-72 w-72 animate-pulse rounded-full bg-blue-100 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">A Message for Young Learners</span>
            <h2 className="mt-3 text-3xl font-black text-[#102d62] sm:text-4xl">From Sachin Sir's Desk</h2>
            <div className="mt-5 text-5xl font-black text-green-300">“</div>
            <p className="text-base leading-8 text-slate-600">
              Every child has the ability to learn, explore and achieve great things.
              My goal is to make learning enjoyable, interactive and full of curiosity.
              Keep asking questions, keep practising and keep discovering something new.
              Your hard work today builds your success tomorrow!
            </p>
            <div className="mt-6">
              <p className="text-xl font-black text-[#102d62]">Sachin Sir</p>
              <p className="mt-1 text-sm text-slate-500">BIO90 – NEET Experts</p>
            </div>
          </div>
          <div className="relative flex min-h-[340px] items-end justify-center">
            <div className="absolute bottom-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-green-200 to-cyan-100 blur-sm" />
            <div className="absolute right-10 top-8 h-14 w-14 animate-bounce rounded-2xl bg-green-100/80" />
            <div className="absolute bottom-16 left-8 h-9 w-9 animate-pulse rounded-full bg-orange-200" />
            <img
              src="/image/sachin-sir.png"
              alt="Sachin Sir"
              className="relative z-10 max-h-[390px] w-full max-w-sm object-contain drop-shadow-2xl"
            />
            <div className="absolute bottom-3 right-4 z-20 rounded-full border border-white bg-white/80 px-4 py-2 text-xs font-bold text-green-800 shadow-lg backdrop-blur">
              Inspiring Young Minds
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT STORIES */}
      <section className="bg-[#f3f7fc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center">
            <h2 className="text-2xl font-black text-[#102d62] sm:text-3xl">Stories of Our Brightest Stars!</h2>
            <p className="mt-2 text-sm text-slate-500">Celebrating curiosity, confidence and progress.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {stories.map((story) => (
              <article key={story.name} className="group relative h-[330px] overflow-hidden rounded-2xl shadow-md">
                <img src={story.image} alt={story.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071b49]/95 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <div className="mb-2 flex gap-1 text-yellow-300">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={13} fill="currentColor" />)}</div>
                  <p className="text-lg font-black">{story.quote}</p>
                  <p className="mt-2 text-xs text-white/80">{story.name} · {story.className}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CLASSES AND EXAMS */}
      <section id="popular" className="scroll-mt-24 bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-green-700">Choose Your Learning Path</span>
            <h2 className="mt-2 text-3xl font-black text-[#102d62]">Popular Classes & Exams</h2>
            <p className="mt-2 text-sm text-slate-500">Choose a class, entrance exam or map practice to get started.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        
          
{classes.map((item, index) => {
  const classIcons = [
    BookOpen,
    Calculator,
    Brain,
    Sparkles,
    Globe,
    FlaskConical,
    Languages,
    Trophy,
  ];

  const ClassIcon = classIcons[index];

  const themes = [
    "from-blue-500/20 via-indigo-500/10 to-white border-blue-200",
    "from-purple-500/20 via-violet-500/10 to-white border-purple-200",
    "from-orange-500/20 via-amber-500/10 to-white border-orange-200",
    "from-pink-500/20 via-rose-500/10 to-white border-pink-200",
    "from-green-500/20 via-emerald-500/10 to-white border-green-200",
    "from-cyan-500/20 via-sky-500/10 to-white border-cyan-200",
    "from-indigo-500/20 via-blue-500/10 to-white border-indigo-200",
    "from-emerald-500/20 via-green-500/10 to-white border-emerald-200",
  ];

  return (
    <button
      key={item.name}
      type="button"
      onClick={() => openClass(index + 1)}
      className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${themes[index]} p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        selectedClass === index + 1
          ? "ring-2 ring-green-500"
          : ""
      }`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/70 blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/80 bg-white/75 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
        <ClassIcon size={38} strokeWidth={2} className="text-[#102d62]" />
      </div>

      <div className="relative mt-5">
        <h3 className="text-xl font-black text-[#102d62]">
          {item.name}
        </h3>

        <p className="mt-2 text-xs font-medium text-slate-500">
          Explore • Learn • Practice
        </p>

        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#102d62] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:bg-green-600">
          Explore Class
          <ChevronRight size={16} />
        </span>
      </div>
    </button>
  );
})}



            {exams.map((exam) => {
              const Icon = exam.icon;
              return (
                <button key={exam.name} onClick={() => openExam(exam.name)} className="group rounded-2xl border border-white/70 bg-white/70 p-5 text-center shadow-[0_8px_30px_rgba(16,45,98,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${exam.color} text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="mt-4 font-black text-[#102d62]">{exam.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{exam.subtitle}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-green-700">Explore <ChevronRight size={14} /></span>
                </button>
              );
            })}

            {/* MAP PRACTICE CARD */}
            <button onClick={openMapPractice} className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-[#102d62] via-[#176b80] to-green-700 p-5 text-center text-white shadow-[0_10px_35px_rgba(16,45,98,0.22)] transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl transition group-hover:scale-150" />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-inner backdrop-blur-md transition group-hover:rotate-6 group-hover:scale-110">
                <Map size={34} />
              </div>
              <h3 className="relative mt-4 font-black">Map Practice</h3>
              <p className="relative mt-1 text-xs text-blue-100">Interactive India Map Quiz</p>
              <span className="relative mt-3 inline-flex items-center gap-1 rounded-full bg-lime-300 px-3 py-1.5 text-xs font-black text-[#102d62]">
                Start Quiz <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* PRACTICE AREA */}
      <section id="practice-area" className="scroll-mt-24 bg-[#f4f8fc] px-5 py-12">
        <div className="mx-auto max-w-7xl">

          {selectedClass !== null && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-700">Your Learning Dashboard</span>
                  <h2 className="mt-2 text-2xl font-black text-[#102d62]">Class {selectedClass} – Subjects</h2>
                  <p className="mt-2 text-sm text-slate-500">Choose a subject to explore topics and practice tests.</p>
                </div>
                <button onClick={resetPractice} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"><ArrowLeft size={16} /> Back</button>
              </div>

             
<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {classSubjects[selectedClass].map((subject, index) => {
    const item = subjects.find((s) => s.name === subject);
    if (!item) return null;

    const Icon = item.icon;

    const themes = [
      "from-blue-500/15 to-indigo-500/5 border-blue-200",
      "from-emerald-500/15 to-green-500/5 border-green-200",
      "from-orange-500/15 to-amber-500/5 border-orange-200",
      "from-purple-500/15 to-fuchsia-500/5 border-purple-200",
      "from-cyan-500/15 to-sky-500/5 border-cyan-200",
      "from-rose-500/15 to-pink-500/5 border-rose-200",
    ];

    const theme = themes[index % themes.length];

    return (
      <button
        key={subject}
        type="button"
        onClick={() => {
          setSelectedSubject(subject);
          setSelectedTopic(null);
          setNotice("");
          resetQuiz();
        }}
        className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${theme} p-5 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
          selectedSubject === subject ? "ring-2 ring-green-500" : ""
        }`}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/50 blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}>
            <Icon size={31} strokeWidth={2.2} />
          </div>

          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#102d62] backdrop-blur">
            Class {selectedClass}
          </span>
        </div>

        <div className="relative mt-6">
          <h3 className="text-xl font-black text-[#102d62] transition group-hover:text-green-700">
            {subject}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-600">
            {item.hindi}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-white/70 pt-4">
            <span className="text-xs font-bold text-green-800">
              Notes & Practice
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#102d62] text-white shadow-md transition group-hover:translate-x-1 group-hover:bg-green-600">
              <ChevronRight size={19} />
            </span>
          </div>
        </div>
      </button>
    );
  })}
</div>





              {selectedSubject && (
                <div className="mt-8 border-t border-slate-100 pt-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-green-700">Class {selectedClass} / {selectedSubject}</span>
                      <h3 className="mt-2 text-2xl font-black text-[#102d62]">{selectedSubject} – Practice Zone</h3>
                    </div>
                    <button onClick={() => { setSelectedSubject(null); setSelectedTopic(null); setShowMapQuiz(false); resetQuiz(); }} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50">Back to Subjects</button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {(chapters[selectedSubject] || []).map((chapter, index) => (
                      <div key={chapter} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-400 hover:shadow-md">
                        <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Topic {index + 1}</span>
                        <h4 className="mt-4 font-bold text-[#102d62]">{chapter}</h4>
                        <p className="mt-2 text-xs text-slate-500">Practice questions and topic tests</p>
                        <button onClick={() => {
                          if (chapter === "Map Practice") {
                            setShowMapQuiz(true);
                            setSelectedTopic(null);
                          } else {
                            setSelectedTopic(chapter);
                            setNotice("");
                            resetQuiz();
                          }
                        }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102d62] px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700">
                          {chapter === "Map Practice" ? <Map size={16} /> : <ClipboardList size={16} />}
                          {chapter === "Map Practice" ? "Open Map Practice" : "Start Practice"} <ChevronRight size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {selectedTopic && selectedClass <= 4 && questions.length > 0 && (
                    <div className="mt-8 rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-50 p-5 sm:p-8">
                      {!quizFinished ? (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-widest text-green-700">Free Practice Quiz</span>
                              <h3 className="mt-1 text-xl font-black text-[#102d62]">{selectedTopic}</h3>
                            </div>
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-green-700 shadow-sm">Score: {score}</span>
                          </div>

                          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
                          </div>

                          <p className="mt-5 text-xs font-bold text-slate-500">QUESTION {questionIndex + 1} OF {questions.length} · {currentQuestion.subject}</p>
                          <h4 className="mt-3 text-xl font-black text-[#102d62]">{currentQuestion.question}</h4>

                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {currentQuestion.options.map((option, i) => {
                              const isRight = checked && i === currentQuestion.answer;
                              const isWrong = checked && answer === i && i !== currentQuestion.answer;
                              return (
                                <button key={option} disabled={checked} onClick={() => setAnswer(i)} className={`rounded-xl border-2 p-4 text-left font-semibold transition ${isRight ? "border-green-500 bg-green-100 text-green-800" : isWrong ? "border-red-400 bg-red-50 text-red-800" : answer === i ? "border-[#102d62] bg-blue-50 text-[#102d62]" : "border-slate-200 bg-white hover:border-green-400"}`}>
                                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm">{String.fromCharCode(65 + i)}</span>
                                  {option}
                                  {isRight && <CheckCircle2 className="float-right" size={19} />}
                                </button>
                              );
                            })}
                          </div>

                          {checked && <p className={`mt-4 rounded-xl p-3 text-sm font-bold ${answer === currentQuestion.answer ? "bg-green-100 text-green-800" : "bg-red-50 text-red-700"}`}>{answer === currentQuestion.answer ? "Excellent! Your answer is correct." : `Not quite. Correct answer: ${currentQuestion.options[currentQuestion.answer]}`}</p>}

                          <div className="mt-6 flex justify-end gap-3">
                            {!checked ? (
                              <button disabled={answer === null} onClick={checkAnswer} className="rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-40">Check Answer</button>
                            ) : (
                              <button onClick={nextQuestion} className="rounded-full bg-[#102d62] px-6 py-3 text-sm font-bold text-white hover:bg-green-700">{questionIndex === questions.length - 1 ? "View Result" : "Next Question"} <ArrowRight className="ml-1 inline" size={16} /></button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="py-5 text-center">
                          <Trophy className="mx-auto text-yellow-500" size={52} />
                          <h3 className="mt-4 text-2xl font-black text-[#102d62]">Quiz Completed!</h3>
                          <p className="mt-2 text-slate-600">You scored {score} out of {questions.length}.</p>
                          <p className="mt-1 text-sm font-bold text-green-700">Accuracy: {Math.round((score / questions.length) * 100)}%</p>
                          <button onClick={resetQuiz} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#102d62] px-6 py-3 text-sm font-bold text-white hover:bg-green-700"><RotateCcw size={16} /> Try Again</button>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTopic && selectedClass > 4 && (
                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                      Topic-wise questions for Class {selectedClass} will be added in the next quiz development phase.
                    </div>
                  )}

                  {showMapQuiz && selectedSubject === "Social Studies" && (
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-green-700">Social Studies / Map Practice</span>
                          <h3 className="mt-2 text-2xl font-black text-[#102d62]">India Map Practice</h3>
                        </div>
                        <button onClick={() => setShowMapQuiz(false)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"><ArrowLeft size={16} /> Back to Topics</button>
                      </div>
                      <IndiaMapQuiz />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {selectedExam && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-700">Entrance & General Practice</span>
                  <h2 className="mt-2 text-2xl font-black text-[#102d62]">{selectedExam} – Practice Zone</h2>
                </div>
                <button onClick={resetPractice} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"><ArrowLeft size={16} /> Back</button>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(examTopics[selectedExam] || []).map((topic) => (
                  <div key={topic} className="rounded-2xl border border-slate-200 p-5 hover:border-green-400 hover:shadow-md">
                    <ClipboardList size={25} className="text-green-700" />
                    <h3 className="mt-4 font-bold text-[#102d62]">{topic}</h3>
                    <p className="mt-2 text-xs text-slate-500">Practice sets and mock tests</p>
                    <button onClick={() => setNotice(`${topic} questions will be added in the next development step.`)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102d62] px-4 py-3 text-sm font-bold text-white hover:bg-green-700">Explore Practice <ChevronRight size={16} /></button>
                  </div>
                ))}
              </div>
              {notice && <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">{notice}</p>}
            </div>
          )}

          {showMapQuiz && selectedClass === null && selectedExam === null && (
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-xl sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-700">BIO90 Interactive Geography</span>
                  <h2 className="mt-2 text-2xl font-black text-[#102d62]">India Map Quiz Practice</h2>
                  <p className="mt-1 text-sm text-slate-500">Explore Indian States and Union Territories.</p>
                </div>
                <button onClick={() => setShowMapQuiz(false)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"><ArrowLeft size={16} /> Back to Popular</button>
              </div>
              <IndiaMapQuiz />
            </div>
          )}

          {!selectedClass && !selectedExam && !showMapQuiz && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <BookOpen className="mx-auto text-green-600" size={38} />
              <h3 className="mt-4 text-xl font-black text-[#102d62]">Your Practice Journey Starts Here</h3>
              <p className="mt-2 text-sm text-slate-500">Choose a class, exam or Map Practice above.</p>
            </div>
          )}
        </div>
      </section>

      {/* EXPERIMENT VIDEOS */}
      <section className="bg-gradient-to-br from-[#f0f9f4] to-[#fff8ed] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-green-700">Explore Science at Home</span>
              <h2 className="mt-2 text-3xl font-black text-[#102d62]">Experiments for Kids</h2>
              <p className="mt-2 text-sm text-slate-500">Watch, discover and try exciting science experiments.</p>
            </div>
            <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800">Watch • Learn • Explore</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiments.map((item, index) => (
              <article key={item.title} className="group overflow-hidden rounded-2xl border border-white bg-white/80 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={item.image}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onTouchStart={(e) => e.currentTarget.play().catch(() => {})}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-green-700 shadow-lg transition group-hover:scale-110"><Play size={21} fill="currentColor" /></span>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#102d62]">{item.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-[#102d62]">{item.title}</h3>
                  <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{item.description}</p>
                  <button onClick={() => setActiveVideo(index)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102d62] px-4 py-3 text-xs font-bold text-white transition hover:bg-green-700"><Play size={15} /> Watch Experiment</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveVideo(null)}>
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs font-bold uppercase text-green-700">BIO90 Experiments for Kids</p>
                <h3 className="mt-1 font-black text-[#102d62]">{experiments[activeVideo].title}</h3>
              </div>
              <button onClick={() => setActiveVideo(null)} className="rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-red-100 hover:text-red-600"><X size={22} /></button>
            </div>
            <video key={experiments[activeVideo].video} controls autoPlay playsInline className="aspect-video w-full bg-black">
              <source src={experiments[activeVideo].video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
            <p className="p-4 text-sm text-slate-500">{experiments[activeVideo].description}</p>
          </div>
        </div>
      )}

      {/* NOTES */}
      <section className="bg-white px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-[#f8fbff] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700"><LockKeyhole size={27} /></div>
            <div>
              <h2 className="text-xl font-black text-[#102d62]">Notes & Study Material</h2>
              <p className="mt-1 text-sm text-slate-500">Student login and notes download facility coming soon.</p>
            </div>
          </div>
          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800">Coming Soon</span>
        </div>
      </section>

      {/* MOBILE APP IMAGE PLACEHOLDER */}
      <section className="overflow-hidden bg-gradient-to-br from-[#fff8ed] to-[#edf6ff] px-5 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800"><Smartphone size={15} /> LEARN ON THE GO</span>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#102d62] sm:text-4xl">
              Learning at Your Pace,
              <span className="block text-green-600">Anytime, Anywhere.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">Access learning resources, practice activities and your study journey from your mobile device.</p>
            <span className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#102d62] px-5 py-3 text-white">
              <Smartphone size={26} />
              <span><span className="block text-[10px] text-white/70">BIO90 LEARNING APP</span><strong className="text-sm">Coming Soon</strong></span>
            </span>
          </div>
          
<div className="relative mx-auto w-full max-w-3xl">
  <div className="absolute inset-10 rounded-full bg-green-200/50 blur-3xl" />

  <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-3xl border-2 border-green-300 bg-white/70 p-4 shadow-xl backdrop-blur">

    <img
      src="/image/app.png"
      alt="BIO90 Learning Platform"
      className="relative z-10 w-full h-auto max-h-[520px] object-contain"
    />

  </div>
</div>
</div>
</section>
</main>
);
}

