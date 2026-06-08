"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { Label } from "@/components/shared/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Đăng nhập thất bại");
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/493265605_1121960836612873_6860252367510119265_n.jpg?stp=dst-jpg_tt6&cstp=mx1422x1422&ctp=s1422x1422&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t6nol4hYVYIQ7kNvwG8pcq0&_nc_oc=AdquBvtOxoqJW7NHc_R2ZehxhVf_TSZpgk96iBAcU7rQ1fbNYoLuDsAYzr_nqIRmXww&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=OsQkcfvAuoIGfJMI598HAQ&_nc_ss=7b2a8&oh=00_Af9MWmWAzHhbPPTrzx7RmwpVHUVg3MM9aePF5mtD_lurjA&oe=6A2C8822"
            alt="Thanh Lam Store"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-text">Admin Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">Khu vực quản trị riêng tư - THANH LÂM STORE</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Đăng nhập</CardTitle>
            <CardDescription>Đăng nhập tài khoản quản trị</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-text-secondary/50 mt-6" suppressHydrationWarning>
          © {new Date().getFullYear()} THANH LÂM STORE. All rights reserved.
        </p>
      </div>
    </div>
  );
}
