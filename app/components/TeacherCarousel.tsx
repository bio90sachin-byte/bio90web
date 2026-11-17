
"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type PointerEvent,
} from "react";

type Teacher = {
  name: string;
  subject: string;
  image?: string;
  videoId?: string;
  videoStart?: number;
  videoEnd?: number;
  badge?: string;
};

const teachers: Teacher[] = [
  {
    name: "Sachin Sharma",
    subject: "Chemistry",
    image: "/image/teachers/sachin-sharma.jpeg",
    videoId: "a8jWJWBvzeY",
    videoStart: 94,
    videoEnd: 100,
    badge: "FOUNDER & CEO",
  },
  {
    name: "Priyanshi Ma'am",
    subject: "Biology",
  },
  {
    name: "Anij Sir",
    subject: "Physics",
  },
  {
    name: "Saddab Sir",
    subject: "Mathematics",
  },
  {
    name: "Chnki Ma'am",
    subject: "Mathematics",
  },
];

export default function TeacherCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(390);

  const sectionRef = useRef<HTMLElement>(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const pointerStartX = useRef(0);
  const pointerDragging = useRef(false);

  const total = teachers.length;

  // Responsive screen detection
  useEffect(() => {
    const media = window.matchMedia("(max-width: 899px)");

    const updateScreen = () => {
      setIsMobile(media.matches);
      setScreenWidth(window.innerWidth);
    };

    updateScreen();

    media.addEventListener("change", updateScreen);
    window.addEventListener("resize", updateScreen);

    return () => {
      media.removeEventListener("change", updateScreen);
      window.removeEventListener("resize", updateScreen);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Stop previous video when center teacher changes
  useEffect(() => {
    setActiveVideo(null);
    setSoundEnabled(false);
  }, [activeIndex]);

  // Navigation
  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total);
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  // Relative position of each card
  const getPosition = (index: number) => {
    let position = index - activeIndex;

    if (position > total / 2) position -= total;
    if (position < -total / 2) position += total;

    return position;
  };

  // YouTube embed URL
  const getVideoUrl = (teacher: Teacher) => {
    if (!teacher.videoId) return "";

    const params = new URLSearchParams({
      autoplay: "1",
      mute: soundEnabled ? "0" : "1",
      controls: "0",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      iv_load_policy: "3",
      disablekb: "1",
    });

    if (teacher.videoStart !== undefined) {
      params.set("start", String(teacher.videoStart));
    }

    if (teacher.videoEnd !== undefined) {
      params.set("end", String(teacher.videoEnd));
    }

    return `https://www.youtube-nocookie.com/embed/${teacher.videoId}?${params.toString()}`;
  };

  // Card click
  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      goToSlide(index);
      return;
    }

    if (isMobile && teachers[index]?.videoId) {
      setActiveVideo((current) =>
        current === index ? null : index
      );
      setSoundEnabled(false);
    }
  };

  // Desktop hover
  const handleMouseEnter = (index: number) => {
    if (isMobile || index !== activeIndex) return;

    if (teachers[index]?.videoId) {
      setActiveVideo(index);
      setSoundEnabled(false);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile || index !== activeIndex) return;

    setActiveVideo(null);
    setSoundEnabled(false);
  };

  // Mobile swipe
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
    touchStartY.current = event.touches[0]?.clientY ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const endY = event.changedTouches[0]?.clientY ?? 0;

    const differenceX = touchStartX.current - endX;
    const differenceY = touchStartY.current - endY;

    if (
      Math.abs(differenceX) < 35 ||
      Math.abs(differenceX) < Math.abs(differenceY) * 1.15
    ) {
      return;
    }

    if (differenceX > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  // Desktop drag
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (isMobile || event.button !== 0) return;

    pointerStartX.current = event.clientX;
    pointerDragging.current = true;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerDragging.current || isMobile) return;

    const difference = pointerStartX.current - event.clientX;
    pointerDragging.current = false;

    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  };

  // Responsive stage and card sizing
  const stageWidth = Math.max(
    280,
    Math.min(screenWidth - (isMobile ? 24 : 40), 1250)
  );

  const mobileCardWidth = Math.min(screenWidth * 0.70, 275);

  const desktopCardWidth = Math.min(
    Math.max(stageWidth * 0.25, 245),
    310
  );

  const cardWidth = isMobile
    ? mobileCardWidth
    : desktopCardWidth;

  const cardStep = isMobile
    ? cardWidth * 0.82
    : (stageWidth - cardWidth) / 4;

  return (
    <section ref={sectionRef} className="teacher-section">
      <div className="teacher-glow" />

      <div className="teacher-container">

        {/* Heading */}
        <div className="teacher-heading">
          <span className="teacher-eyebrow">
            MEET OUR EDUCATORS
          </span>

          <h2>
            Learn From The <span>Best</span>
          </h2>

          <p>
            Experienced mentors. Inspiring guidance. Better results.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="teacher-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerDragging.current = false;
          }}
        >
          <div className="teacher-stage-inner">

            {teachers.map((teacher, index) => {
              const position = getPosition(index);
              const isCenter = index === activeIndex;
              const isPlaying = activeVideo === index;

              const visible = isMobile
                ? Math.abs(position) <= 1
                : Math.abs(position) <= 2;

              const xOffset = position * cardStep;

              const yOffset = isCenter
                ? 0
                : Math.abs(position) * (isMobile ? 5 : 8);

              // Side cards tilt outward.
              // Center card remains perfectly straight.
              const tilt = isCenter
                ? 0
                : position < 0
                  ? -7
                  : 7;

              const rotateY = isCenter
                ? 0
                : position * (isMobile ? -3 : -5);

              const scale = isCenter
                ? 1.06
                : isMobile
                  ? 0.83
                  : 0.84;

              return (
                <article
                  key={teacher.name}
                  className={`teacher-card ${
                    isCenter ? "is-center" : "is-side"
                  }`}
                  style={{
                    width: `${cardWidth}px`,
                    transform: `
                      translate(-50%, -50%)
                      translate(${xOffset}px, ${yOffset}px)
                      rotateZ(${tilt}deg)
                      rotateY(${rotateY}deg)
                      scale(${scale})
                    `,
                    zIndex: isCenter
                      ? 30
                      : 20 - Math.abs(position),
                    opacity: visible ? 1 : 0,
                    visibility: visible ? "visible" : "hidden",
                    pointerEvents: visible ? "auto" : "none",
                  }}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  aria-hidden={!visible}
                >
                  <div className="teacher-card-frame">

                    {/* Media */}
                    <div className="teacher-media">

                      {/* Only active center card video */}
                      {isCenter &&
                      hasEntered &&
                      isPlaying &&
                      teacher.videoId ? (
                        <div className="teacher-video-wrap">
                          <iframe
                            key={`${teacher.videoId}-${soundEnabled}`}
                            src={getVideoUrl(teacher)}
                            title={`${teacher.name} introduction`}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : teacher.image ? (
                        <Image
                          src={teacher.image}
                          alt={teacher.name}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 899px) 70vw, 310px"
                          className="teacher-photo"
                        />
                      ) : (
                        <div className="teacher-placeholder">
                          <span>
                            {teacher.name
                              .split(" ")
                              .filter(Boolean)
                              .map((part) => part[0])
                              .join("")
                              .replace(/[^A-Za-z]/g, "")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>

                          <small>BIO90 EDUCATOR</small>
                        </div>
                      )}

                      <div className="teacher-media-gradient" />

                      <span className="teacher-faculty-label">
                        BIO90 FACULTY
                      </span>

                      {/* Sound button */}
                      {isCenter &&
                        isPlaying &&
                        teacher.videoId && (
                          <button
                            type="button"
                            className="teacher-sound"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSoundEnabled((previous) => !previous);
                            }}
                          >
                            {soundEnabled
                              ? "🔊 Sound On"
                              : "🔇 Enable Sound"}
                          </button>
                        )}

                      {/* Mobile play hint */}
                      {isCenter &&
                        isMobile &&
                        !isPlaying &&
                        teacher.videoId && (
                          <div className="teacher-play-hint">
                            <span className="play-icon">▶</span>
                            <small>Tap to play video</small>
                          </div>
                        )}
                    </div>

                    {/* Teacher information */}
                    <div className="teacher-info">
                      <div>
                        <h3>{teacher.name}</h3>
                        <p>{teacher.subject} Expert</p>
                      </div>

                      <span className="teacher-brand">BIO90</span>
                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        </div>

        {/* Navigation */}
        <div className="teacher-navigation">

          <button
            type="button"
            className="teacher-arrow"
            onClick={previousSlide}
            aria-label="Previous teacher"
          >
            ←
          </button>

          <div className="teacher-dots">
            {teachers.map((teacher, index) => (
              <button
                key={teacher.name}
                type="button"
                onClick={() => goToSlide(index)}
                className={`teacher-dot ${
                  activeIndex === index ? "active" : ""
                }`}
                aria-label={`Show ${teacher.name}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="teacher-arrow"
            onClick={nextSlide}
            aria-label="Next teacher"
          >
            →
          </button>

        </div>

        <p className="teacher-hint">
          <span>←</span> Swipe or select a mentor <span>→</span>
        </p>

      </div>

      <style jsx>{`
        .teacher-section {
          --navy: #071b38;
          --navy-light: #12365a;
          --lime: #b8f34a;

          position: relative;
          width: 100%;
          overflow: hidden;
          isolation: isolate;

          padding: 85px 20px 65px;

          background: var(--navy);
          color: #fff;
        }

        .teacher-glow {
          position: absolute;
          width: 650px;
          height: 650px;
          left: 50%;
          top: 48%;

          transform: translate(-50%, -50%);
          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(184, 243, 74, 0.13),
            transparent 70%
          );

          pointer-events: none;
          z-index: -1;
        }

        .teacher-container {
          position: relative;
          width: 100%;
          max-width: 1250px;
          margin: auto;
        }

        /* Heading */

        .teacher-heading {
          text-align: center;
          margin-bottom: 20px;
        }

        .teacher-eyebrow {
          color: var(--lime);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .teacher-heading h2 {
          margin: 14px 0 0;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.15;
          font-weight: 850;
          letter-spacing: -1.5px;
        }

        .teacher-heading h2 span {
          color: var(--lime);
        }

        .teacher-heading p {
          color: #bdc9d8;
          margin-top: 14px;
          font-size: 15px;
        }

        /* Carousel stage */

        .teacher-stage {
          position: relative;
          width: 100%;
          height: 570px;

          overflow: hidden;
          perspective: 1500px;

          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          cursor: grab;
        }

        .teacher-stage:active {
          cursor: grabbing;
        }

        .teacher-stage-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* Cards */

        .teacher-card {
          position: absolute;
          top: 50%;
          left: 50%;

          height: 455px;

          transform-origin: center center;
          transform-style: preserve-3d;

          will-change: transform, opacity;

          transition:
            transform 750ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 450ms ease,
            filter 450ms ease;

          cursor: pointer;
        }

        .teacher-card.is-center {
          filter: drop-shadow(
            0 22px 30px rgba(0, 0, 0, 0.38)
          );
        }

        .teacher-card.is-side {
          filter: brightness(0.88);
        }

        .teacher-card-frame {
          position: relative;
          width: 100%;
          height: 100%;

          overflow: hidden;
          border-radius: 25px;

          border: 1px solid rgba(184, 243, 74, 0.55);

          background: var(--navy-light);

          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.3);
        }

        .teacher-card.is-center .teacher-card-frame {
          border: 2px solid var(--lime);

          box-shadow:
            0 0 0 5px rgba(184, 243, 74, 0.1),
            0 25px 55px rgba(0, 0, 0, 0.42);
        }

        /* Cover image: preserve original aspect ratio */

        .teacher-media {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;

          background: linear-gradient(
            145deg,
            #173c62,
            #071b38
          );
        }

        .teacher-photo {
          object-fit: cover;
          object-position: center top;
          transform: none;
        }

        /* Video: original 16:9 ratio, no zoom or stretch */

        .teacher-video-wrap {
          position: absolute;

          width: 100%;
          aspect-ratio: 16 / 9;

          left: 0;
          top: 50%;

          transform: translateY(-50%);

          overflow: hidden;
          background: #000;

          z-index: 2;
        }

        .teacher-video-wrap iframe {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          border: 0;
          display: block;
        }

        /* Placeholder */

        .teacher-placeholder {
          position: absolute;
          inset: 0;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 12px;

          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(184, 243, 74, 0.2),
              transparent 40%
            ),
            linear-gradient(
              145deg,
              #173c62,
              #071b38
            );
        }

        .teacher-placeholder span {
          width: 112px;
          height: 112px;

          border-radius: 50%;
          display: grid;
          place-items: center;

          background: rgba(184, 243, 74, 0.12);
          border: 2px solid var(--lime);

          color: var(--lime);
          font-size: 38px;
          font-weight: 900;
        }

        .teacher-placeholder small {
          color: #d4e5bd;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        /* Overlay */

        .teacher-media-gradient {
          position: absolute;
          inset: 0;

          z-index: 3;
          pointer-events: none;

          background: linear-gradient(
            to bottom,
            rgba(7, 27, 56, 0.12) 0%,
            transparent 42%,
            rgba(3, 14, 30, 0.92) 100%
          );
        }

        /* Faculty label */

        .teacher-faculty-label {
          position: absolute;

          top: 17px;
          left: 15px;

          z-index: 5;

          border: 1px solid rgba(184, 243, 74, 0.7);
          background: rgba(7, 27, 56, 0.92);

          border-radius: 30px;
          padding: 8px 12px;

          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;

          color: var(--lime);
        }

        /* Sound */

        .teacher-sound {
          position: absolute;

          top: 15px;
          right: 12px;

          z-index: 6;

          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(7, 27, 56, 0.94);

          color: #fff;

          padding: 9px 12px;
          border-radius: 30px;

          font-size: 11px;
          font-weight: 700;

          cursor: pointer;
        }

        .teacher-sound:hover {
          background: var(--lime);
          color: var(--navy);
        }

        /* Play hint */

        .teacher-play-hint {
          position: absolute;
          inset: 0;

          z-index: 4;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;

          pointer-events: none;
        }

        .play-icon {
          width: 55px;
          height: 55px;

          display: grid;
          place-items: center;

          padding-left: 4px;

          border-radius: 50%;
          border: 1px solid rgba(184, 243, 74, 0.8);

          color: var(--lime);
          background: rgba(7, 27, 56, 0.75);

          font-size: 19px;
        }

        .teacher-play-hint small {
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          text-shadow: 0 2px 5px #000;
        }

        /* Teacher information */

        .teacher-info {
          position: absolute;
          z-index: 5;

          left: 0;
          right: 0;
          bottom: 0;

          padding: 25px 20px 20px;

          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 10px;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(3, 14, 30, 0.96)
          );
        }

        .teacher-info h3 {
          color: #fff;

          font-size: 21px;
          line-height: 1.2;
          font-weight: 850;

          margin: 0;
        }

        .teacher-info p {
          color: var(--lime);

          font-size: 13px;
          font-weight: 700;

          margin: 7px 0 0;
        }

        .teacher-brand {
          color: rgba(184, 243, 74, 0.85);

          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        /* Navigation */

        .teacher-navigation {
          display: flex;
          justify-content: center;
          align-items: center;

          gap: 28px;
          margin-top: 5px;
        }

        .teacher-arrow {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          border: 1px solid rgba(184, 243, 74, 0.55);
          border-radius: 50%;

          background: rgba(184, 243, 74, 0.08);

          color: var(--lime);
          font-size: 21px;

          cursor: pointer;
          transition: 200ms ease;
        }

        .teacher-arrow:hover {
          color: var(--navy);
          background: var(--lime);
          transform: scale(1.08);
        }

        .teacher-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .teacher-dot {
          width: 8px;
          height: 8px;

          padding: 0;
          border: 0;
          border-radius: 20px;

          background: rgba(255, 255, 255, 0.35);

          cursor: pointer;
          transition: all 350ms ease;
        }

        .teacher-dot.active {
          width: 30px;

          background: var(--lime);

          box-shadow: 0 0 12px rgba(184, 243, 74, 0.4);
        }

        .teacher-hint {
          color: #9eafc3;

          text-align: center;
          font-size: 11px;
          letter-spacing: 1px;

          margin-top: 20px;
        }

        .teacher-hint span {
          color: var(--lime);
          padding: 0 5px;
        }

        /* Mobile */

        @media (max-width: 899px) {
          .teacher-section {
            padding: 65px 12px 45px;
          }

          .teacher-heading {
            margin-bottom: 8px;
          }

          .teacher-heading h2 {
            font-size: clamp(29px, 8vw, 40px);
          }

          .teacher-heading p {
            max-width: 310px;
            margin: 12px auto 0;

            font-size: 13px;
            line-height: 1.6;
          }

          .teacher-stage {
            height: 445px;
            margin-top: 10px;

            overflow: hidden;
            perspective: 1100px;
            touch-action: pan-y;
          }

          .teacher-card {
            height: 365px;
          }

          .teacher-card-frame {
            border-radius: 22px;
          }

          .teacher-info {
            padding: 20px 14px 17px;
          }

          .teacher-info h3 {
            font-size: 18px;
          }

          .teacher-info p {
            font-size: 11px;
          }

          .teacher-navigation {
            gap: 18px;
          }

          .teacher-arrow {
            width: 37px;
            height: 37px;
            font-size: 18px;
          }

          .teacher-dots {
            gap: 8px;
          }

          .teacher-dot {
            width: 7px;
            height: 7px;
          }

          .teacher-dot.active {
            width: 24px;
          }

          .teacher-hint {
            font-size: 10px;
          }

          .teacher-sound {
            font-size: 10px;
            padding: 8px 10px;
          }

          .teacher-faculty-label {
            top: 13px;
            left: 11px;
            font-size: 8px;
            padding: 7px 9px;
          }
        }

        @media (max-width: 380px) {
          .teacher-stage {
            height: 420px;
          }

          .teacher-card {
            height: 350px;
          }

          .teacher-info h3 {
            font-size: 16px;
          }

          .teacher-info p {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teacher-card,
          .teacher-dot,
          .teacher-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
