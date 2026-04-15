"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import {
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
  ADMIN_USERNAME,
  ADMIN_USER_KEY,
} from "@/lib/adminAuth";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(ADMIN_SESSION_KEY) === "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const normalizedUsername = username.trim();
    const isValid = normalizedUsername === ADMIN_USERNAME && password === ADMIN_PASSWORD;

    if (!isValid) {
      setError("Username ya password sahi nahi hai.");
      setIsSubmitting(false);
      return;
    }

    window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
    window.localStorage.setItem(ADMIN_USER_KEY, normalizedUsername);
    setError("");
    router.replace("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanPrimary/80">Admin Sign In</p>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-gray-200">Username</span>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <UserRound className="h-4 w-4 text-cyanPrimary" />
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter admin username"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-gray-200">Password</span>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <LockKeyhole className="h-4 w-4 text-cyanPrimary" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter secure password"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </label>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cyan px-5 py-3 text-sm font-semibold text-[#042437] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ShieldCheck className="h-4 w-4" />
        {isSubmitting ? "Checking Access..." : "Sign In To Admin"}
      </button>

      <div className="mt-5 rounded-2xl border border-cyanPrimary/20 bg-cyanPrimary/8 p-4 text-sm leading-6 text-gray-300">
        <p className="font-semibold text-white">Temporary access setup</p>
        <p className="mt-1">Username aur password abhi hardcoded temporary mode me chal rahe hain.</p>
      </div>
    </form>
  );
}
