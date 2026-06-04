import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SearchPost {
  id: string;
  post_name: string;
  banner_url: string | null;
  category: {
    slug: string;
    name: string;
  };
}

export interface SearchCategory {
  id: string;
  category_name: string;
  slug: string;
  posts_count: number;
}

export interface SearchUser {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
}

export interface SearchResponse {
  posts: SearchPost[];
  categories: SearchCategory[];
  users: SearchUser[];
}

export const fetchSearchData = async (query: string) => {
  if (!query || query.trim().length < 1) {
    return { posts: [], categories: [], users: [] };
  }
  const response = await api.get<SearchResponse>(`/search`, { q: query });
  return response.data || { posts: [], categories: [], users: [] };
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchData(query),
    enabled: query.trim().length >= 1,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};
