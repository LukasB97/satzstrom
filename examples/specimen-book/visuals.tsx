import type { SpecimenData } from "./data";

export function CoverGlyph() {
  return (
    <svg
      viewBox="0 0 520 720"
      role="img"
      aria-label="Ten document forms assembled as one typographic glyph"
    >
      <defs>
        <linearGradient id="ten-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ff4b00" />
          <stop offset="1" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <path d="M48 92H212V670H130V176H48Z" fill="url(#ten-gradient)" />
      <path d="M270 92H476V176H354V328H460V410H354V586H480V670H270Z" fill="#2026ff" />
      <circle cx="240" cy="366" r="58" fill="#d5ff35" stroke="#101010" strokeWidth="6" />
      <path d="M0 250H520M0 480H520" stroke="#101010" strokeWidth="2" strokeDasharray="8 8" />
      {[118, 214, 310, 406].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={55 + i * 155} r="8" fill="#101010" />
          <text x={x + 14} y={59 + i * 155} fontSize="12" fontWeight="700">
            0{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function GeodesicDiagram() {
  return (
    <svg viewBox="0 0 520 270" role="img" aria-label="Geodesics bending across a curved surface">
      <defs>
        <radialGradient id="geo-surface">
          <stop stopColor="#e8ecff" />
          <stop offset="1" stopColor="#fff" />
        </radialGradient>
      </defs>
      <path
        d="M26 216C112 58 184 252 276 90S420 197 498 46V250H26Z"
        fill="url(#geo-surface)"
        stroke="#2637c9"
        strokeWidth="1.4"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${45 + i * 76} 236C${90 + i * 58} ${82 + i * 17} ${210 + i * 44} ${244 - i * 22} ${450 - i * 18} ${54 + i * 16}`}
          fill="none"
          stroke={i === 2 ? "#ff3f27" : "#2637c9"}
          strokeWidth={i === 2 ? 3 : 1}
          opacity={i === 2 ? 1 : 0.5}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx="260"
          cy={75 + i * 48}
          rx={210 - i * 31}
          ry={23 + i * 2}
          fill="none"
          stroke="#101010"
          strokeOpacity=".17"
        />
      ))}
      <circle cx="238" cy="130" r="6" fill="#ff3f27" />
      <circle cx="355" cy="155" r="6" fill="#2637c9" />
      <text x="246" y="120" fontSize="10">
        p
      </text>
      <text x="365" y="149" fontSize="10">
        q
      </text>
    </svg>
  );
}

export function EvidenceChart({ cities }: { cities: SpecimenData["cities"] }) {
  const points = cities.map((c, i) => ({
    x: 93.5 + i * 82,
    y: 230 - ((c.heat - 15) / 25) * 170,
  }));

  return (
    <svg viewBox="0 0 560 280" role="img" aria-label="Urban canopy and heat exposure comparison">
      <rect width="560" height="280" fill="#f6f0e2" />
      {[70, 115, 160, 205, 250].map((y) => (
        <line key={y} x1="54" y1={y} x2="526" y2={y} stroke="#1d1d1b" strokeOpacity=".14" />
      ))}
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#1d1d1b"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {cities.map((c, i) => {
        const x = 78 + i * 82;
        const bar = 250 - c.canopy * 4.5;
        const point = points[i];
        return (
          <g key={c.name}>
            <rect
              x={x}
              y={bar}
              width="31"
              height={250 - bar}
              fill={i === 4 ? "#e33422" : "#efb52b"}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="5.5"
              fill="#1d1d1b"
              stroke="#f6f0e2"
              strokeWidth="2"
            />
            <text x={x + 15.5} y="267" textAnchor="middle" fontSize="9" fontWeight="700">
              {c.name.slice(0, 3).toUpperCase()}
            </text>
            <text x={x + 15.5} y={bar - 7} textAnchor="middle" fontSize="8">
              {c.canopy}%
            </text>
          </g>
        );
      })}
      <rect x="54" y="13" width="14" height="8" fill="#efb52b" />
      <text x="74" y="21" fontSize="8" fontWeight="700">
        CANOPY COVER (%)
      </text>
      <line x1="397" y1="17" x2="421" y2="17" stroke="#1d1d1b" strokeWidth="2" />
      <circle cx="409" cy="17" r="4" fill="#1d1d1b" />
      <text x="429" y="20" fontSize="8" fontWeight="700">
        HEAT HOURS / YEAR
      </text>
      {[20, 30, 40].map((value) => {
        const y = 230 - ((value - 15) / 25) * 170;
        return (
          <g key={value}>
            <line x1="526" y1={y} x2="531" y2={y} stroke="#1d1d1b" />
            <text x="536" y={y + 3} fontSize="7">
              {value}h
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ParticleEvent() {
  const tracks = [
    { d: "M360 230C300 185 248 148 78 74", hit: [260.25, 162.88] },
    { d: "M360 230C276 241 181 263 55 346", hit: [223.25, 261] },
    { d: "M360 230C413 173 487 121 650 88", hit: [463.75, 150] },
    { d: "M360 230C427 245 531 270 680 350", hit: [489.25, 265.63] },
    { d: "M360 230C342 158 338 108 310 35", hit: [338.75, 132.88] },
    { d: "M360 230C377 292 400 340 448 418", hit: [392.38, 318] },
  ];
  return (
    <svg viewBox="0 0 720 455" role="img" aria-label="Particle collision event display">
      <rect width="720" height="455" fill="#050914" />
      {[62, 108, 154, 200].map((r) => (
        <circle key={r} cx="360" cy="230" r={r} fill="none" stroke="#22e4ff" strokeOpacity=".18" />
      ))}
      {[0, 30, 60, 90, 120, 150].map((a) => (
        <line
          key={a}
          x1="360"
          y1="230"
          x2={360 + 330 * Math.cos((a * Math.PI) / 180)}
          y2={230 + 330 * Math.sin((a * Math.PI) / 180)}
          stroke="#22e4ff"
          strokeOpacity=".08"
        />
      ))}
      {tracks.map(({ d }, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={i % 2 ? "#ff3dbb" : "#31f4a5"}
          strokeWidth={i === 0 ? 4 : 2.3}
        />
      ))}
      {tracks.map(({ hit: [x, y] }, i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#d5ff35" stroke="#050914" strokeWidth="1.5" />
      ))}
      <circle cx="360" cy="230" r="9" fill="white" />
      <text x="378" y="222" fill="white" fontSize="11">
        13.6 TeV
      </text>
    </svg>
  );
}

export function ProductForm() {
  return (
    <svg viewBox="0 0 440 520" role="img" aria-label="Sculptural portable speaker">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fafafa" />
          <stop offset=".45" stopColor="#b9bad4" />
          <stop offset="1" stopColor="#4b4d7c" />
        </linearGradient>
        <filter id="product-shadow">
          <feDropShadow dx="0" dy="18" stdDeviation="20" floodOpacity=".3" />
        </filter>
      </defs>
      <ellipse cx="230" cy="454" rx="145" ry="28" fill="#29304c" opacity=".25" />
      <g filter="url(#product-shadow)" transform="rotate(-8 220 260)">
        <rect x="96" y="64" width="248" height="380" rx="118" fill="url(#body)" />
        <circle cx="220" cy="236" r="89" fill="#191a31" />
        <circle
          cx="220"
          cy="236"
          r="72"
          fill="none"
          stroke="#a7ff5a"
          strokeWidth="2"
          strokeDasharray="2 5"
        />
        <circle cx="220" cy="236" r="28" fill="#a7ff5a" />
        <rect x="178" y="89" width="84" height="10" rx="5" fill="#fff" opacity=".65" />
        <circle cx="191" cy="404" r="7" fill="#191a31" />
        <circle cx="220" cy="404" r="7" fill="#191a31" />
        <circle cx="249" cy="404" r="7" fill="#191a31" />
      </g>
    </svg>
  );
}

export function RevenueChart({ values }: { values: SpecimenData["quarters"] }) {
  const max = Math.max(...values.map((v) => Math.max(v.actual, v.plan)));
  return (
    <svg viewBox="0 0 520 220" role="img" aria-label="Quarterly revenue against plan">
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1="35" y1={y} x2="505" y2={y} stroke="#d4d8d5" />
      ))}
      {values.map((v, i) => {
        const x = 58 + i * 74;
        const ah = (v.actual / max) * 155;
        const ph = (v.plan / max) * 155;
        return (
          <g key={v.label}>
            <rect x={x} y={190 - ah} width="25" height={ah} rx="2" fill="#0b6856" />
            <rect x={x + 29} y={190 - ph} width="11" height={ph} fill="#b9c3bd" />
            <text x={x + 20} y="211" textAnchor="middle" fontSize="8">
              {v.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BlueprintPlan() {
  return (
    <svg viewBox="0 0 980 460" role="img" aria-label="Cultural pavilion floor plan">
      <defs>
        <pattern id="blue-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity=".1" />
        </pattern>
      </defs>
      <rect width="980" height="460" fill="url(#blue-grid)" />
      <g fill="none" stroke="#fff">
        <path d="M80 70H810V380H80Z" strokeWidth="3" />
        <path d="M275 70V380M520 70V380M80 250H810M520 205H810" />
        <path d="M275 250Q330 185 395 250M520 205Q590 135 660 205" strokeDasharray="6 5" />
        <circle cx="690" cy="292" r="62" />
        <circle cx="690" cy="292" r="22" />
        <path d="M810 150H910V300H810" strokeWidth="2" />
      </g>
      <g fill="#fff" fontSize="13" fontFamily="sans-serif">
        <text x="105" y="105">
          GALLERY 01
        </text>
        <text x="302" y="105">
          FORUM
        </text>
        <text x="545" y="105">
          WORKSHOP
        </text>
        <text x="105" y="278">
          ARCHIVE
        </text>
        <text x="302" y="278">
          COURT
        </text>
        <text x="548" y="278">
          AUDITORIUM
        </text>
        <text x="832" y="175">
          SERVICE
        </text>
      </g>
      <g stroke="#ffcf45" fill="none">
        <path d="M65 55H825V395H65Z" />
        <path d="M80 420H810M80 413V427M810 413V427" />
      </g>
      <text x="445" y="440" fill="#ffcf45" fontSize="12" textAnchor="middle">
        73 000
      </text>
    </svg>
  );
}

export function BlueprintSection() {
  return (
    <svg viewBox="0 0 900 230" role="img" aria-label="Longitudinal building section">
      <defs>
        <pattern id="section-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" fill="none" stroke="#fff" strokeOpacity=".08" />
        </pattern>
      </defs>
      <rect width="900" height="230" fill="url(#section-grid)" />
      <g fill="none" stroke="#fff">
        <path
          d="M35 184H865M72 184V93L205 54 340 93 475 54 610 93 745 54 828 93V184"
          strokeWidth="3"
        />
        <path d="M72 133H828M205 54V184M340 93V184M475 54V184M610 93V184M745 54V184" />
        <path d="M35 198H865" strokeDasharray="4 5" />
      </g>
      <g fill="#ffcf45">
        <circle cx="205" cy="54" r="5" />
        <circle cx="475" cy="54" r="5" />
        <circle cx="745" cy="54" r="5" />
      </g>
      <g fill="#fff" fontSize="10">
        <text x="92" y="124">
          ENTRY
        </text>
        <text x="236" y="124">
          FORUM
        </text>
        <text x="374" y="124">
          COURT
        </text>
        <text x="515" y="124">
          HALL
        </text>
        <text x="651" y="124">
          STUDIO
        </text>
        <text x="770" y="124">
          BACKSTAGE
        </text>
      </g>
      <text x="35" y="218" fill="#ffcf45" fontSize="10">
        SECTION AA / 1 : 200
      </text>
    </svg>
  );
}

export function BookEtching() {
  return (
    <svg viewBox="0 0 360 260" role="img" aria-label="Mechanical bird among reeds">
      <g fill="none" stroke="#1c1a17" strokeWidth="1.2">
        <path d="M30 230C72 155 97 160 124 222M58 238C92 129 130 131 157 230M270 235C250 158 218 145 195 223M312 237C286 137 255 151 235 226" />
        <path d="M109 151C124 82 201 71 243 123C211 123 190 141 169 167C148 151 131 145 109 151Z" />
        <circle cx="209" cy="106" r="5" />
        <path d="M242 123 283 135 244 144M160 164 147 202M184 157 191 205M145 202h-15M191 205h17" />
        <path d="M129 128C79 103 58 86 31 53C83 59 123 76 164 101" />
        <path d="M150 104C105 53 97 31 88 12C137 37 170 62 185 92" />
      </g>
    </svg>
  );
}
