import React from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

// create textbox for description

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span
        className="absolute left-1/2 -translate-x-1/2 top-full mt-6
                   bg-slate-700 text-white font-semibold text-md italic py-2 px-6 rounded-lg
                   opacity-0 group-hover:opacity-100 transition
                   whitespace-nowrap shadow-lg
                   outline outline-slate-200
                   pointer-events-none"
      >
        {text}
        <span
          className="absolute left-1/2 -top-3 w-0 h-0
                     border-l-[12px] border-r-[12px] border-b-[12px]
                     border-l-transparent border-r-transparent border-b-slate-700
                     -translate-x-1/2"
          style={{
            filter: "drop-shadow(0 -1px 0 #e2e8f0)",
          }}
        ></span>
      </span>
    </div>
  );
};

export default Tooltip;
