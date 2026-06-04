import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  LogIn,
  PlusCircle,
  Image,
  FileText,
  Save,
  Eye,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Mail,
  Edit,
} from "lucide-react";
import { GradientHeader } from "@/components/common/gradient-header";

export default function HelpPage() {
  const steps = [
    {
      title: "Mulai Menggunakan",
      icon: UserPlus,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      steps: [
        {
          title: "1. Buat Akun",
          description:
            "Klik tombol 'Login' di bilah navigasi di bagian kanan atas halaman.",
          details: [
            "Anda akan diarahkan ke halaman login",
            "Untuk tujuan demo, Anda dapat menggunakan kredensial apa pun untuk masuk",
            "Di lingkungan produksi, Anda perlu membuat akun asli",
          ],
        },
        {
          title: "2. Verifikasi Login Anda",
          description:
            "Setelah masuk, Anda akan melihat foto profil Anda di bilah navigasi.",
          details: [
            "Nama dan avatar Anda akan muncul di pojok kanan atas",
            "Anda dapat mengakses dashboard Anda dari menu dropdown",
            "Klik 'Dashboard' untuk mengelola postingan Anda",
          ],
        },
      ],
    },
    {
      title: "Membuat Postingan Pertama Anda",
      icon: PlusCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      steps: [
        {
          title: "1. Akses Halaman Buat Postingan",
          description: "Ada beberapa cara untuk membuat postingan baru:",
          details: [
            "Klik tombol 'Buat Postingan' di bilah navigasi",
            "Buka Dashboard Anda dan klik 'Buat Postingan' di sidebar",
            "Kedua opsi akan membawa Anda ke halaman pembuatan postingan",
          ],
        },
        {
          title: "2. Isi Detail Postingan",
          description: "Lengkapi formulir di sisi kiri halaman:",
          details: [
            "Judul Postingan: Masukkan judul yang menarik dan deskriptif",
            "Kategori: Pilih dari Produk, Layanan, Podcast, Acara, atau Lainnya",
            "URL Gambar Banner: Tambahkan URL gambar utama yang mewakili postingan Anda",
            "Gambar Tambahan (opsional): Tambahkan lebih banyak URL gambar untuk memamerkan konten Anda",
          ],
        },
        {
          title: "3. Tulis Deskripsi Anda",
          description:
            "Gunakan editor teks kaya untuk membuat konten yang menarik:",
          details: [
            "Tambahkan tajuk (H1-H6) untuk menstrukturkan konten Anda",
            "Format teks dengan tebal, miring, garis bawah, atau coret",
            "Buat daftar bernomor atau poin",
            "Tambahkan kutipan, blok kode, atau tautan",
            "Atur perataan teks sesuai kebutuhan",
          ],
        },
        {
          title: "4. Pratinjau Postingan Anda",
          description: "Lihat pratinjau langsung di sisi kanan:",
          details: [
            "Lihat bagaimana tampilan postingan Anda secara real-time",
            "Periksa tampilan gambar banner",
            "Tinjau deskripsi yang telah diformat",
            "Pastikan gambar tambahan muncul dengan benar",
          ],
        },
        {
          title: "5. Publikasikan Postingan Anda",
          description: "Jika Anda sudah puas dengan postingan Anda:",
          details: [
            "Klik tombol 'Publikasikan Postingan' di pojok kanan atas",
            "Postingan Anda akan disimpan dan dapat dilihat oleh semua pengguna",
            "Anda akan diarahkan kembali ke dashboard Anda",
            "Postingan Anda akan muncul di halaman beranda",
          ],
        },
      ],
    },
    {
      title: "Mengelola Postingan Anda",
      icon: Edit,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      steps: [
        {
          title: "1. Lihat Dashboard Anda",
          description:
            "Akses dashboard Anda untuk melihat semua postingan Anda:",
          details: [
            "Klik ikon profil Anda dan pilih 'Dashboard'",
            "Lihat statistik tentang postingan Anda",
            "Lihat semua postingan yang telah Anda buat dalam daftar",
          ],
        },
        {
          title: "2. Edit Postingan",
          description: "Perbarui konten Anda yang sudah ada:",
          details: [
            "Klik tombol 'Edit' pada postingan Anda",
            "Anda akan dibawa ke halaman edit dengan tata letak yang sama",
            "Lakukan perubahan dan klik 'Simpan Perubahan'",
            "Pratinjau langsung akan diperbarui saat Anda mengetik",
          ],
        },
        {
          title: "3. Hapus Postingan",
          description: "Hapus postingan yang tidak lagi Anda inginkan:",
          details: [
            "Klik tombol 'Hapus' pada postingan apa pun",
            "Konfirmasikan penghapusan di kotak dialog",
            "Tindakan ini tidak dapat dibatalkan",
          ],
        },
        {
          title: "4. Lihat Postingan yang Dipublikasikan",
          description: "Lihat bagaimana orang lain melihat konten Anda:",
          details: [
            "Klik tombol 'Lihat' untuk melihat halaman detail postingan lengkap",
            "Ini adalah apa yang akan dilihat pengguna lain saat mereka mengklik postingan Anda",
            "Anda dapat membagikan halaman ini dengan orang lain",
          ],
        },
      ],
    },
  ];

  const tips = [
    {
      icon: Image,
      title: "Gunakan Gambar Berkualitas Tinggi",
      description:
        "Pilih gambar yang jelas dan relevan yang mewakili konten Anda dengan baik. Gambar banner adalah hal pertama yang dilihat pengguna!",
    },
    {
      icon: FileText,
      title: "Tulis Deskripsi Terperinci",
      description:
        "Berikan informasi yang komprehensif. Gunakan tajuk, daftar, dan pemformatan agar konten Anda mudah dibaca.",
    },
    {
      icon: CheckCircle,
      title: "Pilih Kategori yang Tepat",
      description:
        "Pilih kategori yang paling sesuai untuk membantu pengguna menemukan konten Anda melalui filter kategori.",
    },
    {
      icon: Eye,
      title: "Gunakan Pratinjau Langsung",
      description:
        "Selalu periksa pratinjau langsung sebelum mempublikasikan untuk memastikan postingan Anda terlihat persis seperti yang Anda inginkan.",
    },
  ];

  const faqs = [
    {
      question:
        "Apakah saya bisa mengedit postingan saya setelah dipublikasikan?",
      answer:
        "Ya! Buka Dashboard Anda, cari postingan yang ingin Anda edit, dan klik tombol 'Edit'. Anda dapat mengubah aspek apa pun dari postingan Anda.",
    },
    {
      question: "Format gambar apa saja yang didukung?",
      answer:
        "Anda dapat menggunakan format gambar standar (JPG, PNG, GIF, WebP). Pastikan Anda memberikan URL gambar yang valid.",
    },
    {
      question: "Bagaimana cara menghubungi pemilik postingan?",
      answer:
        "Saat melihat halaman detail postingan, klik tombol 'Hubungi' untuk menghubungi pemilik postingan melalui email.",
    },
    {
      question: "Bisakah saya menambahkan banyak gambar ke postingan saya?",
      answer:
        "Ya! Anda dapat menambahkan satu gambar banner utama ditambah gambar tambahan tanpa batas untuk memamerkan konten Anda dari berbagai sudut.",
    },
    {
      question: "Bagaimana cara menghapus akun saya?",
      answer:
        "Buka halaman Pengaturan Profil dan cari opsi manajemen akun. Anda dapat memperbarui informasi profil Anda di sana.",
    },
    {
      question: "Apakah postingan saya langsung terlihat?",
      answer:
        "Ya! Begitu Anda mengklik 'Publikasikan Postingan', konten Anda segera terlihat di halaman beranda dan dapat ditemukan melalui filter kategori.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <GradientHeader>
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Bantuan & Panduan</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Pelajari cara mendaftar, membuat postingan, dan membagikan produk,
            layanan, dan konten Anda dengan komunitas mahasiswa
          </p>
        </div>
      </GradientHeader>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Quick Links */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/login">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <LogIn className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">Login / Daftar</h3>
                <p className="text-sm text-gray-600">
                  Mulai dengan masuk ke akun
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/create-post">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <PlusCircle className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-2">Buat Postingan</h3>
                <p className="text-sm text-gray-600">
                  Bagikan konten Anda sekarang
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <Edit className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-2">Dashboard Saya</h3>
                <p className="text-sm text-gray-600">Kelola postingan Anda</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Panduan Langkah demi Langkah
          </h2>
          <div className="space-y-8">
            {steps.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <section.icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="pl-16 border-l-2 border-gray-200 relative"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
                      <h3 className="text-lg font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips & Best Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Tips & Saran Terbaik
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Need More Help */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Masih Butuh Bantuan?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan atau menghadapi masalah apa pun,
              jangan ragu untuk menghubungi tim dukungan kami. Kami di sini
              untuk membantu Anda memaksimalkan platform Pertukaran Informasi
              Mahasiswa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2" size="lg">
                <Mail className="w-4 h-4" />
                Hubungi Dukungan
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
