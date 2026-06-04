import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import type { User as UserType } from "../../user/types/user-type";
import api from "@/lib/api";
import axiosInstance from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, Sparkles, RefreshCw, User, Shield, Lock, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileSettings() {
  const { user, token, setAuth, removeAuth, _hasHydrated } = useAuthStore();
  const navigate = useNavigate();

  // Safely check role and profile completion
  const isProfileIncomplete = user?.role === "user" && !user?.is_profile_complete;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.profile?.bio || "",
    avatar: user?.profile?.avatar || "",
    instagram_url: user?.profile?.instagram_url || "",
    website_url: user?.profile?.website_url || "",
    phone: user?.profile?.phone || "",
    fakultas: user?.profile?.fakultas || "",
    jurusan: user?.profile?.jurusan || "",
    angkatan: user?.profile?.angkatan || "",
    gender: user?.profile?.gender || "",
    alamat: user?.profile?.alamat || "",
    tanggal_lahir: user?.profile?.tanggal_lahir || "",
    is_mahasiswa: user?.profile?.is_mahasiswa ?? false,
    instansi: user?.profile?.instansi || "",
  });
  const [activeTab, setActiveTab] = useState("profil");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  const [accountData, setAccountData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Sync state if store updates
  useEffect(() => {
    if (user?.id) {
      setFormData({
        name: user.name || "",
        bio: user.profile?.bio || "",
        avatar: user.profile?.avatar || "",
        instagram_url: user.profile?.instagram_url || "",
        website_url: user.profile?.website_url || "",
        phone: user.profile?.phone || "",
        fakultas: user.profile?.fakultas || "",
        jurusan: user.profile?.jurusan || "",
        angkatan: user.profile?.angkatan || "",
        gender: user.profile?.gender || "",
        alamat: user.profile?.alamat || "",
        tanggal_lahir: user.profile?.tanggal_lahir || "",
        is_mahasiswa: user.profile?.is_mahasiswa ?? false,
        instansi: user.profile?.instansi || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("profile[bio]", formData.bio);
      payload.append("profile[phone]", formData.phone);
      payload.append("profile[instagram_url]", formData.instagram_url);
      payload.append("profile[website_url]", formData.website_url);
      payload.append("profile[fakultas]", formData.fakultas);
      payload.append("profile[jurusan]", formData.jurusan);
      payload.append("profile[angkatan]", formData.angkatan);
      payload.append("profile[gender]", formData.gender);
      payload.append("profile[alamat]", formData.alamat);
      payload.append("profile[tanggal_lahir]", formData.tanggal_lahir);
      payload.append("profile[is_mahasiswa]", formData.is_mahasiswa ? "1" : "0");
      payload.append("profile[instansi]", formData.instansi);
      
      if (avatarFile) {
        payload.append("avatar", avatarFile);
      } else if (formData.avatar && !formData.avatar.startsWith("blob:")) {
        payload.append("profile[avatar]", formData.avatar);
      }

      payload.append("_method", "PUT");

      const response = await axiosInstance.post(`/users/${user.id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data.data;
      setAuth(token, updatedUser);
      toast.success("Profil berhasil diperbarui!");
      
      // If they just completed their profile, send them to dashboard
      if (isProfileIncomplete && updatedUser.is_profile_complete) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    if (accountData.new_password !== accountData.new_password_confirmation) {
      toast.error("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await axiosInstance.put(`/users/${user.id}/password`, {
        current_password: accountData.current_password,
        new_password: accountData.new_password,
        new_password_confirmation: accountData.new_password_confirmation,
      });
      toast.success("Kata sandi berhasil diperbarui!");
      setAccountData({ current_password: "", new_password: "", new_password_confirmation: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal memperbarui kata sandi.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus akun? Semua data akan hilang secara permanen.");
    if (!confirmed) return;

    setIsDeletingAccount(true);
    try {
      await axiosInstance.delete(`/users/${user.id}`);
      toast.success("Akun berhasil dihapus.");
      removeAuth();
      navigate("/login", { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal menghapus akun.");
      setIsDeletingAccount(false);
    }
  };

  const handleReset = () => {
    if (!user) return;
    setFormData({
      name: user.name || "",
      bio: user.profile?.bio || "",
      avatar: user.profile?.avatar || "",
      instagram_url: user.profile?.instagram_url || "",
      website_url: user.profile?.website_url || "",
      phone: user.profile?.phone || "",
      fakultas: user.profile?.fakultas || "",
      jurusan: user.profile?.jurusan || "",
      angkatan: user.profile?.angkatan || "",
      gender: user.profile?.gender || "",
      alamat: user.profile?.alamat || "",
      tanggal_lahir: user.profile?.tanggal_lahir || "",
      is_mahasiswa: user.profile?.is_mahasiswa ?? false,
      instansi: user.profile?.instansi || "",
    });
    setAvatarFile(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  // Wait for hydration or missing critical data
  if (!_hasHydrated || !user?.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-gray-400">Memuat pengaturan profil...</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner requesting profile completion */}
        {isProfileIncomplete && (
          <div className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-900 rounded-2xl flex items-start gap-4 shadow-sm">
            <div>
              <h4 className="font-extrabold text-sm tracking-tight text-amber-800">Lengkapi Profil Anda</h4>
              <p className="text-xs text-amber-700/90 leading-relaxed mt-1.5 font-medium">
                Satu langkah lagi! Silakan lengkapi informasi profil Anda (Bio & Nomor WhatsApp) agar mahasiswa lain dapat menghubungi Anda terkait postingan Anda.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Pengaturan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola informasi identitas, preferensi, dan keamanan akun Anda.
            </p>
          </div>
          {user?.username && !isProfileIncomplete && (
            <Link to={`/users/${user.username}`}>
              <Button variant="outline" className="gap-2 rounded-xl h-10 border-gray-200 hover:bg-gray-50 font-semibold text-gray-700">
                <Eye className="w-4 h-4 text-gray-400" />
                Lihat Profil Publik
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar */}
          {!isProfileIncomplete && (
            <div className="w-full md:w-64 shrink-0 space-y-2 flex flex-col sticky top-24">
              <button
                onClick={() => setActiveTab("profil")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left ${
                  activeTab === "profil"
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="w-5 h-5" />
                Informasi Profil
              </button>
              <button
                onClick={() => setActiveTab("akun")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all text-left ${
                  activeTab === "akun"
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Shield className="w-5 h-5" />
                Informasi Akun
              </button>
            </div>
          )}

          <div className={`flex-1 w-full space-y-6 ${isProfileIncomplete ? 'md:max-w-3xl md:mx-auto' : ''}`}>
            {activeTab === "profil" && (
              <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-gray-100 shadow-xl shadow-gray-200/40 bg-white rounded-3xl overflow-hidden border">
            <CardHeader className="p-6 md:p-8 pb-4 border-b border-gray-50">
              <CardTitle className="text-xl font-bold text-gray-900">Pengaturan Akun</CardTitle>
              <CardDescription className="text-sm text-gray-400 mt-1">
                Data ini akan ditampilkan pada profil publik Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-7">
              {/* Avatar Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50/50 border border-gray-100 rounded-2xl">
                <Avatar className="w-20 h-20 ring-4 ring-white shadow-xl">
                  <AvatarImage src={formData.avatar} alt={formData.name} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600 uppercase">
                    {formData.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 w-full space-y-2.5">
                  <Label htmlFor="avatar" className="font-bold text-gray-700">Foto Profil Baru</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-[10px] text-gray-400 font-medium">
                    Format gambar (JPG, PNG). Maksimal ukuran 2MB disarankan.
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold text-gray-700 text-sm">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nama sesuai KTM"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                  required
                />
              </div>

              {/* Username & Email (Disabled) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-400 text-sm">Username</Label>
                  <Input
                    value={user?.username || ""}
                    className="rounded-xl border-gray-100 bg-gray-50 text-gray-400 h-11 cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-gray-400 text-sm">Email Kampus</Label>
                  <Input
                    value={user?.email || ""}
                    className="rounded-xl border-gray-100 bg-gray-50 text-gray-400 h-11 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="font-bold text-gray-700 text-sm">
                  Bio Singkat {isProfileIncomplete && <span className="text-rose-500">*</span>}
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Apa yang Anda tawarkan atau cari di InfoIndi?"
                  rows={4}
                  className="resize-none rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 p-4"
                  required={!!isProfileIncomplete}
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-bold text-gray-700 text-sm">
                  Nomor WhatsApp {isProfileIncomplete && <span className="text-rose-500">*</span>}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Contoh: 081234567890"
                  className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                  required={!!isProfileIncomplete}
                />
                <p className="text-[10px] text-gray-400 font-medium">
                  Nomor ini akan digunakan tombol "Hubungi Penjual".
                </p>
              </div>

              {/* Socials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram_url" className="font-bold text-gray-700 text-sm">URL Instagram</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_url}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram_url: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url" className="font-bold text-gray-700 text-sm">Website/Portofolio</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) =>
                      setFormData({ ...formData, website_url: e.target.value })
                    }
                    placeholder="https://..."
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-xl shadow-gray-200/40 bg-white rounded-3xl overflow-hidden border">
            <CardHeader className="p-6 md:p-8 pb-4 border-b border-gray-50">
              <CardTitle className="text-xl font-bold text-gray-900">Informasi Tambahan</CardTitle>
              <CardDescription className="text-sm text-gray-400 mt-1">
                Lengkapi profil Anda untuk memudahkan koneksi sesama mahasiswa.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-7">
              {/* Tipe Akun & Tanggal Lahir */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700 text-sm">Tipe Akun</Label>
                  <Select
                    value={formData.is_mahasiswa ? "mahasiswa" : "umum"}
                    onValueChange={(value) => setFormData({ ...formData, is_mahasiswa: value === "mahasiswa" })}
                  >
                    <SelectTrigger className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11 bg-white text-gray-900">
                      <SelectValue placeholder="Pilih Tipe Akun" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                      <SelectItem value="umum">Umum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal_lahir" className="font-bold text-gray-700 text-sm">Tanggal Lahir (Opsional)</Label>
                  <Input
                    id="tanggal_lahir"
                    type="date"
                    value={formData.tanggal_lahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tanggal_lahir: e.target.value })
                    }
                    className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                  />
                </div>
              </div>

              {formData.is_mahasiswa && (
                <>
                  {/* Instansi */}
                  <div className="space-y-2">
                    <Label htmlFor="instansi" className="font-bold text-gray-700 text-sm">Instansi / Universitas</Label>
                    <Input
                      id="instansi"
                      value={formData.instansi}
                      onChange={(e) =>
                        setFormData({ ...formData, instansi: e.target.value })
                      }
                      placeholder="Contoh: Universitas Brawijaya"
                      className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                    />
                  </div>

                  {/* Fakultas & Jurusan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fakultas" className="font-bold text-gray-700 text-sm">Fakultas</Label>
                      <Input
                        id="fakultas"
                        value={formData.fakultas}
                        onChange={(e) =>
                          setFormData({ ...formData, fakultas: e.target.value })
                        }
                        placeholder="Contoh: Fakultas Ilmu Komputer"
                        className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jurusan" className="font-bold text-gray-700 text-sm">Jurusan/Program Studi</Label>
                      <Input
                        id="jurusan"
                        value={formData.jurusan}
                        onChange={(e) =>
                          setFormData({ ...formData, jurusan: e.target.value })
                        }
                        placeholder="Contoh: Teknik Informatika"
                        className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                      />
                    </div>
                  </div>

                  {/* Angkatan & Gender (Mahasiswa) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="angkatan" className="font-bold text-gray-700 text-sm">Tahun Angkatan</Label>
                      <Input
                        id="angkatan"
                        type="number"
                        value={formData.angkatan}
                        onChange={(e) =>
                          setFormData({ ...formData, angkatan: e.target.value })
                        }
                        placeholder="Contoh: 2021"
                        className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-gray-700 text-sm">Gender</Label>
                      <Select
                        value={formData.gender ? formData.gender : undefined}
                        onValueChange={(value) => setFormData({ ...formData, gender: value || "" })}
                      >
                        <SelectTrigger className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11 bg-white text-gray-900">
                          <SelectValue placeholder="Pilih Gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                          <SelectItem value="L">Pria</SelectItem>
                          <SelectItem value="P">Wanita</SelectItem>
                          <SelectItem value="U">Tidak Memberitahu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {!formData.is_mahasiswa && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700 text-sm">Gender</Label>
                    <Select
                      value={formData.gender ? formData.gender : undefined}
                      onValueChange={(value) => setFormData({ ...formData, gender: value || "" })}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 h-11 bg-white text-gray-900">
                        <SelectValue placeholder="Pilih Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                        <SelectItem value="L">Pria</SelectItem>
                        <SelectItem value="P">Wanita</SelectItem>
                        <SelectItem value="U">Tidak Memberitahu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="alamat" className="font-bold text-gray-700 text-sm">Alamat (Opsional)</Label>
                <Textarea
                  id="alamat"
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                  placeholder="Masukkan alamat Anda"
                  rows={3}
                  className="resize-none rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 p-4"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-50 px-4 md:px-0">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gap-2 rounded-xl h-12 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="rounded-xl h-12 font-bold border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            >
              Atur Ulang
            </Button>
          </div>
        </form>
            )}

            {activeTab === "akun" && (
              <div className="space-y-6">
                <Card className="border-gray-100 shadow-xl shadow-gray-200/40 bg-white rounded-3xl overflow-hidden border">
                  <CardHeader className="p-6 md:p-8 pb-4 border-b border-gray-50">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-gray-400" /> Keamanan
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-400 mt-1">
                      Perbarui kata sandi Anda secara berkala untuk menjaga keamanan akun.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <form onSubmit={handlePasswordChange} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-700 text-sm">Kata Sandi Saat Ini</Label>
                        <Input 
                          type="password" 
                          value={accountData.current_password}
                          onChange={(e) => setAccountData({...accountData, current_password: e.target.value})}
                          placeholder="Masukkan kata sandi saat ini" 
                          className="rounded-xl border-gray-200 h-11" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-700 text-sm">Kata Sandi Baru</Label>
                        <Input 
                          type="password" 
                          value={accountData.new_password}
                          onChange={(e) => setAccountData({...accountData, new_password: e.target.value})}
                          placeholder="Masukkan kata sandi baru (min. 8 karakter)" 
                          className="rounded-xl border-gray-200 h-11" 
                          required 
                          minLength={8}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold text-gray-700 text-sm">Konfirmasi Kata Sandi Baru</Label>
                        <Input 
                          type="password" 
                          value={accountData.new_password_confirmation}
                          onChange={(e) => setAccountData({...accountData, new_password_confirmation: e.target.value})}
                          placeholder="Ulangi kata sandi baru" 
                          className="rounded-xl border-gray-200 h-11" 
                          required 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isUpdatingPassword}
                        className="rounded-xl h-11 font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all w-full sm:w-auto mt-2"
                      >
                        {isUpdatingPassword ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Memperbarui...
                          </>
                        ) : "Perbarui Kata Sandi"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {user?.role !== "admin" && (
                  <Card className="border-red-100 shadow-xl shadow-red-200/20 bg-white rounded-3xl overflow-hidden border">
                    <CardHeader className="p-6 md:p-8 pb-4 border-b border-red-50 bg-red-50/30">
                      <CardTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" /> Zona Berbahaya
                      </CardTitle>
                      <CardDescription className="text-sm text-red-400 mt-1">
                        Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus permanen.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                      <p className="text-sm text-gray-600 mb-6 font-medium">
                        Setelah Anda menghapus akun, tidak ada jalan untuk mengembalikannya. Mohon pastikan dengan benar.
                      </p>
                      <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        disabled={isDeletingAccount}
                        className="rounded-xl h-11 font-bold bg-red-600 hover:bg-red-700 transition-all w-full sm:w-auto"
                      >
                        {isDeletingAccount ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Menghapus...
                          </>
                        ) : "Hapus Akun Saya"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
