import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { fetchPostsData, fetchCategories } from "@/features/post/api/use-posts";
import { ShoppingBag, Wrench, Trophy, Briefcase, HelpCircle } from "lucide-react";

export function useHomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data: homeData, isLoading: isHomeLoading } = useQuery({
    queryKey: ["home-data", selectedCategoryId],
    queryFn: async () => {
      const [postsRes, categoriesRes, statsRes] = await Promise.all([
        fetchPostsData({ category_id: selectedCategoryId || undefined }),
        fetchCategories(),
        api.get<{ users: number; posts: number; categories: number }>("/statistics").then(res => res.data)
      ]);

      return {
        posts: postsRes,
        categories: categoriesRes,
        stats: statsRes
      };
    }
  });

  const posts = (homeData?.posts || []).slice(0, 6);
  const categories = homeData?.categories || [];
  const stats = homeData?.stats;

  const categoryMetadata: Record<string, { icon: any; color: string; bgColor: string; borderHoverColor: string; description: string }> = {
    "jualan": {
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50/80 border-blue-100 hover:bg-blue-100/50 hover:border-blue-300",
      borderHoverColor: "border-blue-500 ring-2 ring-blue-500/20 bg-blue-100/30 shadow-sm",
      description: "Jual beli barang bekas, buku, alat tulis, dll."
    },
    "jasa": {
      icon: Wrench,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/80 border-emerald-100 hover:bg-emerald-100/50 hover:border-emerald-300",
      borderHoverColor: "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-100/30 shadow-sm",
      description: "Jasa desain, joki coding, cetak, foto, dll."
    },
    "info-lomba": {
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50/80 border-purple-100 hover:bg-purple-100/50 hover:border-purple-300",
      borderHoverColor: "border-purple-500 ring-2 ring-purple-500/20 bg-purple-100/30 shadow-sm",
      description: "Lomba essay, hackathon, business plan, dll."
    },
    "lowongan-pekerjaan": {
      icon: Briefcase,
      color: "text-amber-600",
      bgColor: "bg-amber-50/80 border-amber-100 hover:bg-amber-100/50 hover:border-amber-300",
      borderHoverColor: "border-amber-500 ring-2 ring-amber-500/20 bg-amber-100/30 shadow-sm",
      description: "Magang, freelance, part-time mahasiswa."
    },
    "lainnya": {
      icon: HelpCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50/80 border-gray-100 hover:bg-gray-100/50 hover:border-gray-300",
      borderHoverColor: "border-gray-500 ring-2 ring-gray-500/20 bg-gray-100/30 shadow-sm",
      description: "Diskusi umum, tanya jawab, info kosan, dll."
    }
  };

  const getCategoryMeta = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes("jual")) return categoryMetadata["jualan"];
    if (s.includes("jas")) return categoryMetadata["jasa"];
    if (s.includes("lomb") || s.includes("event")) return categoryMetadata["info-lomba"];
    if (s.includes("lowong") || s.includes("kerja") || s.includes("loker")) return categoryMetadata["lowongan-pekerjaan"];
    return categoryMetadata["lainnya"];
  };

  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
      const section = document.getElementById("recent-posts");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    selectedCategoryId,
    isHomeLoading,
    posts,
    categories,
    stats,
    getCategoryMeta,
    handleCategorySelect,
    setSelectedCategoryId
  };
}
