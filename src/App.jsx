import React, { useState, useMemo } from "react";
import {
  Heart,
  Users,
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Landmark,
  HandCoins,
  Sprout,
  Menu,
  X,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ===================== DESIGN TOKENS ===================== */
const C = {
  teal: "#0B3D36",
  tealLight: "#15534A",
  tealPale: "#E7F0EE",
  ivory: "#FBF8F1",
  marigold: "#E8A33D",
  marigoldDark: "#C8862A",
  maroon: "#8B3A3A",
  sage: "#5C8A52",
  ink: "#1C2B28",
  inkSoft: "#6B7E79",
  border: "#E3DCCB",
};

/* ===================== DATA ===================== */
const stats = [
  { label: "মোট সদস্য", value: "২৪৮", icon: Users },
  { label: "নিবন্ধিত দাতা", value: "৮৬", icon: HandCoins },
  { label: "সম্পন্ন কার্যক্রম", value: "১৮", icon: Award },
  { label: "তহবিলে জমা আছে", value: "৪,২৬,০০০৳", icon: Wallet, highlight: true },
];

const advisors = [
  { name: "ডা. সালমা বেগম", post: "উপদেষ্টা", img: "https://i.pravatar.cc/150?img=47" },
  { name: "অধ্যক্ষ মোঃ নুরুল হক", post: "উপদেষ্টা", img: "https://i.pravatar.cc/150?img=12" },
  { name: "জনাব আনোয়ার হোসেন", post: "উপদেষ্টা", img: "https://i.pravatar.cc/150?img=33" },
];

const chairman = { name: "মোঃ রফিকুল ইসলাম", post: "সভাপতি", img: "https://i.pravatar.cc/150?img=53" };

const viceAndSecretary = [
  { name: "সাবিনা ইয়াসমিন", post: "সহ-সভাপতি", img: "https://i.pravatar.cc/150?img=44" },
  { name: "মোঃ কামরুজ্জামান", post: "সহ-সভাপতি", img: "https://i.pravatar.cc/150?img=15" },
  { name: "তানভীর আহমেদ", post: "সাধারণ সম্পাদক", img: "https://i.pravatar.cc/150?img=8" },
];

const otherOfficers = [
  { name: "ফারজানা আক্তার", post: "যুগ্ম সম্পাদক", img: "https://i.pravatar.cc/150?img=29" },
  { name: "মোঃ শাহাদাত হোসেন", post: "কোষাধ্যক্ষ", img: "https://i.pravatar.cc/150?img=51" },
  { name: "রাশেদুল ইসলাম", post: "সাংগঠনিক সম্পাদক", img: "https://i.pravatar.cc/150?img=22" },
];

const executiveMembers = [
  { name: "নাসরিন সুলতানা", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=45" },
  { name: "মোঃ ইমরান হোসেন", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=14" },
  { name: "মেহজাবিন চৌধুরী", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=48" },
  { name: "সাজিদ করিম", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=18" },
  { name: "রুমানা পারভীন", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=39" },
  { name: "মোঃ আল-আমিন", post: "কার্যনির্বাহী সদস্য", img: "https://i.pravatar.cc/150?img=25" },
];

const activities = [
  {
    title: "ফ্রি মেডিকেল ক্যাম্প",
    date: "২৮ ফেব্রুয়ারি, ২০২৬",
    cost: "৩৫,০০০৳",
    desc: "এলাকার অসচ্ছল মানুষদের জন্য বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ওষুধ বিতরণ করা হয়েছে।",
    icon: ShieldCheck,
  },
  {
    title: "শিক্ষা উপবৃত্তি বিতরণ",
    date: "২০ মার্চ, ২০২৬",
    cost: "৬০,০০০৳",
    desc: "মেধাবী ও দরিদ্র শিক্ষার্থীদের মধ্যে শিক্ষা উপবৃত্তি ও বই বিতরণ করা হয়েছে।",
    icon: Award,
  },
  {
    title: "ঈদ উপহার বিতরণ",
    date: "২০ মে, ২০২৬",
    cost: "৪৫,০০০৳",
    desc: "অসহায় পরিবারের মধ্যে ঈদ উপলক্ষে নতুন পোশাক ও খাদ্যসামগ্রী বিতরণ করা হয়েছে।",
    icon: Heart,
  },
  {
    title: "বৃক্ষরোপণ কর্মসূচি",
    date: "২৫ জানুয়ারি, ২০২৬",
    cost: "৮,০০০৳",
    desc: "এলাকাজুড়ে ৫০০টি ফলদ ও বনজ গাছের চারা রোপণ করা হয়েছে।",
    icon: Sprout,
  },
  {
    title: "রক্তদান কর্মসূচি",
    date: "১০ জুন, ২০২৬",
    cost: "৫,০০০৳",
    desc: "৪০ জন স্বেচ্ছাসেবক রক্তদান করেছেন এবং স্থানীয় হাসপাতালে রক্ত সংরক্ষণ করা হয়েছে।",
    icon: HandCoins,
  },
  {
    title: "মাসিক সাধারণ সভা",
    date: "প্রতি মাসের ১ তারিখ",
    cost: "প্রযোজ্য নয়",
    desc: "সদস্যদের উপস্থিতিতে সংগঠনের কার্যক্রম পর্যালোচনা ও পরিকল্পনা গ্রহণ করা হয়।",
    icon: Calendar,
  },
];

const initialTransactions = [
  { id: 1, date: "2026-01-10", label: "প্রারম্ভিক তহবিল (Opening Balance)", type: "income", category: "প্রারম্ভিক", amount: 150000 },
  { id: 2, date: "2026-01-18", label: "অনুদান - জনাব করিম সাহেব", type: "income", category: "অনুদান", amount: 20000 },
  { id: 3, date: "2026-01-25", label: "বৃক্ষরোপণ কর্মসূচি খরচ", type: "expense", category: "কার্যক্রম", amount: 8000 },
  { id: 4, date: "2026-02-05", label: "মাসিক সদস্য চাঁদা", type: "income", category: "চাঁদা", amount: 35000 },
  { id: 5, date: "2026-02-14", label: "অনুদান - বেগম রোকেয়া ফাউন্ডেশন", type: "income", category: "অনুদান", amount: 50000 },
  { id: 6, date: "2026-02-28", label: "ফ্রি মেডিকেল ক্যাম্প খরচ", type: "expense", category: "কার্যক্রম", amount: 35000 },
  { id: 7, date: "2026-03-10", label: "অনুদান - জনাব সালাম মিয়া", type: "income", category: "অনুদান", amount: 15000 },
  { id: 8, date: "2026-03-20", label: "শিক্ষা উপবৃত্তি বিতরণ", type: "expense", category: "কার্যক্রম", amount: 60000 },
  { id: 9, date: "2026-04-02", label: "মাসিক সদস্য চাঁদা", type: "income", category: "চাঁদা", amount: 38000 },
  { id: 10, date: "2026-04-15", label: "অফিস ভাড়া ও প্রশাসনিক খরচ", type: "expense", category: "প্রশাসনিক", amount: 12000 },
  { id: 11, date: "2026-05-01", label: "অনুদান - হোসেন পরিবার", type: "income", category: "অনুদান", amount: 30000 },
  { id: 12, date: "2026-05-20", label: "ঈদ উপহার বিতরণ কর্মসূচি", type: "expense", category: "কার্যক্রম", amount: 45000 },
  { id: 13, date: "2026-06-05", label: "মাসিক সদস্য চাঁদা", type: "income", category: "চাঁদা", amount: 40000 },
  { id: 14, date: "2026-06-10", label: "রক্তদান কর্মসূচি খরচ", type: "expense", category: "কার্যক্রম", amount: 5000 },
  { id: 15, date: "2026-06-12", label: "অনুদান - জনাব ও জনাবা আলম", type: "income", category: "অনুদান", amount: 18000 },
];

const fundUsage = [
  { name: "শিক্ষা কার্যক্রম", value: 60000, color: C.marigold },
  { name: "স্বাস্থ্যসেবা", value: 40000, color: C.sage },
  { name: "ত্রাণ ও উপহার", value: 45000, color: C.maroon },
  { name: "পরিবেশ কার্যক্রম", value: 13000, color: C.tealLight },
  { name: "প্রশাসনিক খরচ", value: 12000, color: C.inkSoft },
];

const bengaliMonths = {
  "01": "জানুয়ারি", "02": "ফেব্রুয়ারি", "03": "মার্চ", "04": "এপ্রিল",
  "05": "মে", "06": "জুন", "07": "জুলাই", "08": "আগস্ট",
  "09": "সেপ্টেম্বর", "10": "অক্টোবর", "11": "নভেম্বর", "12": "ডিসেম্বর",
};
const banglaDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
const toBangla = (num) =>
  String(num)
    .split("")
    .map((d) => (banglaDigits[d] !== undefined ? banglaDigits[d] : d))
    .join("");

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${toBangla(parseInt(d, 10))} ${bengaliMonths[m]}, ${toBangla(y)}`;
}

function formatTaka(num) {
  return toBangla(num.toLocaleString("en-IN")) + "৳";
}

/* ===================== REUSABLE COMPONENTS ===================== */
function SectionLabel({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4"
      style={{ backgroundColor: C.tealPale, color: C.teal }}
    >
      {children}
    </div>
  );
}

function PersonCard({ name, post, img, large }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div
      className={`flex flex-col items-center text-center rounded-2xl border p-5 bg-white shadow-sm ${
        large ? "py-7" : ""
      }`}
      style={{ borderColor: C.border }}
    >
      {img ? (
        <img
          src={img}
          alt={name}
          className={`rounded-full object-cover mb-3 border-2 ${large ? "w-24 h-24" : "w-16 h-16"}`}
          style={{ borderColor: large ? C.marigold : C.tealPale }}
        />
      ) : (
        <div
          className={`flex items-center justify-center rounded-full font-semibold mb-3 ${
            large ? "w-20 h-20 text-2xl" : "w-14 h-14 text-base"
          }`}
          style={{
            backgroundColor: large ? C.marigold : C.tealPale,
            color: large ? "#fff" : C.teal,
            fontFamily: "'Lora', serif",
          }}
        >
          {initials}
        </div>
      )}
      <div className={`font-semibold ${large ? "text-lg" : "text-sm"}`} style={{ color: C.ink, fontFamily: "'Lora', serif" }}>
        {name}
      </div>
      <div
        className={`mt-1 text-xs font-medium px-3 py-1 rounded-full`}
        style={{ backgroundColor: large ? "#FCEFD9" : C.tealPale, color: large ? C.marigoldDark : C.tealLight }}
      >
        {post}
      </div>
    </div>
  );
}

/* ===================== MAIN APP ===================== */
export default function ClubWebsite() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", amount: "", method: "বিকাশ", note: "" });
  const [success, setSuccess] = useState(null);
  const [txFilter, setTxFilter] = useState("all");

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  const ledger = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    let running = 0;
    const withBalance = sorted.map((t) => {
      running += t.type === "income" ? t.amount : -t.amount;
      return { ...t, balance: running };
    });
    return { rows: [...withBalance].reverse(), total: running };
  }, [transactions]);

  const filteredRows = ledger.rows.filter((r) => (txFilter === "all" ? true : r.type === txFilter));

  function handleDonate(e) {
    e.preventDefault();
    const amount = parseInt(form.amount, 10);
    if (!form.name.trim() || !amount || amount <= 0) return;

    const today = new Date().toISOString().slice(0, 10);
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: today,
        label: `অনুদান - ${form.name.trim()} (${form.method})`,
        type: "income",
        category: "অনুদান",
        amount,
      },
    ]);
    setSuccess({ name: form.name.trim(), amount });
    setForm({ name: "", phone: "", amount: "", method: "বিকাশ", note: "" });
    setTimeout(() => setSuccess(null), 6000);
  }

  const navLinks = [
    { id: "about", label: "আমাদের সম্পর্কে" },
    { id: "committee", label: "কমিটি" },
    { id: "activities", label: "কার্যক্রম" },
    { id: "transparency", label: "তহবিলের হিসাব" },
    { id: "donate", label: "অনুদান দিন" },
  ];

  return (
    <div style={{ backgroundColor: C.ivory, color: C.ink, fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      `}</style>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 backdrop-blur" style={{ backgroundColor: "rgba(11,61,54,0.97)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: C.marigold, color: C.teal, fontFamily: "'Lora', serif" }}
            >
              প
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold text-base" style={{ fontFamily: "'Lora', serif" }}>
                প্রত্যাশা সমাজ কল্যাণ সংস্থা
              </div>
              <div className="text-xs" style={{ color: C.marigold }}>
                একসাথে গড়ি সম্ভাবনার সমাজ
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className="text-sm font-medium hover:opacity-80 transition"
                style={{ color: "#EDE6D6" }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("donate")}
              className="text-sm font-semibold px-4 py-2 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: C.marigold, color: C.teal }}
            >
              অনুদান দিন
            </button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)} aria-label="মেনু">
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setNavOpen(false);
                  scrollToSection(l.id);
                }}
                className="text-sm font-medium text-left"
                style={{ color: "#EDE6D6" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section
        className="px-5 pt-16 pb-20 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${C.teal} 0%, ${C.tealLight} 100%)` }}
      >
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20"
          style={{ backgroundColor: C.marigold }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: C.marigold }}
        />
        <div className="max-w-3xl mx-auto relative">
          <SectionLabel>স্বাগতম</SectionLabel>
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            একটি স্বচ্ছ ও সংঘবদ্ধ <br className="hidden md:block" />
            সমাজ কল্যাণ সংগঠন
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: "#D8E4E1" }}>
            ২০১৫ সাল থেকে আমরা শিক্ষা, স্বাস্থ্য, ত্রাণ ও পরিবেশ সংরক্ষণে কাজ করছি। আমাদের প্রতিটি
            আয়-ব্যয়ের হিসাব সম্পূর্ণ স্বচ্ছভাবে এখানে প্রকাশ করা হয় — যাতে প্রতিটি সদস্য ও দাতা
            নিশ্চিন্তে অবদান রাখতে পারেন।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollToSection("donate")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition hover:opacity-90"
              style={{ backgroundColor: C.marigold, color: C.teal }}
            >
              <Heart size={18} />
              অনুদান দিন
            </button>
            <button
              onClick={() => scrollToSection("transparency")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
            >
              তহবিলের হিসাব দেখুন
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* stat strip */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 flex flex-col items-center gap-2"
              style={{
                backgroundColor: s.highlight ? C.marigold : "rgba(255,255,255,0.06)",
                border: s.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <s.icon size={22} color={s.highlight ? C.teal : C.marigold} />
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: "'Space Mono', monospace", color: s.highlight ? C.teal : "#fff" }}
              >
                {s.value}
              </div>
              <div className="text-xs font-medium" style={{ color: s.highlight ? C.teal : "#D8E4E1" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="px-5 py-16 max-w-5xl mx-auto">
        <SectionLabel>আমাদের সম্পর্কে</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
          আমরা যে কারণে কাজ করি
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-2xl p-6 bg-white border" style={{ borderColor: C.border }}>
            <ShieldCheck size={28} color={C.sage} />
            <h3 className="font-semibold mt-4 mb-2" style={{ fontFamily: "'Lora', serif" }}>স্বাস্থ্যসেবা</h3>
            <p className="text-sm" style={{ color: C.inkSoft }}>
              নিয়মিত ফ্রি মেডিকেল ক্যাম্প ও রক্তদান কর্মসূচির মাধ্যমে এলাকার মানুষের স্বাস্থ্যসেবা নিশ্চিত করা।
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-white border" style={{ borderColor: C.border }}>
            <Award size={28} color={C.marigold} />
            <h3 className="font-semibold mt-4 mb-2" style={{ fontFamily: "'Lora', serif" }}>শিক্ষা</h3>
            <p className="text-sm" style={{ color: C.inkSoft }}>
              মেধাবী ও অসচ্ছল শিক্ষার্থীদের উপবৃত্তি, বই ও শিক্ষা উপকরণ প্রদান করা।
            </p>
          </div>
          <div className="rounded-2xl p-6 bg-white border" style={{ borderColor: C.border }}>
            <Heart size={28} color={C.maroon} />
            <h3 className="font-semibold mt-4 mb-2" style={{ fontFamily: "'Lora', serif" }}>ত্রাণ ও মানবিক সহায়তা</h3>
            <p className="text-sm" style={{ color: C.inkSoft }}>
              দুর্যোগকালীন সময়ে এবং উৎসব উপলক্ষে অসহায় পরিবারের পাশে দাঁড়ানো।
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMMITTEE ===== */}
      <section id="committee" className="px-5 py-16" style={{ backgroundColor: C.tealPale }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>সংগঠনের কাঠামো</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif" }}>
            পরিচালনা কমিটি
          </h2>
          <p className="text-sm mb-10" style={{ color: C.inkSoft }}>
            প্রতিটি পদ ও দায়িত্বপ্রাপ্ত ব্যক্তির নাম এখানে প্রকাশ করা হয়েছে।
          </p>

          {/* Advisors */}
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: C.tealLight }}>
              উপদেষ্টা পরিষদ
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {advisors.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Chairman */}
          <div className="mb-6 flex justify-center">
            <div className="w-full sm:w-64">
              <PersonCard {...chairman} large />
            </div>
          </div>

          {/* Vice chairman + secretary */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {viceAndSecretary.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Other officers */}
          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherOfficers.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Executive members */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: C.tealLight }}>
              কার্যনির্বাহী সদস্য
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {executiveMembers.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
            <div className="mt-4 text-center text-sm font-medium px-4 py-2 rounded-full inline-block" style={{ backgroundColor: C.ivory, color: C.inkSoft }}>
              + আরও ২৪০ জন সাধারণ সদস্য
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACTIVITIES ===== */}
      <section id="activities" className="px-5 py-16 max-w-6xl mx-auto">
        <SectionLabel>কার্যক্রম</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif" }}>
          আমাদের সাম্প্রতিক ও চলমান কার্যক্রম
        </h2>
        <p className="text-sm mb-10" style={{ color: C.inkSoft }}>
          প্রতিটি কার্যক্রমের আনুমানিক খরচ স্বচ্ছভাবে উল্লেখ করা হয়েছে এবং তহবিলের হিসাবে প্রতিফলিত হয়।
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((a) => (
            <div key={a.title} className="rounded-2xl bg-white border p-5 flex flex-col gap-3" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: C.tealPale }}
                >
                  <a.icon size={20} color={C.teal} />
                </div>
                <span className="text-xs font-medium" style={{ color: C.inkSoft }}>{a.date}</span>
              </div>
              <h3 className="font-semibold" style={{ fontFamily: "'Lora', serif" }}>{a.title}</h3>
              <p className="text-sm flex-1" style={{ color: C.inkSoft }}>{a.desc}</p>
              <div
                className="text-sm font-semibold pt-3 border-t flex items-center justify-between"
                style={{ borderColor: C.border, fontFamily: "'Space Mono', monospace" }}
              >
                <span style={{ color: C.inkSoft, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>খরচ</span>
                <span style={{ color: C.maroon }}>{a.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRANSPARENCY / FUND PASSBOOK ===== */}
      <section id="transparency" className="px-5 py-16" style={{ backgroundColor: C.teal }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>
            <Landmark size={14} className="inline -mt-0.5 mr-1" />
            তহবিলের হিসাব
          </SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white" style={{ fontFamily: "'Lora', serif" }}>
            সম্পূর্ণ স্বচ্ছ আয়-ব্যয়ের খাতা
          </h2>
          <p className="text-sm mb-8" style={{ color: "#C9D6D2" }}>
            সকল সদস্য ও দাতা সংগঠনের প্রতিটি আয় ও ব্যয়ের বিবরণ এখানে দেখতে পারবেন।
          </p>

          {/* total balance + chart */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: C.marigold }}>
              <Wallet size={28} color={C.teal} />
              <div className="text-xs font-semibold uppercase tracking-wide mt-3 mb-1" style={{ color: C.teal }}>
                বর্তমান তহবিল ব্যালেন্স
              </div>
              <div className="text-4xl font-bold" style={{ fontFamily: "'Space Mono', monospace", color: C.teal }}>
                {formatTaka(ledger.total)}
              </div>
              <div className="text-xs mt-2" style={{ color: C.tealLight }}>
                সর্বশেষ আপডেট: {formatDate(ledger.rows[0]?.date || "2026-06-14")}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white">
              <div className="text-sm font-semibold mb-2" style={{ color: C.ink, fontFamily: "'Lora', serif" }}>
                ব্যয়ের খাত অনুযায়ী বিভাজন
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={fundUsage} dataKey="value" nameKey="name" innerRadius={42} outerRadius={70} paddingAngle={2}>
                    {fundUsage.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatTaka(v)} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* filters */}
          <div className="flex gap-2 mb-4">
            {[
              { id: "all", label: "সব" },
              { id: "income", label: "আয়" },
              { id: "expense", label: "ব্যয়" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTxFilter(f.id)}
                className="text-sm font-medium px-4 py-1.5 rounded-full border transition"
                style={{
                  borderColor: txFilter === f.id ? C.marigold : "rgba(255,255,255,0.25)",
                  backgroundColor: txFilter === f.id ? C.marigold : "transparent",
                  color: txFilter === f.id ? C.teal : "#EDE6D6",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* passbook */}
          <div className="rounded-2xl bg-white overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center justify-evenly"
              style={{ backgroundColor: C.tealPale }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.teal, opacity: 0.25 }} />
              ))}
            </div>
            <div className="overflow-x-auto pl-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: C.border }}>
                    <th className="text-left py-3 pr-3 font-semibold" style={{ color: C.inkSoft }}>তারিখ</th>
                    <th className="text-left py-3 pr-3 font-semibold" style={{ color: C.inkSoft }}>বিবরণ</th>
                    <th className="text-left py-3 pr-3 font-semibold" style={{ color: C.inkSoft }}>খাত</th>
                    <th className="text-right py-3 pr-3 font-semibold" style={{ color: C.inkSoft }}>পরিমাণ</th>
                    <th className="text-right py-3 pr-4 font-semibold" style={{ color: C.inkSoft }}>স্থিতি</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((r) => (
                    <tr key={r.id} className="border-b last:border-0" style={{ borderColor: C.border }}>
                      <td className="py-3 pr-3 whitespace-nowrap" style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: C.inkSoft }}>
                        {formatDate(r.date)}
                      </td>
                      <td className="py-3 pr-3 font-medium">{r.label}</td>
                      <td className="py-3 pr-3">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: C.tealPale, color: C.tealLight }}>
                          {r.category}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-right font-semibold whitespace-nowrap" style={{ fontFamily: "'Space Mono', monospace", color: r.type === "income" ? C.sage : C.maroon }}>
                        <span className="inline-flex items-center gap-1 justify-end">
                          {r.type === "income" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {r.type === "income" ? "+" : "−"}{formatTaka(r.amount)}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right whitespace-nowrap font-semibold" style={{ fontFamily: "'Space Mono', monospace", color: C.ink }}>
                        {formatTaka(r.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DONATE ===== */}
      <section id="donate" className="px-5 py-16 max-w-3xl mx-auto">
        <SectionLabel>অনুদান</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif" }}>
          সংগঠনে অনুদান দিন
        </h2>
        <p className="text-sm mb-8" style={{ color: C.inkSoft }}>
          আপনার অনুদান তাৎক্ষণিকভাবে তহবিলের হিসাবে যুক্ত হবে এবং উপরের লেনদেন তালিকায় দেখা যাবে।
        </p>

        {success && (
          <div className="mb-6 rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "#E8F3E5", border: `1px solid ${C.sage}` }}>
            <CheckCircle2 size={20} color={C.sage} className="mt-0.5 shrink-0" />
            <div className="text-sm" style={{ color: C.ink }}>
              ধন্যবাদ, <span className="font-semibold">{success.name}</span>! আপনার {formatTaka(success.amount)} অনুদান তহবিলে যুক্ত হয়েছে।
            </div>
          </div>
        )}

        <form onSubmit={handleDonate} className="rounded-2xl bg-white border p-6 grid sm:grid-cols-2 gap-4" style={{ borderColor: C.border }}>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: C.inkSoft }}>আপনার নাম</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="যেমন: মোঃ আব্দুল্লাহ"
              className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
              style={{ borderColor: C.border }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: C.inkSoft }}>মোবাইল নম্বর</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
              style={{ borderColor: C.border }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: C.inkSoft }}>পরিমাণ (টাকা)</label>
            <input
              type="number"
              required
              min="1"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="যেমন: ৫০০"
              className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
              style={{ borderColor: C.border, fontFamily: "'Space Mono', monospace" }}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: C.inkSoft }}>পেমেন্ট মাধ্যম</label>
            <div className="flex flex-wrap gap-2">
              {["বিকাশ", "নগদ", "রকেট", "ব্যাংক ট্রান্সফার"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setForm({ ...form, method: m })}
                  className="text-sm font-medium px-4 py-2 rounded-full border transition"
                  style={{
                    borderColor: form.method === m ? C.marigold : C.border,
                    backgroundColor: form.method === m ? "#FCEFD9" : "transparent",
                    color: form.method === m ? C.marigoldDark : C.inkSoft,
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: C.inkSoft }}>মন্তব্য (ঐচ্ছিক)</label>
            <input
              type="text"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="যেমন: শিক্ষা উপবৃত্তি ফান্ডে দিতে চাই"
              className="w-full px-3 py-2.5 rounded-lg border outline-none text-sm"
              style={{ borderColor: C.border }}
            />
          </div>
          <button
            type="submit"
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 font-semibold rounded-full py-3 transition hover:opacity-90"
            style={{ backgroundColor: C.marigold, color: C.teal }}
          >
            <Heart size={18} />
            অনুদান নিশ্চিত করুন
          </button>
          <p className="sm:col-span-2 text-xs text-center" style={{ color: C.inkSoft }}>
            * এটি একটি ডেমো ফর্ম — বাস্তব পেমেন্টের জন্য বিকাশ/নগদ মার্চেন্ট API যুক্ত করতে হবে।
          </p>
        </form>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-5 py-12" style={{ backgroundColor: C.ink }}>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-sm" style={{ color: "#C9D6D2" }}>
          <div>
            <div className="text-white font-semibold mb-2 text-base" style={{ fontFamily: "'Lora', serif" }}>
              প্রত্যাশা সমাজ কল্যাণ সংস্থা
            </div>
            <p>২০১৫ সাল থেকে শিক্ষা, স্বাস্থ্য, ত্রাণ ও পরিবেশের জন্য কাজ করছি — সম্পূর্ণ স্বচ্ছতার সাথে।</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold mb-1">যোগাযোগ</div>
            <div className="flex items-center gap-2"><MapPin size={15} /> ঢাকা, বাংলাদেশ</div>
            <div className="flex items-center gap-2"><Phone size={15} /> ০১৭xx-xxxxxx</div>
            <div className="flex items-center gap-2"><Mail size={15} /> info@pratyasha.org</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold mb-1">দ্রুত লিংক</div>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)} className="text-left hover:text-white transition">{l.label}</button>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t text-xs text-center" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8FA39E" }}>
          © ২০২৬ প্রত্যাশা সমাজ কল্যাণ সংস্থা। সকল অধিকার সংরক্ষিত।
        </div>
      </footer>
    </div>
  );
}
