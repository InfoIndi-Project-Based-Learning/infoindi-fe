import { Store, Briefcase, Megaphone, Users, Trophy, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CategoryInfo {
  slug: string;
  label: string;
  icon: LucideIcon;
  description: string;
  gradient: string;      // Tailwind gradient classes for hero banner
  badgeColor: string;    // Badge background color
}

export const CATEGORY_DATA: Record<string, CategoryInfo> = {
  jualan: {
    slug: "jualan",
    label: "Jualan",
    icon: Store,
    description: "Tempat kamu cari produk menarik dengan harga mahasiswaable",
    gradient: "from-green-400 to-green-600",
    badgeColor: "bg-green-700",
  },
  jasa: {
    slug: "jasa",
    label: "Jasa",
    icon: Briefcase,
    description: "Tempat kamu nyari bantuan dari keahlian dari orang disekitar kamu",
    gradient: "from-blue-400 to-indigo-500",
    badgeColor: "bg-blue-700",
  },
  acara: {
    slug: "acara",
    label: "Acara",
    icon: Megaphone,
    description: "Temukan berbagai acara seru dan event menarik di sekitarmu",
    gradient: "from-amber-400 to-yellow-600",
    badgeColor: "bg-amber-700",
  },
  loker: {
    slug: "loker",
    label: "Loker",
    icon: Users,
    description: "Temukan lowongan kerja dan magang yang cocok untuk mahasiswa",
    gradient: "from-purple-500 to-violet-600",
    badgeColor: "bg-purple-700",
  },
  lomba: {
    slug: "lomba",
    label: "Lomba",
    icon: Trophy,
    description: "Ikuti berbagai kompetisi dan lomba untuk mengasah kemampuanmu",
    gradient: "from-amber-400 to-yellow-600",
    badgeColor: "bg-amber-700",
  },
  lainnya: {
    slug: "lainnya",
    label: "Lainnya",
    icon: LayoutGrid,
    description: "Temukan informasi lainnya yang mungkin kamu butuhkan",
    gradient: "from-gray-500 to-gray-700",
    badgeColor: "bg-gray-700",
  },
};

export const ALL_CATEGORY_SLUGS = Object.keys(CATEGORY_DATA);
