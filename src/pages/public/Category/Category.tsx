import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router';
import { PostCard } from '../../../components/Card';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { CATEGORY_DATA } from './categoryData';

// --- DATA DUMMY UNTUK POSTINGAN ---
const DUMMY_POSTS = [
  { id: 1, badge: "Badge", title: "Judul Postingan", likesCount: 16, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 2, badge: "Badge", title: "Judul Postingan", likesCount: 16, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 3, badge: "Badge", title: "Judul Postingan", likesCount: 16, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 4, badge: "Badge", title: "Judul Postingan", likesCount: 16, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 5, badge: "Badge", title: "Judul Postingan", likesCount: 12, timeAgo: "30 menit lalu", owner: "owner postingan" },
  { id: 6, badge: "Badge", title: "Judul Postingan", likesCount: 30, timeAgo: "20 menit lalu", owner: "owner postingan" },
];

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMore, setShowMore] = useState(false);

  // Get category info based on slug
  const category = slug ? CATEGORY_DATA[slug] : undefined;

  // If category not found, redirect to eksplor
  if (!category) {
    return <Navigate to="/eksplor" replace />;
  }

  const IconComp = category.icon;
  const allPosts = showMore ? [...DUMMY_POSTS, ...DUMMY_POSTS] : DUMMY_POSTS;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* HEADER / NAVBAR */}
      <Header />

      {/* HERO BANNER - Category Specific */}
      <section className={`bg-gradient-to-r ${category.gradient} text-white px-4 py-6`}>
        <div className="max-w-6xl mx-auto">
          {/* Category card */}
          <div className={`rounded-2xl p-8 relative overflow-hidden`}>
            {/* Back Button */}
            <Link
              to="/eksplor"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg mb-4 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali
            </Link>

            {/* Icon */}
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <IconComp className="w-7 h-7 text-white" />
            </div>

            {/* Category Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {category.label}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-sm md:text-base max-w-lg">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full flex-1">

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 mb-8">
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

        {/* POST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {allPosts.map((post, index) => (
            <PostCard key={`cat-${post.id}-${index}`} {...post} />
          ))}
        </div>

        {/* LIHAT LAGI */}
        <div className="text-center mt-10 mb-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-600 font-semibold text-sm hover:underline inline-flex items-center gap-1 transition-colors"
          >
            {showMore ? 'Tampilkan Sedikit' : 'Lihat Lagi'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
