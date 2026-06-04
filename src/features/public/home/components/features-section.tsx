import { Users, TrendingUp, MessageSquare } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="bg-white py-20 border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-3 tracking-tight">
            Kenapa Memilih Kami?
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-light">
            Semua yang kamu butuhkan untuk produktivitas dan koneksi di kampus dalam satu platform terpadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Bento Style - Spans 2 columns on larger screens */}
          <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Terhubung Eksklusif Antar Kampus
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                Satu-satunya platform koneksi yang dirancang khusus untuk mahasiswa di Indonesia. Semua transaksi COD aman dilakukan langsung di area kampus, dan postingan tervalidasi dari mahasiswa aktif beridentitas jelas.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-blue-600">
              <span>100% Terverifikasi UB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
            </div>
          </div>

          {/* Column 2: Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex-1">
              <div>
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Pasar Kreatif Mahasiswa
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Mulai dari jual buku bekas kuliah, sewa kosan, hingga jasa joki koding dan desain grafis feeds Instagram. Semua ada pasarnya di sini!
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex-1">
              <div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Komunitas Saling Berbagi
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">
                  Temukan rekan setim untuk info lomba nasional, lowongan kerja magang/freelance, hingga wadah sharing santai kehidupan mahasiswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
