import React, { useEffect, useState } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const ProductDemoScene: React.FC<{ inputText: string }> = ({ inputText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inputPhases = [
    { text: "打开 Orchestar，说出你的需求", duration: 40 },
    { text: "一个 AI 视频编排平台", duration: 50 },
    { text: "点击生成", duration: 30 },
  ];

  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let frameCount = 0;
    const phase = inputPhases[currentPhase];
    if (!phase) return;

    const interval = setInterval(() => {
      frameCount++;
      if (frameCount <= phase.duration && currentPhase < inputPhases.length) {
        const text = inputPhases[currentPhase].text;
        setDisplayText(text.slice(0, Math.floor((frameCount / phase.duration) * text.length)));
      } else if (currentPhase < inputPhases.length - 1) {
        setCurrentPhase((p) => p + 1);
        frameCount = 0;
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentPhase, fps]);

  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Browser window mock */}
      <div
        style={{
          width: 800,
          backgroundColor: "#1e1e2e",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          transform: `scale(${interpolate(frame, [0, fps * 0.3], [0.8, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.out(Easing.back(1.2)),
          })})`,
          opacity: interpolate(frame, [0, fps * 0.2], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        {/* Browser header */}
        <div
          style={{
            height: 40,
            backgroundColor: "#181825",
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            gap: 8,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 32 }}>
          {/* Input area */}
          <div
            style={{
              backgroundColor: "#313244",
              borderRadius: 8,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 18, color: "#cdd6f4" }}>
              {">"}
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#cdd6f4",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {displayText}
              {currentPhase < inputPhases.length - 1 && cursorVisible && (
                <span style={{ opacity: 1 }}>|</span>
              )}
            </span>
          </div>

          {/* Generate button */}
          {currentPhase >= 1 && (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: "12px 32px",
                  backgroundColor: "#6366f1",
                  borderRadius: 8,
                  opacity: interpolate(frame, [fps * 1, fps * 1.3], [0, 1], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                  }),
                  transform: `scale(${interpolate(frame, [fps * 1, fps * 1.3], [0.9, 1], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                    easing: Easing.out(Easing.back(1.2)),
                  })})`,
                }}
              >
                <span style={{ color: "#fff", fontWeight: 600 }}>生成视频</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mouse cursor animation */}
      {currentPhase >= 2 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${interpolate(frame, [fps * 0.8, fps * 1.5], [0, 0], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            })}px, ${interpolate(frame, [fps * 0.8, fps * 1.5], [0, 0], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            })}px)`,
            opacity: interpolate(frame, [fps * 0.8, fps * 1.0], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4L10 20L13 13L20 10L4 4Z"
              fill="#fff"
              stroke="#000"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};