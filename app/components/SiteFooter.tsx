
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bio90.in/",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100063627353311",
    icon: FaFacebookF,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bio90-dh4yy",
    icon: FaYoutube,
  },
];

const legalLinks = [
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Sitemap", href: "/sitemap" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#071B43] text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">

        {/* BRAND */}
        <div>
          <Image
            src="/image/logo/bio90-logo.png"
            alt="BIO90 Logo"
            width={145}
            height={65}
            className="h-14 w-auto object-contain"
          />

          <p className="mt-5 max-w-sm leading-7 text-blue-100">
            Academic coaching and learning support for students from
            Classes 6th to 12th.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="mt-7">
            <h3 className="text-sm font-bold text-lime-400">
              Connect With Us
            </h3>

            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit BIO90 on ${social.name}`}
                    title={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:bg-lime-400 hover:text-[#071B43] hover:shadow-lg hover:shadow-lime-400/20"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold text-lime-400">
            Quick Links
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-blue-100">
            <Link className="transition hover:text-lime-400" href="/about">
              About Us
            </Link>

            <Link className="transition hover:text-lime-400" href="/courses">
              Our Courses
            </Link>

            <Link className="transition hover:text-lime-400" href="/home-tuition">
              Home Tuition
            </Link>

            <Link className="transition hover:text-lime-400" href="/online-batches">
              Online Batches
            </Link>

            <Link className="transition hover:text-lime-400" href="/study-material">
              Study Material
            </Link>

            <Link className="transition hover:text-lime-400" href="/class-1-8">
              class 1–8th
            </Link>

            <Link className="transition hover:text-lime-400" href="/book-demo">
              Book Free Demo
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-bold text-lime-400">
            Contact BIO90
          </h3>

          <div className="mt-5 space-y-4 text-blue-100">
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-lime-400" />
              +91 8218117547
            </p>

            <p className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-lime-400" />
              Moradabad, Uttar Pradesh
            </p>

            <p className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-lime-400" />
              Demo by appointment
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-6 md:flex-row lg:px-8">

          {/* COPYRIGHT */}
          <p className="text-center text-sm text-blue-100">
            Copyright © 2026 BIO90
          </p>

          {/* LEGAL LINKS */}
          <nav
            aria-label="Legal links"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-blue-100"
          >
            {legalLinks.map((link, index) => (
              <div key={link.name} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-lime-400"
                >
                  {link.name}
                </Link>

                {index !== legalLinks.length - 1 && (
                  <span className="text-white/50">|</span>
                )}
              </div>
            ))}
          </nav>

        </div>
      </div>


    </footer>
  );
}
