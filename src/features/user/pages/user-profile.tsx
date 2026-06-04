import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/features/post/components/post-card";
import { FollowButton } from "@/features/user/components/follow-button";
import { ReportModal } from "@/features/report/components/report-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Globe,
  MapPin,
  Phone,
  MessageCircle,
  Flag,
  Loader2,
  Users,
  UserPlus,
  FileText,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  CalendarDays,
  BookOpen,
  Calendar,
  Building,
  User as UserIcon,
} from "lucide-react";
import {
  useGetFollowers,
  useGetFollowing,
  useUserProfile,
} from "../api/use-user";
import type { User } from "../types/user-type";
import { useGetPosts, type UIPost } from "@/features/post/api/use-posts";

// Helper function to resolve legacy database mapping safely
const getProfileValue = (user: User, key: keyof NonNullable<User["profile"]>) => {
  const aliases: Partial<Record<keyof NonNullable<User["profile"]>, string[]>> = {
    instagram: ["instagram_url"],
    website: ["website_url"],
    phone_number: ["phone"],
  };

  return (
    user.profile?.[key] ||
    aliases[key]?.map((alias) => user.profile?.[alias as keyof NonNullable<User["profile"]>]).find(Boolean) ||
    (user as any)[key]
  );
};

// High-fidelity Loading Screen using Skeletons
function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded-xl" />
      {/* Profile Card Skeleton */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="h-40 bg-gray-200" />
        <div className="p-6 sm:p-8 relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 border-4 border-white -mt-20 ml-4 shrink-0" />
          <div className="mt-4 space-y-3 pl-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// Reusable empty state component
function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}) {
  return (
    <Card className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl">
      <CardContent className="p-12 text-center max-w-sm mx-auto flex flex-col items-center">
        <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-2xl mb-4 text-gray-400 shrink-0">
          <Icon className="w-7 h-7 text-blue-600/70" />
        </div>
        <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

// Redesigned User Connections List Component (Followers & Following Grid)
function UserList({
  users,
  emptyTitle,
  emptyDescription,
  currentUserId,
}: {
  users: User[];
  emptyTitle: string;
  emptyDescription: string;
  currentUserId?: string;
}) {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {users.map((user) => {
        const avatar = getProfileValue(user, "avatar");
        const isFollowing = Boolean((user as any).is_following || (user as any).pivot);

        return (
          <Card key={user.id} className="overflow-hidden border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <Link to={`/users/${user.username}`} className="flex items-center gap-3.5 min-w-0 group/user">
                <Avatar className="w-12 h-12 ring-2 ring-gray-50 shrink-0 group-hover/user:ring-blue-100 transition-all">
                  <AvatarImage src={avatar} alt={user.name} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-semibold">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 truncate group-hover/user:text-blue-600 transition-colors text-sm sm:text-base">
                    {user.name}
                  </h4>
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
              {currentUserId !== user.id && (
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  <FollowButton
                    userId={user.id}
                    isFollowing={isFollowing}
                    size="sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Hook-based API fetching
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError,
  } = useUserProfile(username);
  const { data: userPosts = [], isLoading: isPostsLoading } = useGetPosts({ user_id: profileData?.user?.id });
  const { data: followers = [], isLoading: isFollowersLoading } = useGetFollowers(username);
  const { data: following = [], isLoading: isFollowingLoading } = useGetFollowing(username);

  const isLoading = isProfileLoading || isPostsLoading || isFollowersLoading || isFollowingLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (isError || !profileData?.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4">
          <Users className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil Tidak Ditemukan</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pengguna yang Anda cari mungkin tidak ada atau telah menonaktifkan akun mereka.
        </p>
        <Button onClick={() => navigate(-1)} className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700">
          Kembali ke Halaman Sebelumnya
        </Button>
      </div>
    );
  }

  const { user: profileUser, statistics } = profileData;
  const isOwnProfile = currentUser?.id === profileUser.id;
  
  // Custom metadata fields resolution
  const avatar = getProfileValue(profileUser, "avatar");
  const bio = getProfileValue(profileUser, "bio");
  const phoneNumber = getProfileValue(profileUser, "phone_number");
  const instagram = getProfileValue(profileUser, "instagram");
  const website = getProfileValue(profileUser, "website");
  const address = getProfileValue(profileUser, "address");
  const isFollowing = Boolean(statistics.is_following);

  const is_mahasiswa = Boolean(profileUser.profile?.is_mahasiswa);
  const instansi = profileUser.profile?.instansi;
  const fakultas = is_mahasiswa ? profileUser.profile?.fakultas : null;
  const jurusan = is_mahasiswa ? profileUser.profile?.jurusan : null;
  const angkatan = is_mahasiswa ? profileUser.profile?.angkatan : null;
  const gender = profileUser.profile?.gender;
  const tanggal_lahir = profileUser.profile?.tanggal_lahir;
  const alamat = profileUser.profile?.alamat || address;

  const hasAdditionalInfo = Boolean(fakultas || jurusan || angkatan || instansi || gender || tanggal_lahir || alamat);

  const handleWhatsAppContact = () => {
    if (!phoneNumber) return;
    const message = encodeURIComponent(
      `Halo ${profileUser.name}, saya menemukan profil Anda di InfoIndi.`,
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="gap-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 rounded-xl"
        size="sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Button>

      {/* Profile Header Overhaul ( LinkedIn / Twitter Banner split ) */}
      <Card className="overflow-hidden border-gray-100 shadow-xl shadow-gray-200/20 rounded-3xl bg-white">
        {/* Banner Grid Header */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />
          {isOwnProfile && (
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-semibold flex items-center gap-1">
              <span>Profil Anda</span>
            </div>
          )}
        </div>

        {/* Profile Details Area */}
        <div className="p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-20 sm:-mt-24 mb-6">
            {/* Avatar block overlapping banner */}
            <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-white shadow-lg ring-4 ring-gray-100/30 shrink-0 mx-auto sm:mx-0">
              <AvatarImage src={avatar} alt={profileUser.name} className="object-cover" />
              <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                {profileUser.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            {/* Direct action triggers (Follow, Report) */}
            {!isOwnProfile && (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FollowButton
                  userId={profileUser.id}
                  isFollowing={isFollowing}
                  size="default"
                />
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => setReportModalOpen(true)}
                  className="gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Flag className="w-4 h-4" />
                  Laporkan
                </Button>
              </div>
            )}
          </div>

          {/* User Details & Metadata */}
          <div className="text-center sm:text-left space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {profileUser.name}
                </h1>
                <Badge variant="secondary" className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-50 shrink-0">
                  {profileUser.profile?.is_mahasiswa ? 'Mahasiswa' : 'Umum'}
                </Badge>
                {profileUser.username && (
                  <span className="text-sm text-gray-400 font-medium">@{profileUser.username}</span>
                )}
              </div>
              
              {bio && (
                <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {bio}
                </p>
              )}
            </div>

            {/* Contact details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-500 pt-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{profileUser.email}</span>
              </div>
              
              {phoneNumber && (
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{phoneNumber}</span>
                </div>
              )}
              
              {instagram && (
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-gray-400 font-bold w-4 text-center shrink-0">@</span>
                  <a
                    href={`https://instagram.com/${String(instagram).replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline font-medium"
                  >
                    {instagram}
                  </a>
                </div>
              )}
              
              {website && (
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                  <a
                    href={String(website).startsWith("http") ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 hover:underline font-medium"
                  >
                    {website}
                  </a>
                </div>
              )}
              
              {address && (
                <div className="flex items-center justify-center sm:justify-start gap-2.5 col-span-full">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>

            {/* Additional Info Section */}
            {hasAdditionalInfo && (
              <div className="pt-2 flex flex-col items-center sm:items-start">
                <Button
                  variant="ghost"
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                  className="text-gray-500 hover:text-blue-600 gap-2 h-8 px-3 rounded-lg text-xs sm:text-sm font-semibold"
                >
                  {showMoreInfo ? (
                    <>Sembunyikan Informasi Tambahan <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Lihat Selengkapnya <ChevronDown className="w-4 h-4" /></>
                  )}
                </Button>

                {showMoreInfo && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-500 pt-4 mt-2 border-t border-gray-100 w-full text-left">
                    {is_mahasiswa && instansi && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <Building className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Instansi:</span> {instansi}</span>
                      </div>
                    )}
                    {fakultas && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Fakultas:</span> {fakultas}</span>
                      </div>
                    )}
                    {jurusan && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Jurusan:</span> {jurusan}</span>
                      </div>
                    )}
                    {angkatan && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <CalendarDays className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Angkatan:</span> {angkatan}</span>
                      </div>
                    )}
                    {gender && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <UserIcon className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Gender:</span> {gender === 'laki-laki' ? 'Laki-laki' : gender === 'perempuan' ? 'Perempuan' : 'Tidak memberitahu'}</span>
                      </div>
                    )}
                    {tanggal_lahir && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Tanggal Lahir:</span> {new Date(tanggal_lahir).toLocaleDateString('id-ID')}</span>
                      </div>
                    )}
                    {alamat && (
                      <div className="flex items-center justify-center sm:justify-start gap-2.5 col-span-full">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        <span><span className="font-medium text-gray-700">Alamat:</span> {alamat}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Redesigned statistics card row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          {
            title: "Postingan",
            value: statistics.total_posts || userPosts.length,
            icon: FileText,
            iconBg: "bg-blue-50 text-blue-600",
          },
          {
            title: "Suka Diterima",
            value: statistics.total_likes || 0,
            icon: Heart,
            iconBg: "bg-rose-50 text-rose-600",
          },
          {
            title: "Pengikut",
            value: statistics.followers_count || followers.length,
            icon: Users,
            iconBg: "bg-purple-50 text-purple-600",
          },
          {
            title: "Mengikuti",
            value: statistics.following_count || following.length,
            icon: UserPlus,
            iconBg: "bg-emerald-50 text-emerald-600",
          },
        ].map((stat, i) => (
          <Card 
            key={i} 
            className="overflow-hidden border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                    {stat.title}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight font-mono">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.iconBg} shadow-inner shrink-0`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* WhatsApp Connection Banner */}
      {!isOwnProfile && phoneNumber && (
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/10 rounded-3xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1">
                  Tertarik untuk berkolaborasi?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-50/90 max-w-md leading-relaxed">
                  Hubungi {profileUser.name} untuk bertransaksi barang jualan, negosiasi penyewaan jasa, atau mendiskusikan info lomba.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
                <FollowButton
                  userId={profileUser.id}
                  isFollowing={isFollowing}
                  size="lg"
                />
                <Button
                  onClick={handleWhatsAppContact}
                  size="lg"
                  className="gap-2 rounded-2xl bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-6 shadow-md transition-all active:scale-95 border-none"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                  Chat WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-100/85 p-1.5 rounded-2xl border border-gray-200/40 inline-flex w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            { value: "posts", label: "Postingan", count: userPosts.length },
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

        {/* Post List */}
        <TabsContent value="posts" className="outline-none">
          {userPosts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="Belum Ada Postingan"
              description="Pengguna ini belum mempublikasikan postingan apa pun di platform InfoIndi saat ini."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post: UIPost) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Followers List */}
        <TabsContent value="followers" className="outline-none">
          <UserList
            users={followers}
            emptyTitle="Belum Memiliki Pengikut"
            emptyDescription="Daftar pengikut pengguna ini akan secara otomatis tampil di halaman ini."
            currentUserId={currentUser?.id}
          />
        </TabsContent>

        {/* Following List */}
        <TabsContent value="following" className="outline-none">
          <UserList
            users={following}
            emptyTitle="Belum Mengikuti Siapa pun"
            emptyDescription="Daftar pengguna yang diikuti oleh akun ini akan secara otomatis tampil di sini."
            currentUserId={currentUser?.id}
          />
        </TabsContent>
      </Tabs>

      {/* Interactive Abuse/Spam Report Modal */}
      {!isOwnProfile && (
        <ReportModal
          open={reportModalOpen}
          onOpenChange={setReportModalOpen}
          type="user"
          itemId={profileUser.id}
          itemName={profileUser.name}
        />
      )}
    </div>
  );
}
