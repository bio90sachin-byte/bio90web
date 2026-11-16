
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import TeacherCarousel from "../components/TeacherCarousel";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Target,
  Lightbulb,
  Users,
  Microscope,
  Atom,
  Calculator,
  FlaskConical,
  CheckCircle2,
  Sparkles,
  Quote,
  ChevronDown,
} from "lucide-react";

const programs = [
  {
    number: "01",
    title: "Foundation Classes",
    classes: "Classes 6th – 8th",
    description:
      "Build strong academic fundamentals through conceptual learning, curiosity and regular practice.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Board Preparation",
    classes: "Classes 9th – 10th",
    description:
      "Develop subject understanding, strengthen problem-solving skills and prepare confidently for board examinations.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Senior Secondary",
    classes: "Classes 11th – 12th",
    description:
      "Focused learning in Physics, Chemistry, Biology and Mathematics for a stronger academic foundation.",
    icon: GraduationCap,
  },
];

const features = [
  {
    icon: Lightbulb,
    title: "Concept Clarity",
    description:
      "Understand the logic behind every topic instead of relying only on memorisation.",
  },
  {
    icon: Users,
    title: "Personal Attention",
    description:
      "A learning environment where students can ask questions and work on their individual learning needs.",
  },
  {
    icon: Target,
    title: "Focused Practice",
    description:
      "Regular practice and structured learning help students build accuracy and confidence.",
  },
  {
    icon: CheckCircle2,
    title: "Continuous Improvement",
    description:
      "Revision, doubt-solving and performance review support consistent academic progress.",
  },
];

const faqs = [
  {
    question: "What classes are available at BIO90?",
    answer:
      "BIO90 offers Foundation Classes for Classes 6th–8th, Board Preparation for Classes 9th–10th and Senior Secondary coaching for Classes 11th–12th.",
  },
  {
    question: "Which subjects are taught at BIO90?",
    answer:
      "For Classes 6th–10th, subject support includes Science and Mathematics. For Classes 11th–12th, students can get guidance in Physics, Chemistry, Biology and Mathematics.",
  },
  {
    question: "Does BIO90 provide Foundation Classes?",
    answer:
      "Yes. Foundation learning is available for Classes 6th–8th, with an emphasis on strengthening basic concepts and developing good study habits.",
  },
  {
    question: "Does BIO90 offer Board Examination preparation?",
    answer:
      "Yes. BIO90 provides academic preparation for Classes 9th–10th and 11th–12th, with subject-focused teaching and examination-oriented practice.",
  },
  {
    question: "Are online batches and home tuition available?",
    answer:
      "BIO90 has dedicated options for online batches and home tuition. Contact the team to discuss availability and suitable learning arrangements.",
  },
  {
    question: "Can students attend a demo class?",
    answer:
      "Yes. You can submit a free demo enquiry through the Book Free Demo page. The BIO90 team will contact you to discuss the next steps.",
  },
  {
    question: "How does BIO90 help students understand difficult topics?",
    answer:
      "The teaching approach focuses on concept explanation, examples, practice questions, revision and doubt-solving to make learning easier to follow.",
  },
  {
    question: "How can I enquire about admission?",
    answer:
      "Visit the Book Free Demo page and submit the student and parent details. The BIO90 team will get in touch with you.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#071B43]">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#061630] px-5 py-24 text-white sm:min-h-[700px] lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(163,230,53,0.15),transparent_42%)]" />
        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="absolute -right-20 top-28 h-[360px] w-[360px] rounded-full border border-lime-400/20" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-semibold text-lime-300">
              <Sparkles size={16} />
              GET TO KNOW BIO90
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Shaping Brighter Futures
              <span className="mt-2 block text-lime-400">
                Through Better Learning.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              At BIO90, we believe that every student deserves clear
              guidance, strong fundamentals and the confidence to achieve
              more through meaningful learning.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-3 rounded-full bg-lime-400 px-7 py-4 font-bold text-[#071B43] transition duration-300 hover:-translate-y-1 hover:bg-lime-300"
              >
                Book a Free Demo
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition duration-300 hover:border-lime-400 hover:text-lime-300"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-5 rounded-[40px] bg-lime-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-widest text-lime-300">
                  THE BIO90 APPROACH
                </span>
                <Sparkles className="text-lime-400" />
              </div>

              <div className="mt-10 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-[#071B43]">
                      <BookOpen size={25} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Learn with Clarity</p>
                      <p className="mt-1 text-sm text-blue-200">
                        Build strong concepts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-7 rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-200">
                      <Microscope size={25} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Explore with Curiosity</p>
                      <p className="mt-1 text-sm text-blue-200">
                        Understand every subject
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-[#071B43]">
                      <Target size={25} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Grow with Confidence</p>
                      <p className="mt-1 text-sm text-blue-100">
                        Move forward with purpose
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 text-center">
                <p className="text-2xl font-black tracking-wider text-white">
                  BIO<span className="text-lime-400">90</span>
                </p>
                <p className="mt-1 text-xs tracking-[0.25em] text-blue-200">
                  LEARN · UNDERSTAND · GROW
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-lime-400 to-transparent" />
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-green-700">
              WHO WE ARE
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              More Than Coaching.
              <span className="block text-green-700">A Better Way to Learn.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
            <p>
              BIO90 is an academic learning initiative focused on helping
              students develop a deeper understanding of their subjects.
              We support learners from Classes 6th to 12th through
              structured academic guidance.
            </p>
            <p>
              Our approach brings together clear explanations, meaningful
              practice and a supportive learning environment. We aim to
              make students active learners who understand what they study
              and why it matters.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="bg-[#F4F8F2] px-5 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-[30px] bg-[#071B43] p-8 text-white sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-[#071B43]">
              <Target size={28} />
            </div>
            <p className="mt-9 text-sm font-bold tracking-[0.2em] text-lime-400">
              OUR MISSION
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Make Learning Meaningful.
            </h2>
            <p className="mt-6 leading-8 text-blue-100">
              To provide accessible, structured and concept-focused
              academic guidance that helps students build strong
              fundamentals, improve their understanding and become
              confident learners.
            </p>
          </div>

          <div className="rounded-[30px] border border-green-100 bg-white p-8 shadow-sm sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071B43] text-lime-400">
              <Lightbulb size={28} />
            </div>
            <p className="mt-9 text-sm font-bold tracking-[0.2em] text-green-700">
              OUR VISION
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Inspire a Love for Learning.
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              To create a learning environment where students are
              encouraged to ask questions, think independently and
              approach their academic goals with curiosity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-green-700">
              WHAT WE OFFER
            </p>
            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Learning for Every Stage
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Academic guidance designed around the learning needs of
              students at different stages of their education.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => {
              const Icon = program.icon;

              return (
                <div
                  key={program.number}
                  className={`group rounded-[28px] border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    index === 1
                      ? "border-[#071B43] bg-[#071B43] text-white"
                      : "border-slate-200 bg-white text-[#071B43]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${
                      index === 1 ? "text-lime-400" : "text-green-700"
                    }`}>
                      {program.number}
                    </span>
                    <Icon
                      size={29}
                      className={index === 1 ? "text-lime-400" : "text-green-700"}
                    />
                  </div>

                  <p className={`mt-12 text-sm font-bold ${
                    index === 1 ? "text-lime-400" : "text-green-700"
                  }`}>
                    {program.classes}
                  </p>

                  <h3 className="mt-3 text-2xl font-black">
                    {program.title}
                  </h3>

                  <p className={`mt-5 leading-7 ${
                    index === 1 ? "text-blue-100" : "text-slate-600"
                  }`}>
                    {program.description}
                  </p>

                  <Link
                    href="/courses"
                    className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${
                      index === 1 ? "text-lime-400" : "text-green-700"
                    }`}
                  >
                    Explore Program <ArrowRight size={17} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEACHING PHILOSOPHY */}
      <section className="bg-[#071B43] px-5 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-lime-400">
                THE BIO90 DIFFERENCE
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                We Focus on
                <span className="block text-lime-400">Understanding First.</span>
              </h2>
            </div>

            <p className="max-w-xl leading-8 text-blue-100">
              Every student learns differently. Our teaching philosophy
              focuses on building understanding, encouraging questions
              and helping learners improve through consistent effort.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 transition duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-[#071B43]">
                    <Icon size={24} />
                  </div>
                  <p className="mt-8 text-sm font-bold text-lime-400">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-blue-100">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-lime-200/60 blur-2xl" />
            <div className="relative rounded-[32px] bg-[#F0F5EA] p-8 sm:p-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#071B43] p-6 text-white">
                  <BookOpen size={30} className="text-lime-400" />
                  <p className="mt-8 text-lg font-bold">Learn</p>
                  <p className="mt-2 text-sm text-blue-100">Understand the topic</p>
                </div>

                <div className="mt-10 rounded-2xl bg-lime-400 p-6 text-[#071B43]">
                  <FlaskConical size={30} />
                  <p className="mt-8 text-lg font-bold">Explore</p>
                  <p className="mt-2 text-sm">Ask and discover</p>
                </div>

                <div className="rounded-2xl bg-white p-6 text-[#071B43] shadow-sm">
                  <Calculator size={30} className="text-green-700" />
                  <p className="mt-8 text-lg font-bold">Practice</p>
                  <p className="mt-2 text-sm text-slate-600">Apply what you learn</p>
                </div>

                <div className="mt-10 rounded-2xl bg-[#DCE9F8] p-6 text-[#071B43]">
                  <Atom size={30} />
                  <p className="mt-8 text-lg font-bold">Improve</p>
                  <p className="mt-2 text-sm">Grow with revision</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-green-700">
              HOW WE TEACH
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              A Learning Process That
              <span className="block text-green-700">Builds Confidence.</span>
            </h2>

            <p className="mt-7 leading-8 text-slate-600">
              Effective learning is not just about completing a syllabus.
              It is about understanding ideas, practising regularly and
              learning from mistakes.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Clear explanations of important concepts",
                "Examples connected to the topic",
                "Practice questions and regular revision",
                "Doubt-solving and learning support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 size={21} className="mt-0.5 shrink-0 text-green-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* MEET OUR TEACHERS */}
      <TeacherCarousel />

      {/* FAQ */}
      <section className="bg-[#F4F8F2] px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-green-700">
              GOT QUESTIONS?
            </p>
            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Frequently Asked
              <span className="block text-green-700">Questions.</span>
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Find answers to common questions about BIO90, our courses
              and the learning experience.
            </p>

            <div className="mt-9 rounded-2xl bg-[#071B43] p-6 text-white">
              <p className="font-bold">Still have questions?</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Our team can help you find the right learning option.
              </p>
              <Link
                href="/book-demo"
                className="mt-5 inline-flex items-center gap-2 font-bold text-lime-400"
              >
                Contact BIO90 <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-300 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-[#071B43] [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-3 text-sm font-bold text-green-700">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={21}
                    className="shrink-0 text-green-700 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#061630] px-5 py-24 text-center text-white lg:py-28">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <Quote size={38} className="mx-auto text-lime-400" />

          <p className="mt-7 text-sm font-bold tracking-[0.2em] text-lime-400">
            YOUR JOURNEY STARTS HERE
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            Every Great Future
            <span className="block text-lime-400">Begins with Learning.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-8 text-blue-100">
            Take the first step towards a stronger academic foundation.
            Discover the BIO90 learning experience.
          </p>

          <Link
            href="/book-demo"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-lime-400 px-8 py-4 font-bold text-[#071B43] transition duration-300 hover:-translate-y-1 hover:bg-lime-300"
          >
            Book Your Free Demo
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
