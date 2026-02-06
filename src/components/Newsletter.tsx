import { Mail, ArrowRight, BellRing } from "lucide-react";
import { Button } from "./ui/button";

export const Newsletter = () => {
  return (
    <section className="relative py-20 overflow-hidden rounded-[3rem] bg-white border border-slate-100 my-24 shadow-2xl shadow-slate-100">
      {/* Background decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 -rotate-6 shadow-xl shadow-primary/10 border border-primary/20 transition-transform hover:rotate-0 duration-500">
          <BellRing className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Jangan Sampai Ketinggalan!
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-12 text-lg font-medium leading-relaxed">
          Dapatkan info event terbaru, konser artis favorit, dan promo eksklusif
          langsung di emailmu.
        </p>

        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 p-2 bg-slate-50 rounded-[2rem] border border-slate-200 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <div className="flex-1 flex items-center px-6">
            <Mail className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="email"
              placeholder="Masukkan alamat email kamu..."
              className="w-full py-4 bg-transparent text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none text-lg"
            />
          </div>
          <Button className="rounded-2xl px-10 py-5 bg-primary hover:bg-orange-600 text-white font-black text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all border-0">
            SUBSCRIBE <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <p className="text-slate-400 text-xs font-bold mt-8 uppercase tracking-widest">
          Kami menjamin privasimu &bull; Bisa berhenti langganan kapan saja
        </p>
      </div>
    </section>
  );
};
