import type { Metadata } from "next";
import AdminPanelShell from "@/components/admin/AdminPanelShell";

export const metadata: Metadata = {
  title: "Admin Panel | PrimeTech Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminPanelShell>{children}</AdminPanelShell>;
}
