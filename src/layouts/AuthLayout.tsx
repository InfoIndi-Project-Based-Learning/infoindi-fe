import { Link, Navigate, Outlet, useLocation } from "react-router";
import Button from "../components/Button";
import useAuthStore from "../hooks/auth/useAuthStore";

const AuthLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { token } = useAuthStore();

  if (token) return <Navigate to={"/"} replace />;
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-100 ">
      <div className="bg-[#F3F0FF] grid grid-cols-1 lg:grid-cols-2 gap-10  p-10 shadow-lg max-w-6xl rounded-3xl">
        <div className="flex flex-col gap-4 justify-center items-start">
          <p className="text-sm font-semibold text-purple-500">
            Platform informasi mahasiswa UB
          </p>
          <h1 className="text-5xl font-extrabold">
            Selamat Datang Kembali di{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#6A37D4] to-[#B00D6A]">
              InfoIndi
            </span>
          </h1>
          <p className="text-lg text-[#67537C] ">
            Masuk untuk bisa membuat postingan, melihat postingan, dan
            berinteraksi dengan mahasiswa lainnya di platform InfoIndi. Jangan
            lewatkan kesempatan untuk tetap terhubung dengan komunitas mahasiswa
            UB!{" "}
          </p>
        </div>
        <div className="bg-white p-10 rounded-3xl">
          <h2 className="text-2xl font-bold">Masuk ke akun</h2>
          <p className="text-gray-600 text-sm font-thin mb-6">
            Masukkan detail akun anda di bawah ini
          </p>
          <Outlet />
          {pathname === "/auth/login" && (
            <>
              <div className="flex justify-center gap-4 items-center my-10 px-5">
                <div className="h-px w-full bg-gray-200" />
                <p className="text-sm uppercase  text-[#BCA4D2] font-medium tracking-widest ">
                  Atau
                </p>
                <div className="h-px w-full bg-gray-200" />
              </div>
              <Button
                variant="outline"
                className="w-full rounded-2xl"
                size="lg"
              >
                Login Dengan Google
              </Button>
            </>
          )}
          <p className="text-center text-sm mt-4 text-gray-600">
            {pathname === "/auth/login"
              ? "Belum punya akun?"
              : "Sudah punya akun?"}{" "}
            <Link
              to={pathname === "/auth/login" ? "/auth/register" : "/auth/login"}
              className="text-[#6A37D4] font-medium"
            >
              {pathname === "/auth/login" ? "Daftar di sini" : "Masuk di sini"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
