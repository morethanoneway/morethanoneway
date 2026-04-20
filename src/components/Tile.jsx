import React from "react";

const Tile = ({ title, desc, onClick, icon, tone = "teal" }) => {
  const tones = {
    teal: {
      card: "bg-[#006581] text-white hover:bg-[#005A73] border-white/10",
      iconWrap: "bg-black/15 text-white ring-1 ring-white/15",
      desc: "text-white/85",
      cta: "text-white/70 group-hover:text-white",
    },
    light: {
      card: "bg-white text-gray-900 hover:bg-gray-50 border-gray-200",
      iconWrap: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
      desc: "text-gray-600",
      cta: "text-gray-500 group-hover:text-gray-900",
    },
  };

  const t = tones[tone] ?? tones.teal;

  return (
    <button
      onClick={onClick}
      className={`
        group w-full text-left
        rounded-2xl
        bg-[#006581] text-white
        p-7 min-h-[170px]
        shadow-sm
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-lg
        hover:bg-[#00465a]
        focus:outline-none focus:ring-2 focus:ring-white/20
      `}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex items-center justify-center w-10 h-10 text-white">
          {React.cloneElement(icon, { className: "w-6 h-6", strokeWidth: 1.75 })}
        </span>

        <div className="min-w-0">
          <span className="text-xl md:text-[1.35rem] font-semibold leading-tight block">
            {title}
          </span>

          <p className={`mt-3 text-base leading-relaxed ${t.desc}`}>
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
};

export default Tile;
