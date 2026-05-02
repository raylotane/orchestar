import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const OutroScene: React.FC<{
  sloganCn: string;
  productName: string;
}> = ({ sloganCn, productName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const contentY = interpolate(frame, [0, fps * 0.4], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaScale = interpolate(frame, [fps * 0.6, fps * 0.9], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif" }}>
          O
        </span>
      </div>

      {/* Main slogan */}
      <div
        style={{
          textAlign: "center",
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 6,
            margin: "0 0 16px 0",
          }}
        >
          {sloganCn}
        </h2>
        <p
          style={{
            fontSize: 20,
            color: "#a5b4fc",
            letterSpacing: 2,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {productName}
        </p>
      </div>

      {/* CTA button */}
      <div
        style={{
          marginTop: 48,
          transform: `scale(${ctaScale})`,
          opacity: interpolate(frame, [fps * 0.6, fps * 0.8], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <div
          style={{
            padding: "16px 48px",
            borderRadius: 50,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
            transform: `scale(${pulseScale})`,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 2,
            }}
          >
            开始创作 →
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "1px solid rgba(99, 102, 241, 0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "1px solid rgba(168, 85, 247, 0.1)",
        }}
      />
    </AbsoluteFill>
  );
};