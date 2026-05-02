import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * 传统痛点 vs 现在 场景
 * 左右对比展示痛点与解决方案
 */
export const ContrastScene: React.FC<{
  painPoint: string;
  painPointEmoji?: string;
  solution: string;
  solutionEmoji?: string;
  painPointSub?: string;
  solutionSub?: string;
}> = ({
  painPoint,
  painPointEmoji = "😫",
  solution,
  solutionEmoji = "🚀",
  painPointSub,
  solutionSub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Left side (pain point) animation
  const leftOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const leftX = interpolate(frame, [fps * 0.2, fps * 0.5], [-50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Right side (solution) animation
  const rightOpacity = interpolate(frame, [fps * 0.4, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const rightX = interpolate(frame, [fps * 0.4, fps * 0.7], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // VS animation
  const vsOpacity = interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const vsScale = interpolate(frame, [fps * 0.5, fps * 0.8], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // Arrow animation
  const arrowOpacity = interpolate(frame, [fps * 0.6, fps * 1.0], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f23 100%)",
        opacity: bgOpacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Left: Pain Point */}
        <div
          style={{
            opacity: leftOpacity,
            transform: `translateX(${leftX}px)`,
            textAlign: "center",
            padding: "40px 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            minWidth: 280,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>{painPointEmoji}</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fca5a5",
              marginBottom: 8,
            }}
          >
            {painPoint}
          </div>
          {painPointSub && (
            <div
              style={{
                fontSize: 16,
                color: "rgba(252, 165, 165, 0.6)",
              }}
            >
              {painPointSub}
            </div>
          )}
          <div
            style={{
              marginTop: 16,
              fontSize: 14,
              color: "rgba(239, 68, 68, 0.6)",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            传统方式
          </div>
        </div>

        {/* VS */}
        <div
          style={{
            opacity: vsOpacity,
            transform: `scale(${vsScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 900,
              color: "#ffffff",
              boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
            }}
          >
            VS
          </div>
          <div
            style={{
              opacity: arrowOpacity,
              fontSize: 32,
              color: "#6366f1",
            }}
          >
            →
          </div>
        </div>

        {/* Right: Solution */}
        <div
          style={{
            opacity: rightOpacity,
            transform: `translateX(${rightX}px)`,
            textAlign: "center",
            padding: "40px 32px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            minWidth: 280,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>{solutionEmoji}</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#86efac",
              marginBottom: 8,
            }}
          >
            {solution}
          </div>
          {solutionSub && (
            <div
              style={{
                fontSize: 16,
                color: "rgba(134, 239, 172, 0.6)",
              }}
            >
              {solutionSub}
            </div>
          )}
          <div
            style={{
              marginTop: 16,
              fontSize: 14,
              color: "rgba(34, 197, 94, 0.6)",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Orchestar
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: 4,
          }}
        >
          一句话的功夫，交给 AI
        </span>
      </div>
    </AbsoluteFill>
  );
};