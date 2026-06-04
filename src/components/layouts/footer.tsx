import React from "react";
import { Link } from "react-router-dom";
import { Mail, GraduationCap } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Jualan", path: "/explore?category=jualan" },
    { name: "Jasa", path: "/explore?category=jasa" },
    { name: "Info Lomba", path: "/explore?category=info-lomba" },
    { name: "Lowongan Kerja", path: "/explore?category=lowongan-pekerjaan" },
    { name: "Lainnya", path: "/explore?category=lainnya" },
  ];

  const quickLinks = [
    { name: "Beranda", path: "/" },
    { name: "Eksplor", path: "/explore" },
    { name: "Dashboard Saya", path: "/dashboard" },
    { name: "Profil", path: "/profile" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <img src="/logo-white.png" alt="InfoIndi Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">InfoIndi</span>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">infoin di ub</span>
              </div>
            </Link>

            <p className="text-sm mb-4">
              Membantu mahasiswa untuk terhubung, berbagi, dan berkembang
              bersama melalui pertukaran informasi.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kategori</h3>

            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tautan Cepat</h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>

            <p className="text-sm mb-4">
              Punya pertanyaan atau saran? Kami siap mendengarkan!
            </p>

            <a
              href="mailto:infoindi@ub.ac.id"
              className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              infoindi@ub.ac.id
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © {currentYear} InfoIndi. Hak cipta dilindungi.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </a>

              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </a>

              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Kebijakan Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
