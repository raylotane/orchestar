import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const CoffeeCup: React.FC<{ size?: number; color?: string }> = ({
  size = 200,
  color = "#8B4513",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [0, fps * 0.8], [0.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const rotation = interpolate(frame, [0, fps * 1.2], [-15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const steamOpacity = interpolate(
    frame,
    [fps * 0.5, fps * 1, fps * 1.5],
    [0, 0.6, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const steamY = interpolate(frame, [fps * 0.5, fps * 1.5], [10, -30], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Saucer */}
        <ellipse cx="100" cy="175" rx="70" ry="12" fill="#A0522D" opacity="0.6" />
        {/* Cup body */}
        <path
          d="M50 80 C50 80 45 150 60 165 C75 180 125 180 140 165 C155 150 150 80 150 80"
          fill={color}
          stroke="#5D2E0C"
          strokeWidth="2"
        />
        {/* Cup top opening */}
        <ellipse cx="100" cy="80" rx="50" ry="14" fill="#3E1E08" />
        {/* Coffee inside */}
        <ellipse cx="100" cy="83" rx="44" ry="10" fill="#2C1810" />
        {/* Highlight */}
        <path
          d="M62 95 C62 130 67 155 75 160"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Handle */}
        <path
          d="M148 100 C175 100 180 135 155 145"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 105 C170 105 173 132 154 140"
          stroke="#5D2E0C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Steam */}
        <g style={{ opacity: steamOpacity, transform: `translateY(${steamY}px)` }}>
          <path
            d="M85 65 Q80 45 90 25 Q95 10 88 -5"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 60 Q105 40 98 20 Q93 5 100 -10"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M115 65 Q110 45 120 25 Q115 10 122 -5"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export const CoffeeBeanIcon: React.FC<{ size?: number }> = ({ size = 60 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="30" rx="22" ry="28" fill="#4A2511" transform="rotate(-15 30 30)" />
      <path
        d="M22 12 Q28 30 20 48"
        stroke="#2C1810"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 14 Q32 32 40 46"
        stroke="#2C1810"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Shine */}
      <ellipse cx="24" cy="18" rx="4" ry="6" fill="rgba(255,255,255,0.15)" transform="rotate(-15 24 18)" />
    </svg>
  );
};
