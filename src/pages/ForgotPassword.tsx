import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Mail, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { getErrorMessage } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

export const ForgotPassword: React.FC = () => {
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success("Link reset kata sandi telah dikirim ke email Anda");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary opacity-[0.03] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 opacity-[0.03] rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-3xl shadow-slate-200/50 border border-slate-100 p-10 z-10 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl shadow-green-500/10 border border-green-100">
            <Mail className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Email Terkirim!
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
            Silakan periksa kotak masuk email{" "}
            <span className="text-slate-900">{email}</span> untuk instruksi
            selanjutnya.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-black text-primary hover:underline transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            KEMBALI KE LOGIN
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
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-6 shadow-xl shadow-primary/10 border border-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Lupa Sandi?
          </h2>
          <p className="text-slate-500 font-bold text-sm">
            Masukkan email Anda untuk mereset kata sandi
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
              Email Kamu
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-8 text-lg font-black bg-primary hover:bg-orange-600 shadow-2xl shadow-primary/30 rounded-2xl group border-0 transition-all hover:-translate-y-1 active:scale-95 text-white"
          >
            {isLoading ? "MEMPROSES..." : "KIRIM LINK RESET"}
            {!isLoading && (
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            )}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <Link
            to="/login"
            className="text-sm font-black text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            KEMBALI KE LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};
