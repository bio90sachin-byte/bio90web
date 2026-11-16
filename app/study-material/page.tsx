
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Plus,
  Check,
  Zap,
  BookOpen,
  X,
  Eye,
  GraduationCap,
  ShieldCheck,
  FileText,
  Sparkles,
  PackageCheck,
  Truck,
} from "lucide-react";

import SiteHeader from "../components/SiteHeader";

type Product = {
  id: number;
  section: string;
  title: string;
  subject: string;
  price: number;
  oldPrice: number;
  discount: string;
  tag: string;
  coverText: string;
  cover: string;
  imageUrl: string;
  previewImages: string[];
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    section: "Popular NEET Books",
    title: "PW Aakriti For NEET Class 11",
    subject: "Physics, Chemistry, Biology",
    price: 899,
    oldPrice: 1899,
    discount: "51% off",
    tag: "ULTIMATE DEAL",
    coverText: "NEET BIOLOGY",
    cover: "from-pink-700 via-rose-600 to-blue-900",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "NEET preparation study material for Class 11 students.",
  },
  {
    id: 2,
    section: "Popular NEET Books",
    title: "PW Lakshya NEET Preparation",
    subject: "Physics, Chemistry, Biology",
    price: 1099,
    oldPrice: 2499,
    discount: "56% off",
    tag: "ULTIMATE DEAL",
    coverText: "NEET PHYSICS",
    cover: "from-blue-800 via-indigo-700 to-purple-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Complete preparation resources for NEET aspirants.",
  },
  {
    id: 3,
    section: "Popular NEET Books",
    title: "NEET Biology Combo Set",
    subject: "Complete Biology Notes",
    price: 849,
    oldPrice: 1499,
    discount: "43% off",
    tag: "TRENDING",
    coverText: "BIOLOGY",
    cover: "from-emerald-700 via-green-600 to-teal-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Biology notes and revision resources for NEET.",
  },
  {
    id: 4,
    section: "Popular NEET Books",
    title: "NCERT Biology Quick Revision",
    subject: "NCERT Based | NEET Preparation",
    price: 1023,
    oldPrice: 1499,
    discount: "32% off",
    tag: "TEACHER'S PICK",
    coverText: "NCERT PUNCH",
    cover: "from-green-700 via-lime-600 to-emerald-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "NCERT-focused revision material for NEET.",
  },
  {
    id: 5,
    section: "Popular NEET Books",
    title: "NEET Handwritten Notes",
    subject: "Physics, Chemistry, Botany and Zoology",
    price: 1429,
    oldPrice: 2199,
    discount: "35% off",
    tag: "BESTSELLING",
    coverText: "HANDWRITTEN NOTES",
    cover: "from-slate-900 via-blue-950 to-black",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Handwritten revision notes for NEET preparation.",
  },
  {
    id: 6,
    section: "Popular IIT JEE Books",
    title: "JEE Main & Advanced Complete Set",
    subject: "Physics, Chemistry and Mathematics",
    price: 1899,
    oldPrice: 3999,
    discount: "51% off",
    tag: "ULTIMATE DEAL",
    coverText: "JEE COMPLETE",
    cover: "from-blue-800 via-indigo-700 to-purple-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Complete study material for JEE Main and Advanced.",
  },
  {
    id: 7,
    section: "Popular IIT JEE Books",
    title: "JEE Mathematics Practice Set",
    subject: "JEE Main and Advanced",
    price: 1549,
    oldPrice: 2999,
    discount: "48% off",
    tag: "ULTIMATE DEAL",
    coverText: "MATHEMATICS",
    cover: "from-emerald-800 via-green-700 to-teal-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Mathematics practice resources for JEE.",
  },
  {
    id: 8,
    section: "Popular IIT JEE Books",
    title: "JEE Advanced Physics",
    subject: "Complete Physics Preparation",
    price: 1349,
    oldPrice: 2499,
    discount: "46% off",
    tag: "TRENDING",
    coverText: "JEE PHYSICS",
    cover: "from-orange-700 via-red-700 to-rose-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Physics study material for JEE Advanced.",
  },
  {
    id: 9,
    section: "Popular IIT JEE Books",
    title: "JEE Chemistry Modules",
    subject: "Physical, Organic and Inorganic",
    price: 1489,
    oldPrice: 2699,
    discount: "44% off",
    tag: "ULTIMATE DEAL",
    coverText: "JEE CHEMISTRY",
    cover: "from-fuchsia-800 via-purple-700 to-indigo-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Chemistry modules for JEE preparation.",
  },
  {
    id: 10,
    section: "Popular IIT JEE Books",
    title: "JEE 2027 Preparation Material",
    subject: "Complete Study Material",
    price: 1709,
    oldPrice: 2999,
    discount: "43% off",
    tag: "TRENDING",
    coverText: "JEE 2027",
    cover: "from-indigo-800 via-blue-700 to-cyan-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "JEE 2027 study and practice resources.",
  },
  {
    id: 11,
    section: "Popular CBSE Class 10th Books",
    title: "CBSE Class 10 Sample Papers",
    subject: "Science, Mathematics and English",
    price: 1105,
    oldPrice: 1699,
    discount: "34% off",
    tag: "TRENDING",
    coverText: "CLASS 10",
    cover: "from-blue-800 via-indigo-700 to-slate-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "CBSE Class 10 sample papers for exam practice.",
  },
  {
    id: 12,
    section: "Popular CBSE Class 10th Books",
    title: "CBSE Class 10 PYQ Papers",
    subject: "Previous Year Solved Papers",
    price: 579,
    oldPrice: 999,
    discount: "42% off",
    tag: "LIMITED STOCK",
    coverText: "CBSE PYQ",
    cover: "from-green-800 via-emerald-700 to-teal-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Previous year question papers for Class 10.",
  },
  {
    id: 13,
    section: "Popular CBSE Class 10th Books",
    title: "CBSE Science Practice Set",
    subject: "Science and Mathematics",
    price: 937,
    oldPrice: 1299,
    discount: "28% off",
    tag: "TRENDING",
    coverText: "SCIENCE",
    cover: "from-purple-800 via-violet-700 to-indigo-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Science practice material for Class 10.",
  },
  {
    id: 14,
    section: "Popular CBSE Class 10th Books",
    title: "Question & Concept Bank",
    subject: "CBSE Class 10 Science",
    price: 1189,
    oldPrice: 1899,
    discount: "37% off",
    tag: "ULTIMATE DEAL",
    coverText: "QUESTION BANK",
    cover: "from-orange-800 via-red-700 to-rose-950",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Concept bank and important questions for Class 10.",
  },
  {
    id: 15,
    section: "Popular CBSE Class 10th Books",
    title: "Science Handwritten Notes",
    subject: "Complete Class 10 Science",
    price: 209,
    oldPrice: 399,
    discount: "48% off",
    tag: "BESTSELLING",
    coverText: "SCIENCE NOTES",
    cover: "from-slate-800 via-slate-700 to-black",
    imageUrl: "",
    previewImages: ["", "", ""],
    description: "Science revision notes for CBSE Class 10.",
  },
];

const sections = [
  "Popular NEET Books",
  "Popular IIT JEE Books",
  "Popular CBSE Class 10th Books",
];

const categories = [
  { name: "All Materials", term: "All", icon: "✦" },
  { name: "NEET Study Material", term: "NEET", icon: "✧" },
  { name: "IIT JEE Books", term: "JEE", icon: "◆" },
  { name: "CBSE Class 10th", term: "CBSE", icon: "▣" },
  { name: "Class 11th", term: "Class 11", icon: "◈" },
  { name: "Class 12th", term: "Class 12", icon: "◇" },
  { name: "Foundation 6th–8th", term: "Foundation", icon: "✳" },
  { name: "Practice Papers", term: "Practice", icon: "▤" },
];

function DummyCover({ product }: { product: Product }) {
  return (
    <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-100 via-white to-blue-50 p-4 sm:h-[235px]">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full rounded-xl object-contain transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`relative flex h-full w-[150px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${product.cover} p-3 text-center text-white shadow-[0_15px_30px_rgba(15,23,42,0.25)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1`}
        >
          <div className="absolute -right-9 -top-9 h-28 w-28 rounded-full border-[15px] border-white/10" />
          <div className="relative border-b border-white/40 pb-2">
            <p className="text-[11px] font-black tracking-[0.2em]">BIO90</p>
            <p className="mt-1 text-[7px] font-bold tracking-widest text-white/80">
              STUDY SERIES
            </p>
          </div>
          <div className="relative">
            <BookOpen className="mx-auto mb-3" size={42} />
            <h3 className="text-sm font-black leading-tight">
              {product.coverText}
            </h3>
            <p className="mt-2 text-[8px] font-bold text-white/80">
              EXPERT LEARNING
            </p>
          </div>
          <div className="relative border-t border-white/40 pt-2">
            <p className="text-[7px] font-bold tracking-wider">
              LEARN • PRACTICE • ACHIEVE
            </p>
            <p className="mt-1 text-[6px] text-white/70">
              BIO90 – NEET EXPERTS
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyMaterialPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bag, setBag] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showBag, setShowBag] = useState(false);
  const [banner, setBanner] = useState(0);

  const banners = [
    {
      title: "THIS IS WHERE YOUR PREPARATION BEGINS",
      subtitle: "Start Strong. Finish Legendary.",
      label: "SHOP STUDY MATERIAL",
      background: "from-rose-100 via-orange-50 to-amber-100",
    },
    {
      title: "YOUR DREAM. OUR STUDY MATERIAL.",
      subtitle: "Smart Study. Better Results.",
      label: "EXPLORE BIO90 NOTES",
      background: "from-blue-100 via-indigo-50 to-cyan-100",
    },
  ];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;

    return products.filter((product) =>
      `${product.title} ${product.subject} ${product.section} ${product.coverText}`
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  const bagProducts = products.filter((product) => bag.includes(product.id));
  const total = bagProducts.reduce((sum, product) => sum + product.price, 0);

  const addToBag = (id: number) => {
    setBag((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const removeFromBag = (id: number) => {
    setBag((current) => current.filter((item) => item !== id));
  };

  const selectCategory = (term: string) => {
    setActiveCategory(term);
    setSearch(term === "All" ? "" : term);
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#102d62]">
      {/* ORIGINAL BIO90 HEADER */}
      <SiteHeader />

      {/* PREMIUM CATEGORY SLIDER */}
      <section className="sticky top-0 z-30 border-y border-white/70 bg-white/85 shadow-[0_8px_25px_rgba(16,45,98,0.07)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:px-5">
          <button
            onClick={() =>
              document.getElementById("category-slider")?.scrollBy({
                left: -280,
                behavior: "smooth",
              })
            }
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/80 text-[#102d62] shadow-md hover:bg-indigo-50 sm:flex"
            aria-label="Previous categories"
          >
            <ChevronLeft size={19} />
          </button>

          <div
            id="category-slider"
            className="flex flex-1 items-center gap-3 overflow-x-auto scroll-smooth whitespace-nowrap px-1 py-1"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category.term}
                onClick={() => selectCategory(category.term)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-bold transition-all duration-300 sm:text-xs ${
                  activeCategory === category.term
                    ? "border-indigo-500/30 bg-gradient-to-r from-[#102d62] to-indigo-700 text-white shadow-lg shadow-indigo-900/20"
                    : "border-white bg-white/75 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50"
                }`}
              >
                <span className="text-sm">{category.icon}</span>
                {category.name}
                <ChevronRight size={13} className="opacity-50" />
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              document.getElementById("category-slider")?.scrollBy({
                left: 280,
                behavior: "smooth",
              })
            }
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white/80 text-[#102d62] shadow-md hover:bg-indigo-50 sm:flex"
            aria-label="Next categories"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </section>

      {/* STORE SEARCH BAR */}
      <section className="border-b border-white bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="min-w-[150px]">
            <h2 className="text-lg font-black text-[#102d62]">
              BIO90 Study Store
            </h2>
            <p className="text-xs text-slate-500">
              Notes, Books and Practice Papers
            </p>
          </div>

          <div className="flex min-w-[200px] max-w-lg flex-1 items-center rounded-xl border border-white bg-white/80 px-4 py-3 shadow-[0_5px_20px_rgba(16,45,98,0.07)] backdrop-blur-xl focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
            <Search size={18} className="mr-2 shrink-0 text-slate-500" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("All");
              }}
              placeholder="Search books, notes and study material..."
              className="w-full bg-transparent text-xs outline-none"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                aria-label="Clear search"
              >
                <X size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button className="flex items-center gap-1.5 hover:text-indigo-600">
              <ClipboardList size={18} />
              My Orders
            </button>
            <button
              onClick={() => setShowBag(true)}
              className="relative flex items-center gap-1.5 hover:text-indigo-600"
            >
              <ShoppingBag size={18} />
              My Bag
              {bag.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                  {bag.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* FLASH SALE */}
      <div className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 px-3 py-3 text-center text-[10px] font-black tracking-wide text-[#102d62] sm:text-xs">
        <Zap className="mr-1 inline" size={15} />
        FLASH SALE IS LIVE
        <span className="ml-3 rounded-lg bg-white/90 px-3 py-1.5 shadow-sm">
          LIMITED TIME OFFERS
        </span>
      </div>

      {/* PROMOTIONAL BANNER */}
      <section className="mx-auto mt-5 max-w-7xl px-3 sm:px-5">
        <div
          className={`relative flex min-h-[235px] items-center overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-r ${banners[banner].background} px-5 py-8 shadow-[0_15px_45px_rgba(16,45,98,0.08)] sm:min-h-[310px] sm:px-12`}
        >
          <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border-[30px] border-white/30" />

          <div className="relative z-10 max-w-[650px]">
            <p className="text-[10px] font-black tracking-[0.25em] text-emerald-800 sm:text-xs">
              BIO90 STUDY MATERIAL
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[#102d62] sm:text-4xl lg:text-5xl">
              {banners[banner].title}
            </h1>
            <p className="mt-3 text-sm font-semibold text-slate-700 sm:text-base">
              {banners[banner].subtitle}
            </p>
            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-5 rounded-full bg-[#8d2365] px-6 py-3 text-xs font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#6e174e]"
            >
              {banners[banner].label}
              <ChevronRight className="ml-1 inline" size={14} />
            </button>
          </div>

          <div className="absolute bottom-0 right-5 hidden h-[210px] items-end gap-2 sm:flex">
            {[
              ["BIOLOGY", "from-green-700 to-emerald-950"],
              ["PHYSICS", "from-blue-700 to-indigo-950"],
              ["CHEMISTRY", "from-orange-600 to-red-950"],
            ].map(([name, color]) => (
              <div
                key={name}
                className={`flex h-[155px] w-[83px] flex-col items-center justify-between rounded-t-xl bg-gradient-to-b ${color} p-3 text-center text-white shadow-xl`}
              >
                <BookOpen size={30} />
                <span className="text-[9px] font-black">{name}</span>
                <span className="text-[7px] font-bold">BIO90 EXPERT</span>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setBanner((current) => (current + 1) % banners.length)
            }
            aria-label="Next banner"
            className="absolute bottom-4 right-4 rounded-full bg-white/90 p-2 shadow"
          >
            <ChevronRight size={17} />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setBanner(index)}
                aria-label={`Show banner ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  banner === index
                    ? "w-6 bg-[#102d62]"
                    : "w-2 bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SECTIONS */}
      <section
        id="products"
        className="mx-auto max-w-7xl space-y-12 px-3 py-9 sm:px-5 sm:py-12"
      >
        {sections.map((section) => {
          const items = filteredProducts.filter(
            (product) => product.section === section
          );

          if (!items.length) return null;

          return (
            <div key={section}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#102d62] sm:text-2xl">
                    {section}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Explore our selected study resources
                  </p>
                </div>
                <button
                  onClick={() => {
                    const term = section.includes("NEET")
                      ? "NEET"
                      : section.includes("JEE")
                        ? "JEE"
                        : "CBSE";
                    selectCategory(term);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  See All <ChevronRight size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
                {items.map((product) => {
                  const added = bag.includes(product.id);

                  return (
                    <article
                      key={product.id}
                      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_8px_30px_rgba(16,45,98,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-200 hover:bg-white/90 hover:shadow-[0_20px_45px_rgba(16,45,98,0.16)]"
                    >
                      <div className="absolute left-0 top-3 z-10 rounded-r-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1.5 text-[8px] font-black tracking-wide text-white shadow-md">
                        {product.tag}
                      </div>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="mt-5 text-left"
                        aria-label={`View ${product.title}`}
                      >
                        <DummyCover product={product} />
                      </button>

                      <div className="flex flex-1 flex-col bg-gradient-to-b from-white/80 to-blue-50/40 p-3 sm:p-4">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="line-clamp-2 min-h-[38px] text-left text-[10px] font-extrabold leading-4 text-[#102d62] hover:text-indigo-600 sm:text-xs"
                        >
                          {product.title}
                        </button>

                        <p className="mt-1 line-clamp-2 min-h-[30px] text-[8px] leading-4 text-slate-500 sm:text-[10px]">
                          {product.subject}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-black text-[#102d62] sm:text-base">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[9px] text-slate-400 line-through">
                            ₹{product.oldPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-green-700">
                            ({product.discount})
                          </span>
                          <span className="rounded-md bg-green-600 px-2 py-1 text-[8px] font-bold text-white">
                            BIO90
                          </span>
                        </div>

                        {/* ADD + BUY NOW */}
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToBag(product.id)}
                            className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-[9px] font-extrabold transition sm:text-[10px] ${
                              added
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-indigo-500 bg-white/80 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                            }`}
                          >
                            {added ? <Check size={12} /> : <Plus size={12} />}
                            {added ? "ADDED" : "ADD"}
                          </button>

                          <button
                            onClick={() => {
                              addToBag(product.id);
                              setShowBag(true);
                            }}
                            className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#102d62] to-indigo-700 px-2 py-2.5 text-[9px] font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:text-[10px]"
                          >
                            BUY NOW
                            <ChevronRight size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="mt-3 flex items-center justify-center gap-1 text-[9px] font-semibold text-slate-500 hover:text-indigo-600"
                        >
                          <Eye size={12} />
                          View Details
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 py-16 text-center">
            <Search className="mx-auto text-slate-400" size={32} />
            <p className="mt-3 text-sm font-bold text-slate-600">
              No products found
            </p>
            <button
              onClick={() => selectCategory("All")}
              className="mt-3 text-xs font-bold text-indigo-600"
            >
              Show All Materials
            </button>
          </div>
        )}
      </section>

      {/* WHY CHOOSE BIO90 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071B43] via-[#102d62] to-[#164e63] px-5 py-16 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
              THE BIO90 ADVANTAGE
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Everything You Need to Learn Better
            </h2>
            <p className="mt-4 text-sm leading-7 text-blue-100">
              Quality study material, focused practice and reliable learning
              resources to support every step of your academic journey.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: GraduationCap,
                title: "Expert Prepared",
                description: "Learning resources designed with academic focus.",
              },
              {
                icon: BookOpen,
                title: "Easy to Understand",
                description: "Organised notes and practice material.",
              },
              {
                icon: ShieldCheck,
                title: "Quality Resources",
                description: "Structured content for effective preparation.",
              },
              {
                icon: FileText,
                title: "Practice & Revision",
                description: "Study notes, question papers and revision tools.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 text-center shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/15"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 text-lime-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-5 font-bold">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-blue-100">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white px-5 py-9">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: PackageCheck,
              title: "Organised Study Resources",
              description: "Find your learning material in one place.",
            },
            {
              icon: ShieldCheck,
              title: "Student Focused",
              description: "Resources designed around learning needs.",
            },
            {
              icon: Truck,
              title: "Digital Access Planned",
              description: "Access to purchased digital resources is planned.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102d62]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCT DETAILS POPUP */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2"
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            <div className="grid gap-6 pt-5 sm:grid-cols-2">
              <div>
                <div className="group overflow-hidden rounded-2xl border border-slate-100">
                  <DummyCover product={selectedProduct} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {selectedProduct.previewImages.map((src, index) => (
                    <div
                      key={index}
                      className="flex h-24 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50"
                    >
                      {src ? (
                        <img
                          src={src}
                          alt={`${selectedProduct.title} preview ${index + 1}`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          Preview {index + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-[9px] font-black text-orange-700">
                  {selectedProduct.tag}
                </span>

                <h2 className="mt-4 text-xl font-black">
                  {selectedProduct.title}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  {selectedProduct.subject}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-black">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{selectedProduct.oldPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-bold text-green-700">
                    {selectedProduct.discount}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {selectedProduct.description}
                </p>

                <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[10px] leading-5 text-amber-800">
                  Sample product. Actual PDF previews and downloads will be
                  connected after payment and login integration.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToBag(selectedProduct.id)}
                    className="rounded-xl border border-indigo-600 px-3 py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                  >
                    ADD TO BAG
                  </button>

                  <button
                    onClick={() => {
                      addToBag(selectedProduct.id);
                      setSelectedProduct(null);
                      setShowBag(true);
                    }}
                    className="rounded-xl bg-[#102d62] px-3 py-3 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING BAG */}
      {showBag && (
        <div
          className="fixed inset-0 z-[110] flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={() => setShowBag(false)}
        >
          <aside
            className="flex h-full w-full max-w-md flex-col border-l border-white/50 bg-white/95 shadow-2xl backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-black">My Bag</h2>
                <p className="text-xs text-slate-500">
                  {bag.length} item(s)
                </p>
              </div>
              <button
                onClick={() => setShowBag(false)}
                aria-label="Close bag"
                className="rounded-full bg-slate-100 p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {bagProducts.length === 0 ? (
                <div className="py-16 text-center text-sm text-slate-500">
                  Your bag is empty.
                </div>
              ) : (
                bagProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                  >
                    <div
                      className={`flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${product.cover} p-1 text-center text-[7px] font-black text-white`}
                    >
                      {product.coverText}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-bold">
                        {product.title}
                      </p>
                      <p className="mt-1 text-sm font-black">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromBag(product.id)}
                      className="rounded-lg bg-red-50 p-2 text-red-500"
                      aria-label={`Remove ${product.title}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t bg-white p-5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-600">
                  Subtotal
                </span>
                <span className="font-black">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                disabled={bag.length === 0}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#102d62] to-indigo-700 px-5 py-3 text-xs font-black text-white disabled:bg-slate-300"
              >
                CONTINUE TO CHECKOUT
              </button>

              <p className="mt-2 text-center text-[9px] text-slate-400">
                Checkout and payment will be integrated in the next phase.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* FAQ SECTION */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-700">
              NEED HELP?
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#102d62]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Find answers to common questions about BIO90 Study Material.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "What type of study material is available?",
                a: "BIO90 provides study notes, books, revision resources and practice papers for different academic and entrance exam categories.",
              },
              {
                q: "Can I preview study material before buying?",
                a: "Product preview images and sample pages can be displayed on the product details page when they are added.",
              },
              {
                q: "How can I purchase a product?",
                a: "Choose a product, add it to your bag and proceed to checkout. Online payment integration will be enabled in the next development phase.",
              },
              {
                q: "Will I be able to download purchased notes?",
                a: "The planned system will provide access to purchased digital material after successful payment and login verification.",
              },
              {
                q: "Can I access my purchased material later?",
                a: "A My Library section is planned to help students access their purchased study resources.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-white bg-white/80 p-5 shadow-[0_5px_20px_rgba(16,45,98,0.05)] backdrop-blur-xl transition hover:border-green-300 hover:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#102d62]">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 transition group-open:rotate-45">
                    <Plus size={17} />
                  </span>
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
  );
}