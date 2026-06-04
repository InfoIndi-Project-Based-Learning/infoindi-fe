import React from "react";
import type { UIPost } from "../api/use-posts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "./like-button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: UIPost;
}

export function PostCard({ post }: PostCardProps) {
  const getPlainText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const categoryColors: Record<string, string> = {
    "jualan": "bg-blue-100 text-blue-800",
    "jasa": "bg-green-100 text-green-800",
    "info-lomba": "bg-purple-100 text-purple-800",
    "lowongan-pekerjaan": "bg-orange-100 text-orange-800",
    "lainnya": "bg-gray-100 text-gray-800",
  };

  return (
    <Link to={`/post/${post.id}`} className="block group h-full">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
          <img
            src={post.bannerImage}
            alt={post.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge className={categoryColors[post.category] || categoryColors.lainnya}>
                  {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500 shrink-0">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.name}
              </h3>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {getPlainText(post.description)}
              </p>
            </CardContent>
          </div>
          <CardFooter className="pt-3 pb-4 flex items-center justify-between border-t border-gray-100/50 mt-auto">
            <Link
              to={`/users/${post.authorUsername}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{post.authorName}</span>
              </div>
            </Link>
            <LikeButton
              postId={post.id}
              initialLikeCount={post.likesCount}
              initialLiked={post.isLiked}
              size="sm"
            />
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

