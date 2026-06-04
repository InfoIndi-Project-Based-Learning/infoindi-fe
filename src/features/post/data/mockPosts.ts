import type { Post } from "../types/post.type";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    name: "Jasa Joki Tugas Pemrograman Web",
    bannerImage:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Menerima jasa joki tugas pemrograman web menggunakan React, Vue, atau Laravel. Harga terjangkau untuk mahasiswa.",
    authorId: "user1",
    authorName: "Ahmad Fauzi",
    authorEmail: "ahmad@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user1",
    category: "service",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Nasi Bakar Ayam Suwir - Kantin CL",
    bannerImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Nasi bakar lezat dengan isian ayam suwir pedas kemangi. Ready setiap hari di Kantin CL jam 10 pagi.",
    authorId: "user2",
    authorName: "Siti Aminah",
    authorEmail: "siti@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user2",
    category: "product",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Workshop UI/UX Design with Figma",
    bannerImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Ikuti workshop UI/UX design gratis untuk mahasiswa FILKOM. Belajar dasar-dasar desain aplikasi modern.",
    authorId: "user3",
    authorName: "Budi Santoso",
    authorEmail: "budi@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user3",
    category: "event",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Podcast: Suka Duka Mahasiswa Akhir",
    bannerImage:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Dengarkan obrolan seru mengenai tantangan menghadapi skripsi dan dosen pembimbing.",
    authorId: "user4",
    authorName: "Rizky Pratama",
    authorEmail: "rizky@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user4",
    category: "podcast",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Jasa Print & Jilid Murah",
    bannerImage:
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Print hitam putih atau warna harga miring. Bisa antar jemput sekitaran kampus UB.",
    authorId: "user5",
    authorName: "Dewi Lestari",
    authorEmail: "dewi@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user5",
    category: "service",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Open Recruitment Panitia Gebyar Seni",
    bannerImage:
      "https://images.unsplash.com/photo-1523580494863-6f30312248d5?w=800&auto=format&fit=crop&q=60",
    additionalImages: [],
    description:
      "Dicari mahasiswa aktif untuk bergabung dalam kepanitiaan Gebyar Seni UB 2024. Segera daftar!",
    authorId: "user6",
    authorName: "Kevin Sanjaya",
    authorEmail: "kevin@student.ub.ac.id",
    authorAvatar: "https://i.pravatar.cc/150?u=user6",
    category: "event",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString(),
  },
];
