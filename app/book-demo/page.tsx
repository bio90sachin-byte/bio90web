
"use client";

import { useState, type ChangeEvent, type FormEvent, useRef } from "react";
import SiteHeader from "../components/SiteHeader";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  GraduationCap,
  UserRound,
  BookOpen,
  MapPin,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";

type FormValues = {
  parentName: string;
  studentName: string;
  mobile: string;
  alternateMobile: string;
  studentClass: string;
  board: string;
  subjects: string;
  city: string;
  locality: string;
  tuitionMode: string;
  requirements: string;
};

const initialValues: FormValues = {
  parentName: "",
  studentName: "",
  mobile: "",
  alternateMobile: "",
  studentClass: "",
  board: "",
  subjects: "",
  city: "",
  locality: "",
  tuitionMode: "",
  requirements: "",
};

const steps = [
  { title: "Personal Details", subtitle: "Let's get to know you", icon: UserRound },
  { title: "Academic Details", subtitle: "Tell us about your studies", icon: BookOpen },
  { title: "Learning Preferences", subtitle: "Choose your learning needs", icon: GraduationCap },
];

export default function BookDemoPage() {
  const [successStudentName, setSuccessStudentName] = useState("");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    if (name === "mobile" || name === "alternateMobile") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function nextStep() {
    if (!formRef.current?.reportValidity()) return;

    setErrorMessage("");
    setStep((current) => Math.min(current + 1, 2));
  }

  function previousStep() {
    setErrorMessage("");
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (
      values.alternateMobile &&
      !/^[6-9]\d{9}$/.test(values.alternateMobile)
    ) {
      setErrorMessage("Please enter a valid alternate mobile number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const payload = {
      ...values,
      source: "BIO90 Book Demo Page",
    };

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
      setSuccessStudentName(values.studentName.trim());
      setShowSuccess(true);

      setShowSuccess(true);
      setValues(initialValues);
      setStep(0);
    } catch (error) {
      console.error("Enquiry submission error:", error);
      setErrorMessage("Unable to submit your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/60 bg-white/75 px-4 py-3.5 text-sm text-[#071B43] outline-none backdrop-blur-md transition placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-400/15";

  const labelClass =
    "mb-2 block text-xs font-bold tracking-wide text-[#071B43]";

  return (
    <>
      <SiteHeader />

      <main className="relative min-h-screen overflow-hidden bg-[#071B43] px-4 py-12 sm:px-6 sm:py-16">

        {/* BACKGROUND DECORATIONS */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl animate-glow" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-glow" />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* PAGE HEADING */}
          <div className="mb-10 text-center animate-fade-up">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/20 bg-lime-400/10 text-lime-400 shadow-lg shadow-lime-400/10">
              <GraduationCap size={30} />
            </div>

            <p className="text-xs font-extrabold tracking-[0.25em] text-lime-400">
              YOUR FUTURE STARTS HERE
            </p>

            <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">
              Book Your Free <span className="text-lime-400">Demo</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100/75 sm:text-base">
              A few simple details. One step closer to better learning.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:grid-cols-[0.78fr_1.22fr]">

            {/* LEFT PANEL */}
            <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.04] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-lime-300/20" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-lime-300/20" />

              <div className="relative">
                <div className="flex items-center gap-2 text-lime-400">
                  <Sparkles size={17} />
                  <span className="text-xs font-extrabold tracking-[0.18em]">
                    BIO90 – NEET EXPERTS
                  </span>
                </div>

                <h2 className="mt-8 text-3xl font-black leading-tight text-white sm:text-4xl">
                  Let's Make Your
                  <span className="block text-lime-400">Learning Better.</span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-blue-100/75">
                  Get the right academic guidance for your class, subjects
                  and learning goals.
                </p>

                <div className="mt-9 space-y-5">
                  {[
                    "Foundation Classes – 6th to 8th",
                    "Board Preparation – 9th to 12th",
                    "Science & Mathematics",
                    "Online Learning & Home Tuition",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                        <Check size={14} />
                      </span>
                      <span className="text-sm font-medium text-blue-50">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-lime-400" size={23} />
                    <p className="font-bold text-white">Your details are important</p>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-blue-100/65">
                    Your information will be used by BIO90 to understand
                    your requirements and contact you about your demo.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM PANEL */}
            <div className="bg-white/90 p-5 sm:p-9">

              {/* STEP HEADER */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.16em] text-lime-600">
                    FREE DEMO REGISTRATION
                  </p>
                  <h2 className="mt-2 text-xl font-black text-[#071B43] sm:text-2xl">
                    {steps[step].title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {steps[step].subtitle}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-lime-700">
                  {(() => {
                    const StepIcon = steps[step].icon;
                    return <StepIcon size={24} />;
                  })()}
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-7 flex gap-2">
                {steps.map((item, index) => (
                  <div key={item.title} className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index <= step ? "w-full bg-lime-500" : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between text-[10px] font-bold text-slate-400">
                <span>STEP {step + 1} OF 3</span>
                <span>{Math.round(((step + 1) / 3) * 100)}% COMPLETE</span>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-8"
              >

                {/* STEP 1 */}
                {step === 0 && (
                  <div key="personal" className="step-animation space-y-5">
                    <div>
                      <label className={labelClass}>Parent / Guardian Name *</label>
                      <input
                        required
                        name="parentName"
                        value={values.parentName}
                        onChange={handleChange}
                        type="text"
                        minLength={2}
                        placeholder="Enter parent or guardian name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Student Name *</label>
                      <input
                        required
                        name="studentName"
                        value={values.studentName}
                        onChange={handleChange}
                        type="text"
                        minLength={2}
                        placeholder="Enter student's full name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Mobile Number *</label>
                      <input
                        required
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        type="tel"
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9"
                        placeholder="10-digit mobile number"
                        className={inputClass}
                      />
                      <p className="mt-2 text-[11px] text-slate-500">
                        Enter a valid 10-digit Indian mobile number.
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Alternate Mobile Number</label>
                      <input
                        name="alternateMobile"
                        value={values.alternateMobile}
                        onChange={handleChange}
                        type="tel"
                        inputMode="numeric"
                        pattern="([6-9][0-9]{9})?"
                        title="Enter a valid 10-digit Indian mobile number or leave blank"
                        placeholder="Optional"
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 1 && (
                  <div key="academic" className="step-animation space-y-5">
                    <div>
                      <label className={labelClass}>Student's Current Class *</label>
                      <select
                        required
                        name="studentClass"
                        value={values.studentClass}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select Class</option>
                        {[
                          "Class 6th",
                          "Class 7th",
                          "Class 8th",
                          "Class 9th",
                          "Class 10th",
                          "Class 11th",
                          "Class 12th",
                        ].map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Education Board *</label>
                      <select
                        required
                        name="board"
                        value={values.board}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select Board</option>
                        <option value="CBSE">CBSE</option>
                        <option value="UP Board">UP Board</option>
                        <option value="ICSE">ICSE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Preferred Subjects *</label>
                      <input
                        required
                        name="subjects"
                        value={values.subjects}
                        onChange={handleChange}
                        type="text"
                        placeholder="e.g. Physics, Chemistry, Biology, Maths"
                        className={inputClass}
                      />
                    </div>

                    <div className="rounded-2xl border border-lime-200 bg-lime-50 p-4">
                      <div className="flex items-center gap-2 text-lime-700">
                        <BookOpen size={18} />
                        <span className="text-xs font-extrabold">ACADEMIC SUPPORT</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        BIO90 offers academic guidance from Class 6th to 12th.
                        Share your subjects to help us understand your needs.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 2 && (
                  <div key="preferences" className="step-animation space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>City *</label>
                        <input
                          required
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter your city"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Locality / Area *</label>
                        <input
                          required
                          name="locality"
                          value={values.locality}
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter locality"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Preferred Learning Mode *</label>
                      <select
                        required
                        name="tuitionMode"
                        value={values.tuitionMode}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select Learning Mode</option>
                        <option value="Home Tuition">Home Tuition</option>
                        <option value="Online Tuition">Online Tuition</option>
                        <option value="Offline Classes">Offline Classes</option>
                        <option value="Need Guidance">Need Guidance</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Anything Else? (Optional)</label>
                      <textarea
                        name="requirements"
                        value={values.requirements}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your learning requirements..."
                        className={inputClass}
                      />
                    </div>

                    <div className="rounded-2xl border border-lime-200 bg-lime-50 p-4">
                      <div className="flex items-center gap-2 text-lime-700">
                        <MapPin size={18} />
                        <span className="text-xs font-extrabold">ALMOST THERE!</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        Review your details and submit your free demo enquiry.
                        Our team will connect with you.
                      </p>
                    </div>
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {errorMessage && (
                  <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
                    {errorMessage}
                  </p>
                )}

                {/* NAVIGATION */}
                <div className="mt-8 flex items-center gap-3">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={previousStep}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-[#071B43] transition hover:bg-slate-100"
                    >
                      <ArrowLeft size={17} />
                      Back
                    </button>
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-lime-500 px-5 py-3.5 text-sm font-extrabold text-[#071B43] shadow-lg shadow-lime-500/20 transition hover:-translate-y-0.5 hover:bg-lime-400"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-lime-500 px-5 py-3.5 text-sm font-extrabold text-[#071B43] shadow-lg shadow-lime-500/20 transition hover:-translate-y-0.5 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Free Demo Enquiry"}
                      {!isSubmitting && <CheckCircle2 size={18} />}
                    </button>
                  )}
                </div>

                <p className="mt-5 text-center text-[10px] leading-5 text-slate-400">
                  By submitting, you agree that BIO90 may contact you regarding
                  your demo enquiry.
                </p>
              </form>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-blue-100/50">
            BIO90 – Learn Better. Achieve More.
          </p>
        </div>
      </main>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04112b]/80 px-4 backdrop-blur-md">
          <div className="success-animation relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/60 bg-white p-8 text-center shadow-2xl sm:p-10">

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              aria-label="Close success message"
              className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
            >
              <X size={18} />
            </button>

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-100 text-lime-600">
              <div className="absolute inset-0 rounded-full border-2 border-lime-300 animate-success-ring" />
              <CheckCircle2 size={52} className="success-check" />
            </div>

            <p className="mt-7 text-xs font-extrabold tracking-[0.2em] text-lime-600">
              ENQUIRY RECEIVED
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#071B43]">
              Thank You,
            </h2>

            <p className="mt-2 break-words text-2xl font-extrabold text-lime-600">
              {successStudentName || "Student"}!
            </p>

            <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-slate-600">
              Your free demo enquiry has been submitted. We will connect
              with you soon.
            </p>

            <div className="mt-7 rounded-2xl bg-[#F3F7FC] p-4">
              <p className="text-xs font-bold text-[#071B43]">
                What's next?
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Our team will review your requirements and contact you
                regarding your demo.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-7 w-full rounded-xl bg-lime-500 px-6 py-4 text-sm font-extrabold text-[#071B43] transition hover:bg-lime-400"
            >
              Continue to BIO90
            </button>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes stepIn {
          from { opacity: 0; transform: translateX(22px) scale(0.985); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes successIn {
          from { opacity: 0; transform: translateY(25px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes successRing {
          0% { transform: scale(0.75); opacity: 0; }
          70% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes checkDraw {
          from { opacity: 0; transform: scale(0.5) rotate(-20deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s ease both;
        }

        .animate-glow {
          animation: glow 7s ease-in-out infinite;
        }

        .step-animation {
          animation: stepIn 0.4s ease both;
        }

        .success-animation {
          animation: successIn 0.45s cubic-bezier(.2,.8,.2,1) both;
        }

        .animate-success-ring {
          animation: successRing 0.7s ease both;
        }

        .success-check {
          animation: checkDraw 0.55s 0.15s ease both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up,
          .animate-glow,
          .step-animation,
          .success-animation,
          .animate-success-ring,
          .success-check {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
