# GitHub Pages 自动部署

本项目使用 GitHub Actions 将 Vue 前端部署到 GitHub Pages。适合当前纯静态站点，
不承载 Node.js 服务、数据库或服务端 API。

仓库为 `southmaple/Baby-Footprints` 时，默认站点地址是：

```text
https://southmaple.github.io/Baby-Footprints/
```

## 1. 完成首次提交

当前分支必须在 GitHub 上存在，工作流才会自动触发。先确认远端和本地分支：

```sh
git remote -v
git branch --show-current
git status
```

首次提交并推送：

```sh
git add .
git commit -m "chore: establish engineering baseline"
git push -u origin main
```

不要使用强制推送覆盖远端已有提交。

## 2. 启用 GitHub Pages

在 GitHub 仓库页面打开 `Settings > Pages`，将 `Build and deployment` 的
`Source` 设置为 `GitHub Actions`。

也可以使用已登录的 GitHub CLI：

```sh
gh auth login
gh api --method POST repos/southmaple/Baby-Footprints/pages \
  -f build_type=workflow
```

如果 Pages 已经创建，使用更新接口：

```sh
gh api --method PUT repos/southmaple/Baby-Footprints/pages \
  -f build_type=workflow
```

随后在 `Settings > Actions > General` 确认 Actions 允许工作流使用
`GITHUB_TOKEN` 和 Pages 权限。组织级策略也可能覆盖仓库设置。

## 3. 保护 main 分支

在 `Settings > Branches` 添加分支保护规则：

- 禁止直接删除 `main`
- 合并前要求 Pull Request
- 要求 `Verify` 检查通过
- 要求分支与 `main` 保持最新

自动部署只会在 `main` 的 push 或手动工作流触发后运行。

## 4. 工作流执行链路

`.github/workflows/ci.yml` 会按以下顺序执行：

1. 安装锁定版本的依赖
2. 检查格式、lint 和 TypeScript 类型
3. 运行单元测试、生产构建和 E2E
4. 使用仓库名作为 Vite base path 重新构建 Pages 产物
5. 生成 `404.html` 和 `.nojekyll`
6. 在 Pages base path 下再次运行 E2E
7. 上传静态站点 artifact
8. 部署到 `github-pages` 环境
9. 请求线上 URL，执行 smoke test

Actions 页面会显示部署环境和线上地址。

## 5. 手动触发与观察

推送后打开仓库的 `Actions` 页面，选择 `CI and Deploy`：

```sh
gh workflow run "CI and Deploy" --ref main
gh run list --workflow "CI and Deploy"
gh run watch
```

任何验证步骤失败都会阻止部署。部署失败时查看 `Verify` 和
`Deploy GitHub Pages` 对应日志。

## 6. 验证部署

至少检查以下地址：

```text
https://southmaple.github.io/Baby-Footprints/
https://southmaple.github.io/Baby-Footprints/about
https://southmaple.github.io/Baby-Footprints/missing-page
```

前两个页面应正常渲染，未知路径应显示项目自己的 404 页面。

GitHub Pages 对深层链接会返回 HTTP 404 状态码，同时使用 `404.html` 加载 Vue
应用。因此深链接的呈现需要以浏览器页面为准，不能只根据 HTTP 状态码判断。

## 7. 回滚

不要移动已发布的 Tag 或强制覆盖 `main`。创建一个 revert 提交并推送：

```sh
git revert <bad-commit>
git push origin main
```

新工作流会重新验证并部署回退后的版本。

## 8. 自定义域名

使用自定义域名时，需要：

1. 在 Pages 设置中配置域名并启用 HTTPS
2. 在 DNS 中配置 GitHub 要求的记录
3. 将工作流中的 `VITE_BASE_PATH` 从仓库子路径改为 `/`

未切换 base path 时，自定义域名首页会出现静态资源 404。
