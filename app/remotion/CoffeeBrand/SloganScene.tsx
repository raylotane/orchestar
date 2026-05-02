import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const SloganScene: React.FC<{ tagline: string }> = ({ tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split tagline into words for staggered animation
  const words = tagline?.split("，");

  return (
    <AbsoluteFill
      className="justify-center items-center"
      style={{
        background: "linear-gradient(160deg, #0f0704 0%, #1e110b 50%, #0a0503 100%)",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(196, 167, 125, 0.06)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(196, 167, 125, 0.04)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {words?.map((word, index) => {
          const wordOpacity = interpolate(
            frame,
            [fps * (0.4 + index * 0.7), fps * (1.1 + index * 0.7)],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
          );
          const wordY = interpolate(
            frame,
            [fps * (0.4 + index * 0.7), fps * (1.1 + index * 0.7)],
            [25, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) }
          );

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: index === 0 ? 52 : 56,
                    fontWeight: index === 0 ? 400 : 700,
                    color: index === 0 ? "#A68B5B" : "#E8D5B7",
                    fontFamily: "Georgia, serif",
                    fontStyle: index === 0 ? "italic" : "normal",
                    letterSpacing: index === 0 ? 8 : 4,
                  }}
                >
                  {word}
                  {index === 0 && "，"}
                </span>
              </div>
              {index === 0 && (
                <div
                  style={{
                    height: 2,
                    width: 120,
                    margin: "24px auto 0",
                    background: "linear-gradient(to right, transparent, #C4A77D, transparent)",
                    opacity: wordOpacity,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Decorative coffee beans */}
        {[...Array(3)].map((_, i) => {
          const beanOpacity = interpolate(
            frame,
            [fps * 2, fps * 2.8],
            [0, 0.2],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const beanRotation = interpolate(frame, [0, fps * 4], [0, 360], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          });
          const positions = [
            { left: "15%", top: "25%" },
            { right: "12%", bottom: "30%" },
            { left: "20%", bottom: "20%" },
          ];
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                ...positions[i] as React.CSSProperties,
                opacity: beanOpacity,
                transform: `rotate(${beanRotation + i * 120}deg)`,
              }}
            >
              <svg width="36" height="44" viewBox="0 0 60 60" fill="none">
                <ellipse cx="30" cy="30" rx="22" ry="28" fill="#4A2511" transform="rotate(-15 30 30)" opacity="0.5" />
                <path d="M22 12 Q28 30 20 48" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
              </svg>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
