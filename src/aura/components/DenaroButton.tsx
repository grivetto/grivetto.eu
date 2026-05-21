import React from 'react';

interface DenaroButtonProps {
  onClick?: () => void;
  href?: string;
  label?: string;
}

const DenaroButton: React.FC<DenaroButtonProps> = ({ onClick, href, label = 'DENARO' }) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00C853] to-[#00E676] rounded-xl font-bold text-white text-sm tracking-widest uppercase shadow-lg hover:shadow-xl hover:shadow-[#00C853]/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
    >
      <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <svg
        className="w-5 h-5 drop-shadow-sm"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" stroke="#fff" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">€</text>
        <defs>
          <linearGradient id="coinGradient" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#00C853" />
          </linearGradient>
        </defs>
      </svg>
      <span className="relative">{label}</span>
      <svg
        className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{buttonContent}</a>;
  }

  return buttonContent;
};

export default DenaroButton;