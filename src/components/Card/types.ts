export interface PostCardProps {
  imageUrl?: string;
  badge: string;
  title: string;
  likesCount: number;
  timeAgo: string;
  owner: string;
  onDetailClick?: () => void;
  onLikeClick?: () => void;
}