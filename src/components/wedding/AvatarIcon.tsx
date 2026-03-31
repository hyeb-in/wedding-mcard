interface AvatarIconProps {
  seed?: number;
  size?: number;
}

// Thin line drawing SVG avatar
export function AvatarIcon({ seed = 0, size = 36 }: AvatarIconProps) {
  const bg = '#F5ECD7';
  const stroke = '#6B4226';
  // Vary hair/face slightly by seed
  const hairstyles = [
    // Short hair
    <path key="h0" d={`M${size*0.3},${size*0.32} Q${size*0.5},${size*0.15} ${size*0.7},${size*0.32}`} stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    // Long hair
    <path key="h1" d={`M${size*0.28},${size*0.32} Q${size*0.5},${size*0.12} ${size*0.72},${size*0.32} L${size*0.72},${size*0.65} Q${size*0.5},${size*0.72} ${size*0.28},${size*0.65} Z`} stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    // Medium hair
    <path key="h2" d={`M${size*0.3},${size*0.33} Q${size*0.5},${size*0.13} ${size*0.7},${size*0.33} L${size*0.72},${size*0.5} Q${size*0.5},${size*0.58} ${size*0.28},${size*0.5} Z`} stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  ];

  const hair = hairstyles[seed % hairstyles.length];
  const eyeOffset = seed % 2 === 0 ? 0 : 0.5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx={size/2} cy={size/2} r={size/2} fill={bg} />
      {/* Hair */}
      {hair}
      {/* Head */}
      <ellipse
        cx={size/2}
        cy={size*0.38}
        rx={size*0.18}
        ry={size*0.2}
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Eyes */}
      <circle cx={size*0.43 + eyeOffset} cy={size*0.37} r={size*0.025} fill={stroke} />
      <circle cx={size*0.57 + eyeOffset} cy={size*0.37} r={size*0.025} fill={stroke} />
      {/* Smile */}
      <path
        d={`M${size*0.43},${size*0.43} Q${size*0.5},${size*0.48} ${size*0.57},${size*0.43}`}
        stroke={stroke}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body / shoulders */}
      <path
        d={`M${size*0.28},${size*0.85} Q${size*0.28},${size*0.62} ${size*0.5},${size*0.6} Q${size*0.72},${size*0.62} ${size*0.72},${size*0.85}`}
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
