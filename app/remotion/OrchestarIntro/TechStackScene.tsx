import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const TechStackScene: React.FC<{
  techStack: Array<{ name: string; category: string }>;
}> = ({ techStack }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [fps * 0.2, fps * 0.5], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 4,
            margin: 0,
          }}
        >
          技术栈
        </h2>
        <div
          style={{
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            margin: "16px auto 0",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Tech stack grid */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          width: 900,
        }}
      >
        {techStack.map((tech, index) => {
          const delay = fps * 0.3 + index * 0.1 * fps;
          const itemOpacity = interpolate(
            frame,
            [delay, delay + fps * 0.3],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const itemScale = interpolate(
            frame,
            [delay, delay + fps * 0.3],
            [0.8, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.back(1.5)) }
          );
          const itemY = interpolate(
            frame,
            [delay, delay + fps * 0.3],
            [30, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) }
          );

          const categoryColors: Record<string, string> = {
            "框架": "#6366f1",
            "UI": "#8b5cf6",
            "动画": "#ec4899",
            "AI": "#f59e0b",
            "样式": "#06b6d4",
            "类型": "#10b981",
          };
          const color = categoryColors[tech.category] || "#6366f1";

          return (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                borderRadius: 16,
                padding: "24px 32px",
                textAlign: "center",
                border: `1px solid rgba(255,255,255,0.1)`,
                backdropFilter: "blur(10px)",
                opacity: itemOpacity,
                transform: `scale(${itemScale}) translateY(${itemY}px)`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 20,
                  backgroundColor: `${color}20`,
                  color: color,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 12,
                  letterSpacing: 1,
                }}
              >
                {tech.category}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                {tech.name}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Bottom decorative line */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};