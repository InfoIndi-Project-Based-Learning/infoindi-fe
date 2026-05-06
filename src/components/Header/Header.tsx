import React from 'react';

export const Header = () => {
  return (
    <header className="bg-white w-full border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Bagian Kiri: Logo */}
        <div className="flex-shrink-0 cursor-pointer">
          <span className="text-2xl font-serif italic font-bold text-gray-900 tracking-tight">
            InfoIndi
          </span>
        </div>

        {/* Bagian Tengah: Menu Navigasi */}
        <nav className="hidden md:flex items-center gap-2">
          <a 
            href="#" 
            className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold"
          >
            Beranda
          </a>
          <a 
            href="#" 
            className="text-gray-600 hover:text-black px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Eksplor
          </a>
        </nav>

        {/* Bagian Kanan: Tombol Masuk & Daftar */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            Masuk
          </button>
          <button className="px-5 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
            Daftar
          </button>
        </div>

      </div>
    </header>
  );
};