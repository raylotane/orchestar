import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { CoffeeBeanIcon } from "./CoffeeCup";

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

const features: FeatureItem[] = [
  {
    icon: "bean",
    title: "精选豆源",
    desc: "源自埃塞俄比亚 & 哥伦比亚\n单一产区·精品级生豆",
  },
  {
    icon: "fire",
    title: "手工烘焙",
    desc: "大师烘焙师·精准温控\n每一批·匠心独运",
  },
  {
    icon: "leaf",
    title: "馥郁香气",
    desc: "坚果·焦糖·果酸层次丰富\n余韵悠长·回味无穷",
  },
];

const FeatureIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 48 }) => {
  if (type === "bean") return <CoffeeBeanIcon size={size} />;
  if (type === "fire") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path
          d="M32 8 C20 22 16 34 22 46 C26 54 38 56 44 48 C50 38 44 24 32 8Z"
          fill="#D4A574"
          opacity="0.9"
        />
        <path d="M32 20 C26 30 24 38 28 45" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  // leaf
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path
        d="M32 56 C18 42 14 26 24 12 C36 6 52 14 54 28 C56 42 44 54 32 56Z"
        fill="#7A9B76"
        opacity="0.85"
      />
      <path d="M32 56 C28 40 30 24 38 14" stroke="#4A6B46" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M32 56 Q26 36 30 24" stroke="#4A6B46" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      className="justify-center items-center"
      style={{
        background: "linear-gradient(145deg, #120a07 0%, #1f120b 50%, #0e0704 100%)",
      }}
    >
      {/* Section title */}
      {(() => {
        const titleOpacity = interpolate(frame, [fps * 0.3, fps * 0.9], [0, 1], {
          extrapolateRight: "clamp", extrapolateLeft: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const titleY = interpolate(frame, [fps * 0.3, fps * 0.9], [-20, 0], {
          extrapolateRight: "clamp", extrapolateLeft: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        return (
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
            <h2 style={{ fontSize: 32, color: "#C4A77D", fontFamily: "Georgia, serif", letterSpacing: 10, fontWeight: 400 }}>
              WHY CHOOSE US
            </h2>
            <div style={{ width: 80, height: 2, background: "#C4A77D", margin: "12px auto 0", opacity: 0.5 }} />
          </div>
        );
      })()}

      {/* Features grid */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginTop: 40,
          zIndex: 1,
        }}
      >
        {features.map((feature, index) => {
          const cardDelay = fps * (0.7 + index * 0.5);
          const cardOpacity = interpolate(frame, [cardDelay, cardDelay + fps * 0.7], [0, 1], {
            extrapolateRight: "clamp", extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const cardY = interpolate(frame, [cardDelay, cardDelay + fps * 0.7], [35, 0], {
            extrapolateRight: "clamp", extrapolateLeft: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const cardScale = interpolate(frame, [cardDelay, cardDelay + fps * 0.5], [0.92, 1], {
            extrapolateRight: "clamp", extrapolateLeft: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });

          return (
            <div
              key={index}
              style={{
                width: 280,
                padding: "32px 24px",
                borderRadius: 16,
                background: "linear-gradient(145deg, rgba(196,167,125,0.06), rgba(196,167,125,0.02))",
                border: "1px solid rgba(196,167,125,0.1)",
                textAlign: "center",
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <FeatureIcon type={feature.icon} />
              </div>

              <h3 style={{ fontSize: 22, color: "#E8D5B7", fontFamily: "Georgia, serif", fontWeight: 700, margin: "0 0 12px 0" }}>
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#A68B5B",
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: "pre-line",
                  fontFamily: "Georgia, serif",
                }}
              >
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom decorative line */}
      {(() => {
        const lineScale = interpolate(frame, [fps * 2.5, fps * 3.2], [0, 1], {
          extrapolateRight: "clamp", extrapolateLeft: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            style={{
              position: "absolute",
              bottom: 50,
              left: "50%",
              transform: `translateX(-50%) scaleX(${lineScale})`,
              width: 200,
              height: 1,
              background: "linear-gradient(to right, transparent, #C4A77D, transparent)",
            }}
          />
        );
      })()}
    </AbsoluteFill>
  );
};
