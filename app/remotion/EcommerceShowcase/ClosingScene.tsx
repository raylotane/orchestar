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

export const ClosingScene: React.FC<{
  brandName: string;
  productName: string;
  socialLinks?: string[];
}> = ({ brandName, productName, socialLinks }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brand reveal animation
  const brandOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const brandScale = interpolate(frame, [0, fps * 0.4], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [fps * 0.3, fps * 0.7], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Social links
  const socialOpacity = interpolate(frame, [fps * 0.6, fps * 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Floating particles effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * fps * 2,
  }));

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated particles */}
      {particles.map((particle) => {
        const particleFrame = Math.max(0, frame - particle.delay);
        const y = interpolate(
          particleFrame,
          [0, fps * 4],
          [100, -10],
          { extrapolateRight: "clamp" }
        );
        const opacity = interpolate(
          particleFrame,
          [0, fps * 0.5, fps * 3.5, fps * 4],
          [0, 0.6, 0.6, 0],
          { extrapolateRight: "clamp" }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              opacity,
            }}
          />
        );
      })}

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Brand logo */}
        <div
          style={{
            opacity: brandOpacity,
            transform: `scale(${brandScale})`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
            }}
          >
            🎧
          </div>
        </div>

        {/* Brand name */}
        <h1
          style={{
            opacity: brandOpacity,
            transform: `scale(${brandScale})`,
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            letterSpacing: 8,
          }}
        >
          {brandName}
        </h1>

        {/* Tagline */}
        <p
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontSize: 24,
            color: "#a5b4fc",
            margin: "16px 0 24px",
            letterSpacing: 4,
          }}
        >
          听见美好 · 感受非凡
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              padding: "16px 56px",
              borderRadius: 50,
              fontSize: 18,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 4,
              boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
            }}
          >
            探索更多 →
          </div>
        </div>

        {/* Social links */}
        <div
          style={{
            opacity: socialOpacity,
            marginTop: 48,
            display: "flex",
            gap: 32,
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: 2,
          }}
        >
          {(socialLinks ?? ["Weibo", "WeChat", "JD.com"]).map((link, i) => (
            <span key={i}>{link}</span>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 50,
          height: 50,
          borderTop: "2px solid rgba(102, 126, 234, 0.4)",
          borderLeft: "2px solid rgba(102, 126, 234, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 50,
          height: 50,
          borderTop: "2px solid rgba(102, 126, 234, 0.4)",
          borderRight: "2px solid rgba(102, 126, 234, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 50,
          height: 50,
          borderBottom: "2px solid rgba(102, 126, 234, 0.4)",
          borderLeft: "2px solid rgba(102, 126, 234, 0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 50,
          height: 50,
          borderBottom: "2px solid rgba(102, 126, 234, 0.4)",
          borderRight: "2px solid rgba(102, 126, 234, 0.4)",
        }}
      />
    </AbsoluteFill>
  );
};