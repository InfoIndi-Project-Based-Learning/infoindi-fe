import { GradientHeader } from "@/components/common/gradient-header";
import { SearchCommand } from "@/components/common/search-command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Users, TrendingUp, MessageSquare } from "lucide-react";

interface HeroSectionProps {
  stats?: { users: number; posts: number; categories: number };
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <GradientHeader>
        <h3 className="bg-white/10 backdrop-blur-md text-white border border-white/20 mt-14 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <span>🎓</span> Platform Koneksi Kampus Anda
        </h3>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight text-white">
          Semua Informasi Mahasiswa <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">Dalam Satu Platform</span>
        </h1>
        <p className="max-w-2xl text-white/90 text-sm md:text-base font-light leading-relaxed mb-6">
          Temukan berbagai informasi menarik dari mahasiswa mulai dari jualan,
          jasa, event, hingga lowongan dalam satu platform yang mudah dijangkau.
        </p>
        <SearchCommand />
        <Button
          variant={"outline"}
          className={"text-black bg-white/90 hover:bg-white border-none rounded-md mb-12 shadow-md"}
          size={"lg"}
          onClick={() => {
            const section = document.getElementById("categories-section");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Lihat Kategori
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
        <div className="hidden md:grid grid-cols-3 gap-8 text-black absolute -bottom-16 w-full max-w-5xl px-4">
          <div className="bg-white/95 backdrop-blur-sm p-6 flex items-center text-left rounded-xl shadow-xl border border-gray-100 gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-blue-50 rounded-lg shrink-0">
              {stats ? <Users className="text-blue-600 w-6 h-6" /> : <Skeleton className="w-6 h-6 rounded-md" />}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stats?.users ? stats.users.toLocaleString() : <Skeleton className="w-16 h-8" />}
              </p>
              <p className="text-sm font-medium text-gray-500">Pengguna Aktif</p>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-6 flex items-center text-left rounded-xl shadow-xl border border-gray-100 gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-green-50 rounded-lg shrink-0">
              {stats ? <TrendingUp className="text-green-600 w-6 h-6" /> : <Skeleton className="w-6 h-6 rounded-md" />}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stats?.posts ? `${stats.posts.toLocaleString()}+` : <Skeleton className="w-16 h-8" />}
              </p>
              <p className="text-sm font-medium text-gray-500">Postingan</p>
            </div>
          </div>
          <div className="bg-white/95 backdrop-blur-sm p-6 flex items-center text-left rounded-xl shadow-xl border border-gray-100 gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="p-3 bg-purple-50 rounded-lg shrink-0">
              {stats ? <MessageSquare className="text-purple-600 w-6 h-6" /> : <Skeleton className="w-6 h-6 rounded-md" />}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {stats?.categories ? stats.categories.toLocaleString() : <Skeleton className="w-16 h-8" />}
              </p>
              <p className="text-sm font-medium text-gray-500">Kategori</p>
            </div>
          </div>
        </div>
    </GradientHeader>
  );
}
