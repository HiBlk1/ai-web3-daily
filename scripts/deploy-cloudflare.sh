#!/bin/bash
# Cloudflare Pages 部署脚本
# 用法: ./scripts/deploy-cloudflare.sh
# 需要环境变量: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID

set -e

PROJECT_NAME="${CLOUDFLARE_PROJECT_NAME:-ai-web3-daily}"
DEPLOY_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TODAY_SLUG="$(TZ=Asia/Shanghai date '+%Y-%m-%d')"
TODAY_MMDD="$(TZ=Asia/Shanghai date '+%m%d')"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Cloudflare Pages 部署 ===${NC}"
echo "项目: ${PROJECT_NAME}"
echo "目录: ${DEPLOY_DIR}"
echo ""

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ 错误: 未设置 CLOUDFLARE_API_TOKEN 环境变量"
  echo "   请运行: export CLOUDFLARE_API_TOKEN='your-token-here'"
  exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ 错误: 未设置 CLOUDFLARE_ACCOUNT_ID 环境变量"
  echo "   请运行: export CLOUDFLARE_ACCOUNT_ID='your-account-id-here'"
  exit 1
fi

# 部署到 Cloudflare Pages
echo -e "${YELLOW}上传文件到 Cloudflare Pages...${NC}"
npx wrangler pages deploy "$DEPLOY_DIR" \
  --project-name "$PROJECT_NAME" \
  --branch main \
  --commit-message "Auto deploy: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"

echo ""
echo -e "${GREEN}✅ 部署完成!${NC}"
echo -e "极简入口: https://${PROJECT_NAME}.pages.dev/"
echo -e "中文报告: https://${PROJECT_NAME}.pages.dev/reports/${TODAY_SLUG}/ai-web3-daily-${TODAY_MMDD}.html"
echo -e "英文报告: https://${PROJECT_NAME}.pages.dev/reports/${TODAY_SLUG}/ai-web3-daily-${TODAY_MMDD}-en.html"
