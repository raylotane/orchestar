import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const SCENES = ["开场", "特色", "预览", "导出"];

export const AIArrangeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Emoji transition */}
      <div
        style={{
          position: "absolute",
          top: 80,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: interpolate(frame, [0, fps * 0.4], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <span style={{ fontSize: 40 }}>🧩</span>
        <span style={{ fontSize: 24, color: "#6366f1" }}>→</span>
        <span style={{ fontSize: 40 }}>✨</span>
      </div>

      {/* Text */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          AI 自动匹配场景模板
        </span>
        <br />
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#a5b4fc",
          }}
        >
          排列顺序
        </span>
      </div>

      {/* Timeline visualization */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "32px 48px",
          backgroundColor: "#1e1e2e",
          borderRadius: 16,
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 100,
            right: 100,
            height: 4,
            backgroundColor: "#313244",
            borderRadius: 2,
          }}
        />

        {SCENES.map((scene, index) => {
          const delay = fps * 0.3 + index * 0.2 * fps;
          const isActive = frame >= delay;

          const itemScale = isActive ? 1 : 0.8;
          const itemOpacity = isActive ? 1 : 0.4;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transform: `scale(${itemScale})`,
                opacity: itemOpacity,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: isActive ? "#6366f1" : "#313244",
                  boxShadow: isActive ? "0 0 20px rgba(99, 102, 241, 0.5)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>
                  {scene}
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: isActive ? "#a5b4fc" : "#666",
                }}
              >
                Scene {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};