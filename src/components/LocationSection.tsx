import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SpotlightCard from "./SpotlightCard";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dqrkheieb/image/upload";

const LOCATION_IMAGE = (publicId: string, width = 600, height = 400) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${width},h_${height},c_fill,g_auto/${publicId}`;

const locations = [
  {
    name: "Jakarta",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/jakarta_pnaium", w, h),
  },
  {
    name: "Bandung",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/bandung_xdmdlu", w, h),
  },
  {
    name: "Bali",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/bali_q73ysn", w, h),
  },
  {
    name: "Surabaya",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/surabaya_instmt", w, h),
  },
  {
    name: "Yogyakarta",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/yogyakarta_uafdwf", w, h),
  },
  {
    name: "Medan",
    image: (w: number, h: number) =>
      LOCATION_IMAGE("v1770466420/medan_inlkqp", w, h),
  },
];
export const LocationSection = () => {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Cari per Kota
        </h2>
        <Link
          to="/discover"
          className="flex items-center gap-1 text-primary font-black hover:underline text-sm uppercase tracking-widest"
        >
          LIHAT SEMUA KOTA <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {locations.map((loc) => {
          // Bento Grid Logic
          let spanClass = "md:col-span-1";
          if (loc.name === "Jakarta") spanClass = "md:col-span-2 md:row-span-2";
          else if (loc.name === "Bali")
            spanClass = "md:col-span-1 md:row-span-2";
          else if (loc.name === "Yogyakarta" || loc.name === "Medan")
            spanClass = "md:col-span-2";

          return (
            <SpotlightCard
              key={loc.name}
              className={`rounded-[1rem] overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 p-0 ${spanClass}`}
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Link
                to={`/discover?location=${loc.name}`}
                className="relative block w-full h-full"
              >
                <img
                  src={
                    loc.name === "Jakarta"
                      ? loc.image(800, 600)
                      : loc.name === "Bali"
                        ? loc.image(400, 600)
                        : loc.name === "Yogyakarta" || loc.name === "Medan"
                          ? loc.image(800, 300)
                          : loc.image(600, 400)
                  }
                  alt={loc.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4 text-center">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl mb-2 opacity-0 hover:opacity-100 transition-all transform translate-y-2 hover:translate-y-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-black text-white uppercase tracking-wider">
                    {loc.name}
                  </span>
                </div>
              </Link>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
