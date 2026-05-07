import React, { useState } from 'react';
import { Link } from 'react-router';
import { PostCard } from '../../../components/Card';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Search, SlidersHorizontal, ChevronDown, Store, Briefcase, CalendarDays, MapPin, Trophy, LayoutGrid } from 'lucide-react';

// --- DATA DUMMY UNTUK POSTINGAN ---
const DUMMY_POSTS = [
  { id: 1, badge: "Bridge", title: "Judul Postingan", likesCount: 16, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 2, badge: "Bridge", title: "Judul Postingan", likesCount: 42, timeAgo: "1 jam lalu", owner: "owner postingan" },
  { id: 3, badge: "Bridge", title: "Judul Postingan", likesCount: 89, timeAgo: "2 jam lalu", owner: "owner postingan" },
  { id: 4, badge: "Bridge", title: "Judul Postingan", likesCount: 5, timeAgo: "5 jam lalu", owner: "owner postingan" },
  { id: 5, badge: "Bridge", title: "Judul Postingan", likesCount: 12, timeAgo: "1 hari lalu", owner: "owner postingan" },
  { id: 6, badge: "Bridge", title: "Judul Postingan", likesCount: 30, timeAgo: "2 hari lalu", owner: "owner postingan" },
];

// --- DATA KATEGORI ---
const CATEGORIES = [
  { icon: Store, label: "Jualan", slug: "jualan", color: "bg-indigo-600" },
  { icon: Briefcase, label: "Jasa", slug: "jasa", color: "bg-indigo-600" },
  { icon: CalendarDays, label: "Acara", slug: "acara", color: "bg-indigo-600" },
  { icon: MapPin, label: "Loker", slug: "loker", color: "bg-indigo-600" },
  { icon: Trophy, label: "Lomba", slug: "lomba", color: "bg-indigo-600" },
  { icon: LayoutGrid, label: "Lainnya", slug: "lainnya", color: "bg-indigo-600" },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const allPosts = showMore ? [...DUMMY_POSTS, ...DUMMY_POSTS] : DUMMY_POSTS;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER / NAVBAR */}
      <Header />

      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 text-white py-14 px-4 text-center relative overflow-hidden">
        {/* Decorative blur circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Beragam kategori yang ada di InfoIndi
          </h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-xl mx-auto">
            Informasi kami kelompokkan berdasarkan kategori untuk memudahkan anda dalam menyaring apa yang anda butuhkan
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full flex-1">

        {/* DAFTAR KATEGORI INFORMASI */}
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Daftar Kategori Informasi
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto">
          {CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={cat.label}
                to={`/kategori/${cat.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 bg-white text-gray-800 border-gray-200 hover:border-indigo-300 hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-600">
                  <IconComp className="w-4 h-4 text-white" />
                </div>
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* EKSPLOR LEBIH */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Eksplor Lebih
        </h2>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 gap-2 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="cari sesuatu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <button className="bg-[#1a163a] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-950 transition-colors shadow-sm">
            Cari
          </button>
        </div>

        {/* FILTER ROW */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
            Semua
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* POST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {allPosts.map((post, index) => (
            <PostCard key={`explore-${post.id}-${index}`} {...post} />
          ))}
        </div>

        {/* LIHAT LAGI */}
        <div className="text-center mt-10 mb-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-600 font-semibold text-sm hover:underline inline-flex items-center gap-1 transition-colors"
          >
            {showMore ? 'Tampilkan Sedikit' : 'Lihat Lagi'}
            <span className="text-lg">{showMore ? '↑' : '↓'}</span>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
