import React, { useEffect, useState } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const TitleScene: React.FC<{ text: string; durationInSeconds: number }> = ({
  text,
  durationInSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const durationInFrames = durationInSeconds * fps;
    const chars = text.split("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < chars.length && frame < durationInFrames) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text, fps, frame, durationInSeconds]);

  const opacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const cursorBlink = Math.floor(frame / 10) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: 2,
          }}
        >
          {displayedText}
        </span>
        <span
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: "JetBrains Mono, monospace",
            opacity: cursorBlink ? 1 : 0,
          }}
        >
          |
        </span>
      </div>
    </AbsoluteFill>
  );
};