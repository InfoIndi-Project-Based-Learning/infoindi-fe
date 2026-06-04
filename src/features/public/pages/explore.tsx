import { useState, useEffect, useMemo, useRef } from "react";
import { GradientHeader } from "@/components/common/gradient-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Loader2,
  X,
  ChevronDown
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { PostCard } from "@/features/post/components/post-card";
import { useGetPosts, useGetCategories, fetchPostsData, type UIPost } from "@/features/post/api/use-posts";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption = "newest" | "popular";

export default function ExplorePage() {
  const location = useLocation();
  const initialCategory = location.state?.categoryFilter as string | undefined;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Infinite Scroll States
  const queryClient = useQueryClient();
  const [backendPage, setBackendPage] = useState(1);
  const [hasMoreBackend, setHasMoreBackend] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: posts = [], isLoading: isLoadingPosts } = useGetPosts();
  const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();

  // Frontend Filtering & Sorting
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.name.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      // Find slugs of selected categories to match with post.category (which is a slug)
      const selectedSlugs = categories
        .filter(c => selectedCategories.includes(c.id))
        .map(c => c.slug);
      
      result = result.filter((post) => selectedSlugs.includes(post.category));
    }

    // 3. Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    }

    return result;
  }, [posts, searchQuery, selectedCategories, sortBy, categories]);

  // Slice for infinite scroll
  const displayedPosts = filteredAndSortedPosts;

  const fetchNextPage = async () => {
    try {
      setIsFetchingNext(true);
      const nextPage = backendPage + 1;
      const newPosts = await fetchPostsData({ page: nextPage });
      
      if (newPosts.length === 0) {
        setHasMoreBackend(false);
      } else {
        queryClient.setQueryData(["posts", undefined], (oldData: UIPost[] | undefined) => {
          if (!oldData) return newPosts;
          const existingIds = new Set(oldData.map(p => p.id));
          const uniqueNew = newPosts.filter(p => !existingIds.has(p.id));
          return [...oldData, ...uniqueNew];
        });
        setBackendPage(nextPage);
        if (newPosts.length < 15) {
          setHasMoreBackend(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingNext(false);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMoreBackend && !isFetchingNext && !isLoadingPosts) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
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
  }, [hasMoreBackend, isFetchingNext, isLoadingPosts, backendPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSearchInput("");
    setSelectedCategories([]);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <GradientHeader className="pb-16 pt-32">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Eksplor <span className="text-amber-300">Semuanya</span>
        </h1>
        <p className="text-white/90 max-w-xl text-center text-sm md:text-base font-light mb-8">
          Temukan berbagai macam informasi, jualan, jasa, dan peluang dari seluruh mahasiswa di Indonesia.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white w-full max-w-2xl rounded-xl text-neutral-500 px-4 py-3 shadow-2xl border border-white/20 focus-within:ring-4 focus-within:ring-white/30 transition-all">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            className="block w-full focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm md:text-base font-normal bg-transparent"
            placeholder="Cari sesuatu yang menarik..."
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

      <main className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <span className="font-semibold text-gray-900">Filter & Urutkan</span>
            <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="gap-2">
              <Filter className="w-4 h-4" />
              {isMobileFilterOpen ? "Tutup" : "Buka"}
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 transition-all duration-300 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filter
                </h2>
                {(selectedCategories.length > 0 || sortBy !== "newest" || searchQuery) && (
                  <button onClick={clearFilters} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                    Reset Semua
                  </button>
                )}
              </div>

              <Separator className="mb-6" />

              {/* Sort Section */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  Urutkan Berdasarkan
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === "newest"}
                      onChange={() => setSortBy("newest")}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                    />
                    <span className={`text-sm ${sortBy === "newest" ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                      Terbaru
                    </span>
                    <Clock className="w-4 h-4 text-gray-400 ml-auto" />
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === "popular"}
                      onChange={() => setSortBy("popular")}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                    />
                    <span className={`text-sm ${sortBy === "popular" ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                      Terpopuler
                    </span>
                    <TrendingUp className="w-4 h-4 text-gray-400 ml-auto" />
                  </label>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Category Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">
                  Kategori
                </h3>
                {isLoadingCategories ? (
                  <div className="space-y-4 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.map((category: any) => (
                      <div key={category.id} className="flex items-center gap-3">
                        <Checkbox 
                          id={`cat-${category.id}`} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                          className="border-gray-300 text-blue-600 rounded"
                        />
                        <Label 
                          htmlFor={`cat-${category.id}`}
                          className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
                        >
                          {category.category_name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Post Grid Area */}
          <div className="flex-1">
            {/* Header / Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Menampilkan Hasil
              </h2>
              <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                {filteredAndSortedPosts.length} Postingan
              </span>
            </div>

            {/* Grid */}
            {isLoadingPosts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
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
            ) : filteredAndSortedPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl shadow-sm border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak Ditemukan</h3>
                <p className="text-gray-500 text-center max-w-md text-sm">
                  Tidak ada postingan yang sesuai dengan filter pencarianmu. Coba ubah kata kunci atau hapus beberapa filter.
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-6">
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Infinite Scroll Loader */}
            {hasMoreBackend && (
              <div ref={loaderRef} className="py-10 flex justify-center mt-6">
                <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100 text-sm font-medium text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  Memuat lebih banyak...
                </div>
              </div>
            )}
            {!hasMoreBackend && displayedPosts.length > 0 && (
              <div className="py-10 text-center mt-6">
                <p className="text-gray-400 text-sm">Kamu sudah melihat semua postingan.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
