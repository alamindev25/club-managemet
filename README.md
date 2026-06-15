# প্রত্যাশা সমাজ কল্যাণ সংস্থা — Club Management Website

React + Vite + Tailwind দিয়ে বানানো একটা প্রফেশনাল সোশ্যাল অর্গানাইজেশন/ক্লাব ম্যানেজমেন্ট ওয়েবসাইট।

## চালানোর নিয়ম

প্রথমে এই ফোল্ডারে ঢুকে নিচের কমান্ডগুলো চালান:

```bash
npm install
npm run dev
```

তারপর টার্মিনালে দেখানো লোকাল লিংকে (সাধারণত http://localhost:5173) ব্রাউজারে ওপেন করুন।

## প্রোডাকশন বিল্ড

```bash
npm run build
npm run preview
```

## ফাইল গঠন

- `src/App.jsx` — পুরো ওয়েবসাইটের কোড (হিরো, কমিটি, কার্যক্রম, তহবিলের হিসাব, অনুদান ফর্ম, ফুটার)
- `src/index.css` — Tailwind CSS
- `tailwind.config.js`, `postcss.config.js`, `vite.config.js` — কনফিগারেশন ফাইল

## কাস্টমাইজেশন

- কমিটি সদস্যদের নাম, পদ, ছবি পরিবর্তন করতে `src/App.jsx` ফাইলের শুরুতে থাকা
  `advisors`, `chairman`, `viceAndSecretary`, `otherOfficers`, `executiveMembers`
  অ্যারেগুলো এডিট করুন।
- তহবিলের লেনদেন পরিবর্তন করতে `initialTransactions` অ্যারে এডিট করুন।
- কার্যক্রম পরিবর্তন করতে `activities` অ্যারে এডিট করুন।
- রঙের থিম পরিবর্তন করতে ফাইলের শুরুতে থাকা `C` অবজেক্ট এডিট করুন।
