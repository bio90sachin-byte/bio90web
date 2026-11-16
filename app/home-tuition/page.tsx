
"use client";

import SiteHeader from "../components/SiteHeader";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  GraduationCap,
  Atom,
  Pencil,
  FlaskConical,
  Sparkles,
} from "lucide-react";

export default function HomeTuitionPage() {

const [isSubmitting, setIsSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState("");

async function handleEnquirySubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
  setFormStatus("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  const payload = Object.fromEntries(formData.entries());

  payload.source = "BIO90 Home Tuition Page";

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyzby7Q6kMNQAUEtkxS59w-CAls1q9WZKmGSMqQB7LCZe1fMvaVWpDxig6sVUdobZ0rdw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      }
    );

    setFormStatus(
      "Thank you! Your enquiry has been submitted. Our team will contact you soon."
    );

    form.reset();
  } catch (error) {
    console.error("Enquiry submission error:", error);
    setFormStatus(
      "Unable to submit your enquiry. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
}

  const trustItems = [
    { icon: GraduationCap, title: "Personal Attention" },
    { icon: BookOpen, title: "Concept Clarity" },
    { icon: Sparkles, title: "Learn at Home" },
  ];

  const students = [
    { name: "Pari", className: "Class 12th" },
    { name: "Harshit Kumar", className: "Class 12th" },
    { name: "Vedant Sharma", className: "Class 12th" },
    { name: "Saloni", className: "Class 12th" },
    { name: "Yati Kaushik", className: "Class 7th" },
    { name: "Vasudev", className: "Class 11th" },
    { name: "Rishabh", className: "Class 10th" },
    { name: "Riya Singh", className: "Class 12th & Neet" },
    { name: "Aarav", className: "Class 9th" },
    { name: "Ananya", className: "Class 8th" }, 
    { name: "Pari Chaudhary", className: "Class 12th" },
    { name: "Chinki", className: "Class 12th" },
    { name: "Rishav Thakur", className: "Class 7th" },
    { name: "Keshav Singh", className: "Class 7th to 10th" },
    { name: "Charu Singh", className: "Class 7th" },
    { name: "Diya Singh", className: "Class 12th & NEET" },
    { name: "Sajal Rana", className: "Class 7th -9th" },
    { name: "Rishav Sharma", className: "Class 5th" },
    { name: "Taru Singh", className: "Class 12th" },
    { name: "NiKhil", className: "Class 12th" },
    { name: "Lali", className: "Class 8th" },





  ];

  return (
    <>
      {/* BIO90 NAVIGATION HEADER */}
      <SiteHeader />
      <main className="min-h-screen overflow-hidden bg-white">
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden bg-[#071B43] px-5 py-20 text-white sm:px-8 lg:py-28">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-lime-400/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-400/20 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div className="animate-[fadeUp_0.9s_ease-out_both]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-xs font-bold tracking-wider text-lime-300">
                <Sparkles size={15} />
                PERSONALIZED HOME TUITION
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Better Learning
                <span className="block text-lime-400">
                  Begins at Home.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                Personalised academic guidance for Classes 6th–12th.
                Build strong concepts, improve confidence and make
                learning a better experience with BIO90.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/book-demo"
                  className="group inline-flex items-center gap-3 rounded-xl bg-lime-400 px-6 py-4 text-sm font-extrabold text-[#071B43] shadow-lg shadow-lime-400/20 transition hover:-translate-y-1 hover:bg-lime-300"
                >
                  Book a Free Demo
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#classes"
                  className="inline-flex items-center rounded-xl border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
                >
                  Explore Classes
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-blue-200">
                <span>Classes 6th–12th</span>
                <span>Foundation</span>
                <span>Board Preparation</span>
                <span>Science (PCB/PCM)</span>
              </div>
            </div>

            {/* RIGHT 3D EDUCATION VISUAL */}
            <div className="relative mx-auto flex h-[390px] w-full max-w-[520px] items-center justify-center sm:h-[480px]">
              {/* Main Glow */}
              <div className="absolute h-64 w-64 rounded-full bg-lime-400/10 blur-3xl sm:h-80 sm:w-80" />

              {/* Floating Orbit */}
              <div className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-lime-300/20 sm:h-[390px] sm:w-[390px]" />

              {/* Main Book */}
              <div className="book-float relative z-10 flex h-64 w-64 items-center justify-center rounded-[28px] border border-white/20 bg-gradient-to-br from-[#254C80] via-[#12315D] to-[#071B43] shadow-[20px_30px_60px_rgba(0,0,0,0.4)] [transform:perspective(900px)_rotateY(-18deg)_rotateX(10deg)] sm:h-80 sm:w-80">
                <div className="absolute inset-3 rounded-2xl border border-white/10" />

                <div className="flex flex-col items-center gap-5">
                  <BookOpen
                    size={100}
                    strokeWidth={1.1}
                    className="text-lime-300 sm:h-32 sm:w-32"
                  />

                  <div className="text-center">
                    <p className="text-2xl font-black tracking-widest text-white sm:text-3xl">
                      BIO90
                    </p>
                    <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-lime-300">
                      LEARN • GROW • ACHIEVE
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 h-1 w-12 rounded-full bg-lime-400" />
              </div>

              {/* Floating Calculator */}
              <div className="float-one absolute right-2 top-8 z-20 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl sm:right-4 sm:h-24 sm:w-24">
                <Calculator size={42} className="text-lime-300" />
              </div>

              {/* Floating Atom */}
              <div className="float-two absolute left-0 top-24 z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl sm:left-2 sm:h-20 sm:w-20">
                <Atom size={38} className="text-cyan-300" />
              </div>

              {/* Floating Pencil */}
              <div className="float-three absolute bottom-12 right-5 z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl sm:right-0 sm:h-20 sm:w-20">
                <Pencil size={36} className="text-yellow-300" />
              </div>

              {/* Floating Science */}
              <div className="float-one absolute bottom-8 left-5 z-20 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl sm:left-0 sm:h-20 sm:w-20">
                <FlaskConical size={36} className="text-lime-300" />
              </div>

              {/* Graduation Cap */}
              <div className="float-two absolute right-20 top-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-lime-300/30 bg-lime-400/10 backdrop-blur-xl sm:right-24 sm:h-16 sm:w-16">
                <GraduationCap size={32} className="text-lime-300" />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST HIGHLIGHTS */}
        <section className="border-b border-slate-100 bg-white px-5 py-8">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3"
                >
                  <Icon size={25} className="text-[#77B900]" />
                  <span className="text-[10px] font-extrabold text-[#071B43] sm:text-sm">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

      

{/* STUDENT COMMUNITY SECTION */}
<section className="bg-[#F3F7FC] px-5 py-12 sm:py-16">

  <div className="mx-auto max-w-7xl">

    {/* SECTION HEADING */}
    <div className="mb-8 text-center">
      <p className="text-xs font-extrabold tracking-[0.2em] text-[#77B900]">
        OUR STUDENT COMMUNITY
      </p>

      <h2 className="mt-3 text-2xl font-black text-[#071B43] sm:text-3xl">
        Meet Our Learners
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        Students learning, growing and building their future with BIO90.
      </p>
    </div>

    {/* STUDENT TICKER CONTAINER */}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white py-4 shadow-sm">

      <div className="student-marquee">
        <div className="student-marquee-track">

          {[1, 2].map((group) => (
            <div
              key={group}
              className="student-marquee-group"
              aria-hidden={group === 2}
            >
              {students.map((student, index) => (
                <div
                  key={`${group}-${index}`}
                  className="student-chip"
                >
                  <p className="student-name">
                    {student.name}
                  </p>

                  <p className="student-class">
                    {student.className}
                  </p>
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

    </div>

  </div>
</section>


        {/* TEACHING VIDEO DEMO */}
        <section className="bg-white px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-[#77B900]">
                EXPERIENCE BIO90
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#071B43] sm:text-4xl">
                See How Learning
                <span className="block text-[#77B900]">
                  Happens at BIO90.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Get a glimpse of our teaching approach.
                Explore how we explain concepts, solve doubts
                and make learning easier for students.
              </p>

              <ul className="mt-7 space-y-3 text-sm font-semibold text-[#071B43]">
                <li className="flex items-center gap-3">
                  <BookOpen className="text-[#77B900]" size={19} />
                  Concept-based teaching
                </li>
                <li className="flex items-center gap-3">
                  <Atom className="text-[#77B900]" size={19} />
                  Subject-focused learning
                </li>
                <li className="flex items-center gap-3">
                  <GraduationCap className="text-[#77B900]" size={19} />
                  Academic guidance
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[#071B43] p-2 shadow-2xl shadow-blue-950/15">
              <iframe
  className="aspect-video w-full rounded-2xl"
src="https://www.youtube.com/embed/a8jWJWBvzeY?start=94"
  title="BIO90 Teaching Demo"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>
                

              <div className="flex items-center justify-between gap-3 px-3 py-4 text-white">
                <div>
                  <p className="text-sm font-extrabold">
                    BIO90 Teaching Demo
                  </p>
                  <p className="mt-1 text-xs text-blue-200">
                    Watch our teaching approach
                  </p>
                </div>

                <span className="rounded-full bg-lime-400/15 px-3 py-2 text-[10px] font-bold text-lime-300">
                  VIDEO DEMO
                </span>
              </div>
            </div>
          </div>
        </section>




{/* EXPLORE LEARNING PROGRAMS */}
<section
  id="classes"
  className="relative overflow-hidden bg-[#F3F7FC] px-5 py-20 sm:py-24"
>
  <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />
  <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

  <div className="relative mx-auto max-w-7xl">
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="text-xs font-extrabold tracking-[0.22em] text-[#77B900]">
        LEARN • GROW • ACHIEVE
      </span>

      <h2 className="mt-4 text-3xl font-black leading-tight text-[#071B43] sm:text-5xl">
        Every Student Has a
        <span className="block text-[#77B900]">Different Journey.</span>
      </h2>

      <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
        The right guidance at the right stage can make learning
        more meaningful. Find the academic support that fits your child.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {/* FOUNDATION */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-lime-100/70 transition duration-500 group-hover:scale-150" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-[#65A800]">
            <BookOpen size={28} />
          </div>

          <p className="mt-7 text-xs font-extrabold tracking-widest text-[#77B900]">
            BUILD STRONG BASICS
          </p>

          <h3 className="mt-2 text-2xl font-black text-[#071B43]">
            Foundation Classes
          </h3>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Classes 6th – 8th
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Build curiosity, strengthen fundamentals and develop
            confidence in Mathematics and Science.
          </p>

          <div className="mt-6 space-y-3 text-sm font-medium text-[#071B43]">
            <p>✓ Strong subject fundamentals</p>
            <p>✓ Concept-based learning</p>
            <p>✓ Regular practice and guidance</p>
          </div>
        </div>
      </div>

      {/* BOARD PREPARATION */}
      <div className="group relative overflow-hidden rounded-3xl bg-[#071B43] p-7 text-white shadow-xl transition duration-500 hover:-translate-y-2">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lime-400/10 transition duration-500 group-hover:scale-150" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/15 text-lime-400">
            <GraduationCap size={30} />
          </div>

          <p className="mt-7 text-xs font-extrabold tracking-widest text-lime-400">
            PREPARE WITH CONFIDENCE
          </p>

          <h3 className="mt-2 text-2xl font-black">
            Board Preparation
          </h3>

          <p className="mt-2 text-sm font-semibold text-blue-200">
            Classes 9th – 10th
          </p>

          <p className="mt-5 text-sm leading-7 text-blue-100">
            Prepare systematically with syllabus-focused teaching,
            question practice and board examination guidance.
          </p>

          <div className="mt-6 space-y-3 text-sm font-medium text-white">
            <p>✓ Science and Mathematics</p>
            <p>✓ Chapter-wise preparation</p>
            <p>✓ Practice and revision support</p>
          </div>

          <span className="mt-7 inline-flex rounded-full bg-lime-400 px-4 py-2 text-xs font-extrabold text-[#071B43]">
            STUDY SMARTER
          </span>
        </div>
      </div>

      {/* SENIOR SECONDARY */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/70 transition duration-500 group-hover:scale-150" />

        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Atom size={29} />
          </div>

          <p className="mt-7 text-xs font-extrabold tracking-widest text-blue-600">
            MOVE TOWARDS YOUR GOALS
          </p>

          <h3 className="mt-2 text-2xl font-black text-[#071B43]">
            Senior Secondary
          </h3>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            Classes 11th – 12th
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Develop deeper subject understanding with structured
            learning for Science stream students.
          </p>

          <div className="mt-6 space-y-3 text-sm font-medium text-[#071B43]">
            <p>✓ Physics and Chemistry</p>
            <p>✓ Biology and Mathematics</p>
            <p>✓ Board-focused preparation</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12 text-center">
      <p className="text-sm text-slate-600">
        Not sure which program is right for your child?
      </p>

      <Link
        href="/book-demo"
        className="group mt-5 inline-flex items-center gap-3 rounded-full bg-lime-500 px-8 py-4 text-sm font-extrabold text-[#071B43] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-lime-400"
      >
        Talk to BIO90
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
</section>





{/* FREQUENTLY ASKED QUESTIONS */}
<section className="bg-[#F3F7FC] px-5 py-20 sm:py-24">
  <div className="mx-auto max-w-4xl">

    <div className="mb-10 text-center">
      <p className="text-xs font-extrabold tracking-[0.2em] text-[#77B900]">
        HAVE QUESTIONS?
      </p>
      <h2 className="mt-3 text-3xl font-black text-[#071B43] sm:text-4xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-3 text-sm text-slate-500">
        Everything parents need to know about BIO90 Home Tuition.
      </p>
    </div>

    <div className="space-y-3">
      {[
        {
          q: "Which classes are covered by BIO90 Home Tuition?",
          a: "BIO90 provides academic learning support for students from Class 6th to Class 12th."
        },
        {
          q: "Which subjects are available?",
          a: "Subject support includes Mathematics, Physics, Chemistry, Biology and other academic subjects according to the student's class and requirements."
        },
        {
          q: "Do you provide CBSE and UP Board tuition?",
          a: "You can enquire for CBSE, UP Board, ICSE and other board requirements. Availability will be confirmed by our team."
        },
        {
          q: "Can I request a free demo class?",
          a: "Yes. Submit the enquiry form above and our team will contact you to discuss a demo appointment."
        },
        {
          q: "Do you provide online tuition?",
          a: "You can select Online Tuition in the enquiry form to discuss online learning options."
        },
        {
          q: "How are tuition fees decided?",
          a: "Fees depend on the student's class, subjects, tuition mode and learning requirements. Contact BIO90 for details."
        },
      ].map((faq, index) => (
        <details key={index} className="group rounded-2xl border border-slate-200 bg-white p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#071B43]">
            {faq.q}
            <span className="text-xl text-lime-600 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
            {faq.a}
          </p>
        </details>
      ))}
    </div>

  </div>
</section>







      </main>

      {/* GLOBAL ANIMATIONS */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        .book-float {
          animation: float 5s ease-in-out infinite;
        }

        .float-one {
          animation: float 4s ease-in-out infinite;
        }

        .float-two {
          animation: float 5s ease-in-out infinite 0.5s;
        }

        .float-three {
          animation: float 4.5s ease-in-out infinite 1s;
        }

        /* ================================
   STUDENT PROFILES - HORIZONTAL CAROUSEL
================================ */

/* =====================================
   BIO90 STUDENT COMMUNITY SECTION
===================================== */

/* Student ticker outer area */
.student-marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 5px 0;
}

/* Continuous scrolling track */
.student-marquee-track {
  display: flex;
  width: max-content;
  animation: studentTicker 32s linear infinite;
  will-change: transform;
}

/* Two identical student groups */
.student-marquee-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 14px;
  padding-right: 14px;
}

/* Small student cards */
.student-chip {
  width: 170px;
  min-height: 65px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 8px 12px;

  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 14px;

  text-align: center;
  transition: background 0.25s ease, border-color 0.25s ease;
}

/* Student name */
.student-name {
  margin: 0;
  color: #071B43;
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  white-space: nowrap;
}

/* Student class */
.student-class {
  margin-top: 3px;
  color: #64748B;
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;
}

/* Card hover */
.student-chip:hover {
  background: #ECFCCB;
  border-color: #84CC16;
}

/* Infinite Right-to-Left Animation */
@keyframes studentTicker {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* Tablet */
@media (max-width: 768px) {
  .student-chip {
    width: 150px;
    min-height: 62px;
  }

  .student-marquee-group {
    gap: 12px;
    padding-right: 12px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .student-chip {
    width: 135px;
    min-height: 58px;
    padding: 7px 8px;
  }

  .student-name {
    font-size: 11px;
  }

  .student-class {
    font-size: 9px;
  }

  .student-marquee-group {
    gap: 10px;
    padding-right: 10px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .student-marquee-track {
    animation: none;
  }
}










 

        @media (prefers-reduced-motion: reduce) {
          .book-float,
          .float-one,
          .float-two,
          .float-three,
          .student-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
