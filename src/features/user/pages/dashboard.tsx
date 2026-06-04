import React, { useState } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FollowButton } from "../components/follow-button";
import { PostCard } from "@/features/post/components/post-card";
import { 
  Edit, 
  Trash2, 
  Calendar, 
  Eye, 
  Heart, 
  Users, 
  Loader2, 
  Sparkles, 
  Plus, 
  MoreVertical, 
  FileText, 
  UserPlus, 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { useDashboardData } from "../api/use-user";
import { useDeletePost, type UIPost } from "@/features/post/api/use-posts";

// Skeleton Loading Component for perceived speed & clean transitions
function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse pb-20">
      {/* Banner Skeleton */}
      <div className="h-48 w-full bg-gray-200 rounded-3xl" />

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="h-10 w-80 bg-gray-100 rounded-xl" />

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="aspect-video bg-gray-200" />
            <div className="p-5 flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Gorgeous reusable Empty State Component
function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onClickAction,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onClickAction?: () => void;
}) {
  return (
    <Card className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl">
      <CardContent className="p-12 text-center max-w-md mx-auto flex flex-col items-center">
        <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-2xl mb-4 text-gray-400 shrink-0">
          <Icon className="w-8 h-8 text-blue-600/70" />
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
        
        {actionLink && (
          <Link to={actionLink}>
            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/25 transition-all">
              {actionText}
            </Button>
          </Link>
        )}
        
        {onClickAction && (
          <Button 
            onClick={onClickAction}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/25 transition-all"
          >
            {actionText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Custom Dashboard Post Card specifically for User's Own Posts with Edit/Delete in Dropdown
function MyPostCard({ 
  post, 
  onEdit, 
  onDelete, 
  isDeleting 
}: { 
  post: UIPost; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const getPlainText = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const categoryColors: Record<string, string> = {
    "jualan": "bg-blue-50 text-blue-700 border-blue-100",
    "jasa": "bg-emerald-50 text-emerald-700 border-emerald-100",
    "info-lomba": "bg-purple-50 text-purple-700 border-purple-100",
    "lowongan-pekerjaan": "bg-orange-50 text-orange-700 border-orange-100",
    "lainnya": "bg-gray-50 text-gray-700 border-gray-100",
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group border-gray-100 relative bg-white">
      {/* Absolute Actions Dropdown Trigger on top-right */}
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 shadow-md backdrop-blur-sm transition-all border border-gray-100/50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-40 bg-white border border-gray-100 shadow-lg rounded-xl p-1 z-20">
            <DropdownMenuItem
              className="gap-2 rounded-lg py-2 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(post.id);
              }}
            >
              <Edit className="w-4 h-4 text-blue-500" />
              <span>Edit Postingan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem
              className="gap-2 rounded-lg py-2 hover:bg-red-50 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(post.id);
              }}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              <span>Hapus Postingan</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link to={`/post/${post.id}`} className="flex-1 flex flex-col">
        {/* Banner Image */}
        <div className="aspect-video w-full overflow-hidden bg-gray-50 relative shrink-0">
          <img
            src={post.bannerImage}
            alt={post.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category Badge overlay on top-left */}
          <div className="absolute top-3 left-3">
            <Badge className={`px-2.5 py-1 text-xs font-semibold rounded-lg shadow-sm border ${categoryColors[post.category] || categoryColors.lainnya}`}>
              {post.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 flex flex-col justify-between p-5">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {post.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
              {getPlainText(post.description)}
            </p>
          </div>

          {/* Stats Footer inside Card */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-gray-400" />
                <span>{post.viewCount || 0} kali dilihat</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-gray-400" />
                <span>{post.likesCount || 0} suka</span>
              </span>
            </div>
            
            <div className="flex items-center gap-0.5 text-xs text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Detail</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user: currentUser, _hasHydrated } = useAuthStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("my-posts");

  const username = currentUser?.username || "";

  // Hook-based data fetching (Consolidated)
  const { data: dashboardData, isLoading: isLoadingDashboard } = useDashboardData(username);

  const myPosts = dashboardData?.myPosts || [];
  const likedPosts = dashboardData?.likedPosts || [];
  const followers = dashboardData?.followers || [];
  const following = dashboardData?.following || [];
  const profile = dashboardData?.profile;

  const deletePost = useDeletePost();

  const handleEdit = (postId: string) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePost.mutate(postToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setPostToDelete(null);
        }
      });
    }
  };

  // Modern contextual time-based greeting
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 11) return "Selamat pagi";
    if (hr < 15) return "Selamat siang";
    if (hr < 18) return "Selamat sore";
    return "Selamat malam";
  };

  // Micro-interaction: copy profile url to clipboard for sharing
  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/users/${currentUser?.username}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Tautan profil disalin! Silakan bagikan profil Anda.");
  };

  // Improved loading state management
  const isLoading = !_hasHydrated || (!!username && isLoadingDashboard && !dashboardData);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white p-6 sm:p-8 shadow-xl shadow-blue-600/10 border border-blue-500/10">
        {/* Decorative blur circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20 shadow-lg ring-4 ring-white/10 shrink-0">
              <AvatarImage 
                src={currentUser?.profile?.avatar} 
                alt={currentUser?.name} 
                className="object-cover" 
              />
              <AvatarFallback className="bg-white/10 text-white font-bold text-2xl">
                {currentUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] sm:text-xs bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold tracking-wider uppercase">
                  {new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}
                </span>
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {getGreeting()}, {currentUser?.name}!
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-md leading-relaxed">
                Akses semua postingan Anda, kelola aktivitas, dan jelajahi koneksi mahasiswa dalam satu platform terpadu.
              </p>
            </div>
          </div>
          
          <div className="shrink-0">
            <Link to="/create-post">
              <Button className="w-full sm:w-auto rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-6 text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95 border-none">
                <Plus className="w-4 h-4" />
                Buat Postingan Baru
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[
          {
            title: "Total Postingan",
            value: profile?.statistics.total_posts || 0,
            icon: FileText,
            desc: "Postingan Anda terbit",
            iconBg: "bg-blue-50 text-blue-600",
          },
          {
            title: "Disukai",
            value: likedPosts.length,
            icon: Heart,
            desc: "Postingan Anda sukai",
            iconBg: "bg-rose-50 text-rose-600",
          },
          {
            title: "Pengikut",
            value: followers.length,
            icon: Users,
            desc: "Pengguna mengikuti Anda",
            iconBg: "bg-purple-50 text-purple-600",
          },
          {
            title: "Mengikuti",
            value: following.length,
            icon: UserPlus,
            desc: "Pengguna Anda ikuti",
            iconBg: "bg-emerald-50 text-emerald-600",
          },
        ].map((stat, i) => (
          <Card 
            key={i} 
            className="overflow-hidden border-gray-100/80 hover:border-gray-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 bg-white"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight font-mono">
                    {stat.value}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">{stat.desc}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-inner shrink-0`}>
                  <stat.icon className="w-5.5 h-5.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/40 inline-flex w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { value: "my-posts", label: "Postingan Saya", count: myPosts.length },
            { value: "liked", label: "Disukai", count: likedPosts.length },
            { value: "followers", label: "Pengikut", count: followers.length },
            { value: "following", label: "Mengikuti", count: following.length },
          ].map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm inline-flex items-center gap-2"
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                activeTab === tab.value 
                  ? "bg-blue-50 text-blue-600" 
                  : "bg-gray-200/60 text-gray-500"
              }`}>
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* My Posts Tab */}
        <TabsContent value="my-posts" className="outline-none">
          {myPosts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="Postingan Anda Masih Kosong"
              description="Anda belum membagikan informasi apa pun. Mulai buat postingan untuk berjualan barang, menawarkan jasa, atau memberikan info lowongan & lomba!"
              actionText="+ Buat Postingan Pertama"
              actionLink="/create-post"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPosts.map((post: UIPost) => (
                <MyPostCard 
                  key={post.id} 
                  post={post} 
                  onEdit={handleEdit} 
                  onDelete={handleDeleteClick}
                  isDeleting={deletePost.isPending && postToDelete === post.id}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Liked Posts Tab */}
        <TabsContent value="liked" className="outline-none">
          {likedPosts.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Belum Ada Postingan Disukai"
              description="Ketika Anda menemukan postingan menarik di halaman Beranda atau Eksplor dan menyukainya, postingan tersebut akan otomatis tersimpan rapi di sini!"
              actionText="Eksplor Postingan Menarik"
              actionLink="/"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {likedPosts.map((post: UIPost) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Followers Tab */}
        <TabsContent value="followers" className="outline-none">
          {followers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Belum Memiliki Pengikut"
              description="Jangan berkecil hati! Bagikan postingan berkualitas tinggi, informatif, dan bermanfaat agar pengguna lain tertarik mengikuti akun Anda."
              actionText="Bagikan Tautan Profil"
              onClickAction={handleShareProfile}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {followers.map((follower: any) => (
                <Card key={follower.id} className="overflow-hidden border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <Link to={`/users/${follower.username}`} className="flex items-center gap-3.5 min-w-0 group/user">
                      <Avatar className="w-12 h-12 ring-2 ring-gray-50 shrink-0 group-hover/user:ring-blue-100 transition-all">
                        <AvatarImage src={follower.profile?.avatar} alt={follower.name} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-semibold">
                          {follower.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 truncate group-hover/user:text-blue-600 transition-colors text-sm sm:text-base">{follower.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="px-1.5 py-0 text-[10px] text-gray-500 rounded font-medium bg-gray-100 hover:bg-gray-100 shrink-0">
                            {follower.profile?.is_mahasiswa ? 'Mahasiswa' : 'Umum'}
                          </Badge>
                          {follower.username && (
                            <span className="text-[11px] text-gray-400 truncate">@{follower.username}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                      <FollowButton
                        userId={follower.id}
                        isFollowing={true}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following" className="outline-none">
          {following.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="Belum Mengikuti Siapa pun"
              description="Mulailah membangun jaringan jejaring Anda dengan mengikuti penjual, penyedia jasa terpercaya, atau akun mahasiswa inspiratif lainnya di platform ini!"
              actionText="Cari Pengguna Lain"
              actionLink="/"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {following.map((user: any) => (
                <Card key={user.id} className="overflow-hidden border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <Link to={`/users/${user.username}`} className="flex items-center gap-3.5 min-w-0 group/user">
                      <Avatar className="w-12 h-12 ring-2 ring-gray-50 shrink-0 group-hover/user:ring-blue-100 transition-all">
                        <AvatarImage src={user.profile?.avatar} alt={user.name} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-semibold">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 truncate group-hover/user:text-blue-600 transition-colors text-sm sm:text-base">{user.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="px-1.5 py-0 text-[10px] text-gray-500 rounded font-medium bg-gray-100 hover:bg-gray-100 shrink-0">
                            {user.profile?.is_mahasiswa ? 'Mahasiswa' : 'Umum'}
                          </Badge>
                          {user.username && (
                            <span className="text-[11px] text-gray-400 truncate">@{user.username}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                      <FollowButton
                        userId={user.id}
                        isFollowing={true}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white rounded-2xl max-w-md border border-gray-100 p-6 shadow-xl">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-xl font-bold text-gray-900">Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 leading-relaxed">
              Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Postingan Anda beserta statistik di dalamnya akan dihapus dari server selamanya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 mt-6">
            <AlertDialogCancel className="rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold transition-colors">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-md shadow-red-600/10 transition-colors"
            >
              Hapus Secara Permanen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
