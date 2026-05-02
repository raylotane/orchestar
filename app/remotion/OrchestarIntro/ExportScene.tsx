import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const ExportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [fps * 0.2, fps * 1.2], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const isComplete = progress >= 100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            marginBottom: 32,
            opacity: interpolate(frame, [0, fps * 0.3], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
            transform: `scale(${interpolate(frame, [0, fps * 0.3], [0.5, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.out(Easing.back(1.2)),
            })})`,
          }}
        >
          {isComplete ? (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)",
              }}
            >
              <span style={{ fontSize: 48 }}>✓</span>
            </div>
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#6366f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 48 }}>🎬</span>
            </div>
          )}
        </div>

        {/* Text */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          一键导出 MP4
        </span>

        {/* Progress bar */}
        <div
          style={{
            width: 400,
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: 8,
              backgroundColor: "#313244",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: isComplete ? "#10b981" : "#6366f1",
                borderRadius: 4,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>

        {/* Percentage */}
        <span
          style={{
            fontSize: 18,
            color: isComplete ? "#10b981" : "#a5b4fc",
            fontWeight: 600,
          }}
        >
          {isComplete ? "完成 ✓" : `${Math.round(progress)}%`}
        </span>
      </div>
    </AbsoluteFill>
  );
};