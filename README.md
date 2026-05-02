# Orchestar

一个基于 Next.js 16 + AI SDK 的可视化图形动画创作平台。

## 技术栈

- **框架**: Next.js 16.2.4
- **UI**: React 19, Tailwind CSS 4, Radix UI, shadcn
- **动画**: Remotion, Motion
- **AI**: AI SDK + DeepSeek
- **状态管理**: Zustand
- **类型**: TypeScript, Zod

## 目录结构

```
app/
├── api/                    # API 路由
├── remotion/              # Remotion 动画组件
├── types/                  # TypeScript 类型定义
├── workbench/              # 工作台页面
│   └── components/
│       ├── VideoContainer/ # 视频播放器容器
│       └── ...
components/
├── ai-elements/           # AI 元素组件
├── ui/                    # shadcn/ui 组件
└── theme-provider.tsx     # 主题提供者

scripts/
└── deploy.mjs             # 部署脚本
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务

```bash
pnpm start
```

## Remotion 动画

### 启动 Remotion Studio

```bash
pnpm remotion
```

### 渲染视频

```bash
pnpm render
```

## 环境变量

复制 `.env.local.template` 为 `.env.local`，并配置所需的环境变量：

- `DEEPSEEK_API_KEY` - DeepSeek API 密钥

## 主要功能

- **可视化编辑**: 直观的拖拽式界面
- **AI 辅助创作**: 通过 AI 对话式生成场景
- **实时预览**: 基于 Remotion 的实时视频预览
- **动画系统**: 支持关键帧动画和过渡效果
- **多场景支持**: CoffeeBrandVideo、EcommerceShowcase 等预设场景

## 开发指南

1. 遵循 Next.js 16 的最新规范（参见 `AGENTS.md`）
2. 使用 shadcn 管理 UI 组件
3. 动画组件使用 Remotion 实现
4. AI 相关功能通过 AI SDK 集成