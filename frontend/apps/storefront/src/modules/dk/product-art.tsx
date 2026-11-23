type Props = { kind: string; id: string; className?: string }

/** Original schematic artwork. Not a product photo or an approved package design. */
export default function ProductArt({ kind, id, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 340"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}-bottle`}
          x1="85"
          y1="80"
          x2="230"
          y2="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4d5531" />
          <stop offset=".45" stopColor="#7d834f" />
          <stop offset="1" stopColor="#343c26" />
        </linearGradient>
        <linearGradient
          id={`${id}-solid`}
          x1="80"
          y1="90"
          x2="220"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e4bf9f" />
          <stop offset="1" stopColor="#b68d70" />
        </linearGradient>
        <linearGradient
          id={`${id}-jar`}
          x1="80"
          y1="120"
          x2="230"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a18665" />
          <stop offset=".6" stopColor="#c3a882" />
          <stop offset="1" stopColor="#81684e" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="295" rx="78" ry="12" fill="#253d2c" opacity=".1" />
      {kind === "detergent" ? (
        <>
          <path
            d="M126 55h48v45l29 24c8 7 12 18 12 29v117c0 11-9 20-20 20h-90c-11 0-20-9-20-20V153c0-11 4-22 12-29l29-24V55Z"
            fill={`url(#${id}-bottle)`}
          />
          <rect x="119" y="44" width="62" height="37" rx="5" fill="#203b2d" />
          <path
            d="M128 50v24m9-24v24m9-24v24m9-24v24m9-24v24m9-24v24"
            stroke="#47604c"
            strokeWidth="2"
          />
          <path
            d="M100 146c0-15 12-27 22-33"
            stroke="#b4b78c"
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".6"
          />
          <rect x="85" y="167" width="130" height="91" fill="#f1eee1" />
          <text
            x="105"
            y="198"
            fill="#244331"
            fontSize="24"
            fontFamily="Georgia, serif"
          >
            dk.
          </text>
          <text x="105" y="219" fill="#244331" fontSize="8" letterSpacing="1.6">
            HOGAR / DEMO
          </text>
          <path d="M105 235h50" stroke="#9caa91" />
        </>
      ) : kind === "shampoo" ? (
        <>
          <g transform="rotate(-16 150 200)">
            <rect
              x="71"
              y="111"
              width="158"
              height="167"
              rx="58"
              fill="#a78065"
            />
            <rect
              x="70"
              y="101"
              width="158"
              height="167"
              rx="58"
              fill={`url(#${id}-solid)`}
            />
            <path
              d="M90 158c3-24 18-39 38-41"
              stroke="#eed3b8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M107 158c18-19 57-20 79 1m-81 18c24-15 57-15 82 0m-80 18c22-12 52-12 75-1"
              stroke="#a97e61"
              strokeWidth="2"
              opacity=".6"
            />
            <rect x="69" y="194" width="160" height="47" fill="#ece6d5" />
            <text
              x="90"
              y="224"
              fill="#344b3a"
              fontSize="22"
              fontFamily="Georgia, serif"
            >
              dk.
            </text>
            <text x="136" y="220" fill="#344b3a" fontSize="7" letterSpacing="1">
              SÓLIDO / DEMO
            </text>
          </g>
        </>
      ) : (
        <>
          <rect
            x="81"
            y="119"
            width="138"
            height="165"
            rx="19"
            fill={`url(#${id}-jar)`}
          />
          <path d="M94 148h112v112H94z" fill="#c9baa2" />
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={103 + (i % 6) * 18}
              cy={151 + Math.floor(i / 6) * 19}
              r={5 + (i % 3)}
              fill={i % 2 ? "#e2d9c8" : "#b8a58b"}
            />
          ))}
          <rect x="77" y="101" width="146" height="31" rx="7" fill="#374b37" />
          <rect x="80" y="197" width="140" height="66" fill="#f0eadc" />
          <text
            x="98"
            y="226"
            fill="#344b3a"
            fontSize="24"
            fontFamily="Georgia, serif"
          >
            dk.
          </text>
          <text x="99" y="244" fill="#344b3a" fontSize="8" letterSpacing="1.5">
            BAÑO / DEMO
          </text>
          <path
            d="M94 138v48"
            stroke="#e8ddc8"
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".5"
          />
        </>
      )}
    </svg>
  )
}
