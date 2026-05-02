import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const ClosingScene: React.FC<{
  productName: string;
  sloganEn: string;
  website: string;
}> = ({ productName, sloganEn, website }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const contentOpacity = interpolate(frame, [fps * 0.3, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const contentY = interpolate(frame, [fps * 0.3, fps * 0.6], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaOpacity = interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaScale = interpolate(frame, [fps * 0.8, fps * 1.2], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${contentY}px)`,
          textAlign: "center",
          opacity: contentOpacity,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 100,
            height: 100,
            margin: "0 auto 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 80px rgba(99, 102, 241, 0.5)",
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 900, color: "#fff", fontFamily: "Georgia, serif" }}>
            O
          </span>
        </div>

        {/* Product name */}
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 6,
            margin: "0 0 16px 0",
          }}
        >
          {productName}
        </h2>

        {/* Slogan */}
        <p
          style={{
            fontSize: 20,
            color: "#a5b4fc",
            letterSpacing: 2,
            margin: "0 0 48px 0",
            fontStyle: "italic",
          }}
        >
          {sloganEn}
        </p>

        {/* CTA button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "16px 48px",
              borderRadius: 50,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
              cursor: "pointer",
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
              立即体验
            </span>
          </div>
        </div>
      </div>

      {/* Website */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: ctaOpacity,
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 2,
          }}
        >
          {website}
        </span>
      </div>

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "20%",
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
          bottom: "15%",
          right: "15%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "1px solid rgba(168, 85, 247, 0.1)",
        }}
      />
    </AbsoluteFill>
  );
};