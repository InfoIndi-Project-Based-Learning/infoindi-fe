export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  email_verified_at?: string | null;
  created_at: string;
  role: "admin" | "user";
  is_profile_complete: boolean;
  is_active?: boolean;
  profile?: {
    avatar?: string;
    bio?: string;
    instagram?: string;
    instagram_url?: string;
    website?: string;
    website_url?: string;
    address?: string;
    phone_number?: string;
    phone?: string;
    is_mahasiswa?: boolean;
    fakultas?: string;
    jurusan?: string;
    angkatan?: string;
    gender?: string;
    alamat?: string;
    tanggal_lahir?: string;
    instansi?: string;
  };
}
