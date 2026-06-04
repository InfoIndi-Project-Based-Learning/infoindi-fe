import React, { useState, useRef, useEffect } from "react";
import { Search, Loader2, X, Tag, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useSearch } from "@/features/post/api/use-search";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, isLoading } = useSearch(debouncedQuery);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPost = (id: string) => {
    setIsOpen(false);
    navigate(`/post/${id}`);
  };

  const handleSelectCategory = (categoryId: string) => {
    setIsOpen(false);
    navigate(`/kategori/${categoryId}`);
  };

  const handleSelectUser = (username: string) => {
    setIsOpen(false);
    navigate(`/users/${username}`);
  };

  const handleClear = () => {
    setInputValue("");
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (inputValue.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const hasResults =
    data &&
    (data.posts.length > 0 || data.categories.length > 0 || data.users.length > 0);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl z-50">
      <div className="flex items-center gap-3 bg-white w-full rounded-xl text-neutral-500 px-4 py-3 shadow-2xl border border-white/20 focus-within:ring-4 focus-within:ring-white/30 transition-all">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          className="block w-full focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm md:text-base font-normal bg-transparent"
          placeholder="Cari jualan, jasa, atau pengguna..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {isLoading && debouncedQuery.length > 0 && (
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        )}
        {inputValue && !isLoading && (
          <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Panel */}
      {isOpen && debouncedQuery.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[70vh]">
          <div className="overflow-y-auto p-2">
            
            {isLoading ? (
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </div>
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center">
                <Search className="w-8 h-8 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-900">Tidak ada hasil ditemukan</p>
                <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci yang berbeda</p>
              </div>
            ) : (
              <>
                {/* Posts Section */}
                {data.posts.length > 0 && (
                  <div className="mb-2">
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Postingan
                    </h3>
                    <ul>
                      {data.posts.map((post) => (
                        <li key={post.id}>
                          <button
                            onClick={() => handleSelectPost(post.id)}
                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200">
                              {post.banner_url ? (
                                <img src={post.banner_url} alt={post.post_name} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {post.post_name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                di {post.category.name}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories Section */}
                {data.categories.length > 0 && (
                  <div className="mb-2">
                    {data.posts.length > 0 && <Separator className="my-2" />}
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Kategori
                    </h3>
                    <ul>
                      {data.categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => handleSelectCategory(cat.id)}
                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <Tag className="w-3.5 h-3.5 text-slate-500" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                {cat.category_name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                              {cat.posts_count} post
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Users Section */}
                {data.users.length > 0 && (
                  <div className="mb-2">
                    {(data.posts.length > 0 || data.categories.length > 0) && <Separator className="my-2" />}
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pengguna
                    </h3>
                    <ul>
                      {data.users.map((user) => (
                        <li key={user.id}>
                          <button
                            onClick={() => handleSelectUser(user.username)}
                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg flex items-center gap-3 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                              <img 
                                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                              {user.name}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Footer of Dropdown */}
          {hasResults && (
            <div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 text-center border-t border-slate-100 mt-auto shrink-0">
              Menampilkan {data.posts.length + data.categories.length + data.users.length} hasil teratas
            </div>
          )}
        </div>
      )}
    </div>
  );
}
