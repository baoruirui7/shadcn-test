import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [name, setName] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const greeting = useMemo(() => {
    if (!name.trim()) return "欢迎开始使用 shadcn/ui + Vite";
    return `你好，${name}！`;
  }, [name]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="container py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">shadcn-test</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Vite + React + TypeScript + pnpm + shadcn/ui（组件示例：Button / Input / Card）
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            切换为{theme === "dark" ? "亮色" : "暗色"}
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{greeting}</CardTitle>
              <CardDescription>
                这是一个可直接复制的项目模板，已配置 CSS 变量主题与暗色模式。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">你的名字</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入后实时展示" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setName("")}>清空</Button>
                <Button variant="secondary" onClick={() => setName("鲍老师")}>设为“鲍老师”</Button>
                <Button variant="ghost" onClick={() => setName("月月")}>设为“月月”</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="destructive" onClick={() => alert("这里只是示例交互～")}>Destructive</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>设计 Token ↔ CSS 变量</CardTitle>
              <CardDescription>
                推荐把设计系统 token 通过 Figma Variables / Tokens 直接映射到 CSS 变量（详见 README）。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">--background / --foreground</span>
                  <span className="text-sm text-muted-foreground">页面底色 / 文本色</span>
                </div>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">--primary / --secondary</span>
                  <span className="text-sm text-muted-foreground">主色 / 次级色</span>
                </div>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">--border / --radius</span>
                  <span className="text-sm text-muted-foreground">描边 / 圆角</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.open("https://ui.shadcn.com", "_blank")}>打开 shadcn/ui</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
