import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";

export const ProductScene: React.FC<{
  productName: string;
  productCategory: string;
  brandName: string;
}> = ({ productName, productCategory, brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product image placeholder - animated gradient box
  const productScale = interpolate(frame, [0, fps * 0.5], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const productOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const productY = interpolate(frame, [0, fps * 0.5], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Brand reveal
  const brandOpacity = interpolate(frame, [fps * 0.2, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Category tag
  const tagProgress = spring({
    frame: frame - fps * 0.3,
    fps,
    config: { damping: 150, stiffness: 100 },
  });

  // Product name reveal
  const nameY = interpolate(frame, [fps * 0.4, fps * 0.8], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const nameOpacity = interpolate(frame, [fps * 0.4, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background gradient animation
  const bgRotation = interpolate(frame, [0, fps * 2], [0, 5], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)",
          transform: `rotate(${bgRotation}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(118,75,162,0.2) 0%, transparent 70%)",
          transform: `rotate(${-bgRotation * 0.7}deg)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Brand name */}
        <div
          style={{
            opacity: brandOpacity,
            fontSize: 18,
            fontWeight: 600,
            color: "#a5b4fc",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </div>

        {/* Product visual - placeholder with gradient */}
        <div
          style={{
            width: 320,
            height: 320,
            opacity: productOpacity,
            transform: `scale(${productScale}) translateY(${productY}px)`,
            background: "linear-gradient(145deg, #2d2d44 0%, #1a1a2e 100%)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(102, 126, 234, 0.2)",
            position: "relative",
          }}
        >
          {/* Product placeholder icon */}
          <div
            style={{
              fontSize: 120,
              opacity: 0.8,
            }}
          >
            🎧
          </div>

          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: "1px solid rgba(102, 126, 234, 0.2)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Category tag */}
        <div
          style={{
            opacity: tagProgress,
            transform: `scale(${tagProgress})`,
            background: "rgba(102, 126, 234, 0.2)",
            padding: "8px 24px",
            borderRadius: 50,
            border: "1px solid rgba(102, 126, 234, 0.3)",
            fontSize: 14,
            color: "#c7d2fe",
            letterSpacing: 2,
          }}
        >
          {productCategory}
        </div>

        {/* Product name */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              margin: 0,
              textAlign: "center",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {productName}
          </h1>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          width: 60,
          height: 60,
          borderTop: "2px solid rgba(165, 180, 252, 0.3)",
          borderLeft: "2px solid rgba(165, 180, 252, 0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          width: 60,
          height: 60,
          borderTop: "2px solid rgba(165, 180, 252, 0.3)",
          borderRight: "2px solid rgba(165, 180, 252, 0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          width: 60,
          height: 60,
          borderBottom: "2px solid rgba(165, 180, 252, 0.3)",
          borderLeft: "2px solid rgba(165, 180, 252, 0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderBottom: "2px solid rgba(165, 180, 252, 0.3)",
          borderRight: "2px solid rgba(165, 180, 252, 0.3)",
        }}
      />
    </AbsoluteFill>
  );
};