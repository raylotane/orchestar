import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * 开场口号场景
 * 展示品牌 slogan，营造开场氛围
 */
export const OpeningSloganScene: React.FC<{
  sloganEn: string;
  sloganCn?: string;
  brandName?: string;
}> = ({ sloganEn, sloganCn, brandName = "ORCHESTAR" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const contentOpacity = interpolate(frame, [fps * 0.3, fps * 0.8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const contentY = interpolate(frame, [fps * 0.3, fps * 0.8], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineScale = interpolate(frame, [fps * 0.6, fps * 1.0], [0, 1], {
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
      {/* Animated grid background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: `rgba(99, 102, 241, ${interpolate(
                frame,
                [fps * 0.2, fps * 0.5, fps * 2],
                [0, 0.06, 0.02],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              )})`,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              left: `${i * 5}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(99, 102, 241, 0.04)",
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
          transform: `translate(-50%, -50%)`,
          opacity: contentOpacity,
          textAlign: "center",
        }}
      >
        {/* Brand name */}
        <div
          style={{
            marginBottom: 24,
            letterSpacing: 8,
            fontSize: 18,
            color: "#6366f1",
            fontWeight: 600,
            opacity: interpolate(frame, [fps * 0.4, fps * 0.7], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
          }}
        >
          {brandName}
        </div>

        {/* English slogan */}
        <div
          style={{
            transform: `translateY(${contentY}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#ffffff",
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
            marginBottom: sloganCn ? 16 : 0,
            opacity: lineScale,
          }}
        >
          <div
            style={{
              height: 1,
              width: 80,
              background: "linear-gradient(to right, transparent, #6366f1)",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
            }}
          />
          <div
            style={{
              height: 1,
              width: 80,
              background: "linear-gradient(to left, transparent, #6366f1)",
            }}
          />
        </div>

        {/* Chinese slogan */}
        {sloganCn && (
          <div
            style={{
              opacity: interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [fps * 0.8, fps * 1.2], [20, 0], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
                easing: Easing.out(Easing.cubic),
              })}px)`,
            }}
          >
            <span
              style={{
                fontSize: 28,
                color: "#a5b4fc",
                letterSpacing: 6,
              }}
            >
              {sloganCn}
            </span>
          </div>
        )}
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => {
        const particleOpacity = interpolate(
          frame,
          [fps * (0.2 + i * 0.08), fps * (0.6 + i * 0.08)],
          [0, 0.5],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const particleY = interpolate(
          frame,
          [fps * (0.2 + i * 0.08), fps * 3],
          [-20, 800],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.linear }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${8 + i * 6}%`,
              top: particleY,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
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