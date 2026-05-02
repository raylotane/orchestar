import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * CTA (Call to Action) 场景
 * 引导用户开始创作
 */
export const CTAScene: React.FC<{
  ctaText: string;
  subText?: string;
  productName?: string;
}> = ({ ctaText, subText, productName = "Orchestar" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const contentOpacity = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const contentY = interpolate(frame, [fps * 0.3, fps * 0.7], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaScale = interpolate(frame, [fps * 0.6, fps * 1.0], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const ctaGlowOpacity = interpolate(
    frame,
    [fps * 0.8, fps * 1.5],
    [0, 0.6],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const subOpacity = interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d0d1a 100%)",
        opacity: bgOpacity,
      }}
    >
      {/* Animated background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[...Array(15)].map((_, i) => {
          const lineOpacity = interpolate(
            frame,
            [fps * 0.2, fps * 0.5, fps * 2],
            [0, 0.05, 0.02],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          return (
            <div
              key={`h-${i}`}
              style={{
                position: "absolute",
                top: `${i * 7}%`,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: `rgba(99, 102, 241, ${lineOpacity})`,
              }}
            />
          );
        })}
      </div>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {/* Main CTA */}
        <div
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#a5b4fc",
              letterSpacing: 4,
              display: "block",
              marginBottom: 16,
            }}
          >
            {productName}
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: 40,
              background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
              opacity: ctaGlowOpacity,
              filter: "blur(20px)",
            }}
          />

          {/* Button */}
          <div
            style={{
              position: "relative",
              padding: "24px 64px",
              borderRadius: 32,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              transform: `scale(${ctaScale})`,
              boxShadow: "0 10px 60px rgba(99, 102, 241, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: 4,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {ctaText}
            </span>
          </div>
        </div>

        {/* Sub text */}
        {subText && (
          <div
            style={{
              marginTop: 32,
              opacity: subOpacity,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.4)",
                letterSpacing: 2,
              }}
            >
              {subText}
            </span>
          </div>
        )}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const particleOpacity = interpolate(
          frame,
          [fps * (0.3 + i * 0.05), fps * (0.8 + i * 0.05)],
          [0, 0.7],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        const particleY = interpolate(
          frame,
          [fps * 0.5, fps * 3],
          [600, -50],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.linear }
        );
        const particleX = interpolate(
          frame,
          [fps * 0.3, fps * 2.5],
          [0, (i % 2 === 0 ? 1 : -1) * 50],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${5 + i * 4.5 + particleX}%`,
              top: particleY,
              width: 3 + (i % 4),
              height: 3 + (i % 4),
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#8b5cf6" : "#a855f7",
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};