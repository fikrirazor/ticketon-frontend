import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Logo & Description */}
          <div className="space-y-6">
            <Link
              to="/"
              className="text-3xl font-black text-primary tracking-tighter"
            >
              TICKETON
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Ticketon adalah platform discovery event terbesar di Indonesia. Kami menghadirkan ribuan pilihan event seru setiap bulannya langsung untukmu.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-[0.2em]">Discover</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Jelajahi Event
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Semua Kategori
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Lokasi Populer
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Promo Menarik
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
             <h4 className="text-slate-900 font-black text-sm uppercase tracking-[0.2em]">Office</h4>
             <ul className="space-y-4 text-sm font-bold">
                <li className="flex items-start gap-3 group">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="text-slate-500 leading-relaxed">Jl. Sudirman No. 123, Jakarta Selatan, Indonesia</span>
                </li>
                <li className="flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="text-slate-500 leading-relaxed">support@ticketon.com</span>
                </li>
                <li className="flex items-center gap-3 group">
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="text-slate-500 leading-relaxed">+62 21 1234 5678</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-400">
          <p>&copy; {new Date().getFullYear()} TICKETON INDONESIA. All rights reserved.</p>
          <div className="flex gap-8 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/" className="hover:text-primary transition-colors">Partnership</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
