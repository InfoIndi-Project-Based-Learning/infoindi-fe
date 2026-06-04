import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useToggleLike } from "@/features/post/api/use-posts";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: string;
  initialLiked?: boolean;
  initialLikeCount?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  showCount?: boolean;
}

export function LikeButton({
  postId,
  initialLiked = false,
  initialLikeCount = 0,
  variant = "ghost",
  size = "default",
  showCount = true,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const toggleLike = useToggleLike(postId);
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  // Sync state with props when query invalidates
  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      toast.error("Silakan login untuk menyukai postingan.");
      navigate("/auth/login");
      return;
    }

    // Optimistically toggle UI
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    toggleLike.mutate(undefined, {
      onError: () => {
        // Rollback on error
        setIsLiked(isLiked);
        setLikeCount(likeCount);
      },
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={toggleLike.isPending}
      className={`gap-2 ${isLiked ? "text-red-600" : ""}`}
    >
      {toggleLike.isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      )}
      {showCount && <span>{likeCount}</span>}
    </Button>
  );
}

