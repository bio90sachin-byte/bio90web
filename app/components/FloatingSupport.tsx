
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Headset,
  X,
  Phone,
  MessageCircle,
  BookOpen,
  Sparkles,
} from "lucide-react";

function CartoonMascot() {
  return (
    <img
      src="/image/support/bio90-kids-mascot.gif"
      alt="BIO90 Happy Jumping Student"
      className="h-full w-full rounded-2xl object-contain"
      loading="eager"
    />
  );
}

export default function FloatingSupport() {
  const pathname = usePathname();
  const isKidsPage = pathname === "/class-1-8";

  const [isOpen, setIsOpen] = useState(false);

  // Auto-open only once when the website initially loads.
  // Page navigation will not trigger the popup again.
  // Refreshing the browser will show it again.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3">

      {/* SUPPORT POPUP */}
      {isOpen && (
        <div className="relative w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-3xl border border-white bg-white shadow-[0_18px_55px_rgba(7,27,67,0.24)] animate-in fade-in slide-in-from-bottom-3 duration-300">

          {/* Branded Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#071B43] to-[#123B70] px-5 py-4 pr-14 text-white">

            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-lime-400/15 blur-xl" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.25em] text-lime-300">
                  BIO90 SUPPORT
                </p>

                <h3 className="mt-1 text-lg font-black">
                  {isKidsPage ? "Hello, Young Learner!" : "How can we help?"}
                </h3>

                <p className="mt-1 text-xs text-blue-100">
                  {isKidsPage
                    ? "Let's make learning easy and fun!"
                    : "Our team is here to help you."}
                </p>
              </div>

              {isKidsPage && (
                <div className="h-20 w-20 shrink-0">
                  <CartoonMascot />
                </div>
              )}
            </div>

            {/* Close Button - Separate from GIF */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close support popup"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white text-[#071B43] shadow-lg transition hover:rotate-90 hover:bg-lime-300"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Popup Content */}
          <div className="p-5">
            {isKidsPage ? (
              <div className="mb-4 rounded-2xl border border-lime-200 bg-lime-50 p-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#102D62]">
                  <Sparkles size={17} className="text-green-600" />
                  Need help with your studies?
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Ask us about Classes 1–8, subjects, notes and practice material.
                </p>
              </div>
            ) : (
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#102D62]">
                <BookOpen size={19} className="text-green-600" />
                Talk to BIO90 Experts
              </div>
            )}

            <a
              href="/book-demo"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#071B43] px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#123B70]"
            >
              <MessageCircle size={17} />
              Request a Call Back
            </a>

            <a
              href="tel:+918218117547"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-lime-300 bg-lime-50 px-4 py-3 text-sm font-extrabold text-[#102D62] transition hover:bg-lime-100"
            >
              <Phone size={17} className="text-green-700" />
              Call Us: +91 8218117547
            </a>

            <p className="mt-3 text-center text-[10px] text-slate-400">
              BIO90 – NEET Experts | Learn • Practice • Achieve
            </p>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close support" : "Open BIO90 support"}
        aria-expanded={isOpen}
        className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#071B43] shadow-[0_8px_25px_rgba(7,27,67,0.25)] transition duration-300 hover:-translate-y-1 hover:scale-105 ${
          isKidsPage
            ? "bg-lime-300"
            : "bg-gradient-to-br from-[#102D62] to-[#071B43] text-lime-300"
        }`}
      >
        {isOpen ? (
          <X
            size={27}
            className={isKidsPage ? "text-[#071B43]" : "text-lime-300"}
          />
        ) : isKidsPage ? (
          <CartoonMascot />
        ) : (
          <Headset size={29} />
        )}
      </button>
    </div>
  );
}
