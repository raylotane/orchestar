import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const ContrastTitleScene: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgProgress = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textScale = interpolate(frame, [fps * 0.3, fps * 0.6], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const textOpacity = interpolate(frame, [fps * 0.3, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a0e0a 0%, #D4A574 ${bgProgress * 100}%, #f5e6d3 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${textScale})`,
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#2d1810",
            letterSpacing: 4,
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};