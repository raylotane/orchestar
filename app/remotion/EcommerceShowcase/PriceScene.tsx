import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { EcommerceShowcaseProps } from "./types";

export const PriceScene: React.FC<{
  productName: string;
  price: string;
  originalPrice: string;
  discount: string;
  brandName: string;
}> = ({ productName, price, originalPrice, discount, brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Discount badge
  const badgeScale = spring({
    frame: frame - fps * 0.2,
    fps,
    config: { damping: 120, stiffness: 150 },
  });

  // Price reveal
  const priceOpacity = interpolate(frame, [fps * 0.3, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });

  const priceY = interpolate(frame, [fps * 0.3, fps * 0.6], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Original price strikethrough
  const originalOpacity = interpolate(frame, [fps * 0.5, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA button
  const ctaProgress = spring({
    frame: frame - fps * 0.7,
    fps,
    config: { damping: 150, stiffness: 100 },
  });

  // Glow effect
  const glowIntensity = interpolate(
    frame,
    [fps * 1.5, fps * 2, fps * 2.5, fps * 3],
    [0.2, 0.5, 0.2, 0.5],
    {
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.sin),
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(102, 126, 234, ${glowIntensity * 0.3}) 0%, transparent 70%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#a5b4fc",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </div>

        {/* Product name */}
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
          }}
        >
          {productName}
        </h2>

        {/* Discount badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            padding: "8px 24px",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 2,
            boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
          }}
        >
          {discount}
        </div>

        {/* Price section */}
        <div
          style={{
            opacity: priceOpacity,
            transform: `translateY(${priceY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
          }}
        >
          {/* Current price */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#22c55e",
              textShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
            }}
          >
            {price}
          </div>

          {/* Original price */}
          <div
            style={{
              opacity: originalOpacity,
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.4)",
              textDecoration: "line-through",
            }}
          >
            {originalPrice}
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaProgress,
            transform: `scale(${ctaProgress})`,
            marginTop: 24,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              padding: "18px 64px",
              borderRadius: 50,
              fontSize: 20,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 4,
              boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            立即购买
          </div>
        </div>

        {/* Guarantee text */}
        <div
          style={{
            opacity: ctaProgress,
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: 16,
            display: "flex",
            gap: 24,
          }}
        >
          <span>✓ 7天无理由退换</span>
          <span>✓ 官方正品保障</span>
          <span>✓ 顺丰包邮</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => {
          const dotOpacity = interpolate(
            frame,
            [fps * 1 + i * 10, fps * 1 + i * 10 + 5],
            [0.3, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#667eea",
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};