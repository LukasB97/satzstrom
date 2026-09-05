export function CoverOrbit() {
  return (
    <svg
      className="aurelis-orbit absolute top-[31mm] right-[2mm] h-[158mm] w-[158mm]"
      viewBox="0 0 600 600"
      aria-label="Layered material study"
    >
      <defs>
        <clipPath id="cover-disc">
          <circle cx="300" cy="300" r="222" />
        </clipPath>
        <linearGradient id="cover-clay" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f27a5f" />
          <stop offset="1" stopColor="#d63d2c" />
        </linearGradient>
      </defs>
      <circle
        cx="300"
        cy="300"
        r="268"
        fill="none"
        stroke="#191b18"
        strokeWidth="1.5"
        strokeDasharray="2 14"
        opacity=".45"
      />
      <circle cx="300" cy="300" r="222" fill="url(#cover-clay)" />
      <g clipPath="url(#cover-disc)">
        <path d="M-10 338 C124 215 197 431 329 297 S541 125 654 275 V620 H-10Z" fill="#245b4c" />
        <path d="M-50 482 C122 315 256 521 392 374 S576 251 682 369 V650 H-50Z" fill="#d9ff57" />
        <path
          d="M97 43 C180 193 435 75 500 242 C542 351 436 405 373 513"
          fill="none"
          stroke="#f3efe4"
          strokeWidth="5"
          opacity=".8"
        />
        {Array.from({ length: 8 }, (_, i) => (
          <circle
            key={i}
            cx={165 + i * 42}
            cy={142 + (i % 3) * 32}
            r={5 + i * 1.8}
            fill="#191b18"
            opacity={0.08 + i * 0.035}
          />
        ))}
      </g>
      <circle cx="300" cy="300" r="88" fill="#f3efe4" />
      <circle cx="300" cy="300" r="38" fill="#191b18" />
      <path d="M300 16V101M300 499V584M16 300H101M499 300H584" stroke="#191b18" strokeWidth="1" />
      <g fill="#191b18" fontFamily="Arial" fontSize="12" fontWeight="700" letterSpacing="3">
        <text x="287" y="12">
          N
        </text>
        <text x="592" y="304">
          E
        </text>
        <text x="287" y="598">
          S
        </text>
        <text x="-2" y="304">
          W
        </text>
      </g>
    </svg>
  );
}

export function MaterialField() {
  return (
    <svg
      viewBox="0 0 390 390"
      className="h-[79mm] w-[79mm]"
      aria-label="Material sensitivity field"
    >
      <circle cx="195" cy="195" r="174" fill="#245b4c" />
      {[42, 82, 122].map((r) => (
        <circle
          key={r}
          cx="195"
          cy="195"
          r={r}
          fill="none"
          stroke="#f3efe4"
          strokeWidth="1"
          opacity=".28"
        />
      ))}
      <path d="M195 73 L291 151 L258 274 L148 301 L82 186 Z" fill="#d9ff57" opacity=".92" />
      <path
        d="M195 73 L195 195 L291 151 M195 195 L258 274 M195 195 L148 301 M195 195 L82 186"
        fill="none"
        stroke="#191b18"
        strokeWidth="2"
        opacity=".55"
      />
      <circle cx="195" cy="195" r="9" fill="#ec5b3f" />
      <g fill="#f3efe4" fontFamily="Arial" fontSize="10" fontWeight="700" letterSpacing="1.5">
        <text x="168" y="43">
          TACTILITY
        </text>
        <text x="306" y="152">
          CARBON
        </text>
        <text x="247" y="341">
          REPAIR
        </text>
        <text x="91" y="341">
          ENERGY
        </text>
        <text x="12" y="184">
          ORIGIN
        </text>
      </g>
    </svg>
  );
}

export function SpecimenGlyph({ index, foreground }: { index: number; foreground: string }) {
  if (index === 0)
    return (
      <svg viewBox="0 0 180 120" className="h-[28mm] w-full">
        <path
          d="M8 102C31 15 68 121 92 39s54 39 80-26"
          fill="none"
          stroke={foreground}
          strokeWidth="5"
        />
        <g fill={foreground}>
          {[20, 45, 70, 95, 120, 145].map((x, i) => (
            <circle key={x} cx={x} cy={88 - (i % 3) * 24} r={4 + i} />
          ))}
        </g>
      </svg>
    );
  if (index === 1)
    return (
      <svg viewBox="0 0 180 120" className="h-[28mm] w-full">
        <path d="M12 95L48 28l37 67 37-67 46 67Z" fill="none" stroke={foreground} strokeWidth="4" />
        <circle
          cx="90"
          cy="61"
          r="22"
          fill="none"
          stroke={foreground}
          strokeWidth="2"
          strokeDasharray="4 5"
        />
      </svg>
    );
  if (index === 2)
    return (
      <svg viewBox="0 0 180 120" className="h-[28mm] w-full">
        <g fill="none" stroke={foreground} strokeWidth="3">
          {[16, 34, 52, 70, 88].map((y, i) => (
            <path
              key={y}
              d={`M8 ${y} C45 ${y - 22 + i * 3} 78 ${y + 24 - i * 2} 112 ${y} S154 ${y - 15} 174 ${y + 4}`}
            />
          ))}
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 180 120" className="h-[28mm] w-full">
      <g stroke={foreground} strokeWidth="2">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M${15 + i * 21} 10L${55 + i * 12} 110`} />
        ))}
      </g>
      <path d="M12 96C55 54 109 77 169 20" fill="none" stroke={foreground} strokeWidth="7" />
    </svg>
  );
}
