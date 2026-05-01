import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { CoffeeBeanIcon } from "./CoffeeCup";

export const ClosingScene: React.FC<{ brandName: string }> = ({ brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [fps * 0.2, fps * 0.9], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoScale = interpolate(frame, [fps * 0.2, fps * 0.9], [0.85, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const ctaOpacity = interpolate(frame, [fps * 0.8, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaY = interpolate(frame, [fps * 0.8, fps * 1.5], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing glow effect for the CTA button
  const glowPulse = interpolate(
    frame,
    [fps * 1.5, fps * 2.2, fps * 3],
    [0.3, 0.7, 0.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.inOut(Easing.sin) }
  );

  // Corner decorations
  const cornerProgress = interpolate(frame, [0, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cornerSize = 40;

  return (
    <AbsoluteFill
      className="justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #0d0705 0%, #1a0e0a 50%, #0a0503 100%)",
      }}
    >
      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: cornerSize,
          height: cornerSize,
          borderTop: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
          borderLeft: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: cornerSize,
          height: cornerSize,
          borderTop: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
          borderRight: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: cornerSize,
          height: cornerSize,
          borderBottom: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
          borderLeft: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: cornerSize,
          height: cornerSize,
          borderBottom: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
          borderRight: `1.5px solid rgba(196,167,125,${0.4 * cornerProgress})`,
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* Brand Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 82,
              fontWeight: 900,
              color: "#D4A574",
              letterSpacing: 20,
              fontFamily: "Georgia, serif",
              margin: 0,
            }}
          >
            {brandName}
          </h1>
        </div>

        {/* Decorative divider */}
        {(() => {
          const divWidth = interpolate(frame, [fps * 0.8, fps * 1.3], [0, 100], {
            extrapolateRight: "clamp", extrapolateLeft: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginTop: 20,
                marginBottom: 32,
              }}
            >
              <div style={{ width: divWidth, height: 1, background: "linear-gradient(to left, #C4A77D, transparent)" }} />
              <CoffeeBeanIcon size={20} />
              <div style={{ width: divWidth, height: 1, background: "linear-gradient(to right, #C4A77D, transparent)" }} />
            </div>
          );
        })()}

        {/* Tagline */}
        <p
          style={{
            fontSize: 20,
            color: "#A68B5B",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: 4,
            margin: "0 0 36px 0",
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          唤醒每一个清晨 · 温暖每一次相遇
        </p>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            display: "inline-block",
          }}
        >
          <div
            style={{
              padding: "14px 48px",
              borderRadius: 50,
              border: "1.5px solid #D4A574",
              color: "#E8D5B7",
              fontSize: 16,
              fontFamily: "Georgia, serif",
              letterSpacing: 4,
              boxShadow: `0 0 ${30 * glowPulse}px rgba(212,165,116,${glowPulse * 0.3})`,
            }}
          >
            立即探索 →
          </div>
        </div>

        {/* Social / Contact */}
        {(() => {
          const socialOpacity = interpolate(frame, [fps * 2, fps * 2.7], [0, 0.5], {
            extrapolateRight: "clamp", extrapolateLeft: "clamp",
          });
          return (
            <div
              style={{
                marginTop: 48,
                opacity: socialOpacity,
                fontSize: 13,
                color: "#6B5540",
                fontFamily: "Georgia, serif",
                letterSpacing: 2,
              }}
            >
              www.aromista-coffee.com
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
