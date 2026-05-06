import React from 'react'
import { PostCard } from '../../../components/Card';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function Landing() {
  // --- DATA DUMMY UNTUK POSTINGAN ---
  const DUMMY_POSTS = [
    { id: 1, badge: "Info", title: "Info Beasiswa Terbaru", likesCount: 16, timeAgo: "30 menit lalu", owner: "admin_kampus" },
    { id: 2, badge: "Event", title: "Seminar Nasional IT 2026", likesCount: 42, timeAgo: "1 jam lalu", owner: "himpunan_mahasiswa" },
    { id: 3, badge: "Loker", title: "Lowongan Magang Frontend", likesCount: 89, timeAgo: "2 jam lalu", owner: "karir_startup" },
    { id: 4, badge: "Jasa", title: "Jasa Print & Jilid Murah", likesCount: 5, timeAgo: "5 jam lalu", owner: "printing_ub" },
    { id: 5, badge: "Jualan", title: "Preloved Buku Kalkulus", likesCount: 12, timeAgo: "1 hari lalu", owner: "maba_rajin" },
    { id: 6, badge: "Info", title: "Kehilangan KTM di Perpus", likesCount: 30, timeAgo: "2 hari lalu", owner: "mahasiswa_lupa" },
  ];

  // --- DATA DUMMY UNTUK FITUR ---
  const FEATURES = [
    { icon: "⚡", title: "Pusat Informasi Terpusat", desc: "Semua info, jualan, jasa, event, dan loker mahasiswa ada di satu tempat." },
    { icon: "🔍", title: "Pencarian Cepat", desc: "Cari informasi dengan mudah dan filter kategori yang spesifik." },
    { icon: "📝", title: "Bagikan Informasi", desc: "Bantu teman-temanmu dengan membagikan informasi yang kamu tahu." },
    { icon: "🏷️", title: "Kategori Terorganisir", desc: "Informasi dikelompokkan dalam kategori agar mudah ditemukan." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* HEADER / NAVBAR SECTION */}
      <Header />  

      {/* HERO SECTION (Warna Ungu Gradient) */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="px-4 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
            InfoIndi UB
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Semua Informasi Mahasiswa UB<br/>Dalam Satu Platform
          </h1>
          <p className="text-indigo-100 text-sm md:text-base mb-4">
            Temukan berbagai informasi menarik dari mahasiswa mulai dari jualan, jasa, event, hingga lowongan dalam satu platform yang mudah dijangkau.
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-xl bg-white rounded-full p-1.5 flex items-center shadow-lg">
            <span className="text-gray-400 pl-4">🔍</span>
            <input 
              type="text" 
              placeholder="Cari sesuatu..." 
              className="flex-1 bg-transparent border-none outline-none text-gray-800 px-3 py-2 text-sm"
            />
            <button className="bg-[#1a163a] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-indigo-950 transition-colors">
              Cari
            </button>
          </div>
        </div>
      </section>

      {/* FITUR SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Kenapa Harus Disini?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-xl mb-4">
                {feat.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-2">{feat.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSTINGAN TERBARU SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Postingan Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {DUMMY_POSTS.slice(0, 6).map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-indigo-600 font-semibold text-sm hover:underline">
            Lihat Lainnya
          </button>
        </div>
      </section>

      {/* PALING POPULER SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-8 w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Paling Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {DUMMY_POSTS.slice(0, 6).reverse().map((post) => (
            <PostCard key={`pop-${post.id}`} {...post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="text-indigo-600 font-semibold text-sm hover:underline">
            Lihat Lainnya
          </button>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h2 className="text-2xl font-bold mb-2">Siap Bagikan Informasimu?</h2>
            <p className="text-blue-100 text-sm">Bergabung bersama ratusan anggota komunitas lainnya dan saling berbagi!</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg text-sm font-bold flex-1 md:flex-none hover:bg-gray-50">
              Mulai sekarang!
            </button>
            <button className="border border-white/30 px-6 py-2.5 rounded-lg text-sm font-bold flex-1 md:flex-none hover:bg-white/10">
              Pelajari lebih lanjut
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <Footer />

      <div className="pb-10"></div>
    </div>
  );
}