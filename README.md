# 招商银行 App Figma 实现

由给定 Figma Make 设计读取并整理为独立 React + Vite + Tailwind 项目。

## 运行

```bash
pnpm install
pnpm dev
```

## Android 手机上访问

确保电脑和手机连接同一个 Wi-Fi，然后运行：

```bash
pnpm dev:lan
```

终端会显示可访问地址，也可以用电脑的局域网 IP 访问：

```text
http://电脑局域网IP:5173/
```

如果手机打不开，请检查 Windows 防火墙是否允许 Node.js/Vite 访问专用网络。

## 构建

```bash
pnpm build
```

## 添加到手机桌面

项目已包含 Web App Manifest 和 Service Worker。部署到 HTTPS 后，在 Android Chrome 中打开页面，点击右上角菜单，选择“添加到主屏幕”或“安装应用”。

Cloudflare Pages 地址：

```text
https://cmb-figma-implementation.pages.dev/
```

自定义域名：

```text
https://cmb.wxlhc.top/
```

如果自定义域名还未解析，请在 Cloudflare DNS 中添加：

```text
Type: CNAME
Name: cmb
Target: cmb-figma-implementation.pages.dev
Proxy: Proxied
```

局域网 HTTP 开发地址通常只能添加为普通快捷方式；完整 PWA 安装需要 HTTPS。如果从桌面打开后仍然显示浏览器地址栏或边框，说明当前安装的是普通快捷方式，不是完整 PWA。

想要无浏览器边框打开，请使用生产构建和 HTTPS 地址：

```bash
pnpm build
pnpm preview:lan
```

然后把预览服务部署到 HTTPS，或用 Cloudflare Tunnel、ngrok 等工具把本机服务转成 HTTPS 地址，再从 Android Chrome 访问该 HTTPS 地址并重新安装到主屏幕。

入口：`src/main.tsx`  
主界面：`src/app/App.tsx`
