export function OrbitMark() {
  return (
    <svg
      className="orbit-mark"
      viewBox="0 0 500 500"
      role="img"
      aria-label="Abstrakte Umlaufbahnen um einen Stern"
    >
      <circle cx="250" cy="250" r="72" fill="#f97316" opacity=".08" />
      <circle cx="250" cy="250" r="42" fill="#fb923c" opacity=".15" />
      <circle cx="250" cy="250" r="16" fill="#fbd38d" />
      {[98, 146, 198].map((r, i) => (
        <ellipse
          key={r}
          cx="250"
          cy="250"
          rx={r}
          ry={r * 0.43}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 1 ? 2 : 1}
          opacity={0.24 + i * 0.12}
          transform={`rotate(${i * 31 - 18} 250 250)`}
        />
      ))}
      <path
        d="M62 299 C148 101 355 78 444 250 C354 387 179 427 62 299Z"
        fill="none"
        stroke="#fb923c"
        strokeWidth="3"
        strokeDasharray="4 12"
      />
      <circle cx="101" cy="240" r="7" fill="#67e8f9" />
      <circle cx="410" cy="288" r="5" fill="#fb923c" />
    </svg>
  );
}

export function TransferPlot() {
  return (
    <svg
      className="transfer-plot"
      viewBox="0 0 760 330"
      role="img"
      aria-label="Transferbahn mit vier planetaren Umlaufbahnen"
    >
      <defs>
        <linearGradient id="transfer" x1="0" x2="1">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <g transform="translate(380 165)">
        {[48, 83, 126, 158].map((r) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke="#a7b4c8"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
        ))}
        <circle r="12" fill="#f59e0b" />
        <path
          d="M-151 46 C-74 -149 122 -118 153 37 C97 93 -29 129 -151 46Z"
          fill="none"
          stroke="url(#transfer)"
          strokeWidth="5"
        />
        <circle cx="-145" cy="45" r="7" fill="#22d3ee" />
        <circle cx="146" cy="35" r="7" fill="#fb923c" />
        <g fill="#31405a" fontSize="12">
          <text x="18" y="-37">
            LUNA
          </text>
          <text x="89" y="-87">
            VENUS
          </text>
          <text x="127" y="-118">
            JUPITER
          </text>
          <text x="-188" y="73">
            ASTERION
          </text>
        </g>
      </g>
    </svg>
  );
}

const stars = [
  [80, 74, 5],
  [152, 184, 3],
  [214, 102, 4],
  [286, 240, 6],
  [352, 75, 3],
  [416, 166, 5],
  [504, 110, 4],
  [566, 239, 3],
  [642, 67, 6],
  [728, 175, 4],
  [806, 103, 3],
  [884, 226, 5],
  [963, 79, 4],
  [1042, 170, 7],
] as const;

export function ConstellationMap() {
  return (
    <svg
      className="constellation"
      viewBox="0 0 1120 330"
      role="img"
      aria-label="Navigationsnetz zwischen vierzehn Sternen"
    >
      <defs>
        <linearGradient id="route" x1="0" x2="1">
          <stop stopColor="#22d3ee" />
          <stop offset=".55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      <g stroke="#263650" strokeWidth="1">
        {stars.slice(0, -1).map((s, i) => (
          <line key={i} x1={s[0]} y1={s[1]} x2={stars[i + 1][0]} y2={stars[i + 1][1]} />
        ))}
      </g>
      <path
        d="M80 74 L214 102 L286 240 L416 166 L504 110 L642 67 L728 175 L884 226 L963 79 L1042 170"
        fill="none"
        stroke="url(#route)"
        strokeWidth="4"
      />
      {stars.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r + 6} fill="#0b1323" stroke="#33445f" />
          <circle
            cx={x}
            cy={y}
            r={r}
            fill={i === 0 ? "#22d3ee" : i === stars.length - 1 ? "#fb923c" : "#f8fafc"}
          />
          <text x={x + 11} y={y - 10} fill="#8fa0ba" fontSize="10">
            N-{String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SignalWave() {
  const bars = [
    14, 26, 42, 20, 62, 78, 35, 52, 88, 69, 31, 48, 76, 59, 24, 41, 67, 82, 55, 30, 46, 72, 38, 18,
  ];
  return (
    <svg
      className="signal-wave"
      viewBox="0 0 720 160"
      role="img"
      aria-label="Dekodiertes Signalspektrum"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 30 + 5}
          y={80 - h / 2}
          width="12"
          height={h}
          rx="6"
          fill={i % 5 === 0 ? "#f97316" : "#0e7490"}
          opacity={0.55 + (i % 4) * 0.12}
        />
      ))}
    </svg>
  );
}
