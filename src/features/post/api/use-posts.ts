import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";

// Interface for UI representation of Post to keep compatibility with existing templates
export interface UIPost {
  id: string;
  name: string;
  bannerImage: string;
  additionalImages: string[];
  description: string;
  category: "jualan" | "jasa" | "info-lomba" | "lowongan-pekerjaan" | "lainnya";
  createdAt: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  authorUsername: string;
  authorPhoneNumber?: string;
  likesCount: number;
  commentsCount: number;
  viewCount: number;
  isLiked: boolean;
  isFollowingAuthor?: boolean;
}

// Mapper from Backend API shape to UIPost
export const mapBackendToUIPost = (bp: any): UIPost => {
  let categorySlug: UIPost["category"] = "lainnya";
  const slug = bp.category?.slug;
  if (["jualan", "jasa", "info-lomba", "lowongan-pekerjaan"].includes(slug)) {
    categorySlug = slug as UIPost["category"];
  }

  return {
    id: bp.id,
    name: bp.post_name || "",
    bannerImage: bp.banner_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    additionalImages: bp.images?.map((img: any) => 
      img.image_url.startsWith('http') ? img.image_url : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/storage/${img.image_url}`
    ) || [],
    description: bp.description || "",
    category: categorySlug,
    createdAt: bp.created_at || new Date().toISOString(),
    authorId: bp.user?.id || "",
    authorName: bp.user?.name || "Anonymous",
    authorEmail: bp.user?.email || "",
    authorAvatar: bp.user?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${bp.user?.name || "Anon"}`,
    authorUsername: bp.user?.username || "",
    authorPhoneNumber: bp.user?.profile?.phone_number || bp.authorPhoneNumber || "",
    likesCount: bp.likes_count ?? 0,
    commentsCount: bp.comments_count ?? 0,
    viewCount: bp.view_count ?? 0,
    isLiked: bp.is_liked ?? false,
    isFollowingAuthor: bp.user?.is_following ?? false,
  };
};

export const fetchPostsData = async (params?: { search?: string; category_id?: string; user_id?: string }) => {
  // In Laravel standard paginated format or global response
  const response = await api.get<any[]>("/posts", params);
  
  // Handle if it is array under data or custom paginated
  const rawPosts = Array.isArray(response.data) 
    ? response.data 
    : (response.data as any)?.data || [];
    
  return rawPosts.map(mapBackendToUIPost);
};

export const useGetPosts = (params?: { search?: string; category_id?: string; user_id?: string }) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPostsData(params),
  });
};

export const useGetPost = (id?: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) throw new Error("Post ID is required");
      const response = await api.get<any>(`/posts/${id}`);
      return mapBackendToUIPost(response.data);
    },
    enabled: !!id,
  });
};

export const fetchCategories = async () => {
  const response = await api.get<any[]>("/categories");
  return response.data || [];
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Use raw axiosInstance for multipart upload
      const response = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Postingan berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useUpdatePost = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Laravel requires POST with _method=PUT for multipart/form-data update
      formData.append("_method", "PUT");
      const response = await axiosInstance.post(`/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Postingan berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Postingan berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Also invalidate user profile since it might have stats or recent posts
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useToggleLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post<any, any>(`/posts/${postId}/like`, {});
      return response.data;
    },
    onSuccess: () => {
      // Invalidate both lists and specific post detail to sync likes
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export interface UIComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await api.get<any[]>(`/posts/${postId}/comments`);
      const rawComments = response.data || [];
      return rawComments.map((c: any) => ({
        id: c.id,
        content: c.content,
        createdAt: c.created_at,
        user: {
          id: c.user?.id || "",
          name: c.user?.name || "Anonymous",
          avatar: c.user?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.user?.name || "Anon"}`,
        },
      }));
    },
    enabled: !!postId,
  });
};

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      return api.post(`/posts/${postId}/comments`, { content });
    },
    onSuccess: () => {
      toast.success("Komentar ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      return api.delete(`/posts/${postId}/comments/${commentId}`);
    },
    onSuccess: () => {
      toast.success("Komentar dihapus!");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useSubmitReport = (postId: string) => {
  return useMutation({
    mutationFn: async (data: { reason: string; additional_info?: string }) => {
      return api.post(`/posts/${postId}/report`, data);
    },
    onSuccess: () => {
      toast.success("Laporan berhasil dikirim. Kami akan segera meninjaunya.");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};
