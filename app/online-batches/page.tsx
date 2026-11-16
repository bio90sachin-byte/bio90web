
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

function TypingHeading() {
  const first = "Learn Better.";
  const second = "Achieve More.";

  return (
    <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
      <span className="typing-line typing-first block">
        {first}
      </span>

      <span className="typing-line typing-second block text-lime-400">
        {second}
      </span>
    </h1>
  );
}


import {
  Users,
  ClipboardCheck,
  GraduationCap,
  FileText,
  BookOpen,
  Brain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Wrench,
  Scale,
  Landmark,
  BriefcaseBusiness,
  MonitorPlay,
} from "lucide-react";

/* EDIT THESE WITH BIO90'S ACTUAL NUMBERS */
const statistics = [
  { number: "5000+", label: "Students Guided", icon: Users },
  { number: "72000+", label: "Practice Questions", icon: ClipboardCheck },
  { number: "1500+", label: "Exams & Tests", icon: GraduationCap },
  { number: "500+", label: "Study Resources", icon: FileText },
];

const exams = [
  {
    title: "CBSE Class 10th",
    description: "Complete board preparation with Science, Maths and other subjects.",
    tag: "Board Preparation",
    icon: BookOpen,
  },
  {
    title: "CBSE Class 12th",
    description: "Focused preparation for Physics, Chemistry, Biology and Mathematics.",
    tag: "Board Preparation",
    icon: GraduationCap,
  },
  {
    title: "UP Board Class 10th",
    description: "Concept clarity, syllabus coverage and regular practice.",
    tag: "Board Preparation",
    icon: BookOpen,
  },
  {
    title: "UP Board Class 12th",
    description: "Subject-wise preparation and structured board exam guidance.",
    tag: "Board Preparation",
    icon: GraduationCap,
  },
  {
    title: "Foundation Classes",
    description: "Build strong academic concepts for Classes 6th to 8th.",
    tag: "Foundation",
    icon: Brain,
  },
  {
    title: "ICSE / ISC",
    description: "Academic guidance for school students and board preparation.",
    tag: "School Education",
    icon: FileText,
  },
];

const categories = [
  {
    name: "School & Board",
    icon: BookOpen,
    items: [
      {
        title: "CBSE Class 10th",
        description: "Board preparation for Class 10 students.",
      },
      {
        title: "CBSE Class 12th",
        description: "Science stream preparation for Class 12 students.",
      },
      {
        title: "UP Board Class 10th",
        description: "UP Board syllabus and exam preparation.",
      },
      {
        title: "UP Board Class 12th",
        description: "Subject-wise board preparation.",
      },
      {
        title: "ICSE / ISC",
        description: "School and board examination preparation.",
      },
    ],
  },
  {
    name: "CUET",
    icon: GraduationCap,
    items: [
      {
        title: "CUET UG",
        description: "Preparation guidance for undergraduate entrance examinations.",
      },
      {
        title: "CUET PG",
        description: "Enquire about postgraduate entrance preparation.",
      },
    ],
  },
  {
    name: "Defence & Police",
    icon: Shield,
    items: [
      {
        title: "NDA",
        description: "Enquire about NDA preparation and guidance.",
      },
      {
        title: "Defence Exams",
        description: "Preparation guidance for defence entrance examinations.",
      },
      {
        title: "Police Recruitment",
        description: "Enquire about police recruitment exam preparation.",
      },
    ],
  },
  {
    name: "Engineering Entrance",
    icon: Wrench,
    items: [
      {
        title: "JEE Main",
        description: "Engineering entrance preparation guidance.",
      },
      {
        title: "JEE Advanced",
        description: "Advanced engineering entrance preparation guidance.",
      },
    ],
  },
  {
    name: "Teaching",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Teaching Exams",
        description: "Enquire about teaching examination preparation.",
      },
      {
        title: "Teaching Eligibility",
        description: "Guidance for teaching eligibility examinations.",
      },
    ],
  },
  {
    name: "Law, Arts, Commerce",
    icon: Scale,
    items: [
      {
        title: "Law Entrance",
        description: "Enquire about law entrance preparation.",
      },
      {
        title: "Arts & Commerce",
        description: "Academic and entrance examination guidance.",
      },
    ],
  },
  {
    name: "Civil Services",
    icon: Landmark,
    items: [
      {
        title: "UPSC",
        description: "Enquire about civil services preparation guidance.",
      },
      {
        title: "State PCS",
        description: "Guidance for state civil services examinations.",
      },
    ],
  },
];

const features = [
  {
    icon: Users,
    title: "Personal Attention",
    description: "Focused guidance to understand every student's learning needs.",
  },
  {
    icon: BookOpen,
    title: "Concept Clarity",
    description: "Learn important topics through clear explanations.",
  },
  {
    icon: ClipboardCheck,
    title: "Regular Practice",
    description: "Practice questions and tests to improve preparation.",
  },
  {
    icon: FileText,
    title: "Study Material",
    description: "Notes and practice resources to support learning.",
  },
];

const faqs = [
  {
    question: "Which classes are available in BIO90 Online Batches?",
    answer:
      "BIO90 offers academic learning support for Foundation Classes 6th to 8th, Board Preparation for Classes 9th and 10th, and Classes 11th and 12th.",
  },
  {
    question: "Which boards do you cover?",
    answer:
      "You can enquire about CBSE, UP Board, ICSE and ISC courses. Our team will confirm the available batches.",
  },
  {
    question: "Which subjects are available for Classes 11th and 12th?",
    answer:
      "Subject options include Physics, Chemistry, Biology and Mathematics, depending on the selected course and batch.",
  },
  {
    question: "Do you provide study material?",
    answer:
      "Study notes and practice material can be provided according to the course and class.",
  },
  {
    question: "Can I attend a demo class?",
    answer:
      "Yes. Submit your details through the Book Free Demo page and our team will contact you.",
  },
  {
    question: "How can I enquire about fees and batch timings?",
    answer:
      "Use the Book Free Demo form. Our team will contact you to discuss course details, fees and available timings.",
  },
];

export default function OnlineBatchesPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryRef = useRef<HTMLDivElement>(null);

  const currentCategory = categories[activeCategory];

  function moveCategory(direction: number) {
    setActiveCategory((current) => {
      return (current + direction + categories.length) % categories.length;
    });
  }

  function scrollCategories(direction: number) {
    categoryRef.current?.scrollBy({
      left: direction * 260,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">

      <SiteHeader />

      {/* HERO SECTION WITH VIDEO */}
      <section className="overflow-hidden bg-[#071B43] px-5 py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-lime-400">
              BIO90 Online Learning
            </p>

            <TypingHeading />

            <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Structured online learning, concept-based teaching and
              academic guidance for students from Class 6th to 12th.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-extrabold text-[#071B43] transition hover:bg-lime-300"
              >
                Book Free Demo
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#popular-exams"
                className="rounded-full border border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#071B43]"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* YOUTUBE VIDEO */}
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/a8jWJWBvzeY?start=94&rel=0"
              title="BIO90 Online Teaching Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

        </div>
      </section>
       {/* STATISTICS */}
      <section className="bg-[#F3F7FC] px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-700">
              Learn Smart with BIO90
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#071B43] sm:text-4xl">
              Save Your Study Time
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Focus on what matters with organised learning resources
              and structured academic support.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statistics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center shadow-sm"
              >
                <item.icon className="mx-auto h-9 w-9 text-lime-600" />

                <div className="mx-auto mt-8 h-1 w-10 bg-red-500" />

                <p className="mt-6 text-3xl font-black text-[#EF4444]">
                  {item.number}
                </p>

                <p className="mt-3 text-sm font-bold text-[#071B43]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* POPULAR EXAMS & COURSES */}
      <section
        id="popular-exams"
        className="bg-white px-5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-700">
              Explore Learning Programs
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#071B43] sm:text-4xl">
              Popular Exams & Courses
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Choose your class and start preparing with BIO90's
              structured academic learning programs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-lime-400 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 p-3 text-[#071B43]">
                    <exam.icon className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-lime-100 px-3 py-1 text-[10px] font-extrabold text-lime-800">
                    {exam.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-[#071B43]">
                  {exam.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {exam.description}
                </p>

                <Link
                  href="/book-demo"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#071B43] transition group-hover:text-lime-700"
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EXPLORE YOUR EXAM SLIDER */}
      <section className="bg-[#F4F4F5] px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-7 text-3xl font-bold text-[#202B3B] sm:text-4xl">
            Explore your Exam
          </h2>

          {/* CATEGORY SLIDER */}
          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() => scrollCategories(-1)}
              aria-label="Scroll categories left"
              className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:text-lime-600 sm:flex"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>

            <div
              ref={categoryRef}
              className="flex min-w-0 flex-1 gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(index)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold transition sm:text-base ${
                    activeCategory === index
                      ? "bg-rose-100 text-[#071B43]"
                      : "text-slate-500 hover:bg-slate-100 hover:text-[#071B43]"
                  }`}
                >
                  <category.icon className="h-6 w-6" />
                  {category.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCategories(1)}
              aria-label="Scroll categories right"
              className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:text-lime-600 sm:flex"
            >
              <ChevronRight className="h-9 w-9" />
            </button>

          </div>

          {/* SELECTED CATEGORY EXAMS */}
          <div className="mt-7 rounded-xl bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-lime-100 p-3 text-lime-700">
                <currentCategory.icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-lime-700">
                  Selected Category
                </p>
                <h3 className="text-xl font-extrabold text-[#071B43]">
                  {currentCategory.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {currentCategory.items.map((item, index) => (
                <details
                  key={item.title}
                  className="group rounded-lg border border-slate-200 bg-white"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 text-sm font-semibold text-[#071B43] sm:text-base">
                    {item.title}

                    <span className="text-xl text-slate-500 transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>

                  <div className="border-t border-slate-100 px-4 py-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <Link
                      href="/book-demo"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-lime-700 hover:text-lime-800"
                    >
                      Enquire Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </details>
              ))}
            </div>

          </div>

          {/* CATEGORY NAVIGATION */}
          <div className="mt-5 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => moveCategory(-1)}
              className="rounded-full bg-white p-3 text-[#071B43] shadow-sm hover:bg-lime-100"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(index)}
                  aria-label={`Select ${category.name}`}
                  className={`h-2.5 rounded-full transition-all ${
                    activeCategory === index
                      ? "w-7 bg-lime-500"
                      : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => moveCategory(1)}
              className="rounded-full bg-white p-3 text-[#071B43] shadow-sm hover:bg-lime-100"
              aria-label="Next category"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </section>

     





      {/* WHY BIO90 */}
      <section className="bg-[#071B43] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-400">
              The BIO90 Learning Experience
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              A Better Way to Learn
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:border-lime-400/60 hover:bg-white/10"
              >
                <feature.icon className="h-7 w-7 text-lime-400" />

                <h3 className="mt-5 text-base font-extrabold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-6 text-blue-100">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3 text-sm font-extrabold text-[#071B43] transition hover:bg-lime-300"
            >
              Book Your Free Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F3F7FC] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">

          <div className="mb-10 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-lime-700">
              Have Questions?
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#071B43] sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Find answers to common questions about BIO90 Online Batches.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#071B43]">
                  {faq.question}

                  <span className="text-xl text-lime-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      

    </main>
  );
}
