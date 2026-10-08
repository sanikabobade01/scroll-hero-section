const WHEEL_CENTERS = [112, 368];
const WHEEL_RADIUS = 24;
const SPOKE_ANGLES = [0, 72, 144, 216, 288];

export const CAR_VIEWBOX_WIDTH = 480;
export const CAR_WHEEL_RADIUS = WHEEL_RADIUS;

/** Side-view vector car. Wheel groups are tagged so they can spin with scroll. */
export default function Car() {
  return (
    <svg
      viewBox={`0 0 ${CAR_VIEWBOX_WIDTH} 140`}
      role="img"
      aria-label="A blue car driving"
      className="block h-auto w-full overflow-visible"
    >
      <ellipse cx="240" cy="134" rx="205" ry="6" fill="#000" opacity="0.28" />

      <path
        d="M24 102C24 90 30 84 46 80L110 70C134 46 170 34 214 34H292C330 34 360 56 384 72L430 80C450 83 458 92 458 104V112H24Z"
        fill="var(--color-cobalt)"
      />
      <path
        d="M46 80L110 70C134 46 170 34 214 34H292C330 34 360 56 384 72L430 80C450 83 458 92 458 104"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <path
        d="M126 70C146 50 176 42 214 42H254V70Z"
        fill="#d6e4ff"
        opacity="0.92"
      />
      <path
        d="M264 42H292C318 42 340 58 358 70H264Z"
        fill="#d6e4ff"
        opacity="0.92"
      />
      <rect x="40" y="88" width="14" height="6" rx="3" fill="#ff5a4d" />
      <rect x="440" y="88" width="14" height="7" rx="3.5" fill="#fff4c2" />
      <path d="M262 74V104" stroke="#0f1b2d" strokeOpacity="0.35" strokeWidth="2" />

      {WHEEL_CENTERS.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="108" r="30" fill="var(--color-asphalt)" />
          <g data-wheel>
            <circle cx={cx} cy="108" r={WHEEL_RADIUS} fill="#0b0f16" />
            <circle cx={cx} cy="108" r="14" fill="#c9d3e0" />
            {SPOKE_ANGLES.map((angle) => (
              <line
                key={angle}
                x1={cx}
                y1="108"
                x2={cx}
                y2="96"
                stroke="#5d6b80"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${angle} ${cx} 108)`}
              />
            ))}
            <circle cx={cx} cy="108" r="3.5" fill="#5d6b80" />
          </g>
        </g>
      ))}
    </svg>
  );
}
