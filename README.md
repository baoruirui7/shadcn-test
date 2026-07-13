# shadcn-test

一个开箱即用的 **shadcn/ui + Vite + React + TypeScript + pnpm** 项目模板。

已完成：
- Vite + React + TypeScript 初始化（pnpm 包管理）
- Tailwind CSS（基于 CSS Variables 的主题体系）
- shadcn/ui 推荐的 `cn()` 工具函数（clsx + tailwind-merge）
- 示例组件：`Button` / `Input` / `Card`
- 亮色 / 暗色模式切换（class 方案，`html.dark`）

## 项目结构

```
shadcn-test
├─ components.json              # shadcn/ui 配置（路径别名 / cssVariables 等）
├─ tailwind.config.ts           # Tailwind 配置（颜色映射到 CSS 变量）
├─ postcss.config.cjs           # PostCSS 配置
├─ vite.config.ts               # Vite 配置（@ 路径别名）
├─ src
│  ├─ App.tsx                   # 示例页面：主题切换 + 组件演示
│  ├─ main.tsx
│  ├─ index.css                 # Tailwind 指令 + CSS 变量主题
│  ├─ lib
│  │  └─ utils.ts               # cn() 工具函数
│  └─ components
│     └─ ui
│        ├─ button.tsx
│        ├─ input.tsx
│        └─ card.tsx
└─ ...
```

## 本地开发

```bash
pnpm install
pnpm dev
```

## 如何新增 shadcn/ui 组件

推荐按 shadcn/ui 官方方式使用 CLI 添加组件（会自动写入 `src/components/ui/*` 并处理依赖）。

1. 安装 shadcn CLI（一次即可）：

```bash
pnpm dlx shadcn@latest --help
```

2. 初始化（本仓库已提供 `components.json` 与 Tailwind/CSS Variables 基础配置，如需重新 init 可执行）：

```bash
pnpm dlx shadcn@latest init
```

3. 添加组件（示例：`dropdown-menu`）：

```bash
pnpm dlx shadcn@latest add dropdown-menu
```

> 备注：你当前项目中已配置 `@/*` 路径别名，shadcn/ui 生成的代码默认会使用别名引用（例如 `@/lib/utils`）。

## Figma Token ↔ CSS 变量对照（设计/研发同源）

本模板遵循 shadcn/ui 的 CSS Variables 约定（位于 `src/index.css`），并在 Tailwind 中映射为语义化颜色（见 `tailwind.config.ts`）。

### 推荐映射方式

设计侧可以在 Figma Variables / Tokens（或 Token Studio）中维护一套语义 token（如 `color.primary`、`color.background`、`radius.md`），研发侧通过同名 CSS 变量落地。

### 常用 Token 对照表

| 语义 / 设计 Token（建议） | CSS 变量（本模板） | Tailwind 使用方式（示例） | 说明 |
| --- | --- | --- | --- |
| `color.background` | `--background` | `bg-background` | 页面背景色 |
| `color.foreground` | `--foreground` | `text-foreground` | 默认文本色 |
| `color.primary` | `--primary` | `bg-primary text-primary-foreground` | 主按钮/主强调色 |
| `color.primaryForeground` | `--primary-foreground` | `text-primary-foreground` | 主色上的文本色 |
| `color.secondary` | `--secondary` | `bg-secondary text-secondary-foreground` | 次级按钮/次级强调色 |
| `color.secondaryForeground` | `--secondary-foreground` | `text-secondary-foreground` | 次级色上的文本色 |
| `color.border` | `--border` | `border-border` | 分割线/描边 |
| `color.input` | `--input` | `border-input` | 输入框描边 |
| `color.ring` | `--ring` | `ring-ring` | focus ring |
| `radius.md` | `--radius` | `rounded-lg`（由 config 映射） | 全局圆角基准 |

> 你也可以扩展更多语义（例如 `--muted` / `--accent` / `--destructive` 等），让设计与研发共享同一套“语义层”。

## 代码规范

- 本项目已遵循：**禁止使用 `import * as xxx`** 的写法（示例组件与工具函数均使用具名导入或类型导入）。
