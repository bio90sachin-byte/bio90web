
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Hourglass } from "lucide-react";

type Unit = "months" | "days" | "hours";

// CBSE Class 10th और 12th की आधिकारिक शुरुआती तारीख
const nextExamDate: string | null = "2027-02-16T10:30:00+05:30";

export default function ExamCountdown() {
  const [unit, setUnit] = useState<Unit>("days");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  let months = "--";
  let days = "--";
  let hours = "--";
  let minutes = "--";
  let seconds = "--";
  let status = "Official exam dates will be updated soon";

  if (nextExamDate && now !== null) {
    const target = new Date(nextExamDate);
    const diff = target.getTime() - now;

    if (!Number.isNaN(target.getTime())) {
      if (diff <= 0) {
        months = "0";
        days = "0";
        hours = "00";
        minutes = "00";
        seconds = "00";
        status = "Exam date reached";
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        const totalDays = Math.floor(totalSeconds / 86400);
        const totalHours = Math.floor(totalSeconds / 3600);

        let monthCount =
          (target.getFullYear() - new Date(now).getFullYear()) * 12 +
          target.getMonth() -
          new Date(now).getMonth();

        const anchor = new Date(now);
        anchor.setMonth(anchor.getMonth() + monthCount);

        if (anchor.getTime() > target.getTime()) monthCount--;

        months = String(Math.max(0, monthCount));
        days = String(totalDays);
        hours = String(totalHours);
        minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        seconds = String(totalSeconds % 60).padStart(2, "0");

        status = "Make every moment count";
      }
    }
  }

  const labels = {
    months: "Months remaining",
    days: "Days remaining",
    hours: "Hours : Minutes : Seconds remaining",
  };

  return (
    <section className="bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#071B43] via-[#102B57] to-[#15364B] p-4 shadow-lg shadow-blue-950/15 backdrop-blur-xl sm:px-6">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/exam-dates"
              aria-label="View all board exam dates"
              className="group flex min-w-0 flex-1 items-center gap-3"
            >
              <div className="hidden rounded-xl border border-lime-400/25 bg-lime-400/10 p-3 text-lime-400 sm:block">
                <Hourglass className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-lime-400 sm:text-xs">
                  Your Exam Countdown
                </p>

                {unit === "hours" ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                    {[
                      { value: hours, label: "Hours" },
                      { value: minutes, label: "Minutes" },
                      { value: seconds, label: "Seconds" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-baseline gap-1">
                        <span className="text-2xl font-black leading-none tabular-nums text-white sm:text-4xl">
                          {item.value}
                        </span>
                        <span className="text-[10px] font-semibold text-blue-100 sm:text-xs">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-black leading-none tabular-nums text-white sm:text-4xl">
                      {unit === "months" ? months : days}
                    </span>
                    <span className="text-xs font-semibold text-blue-100 sm:text-sm">
                      {labels[unit]}
                    </span>
                  </div>
                )}

                <p className="mt-1 text-[10px] text-blue-200 sm:text-xs">
                  {status}
                </p>
              </div>

              <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-lime-400 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="relative flex shrink-0 gap-1 rounded-full border border-white/15 bg-white/10 p-1">
              {(["months", "days", "hours"] as Unit[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setUnit(item)}
                  aria-pressed={unit === item}
                  className={`rounded-full px-3 py-2 text-[10px] font-bold capitalize transition sm:text-xs ${
                    unit === item
                      ? "bg-lime-400 text-[#071B43] shadow"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
