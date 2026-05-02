import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const PainPointScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { emoji: "😫", text: "找设计师" },
    { emoji: "⏳", text: "等排期" },
    { emoji: "📝", text: "改稿..." },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          transform: `scale(${interpolate(frame, [0, fps * 0.3], [0.5, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.out(Easing.back(1.5)),
          })})`,
          opacity: interpolate(frame, [0, fps * 0.2], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        {items.map((item, index) => {
          const itemOpacity = interpolate(frame, [fps * 0.1 + index * 0.05 * fps, fps * 0.3 + index * 0.05 * fps], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const itemY = interpolate(frame, [fps * 0.1 + index * 0.05 * fps, fps * 0.3 + index * 0.05 * fps], [30, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              <span style={{ fontSize: 48 }}>{item.emoji}</span>
              <span
                style={{
                  fontSize: 20,
                  color: "#888888",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          opacity: interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: "#ff6b6b",
            fontWeight: 600,
          }}
        >
          几天？一周？
        </span>
      </div>
    </AbsoluteFill>
  );
};