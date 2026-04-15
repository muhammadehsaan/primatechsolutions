"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Database,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { ADMIN_SESSION_KEY, ADMIN_USER_KEY, ADMIN_USERNAME } from "@/lib/adminAuth";
import { isUsingFirebaseBlogs } from "@/lib/blogService";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blog Manager", icon: FileText },
  { href: "/admin/blogs/new", label: "Add Blog", icon: FilePlus2 },
] as const;

export default function AdminPanelShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [adminName, setAdminName] = useState(ADMIN_USERNAME);
  const isFirebaseMode = isUsingFirebaseBlogs();

  useEffect(() => {
    const isAuthenticated = window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
    const storedName = window.localStorage.getItem(ADMIN_USER_KEY)?.trim();

    if (!isAuthenticated) {
      router.replace("/admin/login");
      return;
    }

    if (storedName) {
      setAdminName(storedName);
    }

    setIsChecking(false);
  }, [router]);

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    window.localStorage.removeItem(ADMIN_USER_KEY);
    router.replace("/admin/login");
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#06111d_0%,#0b1f35_45%,#102c49_100%)] text-white">
        <div className="flex items-center gap-3 rounded-2xl border border-cyanPrimary/20 bg-cyanPrimary/8 px-5 py-4 text-sm font-medium">
          <LoaderCircle className="h-4 w-4 animate-spin text-cyanPrimary" />
          Checking admin access...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(9,116,181,0.18),transparent_26%),linear-gradient(160deg,#06111d_0%,#0b1f35_45%,#102c49_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(5,12,20,0.95),rgba(8,22,38,0.92))] px-4 py-5 lg:min-h-screen lg:w-[300px] lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
          <div className="flex items-center gap-3 rounded-2xl border border-cyanPrimary/25 bg-cyanPrimary/6 px-4 py-4">
            <div className="rounded-2xl border border-cyanPrimary/35 bg-cyanPrimary/10 p-3">
              <ShieldCheck className="h-6 w-6 text-cyanPrimary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyanPrimary/85">Admin Panel</p>
              <p className="mt-1 text-lg font-semibold">PrimeTech Control</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-cyanPrimary/80">Signed In As</p>
            <p className="mt-2 text-sm font-semibold text-white">{adminName}</p>
            <p className="mt-1 text-sm text-gray-400">Temporary username/password access is active.</p>
          </div>

          <nav className="mt-6 space-y-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || (link.href !== "/admin" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border border-cyanPrimary/35 bg-cyanPrimary/12 text-white shadow-[0_0_28px_rgba(0,229,255,0.08)]"
                      : "border border-transparent bg-white/4 text-gray-300 hover:border-white/10 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(7,18,30,0.95),rgba(14,42,70,0.92))] p-5 lg:block">
            <p className="text-sm font-semibold text-white">Current Workflow</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
              <p>1. Login with current admin username and password</p>
              <p>2. Open simple blog form and fill full article</p>
              <p>3. Select image for Cloudinary upload</p>
              <p>4. Save draft or publish instantly</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/8"
          >
            <LogOut className="h-4 w-4 text-cyanPrimary" />
            Logout
          </button>
        </aside>

        <div className="flex-1">
          <header className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(5,12,22,0.8),rgba(7,18,31,0.55))] px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyanPrimary/80">Admin Workspace</p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Blog Publishing Dashboard</h1>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-gray-300">
                  <Database className="h-4 w-4 text-cyanPrimary" />
                  {isFirebaseMode ? "Firebase live mode" : "Local preview mode"}
                </div>

                <Link
                  href="/admin/blogs/new"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#032335]"
                >
                  <FilePlus2 className="h-4 w-4" />
                  New Blog
                </Link>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
