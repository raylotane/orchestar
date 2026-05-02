import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { EcommerceShowcaseProps } from "./types";

export const FeaturesScene: React.FC<{
  features: EcommerceShowcaseProps["features"];
}> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)",
        overflow: "hidden",
      }}
    >
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        {(() => {
          const titleOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });
          const titleY = interpolate(frame, [0, fps * 0.3], [-20, 0], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              style={{
                opacity: titleOpacity,
                transform: `translateY(${titleY}px)`,
              }}
            >
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: 4,
                }}
              >
                产品特点
              </h2>
              <div
                style={{
                  width: 60,
                  height: 3,
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                  margin: "16px auto 0",
                  borderRadius: 2,
                }}
              />
            </div>
          );
        })()}
      </div>

      {/* Features grid */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          width: 800,
        }}
      >
        {features.map((feature, index) => {
          const delay = fps * 0.2 * index;
          const itemFrame = Math.max(0, frame - delay);

          const opacity = interpolate(itemFrame, [0, fps * 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const scale = interpolate(
            itemFrame,
            [0, fps * 0.3],
            [0.8, 1],
            {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.4)),
            }
          );

          const cardY = interpolate(itemFrame, [0, fps * 0.3], [30, 0], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={index}
              style={{
                opacity,
                transform: `scale(${scale}) translateY(${cardY}px)`,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: 20,
                padding: 28,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  marginBottom: 8,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};