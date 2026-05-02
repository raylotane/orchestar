import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

/**
 * 这是什么场景
 * 用简洁有力的一句话介绍产品
 */
export const WhatIsScene: React.FC<{
  productName: string;
  tagline: string;
}> = ({ productName, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const productNameOpacity = interpolate(frame, [fps * 0.3, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const productNameY = interpolate(frame, [fps * 0.3, fps * 0.6], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [fps * 0.6, fps * 1.0], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const taglineY = interpolate(frame, [fps * 0.6, fps * 1.0], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const highlightOpacity = interpolate(frame, [fps * 0.8, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const highlightScale = interpolate(frame, [fps * 0.8, fps * 1.2], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)",
        opacity: bgOpacity,
      }}
    >
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
        {/* Product name */}
        <div
          style={{
            opacity: productNameOpacity,
            transform: `translateY(${productNameY}px)`,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 6,
            }}
          >
            {productName}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 24,
            opacity: taglineOpacity,
          }}
        >
          <div
            style={{
              width: 60,
              height: 2,
              background: "linear-gradient(to right, transparent, #6366f1)",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
            }}
          />
          <div
            style={{
              width: 60,
              height: 2,
              background: "linear-gradient(to left, transparent, #6366f1)",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: "#c4b5fd",
              letterSpacing: 2,
            }}
          >
            {tagline}
          </span>
        </div>

        {/* Highlight effect */}
        <div
          style={{
            marginTop: 48,
            opacity: highlightOpacity,
            transform: `scale(${highlightScale})`,
          }}
        >
          <div
            style={{
              padding: "16px 32px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }}>✨</span>
            <span
              style={{
                fontSize: 20,
                color: "#a5b4fc",
                fontWeight: 500,
              }}
            >
              说人话，就能出片
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </AbsoluteFill>
  );
};