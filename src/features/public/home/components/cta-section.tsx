import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-20 bg-white border-t border-slate-100/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
          {/* Background decorative blurs */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10 tracking-tight">
            Siap Terhubung dengan Mahasiswa Lainnya?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-sm md:text-base relative z-10 leading-relaxed font-light">
            Mulai bagikan jualanmu, pasarkan jasamu, cari info lowongan kerja paruh waktu, atau cari rekan tim untuk lomba dalam satu platform terpadu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-8 py-5 rounded-xl transition-all shadow-md w-full">
                Gabung Sekarang
              </Button>
            </Link>
            <Link to="/bantuan" className="w-full sm:w-auto">
              <Button variant="outline" className="bg-transparent border-white/40 hover:bg-white/10 hover:text-white text-white font-medium px-8 py-5 rounded-xl transition-all w-full">
                Pelajari Selengkapnya
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
