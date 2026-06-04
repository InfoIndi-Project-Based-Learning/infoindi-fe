import { useState, useEffect, useMemo, useRef } from "react";
import { GradientHeader } from "@/components/common/gradient-header";
import { Search, Loader2, X, Tag } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { PostCard } from "@/features/post/components/post-card";
import { useGetPosts, useGetCategories } from "@/features/post/api/use-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  
  // Infinite Scroll States
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
  
  // Find current category details
  const category = categories.find((c: any) => c.id == id);
  const categorySlug = category?.slug;

  const { data: posts = [], isLoading: isLoadingPosts } = useGetPosts();

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Frontend Filtering
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by Category Slug
    if (categorySlug) {
      result = result.filter((post) => post.category === categorySlug);
    } else if (!isLoadingCategories && !category) {
      // If category not found, return empty
      return [];
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.name.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
      );
    }

    // Sort by newest
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [posts, searchQuery, categorySlug, isLoadingCategories, category]);

  // Slice for infinite scroll
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, page * itemsPerPage);
  }, [filteredPosts, page, itemsPerPage]);

  const hasMore = displayedPosts.length < filteredPosts.length;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  if (!isLoadingCategories && !category) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Tag className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kategori Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-6">Kategori yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Button onClick={() => navigate('/explore')}>Kembali ke Eksplor</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <GradientHeader className="pb-16 pt-32 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30 shadow-xl">
          <Tag className="w-8 h-8 text-white" />
        </div>
        
        {isLoadingCategories ? (
          <Skeleton className="h-10 w-48 bg-white/20 mb-4" />
        ) : (
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {category?.category_name}
          </h1>
        )}
        
        <p className="text-white/90 max-w-xl text-center text-sm md:text-base font-light mb-8">
          Temukan semua postingan menarik yang berkaitan dengan kategori {category?.category_name?.toLowerCase() || 'ini'}.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white w-full max-w-2xl rounded-xl text-neutral-500 px-4 py-3 shadow-2xl border border-white/20 focus-within:ring-4 focus-within:ring-white/30 transition-all">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            className="block w-full focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm md:text-base font-normal bg-transparent"
            placeholder={`Cari di kategori ${category?.category_name || ''}...`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button type="button" onClick={() => {setSearchInput(""); setSearchQuery("");}} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <Button type="submit" className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors shrink-0 px-6">
            Cari
          </Button>
        </form>
      </GradientHeader>

      <main className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Postingan Kategori {category?.category_name}
          </h2>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
            {filteredPosts.length} Postingan
          </span>
        </div>

        {/* Grid */}
        {isLoadingPosts || isLoadingCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-3 pt-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl shadow-sm border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Postingan</h3>
            <p className="text-gray-500 text-center max-w-md text-sm mb-6">
              Belum ada yang membuat postingan di kategori ini atau tidak sesuai dengan kata kunci pencarianmu.
            </p>
            <Button onClick={() => navigate('/create-post')}>Buat Postingan Pertama</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Infinite Scroll Loader */}
        {hasMore && (
          <div ref={loaderRef} className="py-10 flex justify-center mt-6">
            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 text-sm font-medium text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              Memuat lebih banyak...
            </div>
          </div>
        )}
        {!hasMore && displayedPosts.length > 0 && (
          <div className="py-10 text-center mt-6">
            <p className="text-gray-400 text-sm">Kamu sudah melihat semua postingan di kategori ini.</p>
          </div>
        )}
      </main>
    </div>
  );
}
