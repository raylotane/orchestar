import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * 卖点逐个展示场景
 * 依次展示多个核心卖点
 */
export const FeaturesListScene: React.FC<{
  features: Array<{
    icon: string;
    title: string;
    desc?: string;
  }>;
  title?: string;
}> = ({ features, title = "核心能力" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const featureColors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [0, fps * 0.4], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [0, fps * 0.4], [20, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.out(Easing.cubic),
          })}px)`,
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
          {title}
        </h2>
        <div
          style={{
            width: 60,
            height: 3,
            background: "linear-gradient(90deg, #6366f1, #ec4899)",
            margin: "16px auto 0",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Features */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "90%",
          maxWidth: 900,
        }}
      >
        {features.map((feature, index) => {
          const delay = fps * 0.3 + index * 0.25 * fps;
          const itemOpacity = interpolate(
            frame,
            [delay, delay + fps * 0.4],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const itemX = interpolate(
            frame,
            [delay, delay + fps * 0.4],
            [index % 2 === 0 ? -80 : 80, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) }
          );
          const color = featureColors[index % featureColors.length];

          return (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 20,
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: "blur(10px)",
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
                  border: `1px solid ${color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 4px 0",
                  }}
                >
                  {feature.title}
                </h3>
                {feature.desc && (
                  <p
                    style={{
                      fontSize: 16,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}
                  >
                    {feature.desc}
                  </p>
                )}
              </div>

              {/* Indicator */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};