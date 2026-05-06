// src/components/Footer/Footer.tsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#0b0826] text-white pt-16 pb-6 px-4 w-full">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Bagian Atas: 4 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Kolom 1: Logo & Tagline */}
          <div className="col-span-1">
            <h2 className="text-4xl font-serif italic font-bold mb-4">InfoIndi</h2>
            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              Empowering students to connect, share, and grow together through information exchange.
            </p>
          </div>
          
          {/* Kolom 2: Kategori */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kategori</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Jualan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jasa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Event</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Loker</a></li>
            </ul>
          </div>

          {/* Kolom 3: Navigasi */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigasi</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kategori</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Loker</a></li>
            </ul>
          </div>

          {/* Kolom 4: Bantuan */}
          <div>
            <h3 className="text-lg font-bold mb-4">Butuh Bantuan?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Punya pertanyaan lebih lanjut? kami siap menjawab dan membantu anda.
            </p>
          </div>

        </div>

        {/* Bagian Bawah: Copyright */}
        <div className="border-t border-white/20 pt-6 mt-4 text-[11px] text-gray-400">
          <p>@ 2026 InfoIndi. Alright Preserved</p>
        </div>

      </div>
    </footer>
  );
};