import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const OpeningScene: React.FC<{
  productName: string;
  sloganEn: string;
  sloganCn: string;
}> = ({ productName, sloganEn, sloganCn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const logoScale = interpolate(frame, [fps * 0.3, fps * 0.8], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const logoOpacity = interpolate(frame, [fps * 0.3, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const sloganEnOpacity = interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const sloganEnY = interpolate(frame, [fps * 0.8, fps * 1.2], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const sloganCnOpacity = interpolate(frame, [fps * 1.0, fps * 1.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const sloganCnY = interpolate(frame, [fps * 1.0, fps * 1.4], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const decorLineScale = interpolate(frame, [fps * 1.2, fps * 1.6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Animated background grid */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(20)].map((_, i) => {
          const lineOpacity = interpolate(
            frame,
            [fps * 0.2, fps * 0.5, fps * 2],
            [0, 0.08, 0.03],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          return (
            <div
              key={`h-${i}`}
              style={{
                position: "absolute",
                top: `${i * 5}%`,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: `rgba(99, 102, 241, ${lineOpacity})`,
              }}
            />
          );
        })}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              left: `${i * 5}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: `rgba(99, 102, 241, 0.05)`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          opacity: logoOpacity,
          textAlign: "center",
        }}
      >
        {/* Logo icon - stylized "O" */}
        <div
          style={{
            width: 120,
            height: 120,
            margin: "0 auto 24px",
            borderRadius: "30px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <span style={{ fontSize: 60, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif" }}>
            O
          </span>
        </div>

        {/* Product name */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 8,
            margin: "0 0 16px 0",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {productName}
        </h1>

        {/* English slogan */}
        <div
          style={{
            opacity: sloganEnOpacity,
            transform: `translateY(${sloganEnY}px)`,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#a5b4fc",
              letterSpacing: 4,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {sloganEn}
          </span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: 1,
              width: 80 * decorLineScale,
              background: "linear-gradient(to right, transparent, #6366f1)",
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
            }}
          />
          <div
            style={{
              height: 1,
              width: 80 * decorLineScale,
              background: "linear-gradient(to left, transparent, #6366f1)",
            }}
          />
        </div>

        {/* Chinese slogan */}
        <div
          style={{
            opacity: sloganCnOpacity,
            transform: `translateY(${sloganCnY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              color: "#c4b5fd",
              letterSpacing: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {sloganCn}
          </span>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => {
        const particleOpacity = interpolate(
          frame,
          [fps * (0.2 + i * 0.1), fps * (0.6 + i * 0.1)],
          [0, 0.6],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const particleY = interpolate(
          frame,
          [fps * (0.2 + i * 0.1), fps * 3],
          [-20, 800],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.linear }
        );
        const particleX = interpolate(
          frame,
          [0, fps * 2],
          [0, (i % 2 === 0 ? 1 : -1) * 30],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${10 + i * 7 + particleX}%`,
              top: particleY,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? "#6366f1" : "#a855f7",
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};