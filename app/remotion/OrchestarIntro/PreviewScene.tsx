import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const PreviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPlaying = frame > fps * 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Player mock */}
      <div
        style={{
          width: 700,
          backgroundColor: "#1e1e2e",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Video area */}
        <div
          style={{
            height: 400,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Playing animation */}
          {isPlaying && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                opacity: interpolate(frame, [fps * 0.5, fps * 1.5], [0.3, 1], {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                }),
              }}
            />
          )}

          {/* Play button or playing indicator */}
          {!isPlaying ? (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "rgba(99, 102, 241, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
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
              <span style={{ fontSize: 32, color: "#fff" }}>▶️</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 64 }}>🎬</span>
              <span style={{ fontSize: 18, color: "#fff", fontWeight: 600 }}>
                Orchestar · 灵阵
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 24 }}>▶️</span>
          <div
            style={{
              flex: 1,
              height: 6,
              backgroundColor: "#313244",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: isPlaying
                  ? `${interpolate(frame, [fps * 0.5, fps * 1.5], [0, 100], {
                      extrapolateRight: "clamp",
                      extrapolateLeft: "clamp",
                    })}%`
                  : "0%",
                height: "100%",
                backgroundColor: "#6366f1",
                borderRadius: 3,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <span style={{ fontSize: 14, color: "#888" }}>0:15</span>
        </div>
      </div>

      {/* Text overlay */}
      <div
        style={{
          marginTop: 32,
          textAlign: "center",
          opacity: interpolate(frame, [fps * 0.3, fps * 0.6], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
          <span style={{ fontSize: 28 }}>▶️</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            实时预览，对话修改
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};