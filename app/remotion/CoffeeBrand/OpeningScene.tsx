import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { CoffeeCup } from "./CoffeeCup";

export const OpeningScene: React.FC<{ brandName: string }> = ({ brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const textOpacity = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textY = interpolate(frame, [fps * 0.6, fps * 1.2], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subTextOpacity = interpolate(frame, [fps * 1.2, fps * 1.8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const decorLineScale = interpolate(frame, [fps * 0.8, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      className="flex-col justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #1a0e0a 0%, #2d1810 40%, #0d0705 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Decorative particles */}
      {[...Array(6)].map((_, i) => {
        const particleOpacity = interpolate(
          frame,
          [fps * (0.3 + i * 0.15), fps * (0.8 + i * 0.15)],
          [0, 0.15 + Math.random() * 0.1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const particleY = interpolate(
          frame,
          [fps * (0.3 + i * 0.15), fps * 3],
          [-50, 800],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.linear }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${15 + i * 14}%`,
              top: particleY,
              width: 4 + i,
              height: 4 + i,
              borderRadius: "50%",
              backgroundColor: "#C4A77D",
              opacity: particleOpacity,
            }}
          />
        );
      })}

      <CoffeeCup size={220} color="#8B6914" />

      <div
        style={{
          marginTop: 24,
          textAlign: "center",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#D4A574",
            letterSpacing: 16,
            fontFamily: "Georgia, serif",
            margin: 0,
          }}
        >
          {brandName}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 12,
          }}
        >
          <div
            style={{
              height: 1.5,
              width: 60 * decorLineScale,
              background: "linear-gradient(to right, transparent, #C4A77D)",
            }}
          />
          <span
            style={{
              fontSize: 16,
              color: "#A68B5B",
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: subTextOpacity,
              fontFamily: "Georgia, serif",
            }}
          >
            Specialty Coffee
          </span>
          <div
            style={{
              height: 1.5,
              width: 60 * decorLineScale,
              background: "linear-gradient(to left, transparent, #C4A77D)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
