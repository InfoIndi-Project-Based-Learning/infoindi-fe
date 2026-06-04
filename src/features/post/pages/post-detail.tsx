import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { FollowButton } from '@/features/user/components/follow-button';
import { LikeButton } from '@/features/post/components/like-button';
import { CommentSection } from '@/features/post/components/comment-section';
import { ReportModal } from '@/features/report/components/report-modal';
import { ArrowLeft, Calendar, MessageCircle, MessageSquare, Eye, Flag, Loader2, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useGetPost } from '../api/use-posts';
import useAuthStore from '@/features/auth/hooks/use-auth-store';
import { toast } from 'sonner';
import "quill/dist/quill.snow.css";
import { FaWhatsapp } from 'react-icons/fa';

export function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [reportModalOpen, setReportModalOpen] = useState(false);

    const { user: currentUser } = useAuthStore();
    const { data: post, isLoading, error } = useGetPost(id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                <span className="text-sm font-medium text-slate-600">Memuat detail postingan...</span>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen flex items-center justify-center">
                <Card className="max-w-md w-full border-slate-200/60 shadow-xl p-8 text-center bg-white/90 backdrop-blur rounded-3xl">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Postingan Tidak Ditemukan</h1>
                    <p className="text-slate-500 text-sm mb-6">Mungkin postingan ini telah dihapus oleh penulis atau tidak pernah ada.</p>
                    <Button 
                        onClick={() => navigate('/')}
                        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Beranda
                    </Button>
                </Card>
            </div>
        );
    }

    const categoryColors: Record<string, string> = {
        "jualan": 'bg-blue-50 text-blue-600 border border-blue-100',
        "jasa": 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        "info-lomba": 'bg-indigo-50 text-indigo-600 border border-indigo-100',
        "lowongan-pekerjaan": 'bg-amber-50 text-amber-600 border border-amber-100',
        "lainnya": 'bg-slate-50 text-slate-600 border border-slate-100'
    };

    const handleContactAuthor = () => {
        const phoneNumber = post.authorPhoneNumber || '1234567890';
        const message = encodeURIComponent(`Halo ${post.authorName}, saya tertarik dengan postingan Anda di InfoIndi: "${post.name}"`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleSharePost = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Tautan postingan berhasil disalin!");
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Top Toolbar */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)} 
                    className="group flex items-center gap-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Kembali</span>
                </Button>

                <Button 
                    variant="outline" 
                    onClick={handleSharePost}
                    className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 text-sm gap-2 font-medium"
                >
                    <Share2 className="w-4 h-4" />
                    Bagikan
                </Button>
            </div>

            {/* Main Content Container */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
                
                {/* Unified Single Card for Post Content */}
                <div className="bg-white border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                    
                    {/* Centered Banner Image (object-contain with soft background) */}
                    <div className="w-full h-[240px] sm:h-[350px] md:h-[400px] bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100/80">
                        <img
                            src={post.bannerImage}
                            alt={post.name}
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-sm"
                        />
                    </div>

                    {/* Post Body */}
                    <div className="p-6 sm:p-8 md:p-10 space-y-6">
                        
                        {/* Author Profile Row & Meta Info (Unified Editorial Header) */}
                        <div className="flex items-center justify-between gap-4 pb-1">
                            <div className="flex items-center gap-3">
                                <Link to={`/users/${post.authorUsername}`} className="relative shrink-0">
                                    <Avatar className="w-10 h-10 ring-2 ring-indigo-50 border border-white hover:opacity-90 transition-opacity">
                                        <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                                        <AvatarFallback className="text-sm bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-bold">{post.authorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-indigo-500 text-white border border-white flex items-center justify-center shadow">
                                        <CheckCircle2 className="w-2 h-2" />
                                    </span>
                                </Link>
                                
                                <div>
                                    <Link to={`/users/${post.authorUsername}`} className="hover:text-indigo-600 transition-colors">
                                        <h3 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">{post.authorName}</h3>
                                    </Link>
                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mt-0.5">
                                        <Badge className={`rounded-full px-2 py-0 text-[10px] font-semibold scale-90 -ml-1 ${categoryColors[post.category] || categoryColors.lainnya}`}>
                                            {post.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </Badge>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 -mt-0.5" />
                                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {String(post.authorId) !== String(currentUser?.id) && (
                                <div className="shrink-0 scale-90">
                                    <FollowButton userId={post.authorId} isFollowing={post.isFollowingAuthor} />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {post.name}
                            </h1>
                        </div>

                        {/* Minimalist Action & Stats Bar (Divided by borders) */}
                        <div className="flex items-center justify-between border-y border-slate-100 py-3.5 flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <LikeButton postId={post.id} initialLikeCount={post.likesCount} initialLiked={post.isLiked} />
                                
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-slate-500 text-xs font-semibold">
                                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                    {post.commentsCount}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={handleSharePost}
                                    className="gap-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl text-xs font-semibold"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                    Bagikan
                                </Button>

                                {String(post.authorId) !== String(currentUser?.id) && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setReportModalOpen(true)}
                                        className="gap-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold"
                                    >
                                        <Flag className="w-3.5 h-3.5" />
                                        Laporkan
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Rich-Text Description */}
                        <div className="pt-2">
                            <div className="text-slate-700">
                                <div 
                                    className="rich-text-content ql-editor ql-snow"
                                    style={{ padding: 0, minHeight: 'auto', border: 'none', fontFamily: 'inherit' }}
                                    dangerouslySetInnerHTML={{ __html: post.description }} 
                                />
                            </div>
                        </div>

                        {/* Additional Images Grid */}
                        {post.additionalImages && post.additionalImages.length > 0 && (
                            <div className="border-t border-slate-100 pt-6">
                                <h3 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2 tracking-wide uppercase">
                                    <Sparkles className="w-4 h-4 text-indigo-500" />
                                    Gambar Pendukung
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {post.additionalImages.map((image: string, index: number) => (
                                        <div 
                                            key={index} 
                                            className="aspect-video bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300 group cursor-pointer"
                                            onClick={() => window.open(image, '_blank')}
                                        >
                                            <img
                                                src={image}
                                                alt={`Gambar tambahan ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Premium Bottom WhatsApp CTA Banner inside Card */}
                        <div className="border-t border-slate-100 pt-6">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 justify-center sm:justify-start">
                                        <FaWhatsapp className="w-5 h-5 text-emerald-600 shrink-0" />
                                        Hubungi {post.authorName}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                                        Tertarik dengan postingan ini? Kirim pesan langsung ke WhatsApp penulis untuk diskusi lebih lanjut.
                                    </p>
                                </div>
                                <Button
                                    onClick={handleContactAuthor}
                                    className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-2 px-5 py-2.5 transition-all shadow-none"
                                >
                                    <FaWhatsapp className="w-4.5 h-4.5" />
                                    Hubungi via WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Section Card */}
                <div className="bg-white border border-slate-200/60 shadow-sm rounded-3xl p-6 sm:p-8">
                    <CommentSection postId={post.id} />
                </div>
            </div>

            {/* Custom Styles for Quill Rendered Typography */}
            <style>{`
                .ql-editor {
                    font-family: inherit;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: #334155;
                }
                .ql-editor h1 { font-size: 1.45rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.6rem; color: #0f172a; border-bottom: none; }
                .ql-editor h2 { font-size: 1.3rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.6rem; color: #0f172a; border-bottom: none; }
                .ql-editor h3 { font-size: 1.15rem; font-weight: 700; margin-top: 1.1rem; margin-bottom: 0.4rem; color: #1e293b; }
                .ql-editor p { margin-bottom: 0.875rem; }
                .ql-editor ul, .ql-editor ol {
                    margin-bottom: 0.875rem;
                    padding-left: 1.5rem !important;
                }
                .ql-editor li {
                    margin-bottom: 0.375rem;
                }
                .ql-editor blockquote { 
                    border-left: 4px solid #6366f1; 
                    padding-left: 1rem; 
                    font-style: italic; 
                    color: #475569;
                    background-color: #f8fafc;
                    padding-top: 8px;
                    padding-bottom: 8px;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    border-radius: 0 8px 8px 0;
                }
                .ql-editor a { color: #4f46e5; text-decoration: underline; font-weight: 500; }
                .ql-editor code { background-color: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 0.375rem; font-size: 0.875em; color: #0f172a; font-family: monospace; }
                .ql-editor pre {
                    background-color: #0f172a;
                    color: #f8fafc;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    font-family: monospace;
                    font-size: 0.875em;
                    overflow-x: auto;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
            `}</style>

            {/* Report Modal Component */}
            <ReportModal
                open={reportModalOpen}
                onOpenChange={setReportModalOpen}
                type="post"
                itemId={post.id}
                itemName={post.name}
            />
        </div>
    );
}

