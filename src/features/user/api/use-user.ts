import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { mapBackendToUIPost, type UIPost } from "@/features/post/api/use-posts";
import type { User } from "../types/user-type";

export interface UserProfileData {
  user: User;
  statistics: {
    total_posts: number;
    total_likes?: number;
    followers_count: number;
    following_count: number;
    is_following?: boolean;
  };
  recent_posts: UIPost[];
}

const unwrapApiData = <T,>(response: any): T => {
  return response?.data?.data ?? response?.data ?? response;
};

export const useUserProfile = (username?: string | number) => {
  return useQuery({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      if (!username) throw new Error("Username is required");
      const response = await api.get<any>(`/users/${username}/profile`);
      const payload = unwrapApiData<any>(response);
      const user = payload?.user ?? payload;
      
      const rawPosts = payload?.recent_posts || [];
      const recentPosts = rawPosts.map(mapBackendToUIPost);
      
      return {
        user,
        statistics: {
          total_posts: payload?.total_posts ?? payload?.posts_count ?? 0,
          total_likes: payload?.total_likes ?? payload?.likes_count ?? 0,
          followers_count: payload?.followers_count ?? 0,
          following_count: payload?.following_count ?? 0,
          is_following: payload?.is_following ?? false
        },
        recent_posts: recentPosts
      } as UserProfileData;
    },
    enabled: !!username,
  });
};

export const useFollowUser = (userId?: string, targetIdentifier?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!userId || !targetIdentifier) throw new Error("User ID and target identifier are required");
      return api.post<any, any>(`/users/${userId}/follow/${targetIdentifier}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", targetIdentifier] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", targetIdentifier] });
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
    }
  });
};

export const useUnfollowUser = (userId?: string, targetIdentifier?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!userId || !targetIdentifier) throw new Error("User ID and target identifier are required");
      return api.post<any, any>(`/users/${userId}/unfollow/${targetIdentifier}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", targetIdentifier] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", targetIdentifier] });
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
    }
  });
};

export const useGetFollowers = (username?: string | number) => {
  return useQuery({
    queryKey: ["followers", username],
    queryFn: async () => {
      const response = await api.get<any[]>(`/users/${username}/followers`);
      return unwrapApiData<any[]>(response) || [];
    },
    enabled: !!username,
  });
};

export const useGetFollowing = (username?: string | number) => {
  return useQuery({
    queryKey: ["following", username],
    queryFn: async () => {
      const response = await api.get<any[]>(`/users/${username}/following`);
      return unwrapApiData<any[]>(response) || [];
    },
    enabled: !!username,
  });
};

export const useGetLikedPosts = (username?: string | number) => {
  return useQuery({
    queryKey: ["liked-posts", username],
    queryFn: async () => {
      const response = await api.get<any[]>(`/users/${username}/liked-posts`);
      const rawPosts = unwrapApiData<any[]>(response) || [];
      return rawPosts.map(mapBackendToUIPost);
    },
    enabled: !!username,
  });
};

export interface DashboardData {
  profile: UserProfileData;
  myPosts: UIPost[];
  likedPosts: UIPost[];
  followers: any[];
  following: any[];
}

export const useDashboardData = (username?: string) => {
  return useQuery({
    queryKey: ["dashboard-data", username],
    queryFn: async () => {
      if (!username) throw new Error("Username is required");

      const [profileRes, myPostsRes, likedPostsRes, followersRes, followingRes] = await Promise.all([
        api.get<any>(`/users/${username}/profile`),
        api.get<any[]>("/posts", { user_id: username }), // Backend might need ID for filtering, but let's assume username support if profile does
        api.get<any[]>(`/users/${username}/liked-posts`),
        api.get<any[]>(`/users/${username}/followers`),
        api.get<any[]>(`/users/${username}/following`),
      ]);

      const profilePayload = unwrapApiData<any>(profileRes);
      const user = profilePayload?.user ?? profilePayload;
      const rawRecentPosts = profilePayload?.recent_posts || [];
      
      const profile: UserProfileData = {
        user,
        statistics: {
          total_posts: profilePayload?.total_posts ?? profilePayload?.posts_count ?? 0,
          total_likes: profilePayload?.total_likes ?? profilePayload?.likes_count ?? 0,
          followers_count: profilePayload?.followers_count ?? 0,
          following_count: profilePayload?.following_count ?? 0,
          is_following: profilePayload?.is_following ?? false
        },
        recent_posts: rawRecentPosts.map(mapBackendToUIPost)
      };

      const rawMyPosts = Array.isArray(myPostsRes.data) ? myPostsRes.data : (myPostsRes.data as any)?.data || [];
      const myPosts = rawMyPosts.map(mapBackendToUIPost);
      
      const rawLikedPosts = unwrapApiData<any[]>(likedPostsRes) || [];
      const likedPosts = rawLikedPosts.map(mapBackendToUIPost);

      const followers = unwrapApiData<any[]>(followersRes) || [];
      const following = unwrapApiData<any[]>(followingRes) || [];

      return {
        profile,
        myPosts,
        likedPosts,
        followers,
        following
      } as DashboardData;
    },
    enabled: !!username,
    staleTime: 0,
  });
};
