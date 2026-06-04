import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Flag,
  FolderKanban,
  TrendingUp,
  Activity,
  Loader2,
  Megaphone,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useAdminDashboard, useBroadcastNotification } from "../api/use-admin";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AdminDashboard() {
  const { data, isLoading, error } = useAdminDashboard();
  const broadcastMutation = useBroadcastNotification();

  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleSendBroadcast = () => {
    if (!broadcastTitle || !broadcastMessage) return;
    broadcastMutation.mutate(
      { title: broadcastTitle, message: broadcastMessage },
      {
        onSuccess: () => {
          setIsBroadcastOpen(false);
          setBroadcastTitle("");
          setBroadcastMessage("");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Memuat data dashboard admin...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border">
        <p className="text-red-500">Gagal memuat data dashboard. Pastikan Anda memiliki akses admin.</p>
      </div>
    );
  }

  const { counts, user_growth, posts_by_category, recent_activities } = data;

  const categoryColors: Record<string, string> = {
    product: "bg-blue-100 text-blue-800",
    service: "bg-green-100 text-green-800",
    podcast: "bg-purple-100 text-purple-800",
    event: "bg-orange-100 text-orange-800",
    other: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dasbor</h1>
        <p className="text-gray-600">Ringkasan performa platform Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Total Pengguna
            </CardTitle>
            <div className="p-2 bg-blue-50 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold mb-1 text-gray-900 tracking-tight">{counts.total_users}</div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {counts.active_users} aktif
              </span>
              <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {counts.banned_users} diblokir
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Total Postingan
            </CardTitle>
            <div className="p-2 bg-emerald-50 rounded-xl">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold mb-1 text-gray-900 tracking-tight">{counts.total_posts}</div>
            <p className="text-sm text-gray-500 font-medium">Postingan di seluruh platform</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Laporan Menunggu
            </CardTitle>
            <div className="p-2 bg-rose-50 rounded-xl">
              <Flag className="w-5 h-5 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold mb-1 text-gray-900 tracking-tight">{counts.pending_reports}</div>
            <p className="text-sm text-rose-600 font-medium flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Butuh peninjauan segera
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-gray-100 shadow-sm bg-white rounded-2xl group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Pertumbuhan Pengguna
            </CardTitle>
            <div className="p-2 bg-amber-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold mb-1 text-gray-900 tracking-tight">
              +{user_growth.length > 0 ? user_growth[user_growth.length - 1].new_users : 0}
            </div>
            <p className="text-sm text-gray-500 font-medium">Pengguna baru bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Pertumbuhan Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={user_growth.map((g: any) => ({ month: g.month, users: g.new_users }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Pengguna Baru"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aksi Cepat / Quick Actions */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Activity className="w-5 h-5 text-blue-600" />
              Aksi Cepat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <a href="/admin/users" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-100/50 text-blue-700 transition-colors">
                <Users className="w-6 h-6" />
                <span className="text-sm font-semibold">Kelola Pengguna</span>
              </a>
              <a href="/admin/reports" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-red-100 bg-red-50/50 hover:bg-red-100/50 text-red-700 transition-colors">
                <Flag className="w-6 h-6" />
                <span className="text-sm font-semibold">Tinjau Laporan</span>
              </a>
              <a href="/admin/categories" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/50 text-purple-700 transition-colors">
                <FolderKanban className="w-6 h-6" />
                <span className="text-sm font-semibold">Kategori Post</span>
              </a>

              <Dialog open={isBroadcastOpen} onOpenChange={setIsBroadcastOpen}>
                <DialogTrigger className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100/50 text-amber-700 transition-colors">
                  <Megaphone className="w-6 h-6" />
                  <span className="text-sm font-semibold">Pengumuman</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-amber-500" /> Kirim Pengumuman
                    </DialogTitle>
                    <DialogDescription>
                      Kirimkan notifikasi ke semua pengguna platform sekaligus.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Judul</label>
                      <Input
                        placeholder="Contoh: Pemeliharaan Server"
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                        className="rounded-xl border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Pesan Pengumuman</label>
                      <Textarea
                        placeholder="Tulis pesan Anda di sini..."
                        rows={4}
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="rounded-xl border-gray-200 resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsBroadcastOpen(false)} className="rounded-xl">Batal</Button>
                    <Button 
                      onClick={handleSendBroadcast} 
                      disabled={broadcastMutation.isPending || !broadcastTitle || !broadcastMessage}
                      className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/20 gap-2"
                    >
                      {broadcastMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className="w-4 h-4" />}
                      {broadcastMutation.isPending ? 'Mengirim...' : 'Kirim Sekarang'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="p-4 mt-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">Butuh Bantuan Admin?</h4>
                <p className="text-xs text-slate-300 mt-1">Cek panduan moderasi konten.</p>
              </div>
              <div className="bg-white/20 p-2 rounded-full">
                <Activity className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kontributor Teratas - Premium Redesign */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="p-2 bg-blue-100/50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            Top Kontributor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {recent_activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Users className="w-10 h-10 text-gray-200 mb-3" />
                <p className="text-gray-500 font-medium">Belum ada data kontributor.</p>
              </div>
            ) : (
              recent_activities.map((user: any, index: number) => (
                <div
                  key={user.user_id}
                  className="flex items-center gap-4 p-5 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="flex items-center justify-center w-8 font-bold text-lg text-gray-300 group-hover:text-blue-300 transition-colors">
                    #{index + 1}
                  </div>
                  <Avatar className="w-12 h-12 border-2 border-white shadow-sm ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all">
                    <AvatarImage
                      src={user.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-blue-50 text-blue-700 font-bold">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Postingan</span>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg px-3">
                        {user.total_posts}
                      </Badge>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Suka</span>
                      <Badge variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-none rounded-lg px-3">
                        {user.total_likes_received}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
