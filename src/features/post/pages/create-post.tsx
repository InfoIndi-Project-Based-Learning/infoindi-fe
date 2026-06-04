import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/common/rich-text-editor";
import { X, ArrowLeft, Send, Eye, Upload, Loader2, Image as ImageIcon, Sparkles, FileText } from "lucide-react";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import { useCreatePost, useGetCategories } from "../api/use-posts";

export function CreatePost() {
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const createPost = useCreatePost();
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategories();

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file banner maksimal 2MB");
        return;
      }
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Limit to max 4 additional images
      if (additionalFiles.length + files.length > 4) {
        toast.error("Maksimal hanya 4 gambar tambahan");
        return;
      }

      setAdditionalFiles((prev) => [...prev, ...files]);
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalFiles((prev) => prev.filter((_, i) => i !== index));
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Judul postingan wajib diisi");
      return;
    }
    if (!formData.category_id) {
      toast.error("Silakan pilih kategori terlebih dahulu");
      return;
    }
    if (!bannerFile) {
      toast.error("Gambar banner wajib diunggah");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Deskripsi postingan tidak boleh kosong");
      return;
    }

    const data = new FormData();
    data.append("post_name", formData.name);
    data.append("category_id", formData.category_id);
    data.append("description", formData.description);
    data.append("banner_image", bannerFile);
    
    additionalFiles.forEach((file) => {
      data.append("images[]", file);
    });

    createPost.mutate(data);
  };

  const categoryColors: Record<string, string> = {
    "jualan": "bg-blue-50 text-blue-600 border border-blue-100",
    "jasa": "bg-emerald-50 text-emerald-600 border border-emerald-100",
    "info-lomba": "bg-indigo-50 text-indigo-600 border border-indigo-100",
    "lowongan-pekerjaan": "bg-amber-50 text-amber-600 border border-amber-100",
    "lainnya": "bg-slate-50 text-slate-600 border border-slate-100",
  };

  const selectedCategory = categories.find((c: any) => c.id === formData.category_id);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/40 via-slate-50 to-slate-100/50 pb-16">
      {/* Header Sticky Container */}
      <div className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 hover:bg-slate-100/80 rounded-xl px-3 py-2 text-slate-600 transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline font-medium">Batal</span>
            </Button>
            <div className="h-6 w-[1px] bg-slate-200" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                Buat Postingan Baru
              </h1>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={createPost.isPending} 
            className="rounded-xl px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
          >
            {createPost.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Publikasikan
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Detail Card */}
            <Card className="border-slate-200/60 shadow-sm bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800">Detail Postingan</CardTitle>
                    <CardDescription>Masukkan info esensial untuk postingan Anda</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold text-sm">Judul Postingan <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Info Lomba Hackathon Tingkat Nasional 2026"
                    className="rounded-xl border-slate-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 h-11"
                    maxLength={100}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-700 font-semibold text-sm">Kategori <span className="text-red-500">*</span></Label>
                  {isCategoriesLoading ? (
                    <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center px-3 text-slate-500 text-sm">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memuat kategori...
                    </div>
                  ) : (
                    <Select
                      value={formData.category_id}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, category_id: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 h-11 bg-white">
                        <SelectValue placeholder="Pilih kategori postingan">
                          {formData.category_id
                            ? categories.find((c: any) => c.id === formData.category_id)?.category_name || "Pilih kategori postingan"
                            : "Pilih kategori postingan"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        {categories.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id} className="focus:bg-indigo-50 focus:text-indigo-600 rounded-lg m-1">
                            {cat.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-sm">Gambar Banner Utama <span className="text-red-500">*</span></Label>
                  
                  {bannerPreview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                      <img 
                        src={bannerPreview} 
                        alt="Preview banner" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button 
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => bannerInputRef.current?.click()}
                          className="rounded-lg font-medium gap-1"
                        >
                          <Upload className="w-4 h-4" /> Ganti Banner
                        </Button>
                        <Button 
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setBannerFile(null);
                            setBannerPreview("");
                          }}
                          className="rounded-lg font-medium gap-1"
                        >
                          <X className="w-4 h-4" /> Hapus
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => bannerInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 text-center hover:bg-slate-50/50 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 rounded-2xl w-fit mx-auto mb-3 transition-colors duration-300">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">Klik untuk mengunggah gambar banner</p>
                      <p className="text-xs text-slate-400 mt-1">Ukuran rekomendasi 16:9, Maksimal 2MB (PNG, JPG)</p>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    ref={bannerInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleBannerChange}
                  />
                </div>

                {/* Additional Images */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-sm">Gambar Pendukung Tambahan <span className="text-slate-400 font-normal">(Opsional - Maksimal 4)</span></Label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {additionalPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group shadow-sm bg-slate-50">
                        <img 
                          src={preview} 
                          alt={`Preview pendukung ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1.5 right-1.5 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105 duration-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {additionalPreviews.length < 4 && (
                      <div 
                        onClick={() => additionalImagesRef.current?.click()}
                        className="aspect-square border border-dashed border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group"
                      >
                        <div className="p-2 bg-slate-50 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50 rounded-xl transition-colors mb-1.5">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-indigo-600">Tambah Gambar</span>
                      </div>
                    )}
                  </div>

                  <input 
                    type="file" 
                    ref={additionalImagesRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*"
                    onChange={handleAdditionalImagesChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description Text Editor Card */}
            <Card className="border-slate-200/60 shadow-sm bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800">Deskripsi Lengkap <span className="text-red-500">*</span></CardTitle>
                    <CardDescription>Gunakan editor untuk menyusun teks secara menarik dan variatif</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  placeholder="Tulis informasi detail, syarat, kontak, atau cara registrasi di sini secara rinci..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Live Preview (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            {/* Label Pratinjau */}
            <div className="flex items-center justify-between text-slate-600 font-semibold px-1">
              <span className="flex items-center gap-2 text-sm bg-indigo-50/80 border border-indigo-100/50 text-indigo-600 px-3 py-1.5 rounded-full">
                <Eye className="w-4 h-4 animate-pulse" />
                Live Preview (Tampilan Publik)
              </span>
            </div>

            {/* Premium Post Card Preview */}
            <div className="backdrop-blur-md bg-white/80 border border-slate-100/80 shadow-xl rounded-3xl overflow-hidden transition-all duration-300">
              
              {/* Banner Preview */}
              {bannerPreview ? (
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden group">
                  <img
                    src={bannerPreview}
                    alt="Pratinjau banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
              ) : (
                <div className="aspect-video w-full bg-slate-100/80 border-b border-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2 p-6">
                  <div className="p-3 bg-slate-200/50 text-slate-400 rounded-full">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium">Gambar banner utama Anda</span>
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Category Badge & Live Tag */}
                <div className="flex items-center justify-between">
                  <Badge
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold shadow-sm transition-all ${
                      categoryColors[selectedCategory?.slug || "lainnya"]
                    }`}
                  >
                    {selectedCategory?.category_name || "Kategori"}
                  </Badge>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Baru saja
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug line-clamp-2">
                    {formData.name || "Judul Postingan Anda"}
                  </h2>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img
                    src={currentUser?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || "avatar"}`}
                    alt={currentUser?.name}
                    className="w-9 h-9 rounded-full ring-2 ring-indigo-50 border border-white"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 leading-tight">{currentUser?.name || "Nama Penulis"}</h4>
                    <p className="text-[11px] text-slate-400">{currentUser?.email || "email@domain.com"}</p>
                  </div>
                </div>

                {/* Description Preview Render HTML */}
                <div className="pt-2">
                  <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {formData.description ? (
                      <div 
                        className="rich-text-content ql-editor ql-snow" 
                        style={{ padding: 0, minHeight: "auto", border: "none" }}
                        dangerouslySetInnerHTML={{ __html: formData.description }} 
                      />
                    ) : (
                      <p className="text-slate-400 italic">
                        Pratinjau konten deskripsi akan muncul di sini...
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Images Preview */}
                {additionalPreviews.length > 0 && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-500 mb-2">
                      Gambar Pendukung ({additionalPreviews.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {additionalPreviews.map((img, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-sm"
                        >
                          <img
                            src={img}
                            alt={`Tambahan ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

