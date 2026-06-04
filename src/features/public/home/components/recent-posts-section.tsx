import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCard } from "@/features/post/components/post-card";
import type { UIPost } from "@/features/post/api/use-posts";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

interface RecentPostsSectionProps {
  posts: UIPost[];
  categories: any[];
  isHomeLoading: boolean;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

export function RecentPostsSection({
  posts,
  categories,
  isHomeLoading,
  selectedCategoryId,
  setSelectedCategoryId
}: RecentPostsSectionProps) {
  return (
    <section id="recent-posts" className="container mx-auto px-4 mt-20 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-1">
            {selectedCategoryId
              ? `Kategori: ${categories.find((c: any) => c.id === selectedCategoryId)?.category_name}`
              : "Postingan Terbaru"
            }
          </h2>
          <p className="text-gray-500 text-sm">
            {selectedCategoryId
              ? `Menampilkan postingan dalam kategori ${categories.find((c: any) => c.id === selectedCategoryId)?.category_name}`
              : "Lihat apa yang terbaru dari komunitas mahasiswa"
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedCategoryId && (
            <Button
              variant="ghost"
              onClick={() => setSelectedCategoryId(null)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-1.5 text-xs font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              Hapus Filter
            </Button>
          )}
          <Link to="/explore">
            <Button variant="outline" className="gap-2 rounded-md shadow-sm">
              Lihat Selengkapnya
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {isHomeLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-3 pt-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Tidak ada postingan yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: UIPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
