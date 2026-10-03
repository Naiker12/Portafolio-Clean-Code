export function Wallpaper({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className={`os-wallpaper ${blurred ? "os-wallpaper--blurred" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="os-base" x2="1" y2="1"><stop stopColor="#200c2c" /><stop offset=".5" stopColor="#300e38" /><stop offset="1" stopColor="#100b22" /></linearGradient>
          <linearGradient id="os-ribbon" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#592046" /><stop offset=".45" stopColor="#a32d39" /><stop offset=".72" stopColor="#ee5420" /><stop offset="1" stopColor="#ff902e" /></linearGradient>
          <linearGradient id="os-purple" x2="1" y2="1"><stop stopColor="#84305e" /><stop offset="1" stopColor="#241033" /></linearGradient>
          <radialGradient id="os-glow"><stop stopColor="#e95420" stopOpacity=".22" /><stop offset="1" stopColor="#e95420" stopOpacity="0" /></radialGradient>
        </defs>
        <path fill="url(#os-base)" d="M0 0h1600v1000H0z" />
        <ellipse cx="1330" cy="400" rx="700" ry="550" fill="url(#os-glow)" />
        <path fill="url(#os-purple)" opacity=".6" d="M0 150C350 210 410 650 860 520S1310 30 1600 0v1000H0z" />
        <path fill="url(#os-ribbon)" d="M0 585C285 405 434 784 768 705S1129 160 1600 85v300c-392-221-420 363-821 374S321 485 0 775z" />
        <path fill="url(#os-purple)" opacity=".8" d="M0 716c314-213 450 233 874 89s443-302 726-193v388H0z" />
        <path fill="none" stroke="#ff782c" strokeOpacity=".75" strokeWidth="2" d="M0 585C285 405 434 784 768 705S1129 160 1600 85" />
        <path fill="#110b20" opacity=".45" d="M0 887c289-380 568 146 1008-64s402-159 592-133v310H0z" />
      </svg>
    </div>
  );
}
