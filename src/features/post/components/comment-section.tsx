import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Send, Trash2, Loader2, MessageSquare, AlertCircle } from "lucide-react";
import { useGetComments, useCreateComment, useDeleteComment } from "../api/use-posts";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user: currentUser } = useAuthStore();
  const [newComment, setNewComment] = useState("");
  const currentUserName = currentUser?.name || "Pengguna";
  const currentUserAvatar =
    currentUser?.profile?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName}`;

  const { data: comments = [], isLoading } = useGetComments(postId);
  const createComment = useCreateComment(postId);
  const deleteComment = useDeleteComment(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Komentar tidak boleh kosong");
      return;
    }

    createComment.mutate(newComment.trim(), {
      onSuccess: () => {
        setNewComment("");
      }
    });
  };

  const handleDelete = (commentId: string) => {
    deleteComment.mutate(commentId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
        <MessageSquare className="w-5 h-5 text-indigo-500" />
        Diskusi & Komentar ({comments.length})
      </h3>

      {/* Comment Form */}
      {currentUser?.id ? (
        <form onSubmit={handleSubmit} className="flex gap-4 items-start">
          <Avatar className="w-10 h-10 ring-2 ring-indigo-50 shrink-0 border border-white">
            <AvatarImage 
              src={currentUserAvatar} 
              alt={currentUserName} 
            />
            <AvatarFallback>{currentUserName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar atau tanyakan sesuatu secara sopan..."
              className="min-h-[85px] bg-slate-50/40 resize-none border-slate-200/80 rounded-xl focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 text-sm leading-relaxed"
              disabled={createComment.isPending}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all duration-200"
                disabled={createComment.isPending}
              >
                {createComment.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                Kirim Komentar
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400" />
          Silakan masuk terlebih dahulu untuk ikut berdiskusi.
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-3 pt-2">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200/60">
            <p className="text-sm text-slate-400 italic font-medium">Belum ada komentar diskusi.</p>
            <p className="text-xs text-slate-300 mt-1">Jadilah yang pertama untuk memulai percakapan!</p>
          </div>
        ) : (
          comments.map((comment) => {
            const commentUserName = comment.user?.name || "Pengguna";
            const commentUserAvatar =
              comment.user?.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentUserName}`;

            return (
              <div key={comment.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 hover:border-slate-200/60 transition-all duration-300">
                <Avatar className="w-9 h-9 ring-2 ring-slate-100 shrink-0 border border-white">
                  <AvatarImage src={commentUserAvatar} alt={commentUserName} />
                  <AvatarFallback>{commentUserName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">{commentUserName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                      {(currentUser?.id === comment.user?.id || currentUser?.role === 'admin') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          onClick={() => handleDelete(comment.id)}
                          disabled={deleteComment.isPending}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
