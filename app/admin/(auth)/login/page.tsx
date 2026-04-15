import type { Metadata } from "next";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | PrimeTech Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(9,116,181,0.18),transparent_24%),linear-gradient(160deg,#06111d_0%,#0b1f35_45%,#102c49_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-cyanPrimary/18 bg-[linear-gradient(140deg,rgba(7,16,28,0.98),rgba(11,28,46,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.28)] lg:grid-cols-[1fr_420px]">
        <section className="px-6 py-10 sm:px-8 md:px-10 lg:px-12 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyanPrimary/80">PrimeTech Admin</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Secure Blog Publishing Access
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Yeh login page abhi temporary username/password access ke liye ready hai. Sahi credentials dalne ke baad
            admin dashboard, blog manager, aur blog editor open ho jayega.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <ShieldCheck className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 font-semibold text-white">Temporary Access</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">Abhi hardcoded username/password se admin login ho raha hai.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <Mail className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 font-semibold text-white">Dashboard Access</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">Login ke baad clean admin panel aur blog tools open honge.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <LockKeyhole className="h-5 w-5 text-cyanPrimary" />
              <p className="mt-4 font-semibold text-white">Future Upgrade</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">Next step me Firebase Auth aur Firestore real backend ban jayega.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(5,12,21,0.98),rgba(8,20,34,0.96))] px-6 py-10 sm:px-8 lg:border-t-0 lg:border-l lg:px-10 lg:py-14">
          <AdminLoginForm />
        </section>
      </div>
    </div>
  );
}
