
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Baby } from "lucide-react";
import { usePathname } from "next/navigation";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Online Batches", href: "/online-batches" },
  { name: "Home Tuition", href: "/home-tuition" },
  { name: "Study Material", href: "/study-material" },
  { name: "Class 1–8", href: "/class-1-8" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/image/logo/bio90-logo.png"
            alt="BIO90 - NEET Experts"
            width={150}
            height={65}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

       
<nav className="hidden items-center gap-1 text-xs font-semibold text-slate-700 xl:flex">
  {navLinks.map((link) => {
    const isActive = pathname === link.href;
    const isClassPage = link.href === "/class-1-8";

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
          isActive
            ? "bg-lime-100 text-blue-900 shadow-sm ring-1 ring-lime-300"
            : "text-slate-700 hover:bg-lime-50 hover:text-blue-900"
        }`}
      >
        {isClassPage && (
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-lime-100 to-green-200 text-green-700 transition-all duration-300 ${
              isActive
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            }`}
          >
            <Baby size={19} strokeWidth={2.2} />
          </span>
        )}

        {link.name}
      </Link>
    );
  })}
</nav>




        <Link
          href="/book-demo"
          className="hidden items-center rounded-full bg-lime-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-lime-400 lg:inline-flex"
        >
          Book Free Demo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>


<button
  type="button"
  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-navigation"
  onClick={() => setMobileMenuOpen((prev) => !prev)}
  className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#071B43] shadow-sm transition hover:bg-lime-50 lg:hidden"
>
  {mobileMenuOpen ? (
    <X className="h-6 w-6" />
  ) : (
    <Menu className="h-6 w-6" />
  )}
</button>




      </div>

            {mobileMenuOpen && (
        <nav
  id="mobile-navigation"
  className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden"
>
          <div className="flex flex-col gap-1">

      
{navLinks.map((link) => {
  const isActive = pathname === link.href;
  const isClassPage = link.href === "/class-1-8";

  return (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setMobileMenuOpen(false)}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? "bg-lime-100 text-blue-900 shadow-sm ring-1 ring-lime-300"
          : "text-slate-700 hover:bg-lime-50 hover:text-blue-900"
      }`}
    >
      {isClassPage && (
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-lime-100 to-green-200 text-green-700 transition-all duration-300 ${
            isActive
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`}
        >
          <Baby size={20} strokeWidth={2.2} />
        </span>
      )}

      {link.name}
    </Link>
  );
})}


            <Link
              href="/book-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-lime-400"
            >
              Book Free Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
