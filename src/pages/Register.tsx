import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { User, Mail, ArrowRight, UserCircle, Sparkles, Tag } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { getErrorMessage } from '../lib/axiosInstance';
import { SuccessModal } from '../components/ui/success-modal';
import toast from 'react-hot-toast';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const logout = useAuthStore((state) => state.logout);
    const isLoading = useAuthStore((state) => state.isLoading);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CUSTOMER' as 'CUSTOMER' | 'ORGANIZER',
        referredBy: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password requirements on frontend
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }

        try {
            // Backend expects confirmPassword in the payload
            const registrationData: any = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword, // Required by backend validation
                role: formData.role,
            };

            // Only add referredBy if it's not empty
            if (formData.referredBy && formData.referredBy.trim() !== '') {
                registrationData.referredBy = formData.referredBy;
            }

            console.log('Sending registration data:', registrationData);

            await register(registrationData);

            // Logout immediately because the user wants to be redirected to login page
            logout();

            toast.success('Pendaftaran Berhasil!', {
                duration: 5000,
                icon: '🎉',
                style: {
                    borderRadius: '16px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            console.log('Registration successful, showing modal');
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Registration failed:', err);
            setError(getErrorMessage(err));
        }
    };

    const handleLoginRedirect = () => {
        console.log('Redirecting to login page action triggered');
        setShowSuccessModal(false);
        // Direct assignment is usually very reliable
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-12 px-4">
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                onLogin={handleLoginRedirect}
            />

            {/* Subtle background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary opacity-[0.03] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-blue-500 opacity-[0.02] rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-[3rem] shadow-3xl shadow-slate-200/50 border border-slate-100 p-10 z-10 transition-all">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl shadow-blue-100 border border-blue-100 group-hover:rotate-0 transition-transform">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Daftar Akun</h2>
                    <p className="text-slate-500 font-bold text-sm">Bergabung dan temukan pengalaman barumu</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl text-center font-black animate-in fade-in slide-in-from-top-2 uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Contoh: John Doe"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="nama@email.com"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kata Sandi</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Konfirmasi</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium -mt-2">
                        Password minimal 8 karakter, harus mengandung huruf besar, huruf kecil, dan angka
                    </p>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Kode Referral (Opsional)</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <Tag className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                name="referredBy"
                                value={formData.referredBy}
                                onChange={handleChange}
                                placeholder="Contoh: REF123 (Jika Ada)"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-slate-900"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Daftar Sebagai</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <UserCircle className="w-5 h-5" />
                            </div>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none font-bold text-slate-900 cursor-pointer"
                                required
                            >
                                <option value="CUSTOMER">Peserta (Beli Tiket)</option>
                                <option value="ORGANIZER">Penyelenggara (Buat Event)</option>
                            </select>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full py-8 text-lg font-black bg-primary hover:bg-orange-600 shadow-2xl shadow-primary/30 rounded-2xl group border-0 transition-all hover:-translate-y-1 active:scale-95 text-white">
                        {isLoading ? 'MENDAFTAR...' : 'DAFTAR SEKARANG'}
                        {!isLoading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-black text-primary hover:underline transition-colors focus:outline-none">
                            Masuk Sini
                        </Link>
                    </p>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <Link to="/" className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                        KEMBALI KE BERANDA
                    </Link>
                </div>
            </div>
        </div>
    );
};
