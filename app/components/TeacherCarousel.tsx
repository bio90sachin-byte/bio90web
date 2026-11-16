
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

const teachers = [
  {
    id: "sachin",
    name: "Sachin Sharma",
    subject: "Chemistry",
    image: "/image/teachers/sachin-sharma.jpeg",
    videoId: "a8jWJWBvzeY",
    videoStart: 94,
    videoEnd: 100,
  },
  {
    id: "teacher-2",
    name: "Priyanshi Ma'am",
    subject: "Biology",
    image: "",
    videoId: "",
    videoStart: 0,
    videoEnd: 0,
  },
  {
    id: "teacher-3",
    name: "Anij Sir",
    subject: "Physics",
    image: "",
    videoId: "",
    videoStart: 0,
    videoEnd: 0,
  },
  {
    id: "teacher-4",
    name: "Saddab Sir",
    subject: "Mathematics",
    image: "",
    videoId: "",
    videoStart: 0,
    videoEnd: 0,
  },
   {
    id: "teacher-5",
    name: "Chnki Ma'am",
    subject: "Mathematics",
    image: "",
    videoId: "",
    videoStart: 0,
    videoEnd: 0,
  },
];

export default function TeacherCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeSoundVideo, setActiveSoundVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  // Detect active card during horizontal scrolling
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = Array.from(slider.children) as HTMLElement[];
    const sliderLeft = slider.getBoundingClientRect().left;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - sliderLeft
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Navigate to a particular teacher card
  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.children[index] as HTMLElement;
    if (!card) return;

    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const targetPosition =
      slider.scrollLeft + cardRect.left - sliderRect.left;

    setActiveVideo(null);
    setActiveSoundVideo(null);
    setActiveIndex(index);

    slider.scrollTo({
      left: targetPosition,
      behavior: "smooth",
    });
  };

  // Next teacher
  const goToNextSlide = () => {
    goToSlide((activeIndex + 1) % teachers.length);
  };

  // Previous teacher
  const goToPreviousSlide = () => {
    goToSlide(
      (activeIndex - 1 + teachers.length) % teachers.length
    );
  };

  // Desktop mouse drag: start
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = slider.scrollLeft;

    setActiveVideo(null);
    setActiveSoundVideo(null);

    slider.setPointerCapture(e.pointerId);
  };

  // Desktop mouse drag: move
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.isDragging) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const distance = e.clientX - dragRef.current.startX;

    slider.scrollLeft =
      dragRef.current.startScrollLeft - distance;
  };

  // Desktop mouse drag: stop
  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragRef.current.isDragging = false;

    const slider = sliderRef.current;

    if (slider?.hasPointerCapture(e.pointerId)) {
      slider.releasePointerCapture(e.pointerId);
    }
  };

  // Reload only the YouTube video in sound mode
  const enableSound = (teacherId: string) => {
    setActiveVideo(teacherId);
    setActiveSoundVideo(teacherId);
  };

  return (
    <section className="relative overflow-hidden bg-[#061630] px-5 py-24 text-white lg:px-10 lg:py-28">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-lime-400/15 blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
              THE PEOPLE BEHIND BIO90
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl lg:text-6xl">
              Meet Our
              <span className="block text-lime-400">
                Teachers.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-blue-100">
              Meet the educators who make learning meaningful through
              knowledge, guidance and a passion for teaching.
            </p>
          </div>

          {/* SLIDER CONTROLS */}
          <div className="flex items-center gap-3">

            <span className="text-sm font-semibold text-blue-200">
              Swipe to explore
            </span>

            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous teacher"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white transition duration-300 hover:border-lime-400 hover:bg-lime-400 hover:text-[#061630]"
            >
              ←
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next teacher"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-lime-400/50 text-xl text-lime-400 transition duration-300 hover:translate-x-1 hover:bg-lime-400 hover:text-[#061630]"
            >
              →
            </button>

          </div>
        </div>

        {/* HORIZONTAL TEACHER SLIDER */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDragStart={(e) => e.preventDefault()}
          role="region"
          aria-label="BIO90 teachers"
          className="mt-14 flex snap-x snap-mandatory touch-pan-x select-none gap-6 overflow-x-auto overscroll-x-contain pb-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >

          {teachers.map((teacher, index) => {
            const isPlaying = activeVideo === teacher.id;
            const isSoundOn = activeSoundVideo === teacher.id;

            return (
              <article
                key={teacher.id}
                onMouseEnter={() => {
                  if (
                    teacher.videoId &&
                    !dragRef.current.isDragging &&
                    activeSoundVideo !== teacher.id
                  ) {
                    setActiveVideo(teacher.id);
                  }
                }}
                onMouseLeave={() => {
                  if (activeSoundVideo !== teacher.id) {
                    setActiveVideo(null);
                  }
                }}
                style={{ animationDelay: `${index * 120}ms` }}
                className="teacher-card group relative h-[470px] w-[290px] shrink-0 snap-start overflow-hidden rounded-[30px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-lime-400/70 sm:h-[540px] sm:w-[350px]"
              >

                {/* ORIGINAL TEACHER PHOTO */}
                {teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    priority={index === 0}
                    unoptimized
                    sizes="(max-width: 640px) 290px, 350px"
                    draggable={false}
                    className={`object-cover object-top transition-all duration-500 ${
                      isPlaying
                        ? "scale-105 opacity-0"
                        : "scale-100 opacity-100"
                    }`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#183B58] via-[#0B1D3D] to-[#31551C]">

                    <div className="text-center">

                      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-lime-400/50 bg-white/10 text-5xl font-black text-lime-400 backdrop-blur-xl">
                        {teacher.name.charAt(0)}
                      </div>

                      <p className="mt-5 text-xs font-semibold tracking-widest text-white/70">
                        TEACHER PROFILE
                      </p>

                    </div>
                  </div>
                )}

                {/* YOUTUBE VIDEO */}
                {isPlaying && teacher.videoId && (
                  <iframe
                    key={`${teacher.id}-${isSoundOn ? "sound" : "muted"}`}
                    src={`https://www.youtube.com/embed/${teacher.videoId}?autoplay=1&mute=${isSoundOn ? 0 : 1}&controls=${isSoundOn ? 1 : 0}&start=${teacher.videoStart}&end=${teacher.videoEnd}&playsinline=1&rel=0`}
                    title={`${teacher.name} teaching preview`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className={`absolute inset-0 z-20 h-full w-full border-0 ${
                      isSoundOn
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                  />
                )}

                {/* ENABLE SOUND BUTTON */}
                {isPlaying && teacher.videoId && !isSoundOn && (
                  <button
                    type="button"
                    onClick={() => enableSound(teacher.id)}
                    className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-lime-400/50 bg-[#061630]/90 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition hover:bg-lime-400 hover:text-[#061630]"
                  >
                    🔊 Enable Sound
                  </button>
                )}

                {/* IMAGE OVERLAY */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

                {/* GLASS NAME PLATE */}
                <div className="absolute left-5 top-5 z-30 flex items-center gap-3 rounded-full border border-white/40 bg-white/20 py-2 pl-2 pr-6 shadow-xl backdrop-blur-xl">

                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/70 bg-[#071B43]">

                    {teacher.image ? (
                      <Image
                        src={teacher.image}
                        alt=""
                        fill
                        unoptimized
                        sizes="44px"
                        draggable={false}
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-lime-400">
                        {teacher.name.charAt(0)}
                      </div>
                    )}

                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {teacher.name}
                    </h3>

                    <p className="text-xs text-white/85">
                      {teacher.subject}
                    </p>
                  </div>

                </div>

                {/* GLASS BORDER */}
                <div className="pointer-events-none absolute inset-0 z-30 rounded-[30px] border border-white/20 transition duration-500 group-hover:border-lime-400/70" />

              </article>
            );
          })}

        </div>

        {/* PAGINATION DOTS */}
        <div className="mt-9 flex items-center justify-center gap-2">

          {teachers.map((teacher, index) => (
            <button
              key={teacher.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${teacher.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "w-9 bg-lime-400"
                  : "w-2.5 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}

        </div>

      </div>

      {/* CARD ENTRANCE ANIMATION */}
      <style jsx>{`
        .teacher-card {
          opacity: 0;
          animation: teacherReveal 0.8s ease forwards;
        }

        @keyframes teacherReveal {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-card {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

    </section>
  );
}
