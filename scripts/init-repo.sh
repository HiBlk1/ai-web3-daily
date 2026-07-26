#!/usr/bin/env bash
# scripts/init-repo.sh
# 首次部署：初始化本地仓库并首次推送到 GitHub
#
# 用法：
#   ./init-repo.sh <GitHub仓库URL>
#   示例: ./init-repo.sh https://github.com/yourname/ai-web3-daily

set -euo pipefail

REPO_URL="${1:-}"

if [ -z "$REPO_URL" ]; then
  echo "用法: $0 <GitHub仓库URL>"
  echo "示例: $0 https://github.com/yourname/ai-web3-daily"
  echo ""
  echo "请先在 GitHub 上创建一个空仓库（不要勾选 README/.gitignore/license）"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "==> 仓库根目录: $REPO_ROOT"
echo "==> 远程仓库:   $REPO_URL"
echo ""

cd "$REPO_ROOT"

# 检查是否已初始化
if [ ! -d ".git" ]; then
  echo "[1/4] 初始化 Git 仓库..."
  git init
  git branch -M main
else
  echo "[1/4] Git 仓库已存在，跳过初始化"
fi

echo "[2/4] 配置提交者信息..."
git config user.email "trae-bot@example.com"
git config user.name "Trae Daily Bot"

echo "[3/4] 添加远程仓库..."
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
  echo "    已更新 origin"
else
  git remote add origin "$REPO_URL"
  echo "    已添加 origin"
fi

echo "[4/4] 首次提交并推送..."
git add -A
git commit -m "chore: initial commit - AI & Web3 daily report

- 首份报告: 2026-07-26
- 部署目标: GitHub Pages
- 自动化: TRAE 定时任务

Co-Authored-By: Trae <noreply@trae.ai>" || echo "    无需提交（已是最新）"

echo ""
echo "即将推送到 $REPO_URL"
echo "如果提示输入密码，请使用 GitHub Personal Access Token 作为密码"
read -p "确认推送？(y/N) " confirm
if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
  git push -u origin main
  echo ""
  echo "✓ 推送完成！"
  echo ""
  echo "下一步："
  echo "  1. 在 GitHub 仓库 Settings → Pages 中选择 Source: Deploy from a branch"
  echo "     Branch: main / Folder: / (root)"
  echo "  2. 等待 1-2 分钟，访问 https://<你的用户名>.github.io/<仓库名>/"
  echo "  3. 在 Wix 站点中嵌入 iframe（详见 README.md）"
else
  echo "已取消推送。你可以手动执行: git push -u origin main"
fi
