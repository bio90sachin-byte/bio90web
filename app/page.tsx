
import BannerCarousel from "./components/BannerCarousel";
import Image from "next/image";
import Link from "next/link";
import ExamCountdown from "./components/ExamCountdown";
import SiteHeader from "./components/SiteHeader";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Microscope,
  Atom,
  Calculator,
  FlaskConical,
  CheckCircle2,
  PlayCircle,
  Phone,
  MapPin,
  Clock,
  Menu,
} from "lucide-react";

const courses = [
  {
    title: "Foundation Classes",
    classes: "Classes 6th – 8th",
    description:
      "Build strong fundamentals in Science and Mathematics with concept-based learning.",
    icon: BookOpen,
    subjects: ["Science", "Mathematics", "Concept Building"],
  },
  {
    title: "Board Preparation",
    classes: "Classes 9th – 10th",
    description:
      "Prepare confidently for board examinations with focused academic guidance.",
    icon: GraduationCap,
    subjects: ["Science", "Mathematics", "Board Practice"],
  },
  {
    title: "Senior Secondary",
    classes: "Classes 11th – 12th",
    description:
      "Strengthen your concepts and prepare systematically for Class 11th and 12th.",
    icon: Atom,
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
];

const features = [
  "Concept-based classroom learning",
  "Experienced subject guidance",
  "Regular tests and performance analysis",
  "Practice questions and study material",
  "Personal attention to students",
  "Online batches and home tuition options",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
    <SiteHeader />

      <BannerCarousel />
      <ExamCountdown />

      

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-lime-700">Our Academic Programs</p>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-950 sm:text-4xl">
            Learning Programs for Every Stage
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Structured academic support to help students build a strong
            foundation and perform better in examinations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div key={course.title} className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-lime-400 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 group-hover:bg-lime-100">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-lime-700">{course.classes}</p>
                <h3 className="mt-2 text-2xl font-extrabold text-blue-950">{course.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{course.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.subjects.map((subject) => (
                    <span key={subject} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {subject}
                    </span>
                  ))}
                </div>
                <Link
  href={course.title === "Foundation Classes" ? "/class-1-8" : "/courses"}
  className="mt-7 inline-flex items-center font-bold text-blue-900 hover:text-lime-700"
>
  Explore Program <ArrowRight className="ml-2 h-4 w-4" />
</Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Crash Courses */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-lime-700">Focused Exam Preparation</p>
            <h2 className="mt-3 text-3xl font-extrabold text-blue-950 sm:text-4xl">
              Board Exam Crash Courses
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Focused revision, important concepts, question practice and
              exam-oriented preparation for Class 10th and 12th students.
            </p>
            <div className="mt-7 space-y-4">
              {["Class 10th – Science & Mathematics", "Class 12th – Physics, Chemistry, Biology & Mathematics"].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-lime-600" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/courses" className="mt-9 inline-flex items-center rounded-full bg-blue-950 px-7 py-4 font-bold text-white hover:bg-blue-900">
              Know More <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="rounded-3xl bg-blue-950 p-8 text-white sm:p-12">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400 text-blue-950">
              <FlaskConical className="h-8 w-8" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-lime-400">BIO90 Academic Support</p>
            <h3 className="mt-4 text-3xl font-extrabold">Prepare Smart. Perform Better.</h3>
            <p className="mt-4 leading-7 text-blue-100">
              A focused learning approach that helps students revise,
              practise and improve their academic performance.
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
              <PlayCircle className="h-9 w-9 text-lime-400" />
              <span className="font-semibold">Ask for a free demo class</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why BIO90 */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-lime-700">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-extrabold text-blue-950 sm:text-4xl">
              Education That Builds Confidence
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              At BIO90, the focus is on understanding concepts, developing
              good study habits and helping students progress step by step.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center font-bold text-blue-900">
              Know About BIO90 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
                <span className="font-semibold leading-6 text-slate-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="bg-lime-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 px-5 py-14 text-center md:flex-row md:text-left lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-widest text-blue-950/70">Take the First Step</p>
            <h2 className="mt-2 text-3xl font-extrabold text-blue-950 sm:text-4xl">
              Experience a Free Demo Class
            </h2>
            <p className="mt-3 text-blue-950/80">
              Understand our teaching approach before you begin.
            </p>
          </div>
          <Link href="/book-demo" className="inline-flex shrink-0 items-center rounded-full bg-blue-950 px-8 py-4 font-bold text-white transition hover:bg-blue-900">
            Book Free Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
