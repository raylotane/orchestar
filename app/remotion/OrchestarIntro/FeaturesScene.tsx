import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const FeatureIcon: React.FC<{ icon: string; color: string }> = ({ icon, color }) => {
  const icons: Record<string, string> = {
    sparkles: "✨",
    layout: "📐",
    play: "▶️",
    film: "🎬",
  };

  return (
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
      }}
    >
      {icons[icon] || "●"}
    </div>
  );
};

export const FeaturesScene: React.FC<{
  features: Array<{ icon: string; title: string; desc: string }>;
}> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleOpacity = interpolate(frame, [fps * 0.1, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [fps * 0.1, fps * 0.4], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const featureColors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f23 100%)",
        opacity: bgOpacity,
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
          核心功能
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

      {/* Features grid */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 32,
          width: 900,
        }}
      >
        {features.map((feature, index) => {
          const delay = fps * 0.2 + index * 0.15 * fps;
          const itemOpacity = interpolate(
            frame,
            [delay, delay + fps * 0.4],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const itemX = interpolate(
            frame,
            [delay, delay + fps * 0.4],
            [index % 2 === 0 ? -50 : 50, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) }
          );
          const color = featureColors[index % featureColors.length];

          return (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: 20,
                padding: "28px 32px",
                display: "flex",
                gap: 20,
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: "blur(10px)",
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              <FeatureIcon icon={feature.icon} color={color} />
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 8px 0",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};