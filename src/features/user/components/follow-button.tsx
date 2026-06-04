import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { useFollowUser, useUnfollowUser, useGetFollowing } from "../api/use-user";

interface FollowButtonProps {
  userId: string;
  isFollowing?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function FollowButton({
  userId,
  isFollowing = false,
  variant = "default",
  size = "default",
}: FollowButtonProps) {
  const navigate = useNavigate();
  const { user: currentUser, isAuth } = useAuthStore();

  // Fetch the list of users that the current logged-in user is following
  const { data: followingList = [], isLoading: isListLoading } = useGetFollowing(currentUser?.id);

  // Compute follow status dynamically based on target userId being in the following list
  const following = React.useMemo(() => {
    if (!isAuth || !currentUser?.id) return false;
    // Use prop isFollowing as placeholder while the network query is loading
    if (isListLoading) return isFollowing;
    return followingList.some((u: any) => String(u.id) === String(userId));
  }, [followingList, userId, currentUser?.id, isAuth, isListLoading, isFollowing]);

  const followUser = useFollowUser(currentUser?.id, userId);
  const unfollowUser = useUnfollowUser(currentUser?.id, userId);
  const isPending = followUser.isPending || unfollowUser.isPending;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth || !currentUser?.id) {
      toast.error("Silakan login untuk mengikuti pengguna.");
      navigate("/auth/login");
      return;
    }

    if (String(currentUser.id) === String(userId)) {
      toast.error("Anda tidak dapat mengikuti akun sendiri.");
      return;
    }

    const mutation = following ? unfollowUser : followUser;
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(following ? "Berhenti mengikuti pengguna." : "Berhasil mengikuti pengguna.");
      },
    });
  };

  return (
    <Button
      variant={following ? "outline" : variant}
      size={size}
      onClick={handleClick}
      disabled={isPending}
      className="gap-2"
    >
      {following ? (
        <>
          <UserCheck className="w-4 h-4" />
          Mengikuti
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          Ikuti
        </>
      )}
    </Button>
  );
}
