
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    desktop: "/image/banners/desktop/crash course.webp",
    mobile: "/image/banners/mobile/home Mobile.webp",
    alt: "BIO90 Foundation Classes",
    title: "Build a Strong Foundation",
    button: "Explore Courses",
    link: "/courses",
  },
  {
    id: 2,
    desktop: "/image/banners/desktop/Ai.webp",
    mobile: "/image/banners/mobile/digital.webp",
    alt: "BIO90 Board Preparation",
    title: "Prepare for Board Success",
    button: "View Courses",
    link: "/courses",
  },
  {
    id: 3,
    desktop: "/image/banners/desktop/Home.webp",
    mobile: "/image/banners/mobile/home Mobile.webp",
    alt: "BIO90 Crash Courses",
    title: "Focused Board Exam Preparation",
    button: "Book Free Demo",
    link: "/book-demo",
  },
];

export default function BannerCarousel() {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((current) => (current + 1) % banners.length);
  };

  const previousSlide = () => {
    setActive((current) =>
      current === 0 ? banners.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const timer = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const current = banners[active];

  return (
    <section
      aria-label="BIO90 promotional banners"
      className="relative w-full overflow-hidden bg-[#071B43]"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/7] lg:aspect-[1920/650]">
        {/* Desktop image */}
        <Image
          key={current.desktop}
          src={current.desktop}
          alt={current.alt}
          fill
          priority={active === 0}
          sizes="100vw"
          className="hidden object-cover sm:block"
        />

        {/* Mobile image */}
        <Image
          key={current.mobile}
          src={current.mobile}
          alt={current.alt}
          fill
          priority={active === 0}
          sizes="100vw"
          className="object-cover sm:hidden"
        />

        {/* Placeholder while images are not uploaded */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#071B43] to-[#123D65] px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-lime-400">
            BIO90 – NEET Experts
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
            {current.title}
          </h2>
          <Link
            href={current.link}
            className="mt-7 rounded-full bg-lime-400 px-7 py-3 font-bold text-[#071B43]"
          >
            {current.button}
          </Link>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous banner"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#071B43] shadow-lg hover:bg-lime-400 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#071B43] shadow-lg hover:bg-lime-400 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to banner ${index + 1}`}
            aria-current={active === index}
            className={`h-2.5 rounded-full transition-all ${
              active === index
                ? "w-8 bg-lime-400"
                : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
