import { Outlet } from "react-router-dom";
import AppLayout from "./app-layout";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";

export default function PublicLayout() {
  return (
    <AppLayout>
      <Navbar />
      <main className="pt-15">
        <Outlet />
      </main>
      <Footer />
    </AppLayout>
  );
}
