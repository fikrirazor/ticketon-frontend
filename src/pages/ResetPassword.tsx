import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { getErrorMessage } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

export const ResetPassword: React.FC = () => {
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setTimeout(
        () => setError("Token reset tidak valid atau tidak ditemukan"),
        0,
      );
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (formData.password !== formData.confirmPassword) {
      setError("Kata sandi tidak cocok");
      return;
    }

    setError(null);
    try {
      await resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setIsSuccess(true);
      toast.success("Kata sandi berhasil diatur ulang");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-[0.03] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 opacity-[0.03] rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-3xl shadow-slate-200/50 border border-slate-100 p-10 z-10 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10 border-4 border-white">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Berhasil!
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
            Kata sandi Anda telah berhasil diubah. Dialihkan ke halaman login
            dalam beberapa detik...
          </p>
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-black text-primary hover:underline transition-colors uppercase tracking-widest"
          >
            LOGIN SEKARANG
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 opacity-[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-3xl shadow-slate-200/50 border border-slate-100 p-10 z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-xl shadow-primary/10 border border-primary/20">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Atur Ulang Sandi
          </h2>
          <p className="text-slate-500 font-bold text-sm">
            Silakan masukkan kata sandi baru Anda
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl text-center font-black animate-in fade-in slide-in-from-top-2 tracking-wide uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Kata Sandi Baru
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                required
                disabled={!token}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Konfirmasi Sandi
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                required
                disabled={!token}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !token}
            className="w-full py-8 text-lg font-black bg-primary hover:bg-orange-600 shadow-2xl shadow-primary/30 rounded-2xl group border-0 transition-all hover:-translate-y-1 active:scale-95 text-white"
          >
            {isLoading ? "MEMPROSES..." : "GANTI KATA SANDI"}
            {!isLoading && (
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            )}
          </Button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <Link
            to="/login"
            className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
          >
            KEMBALI KE LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};
