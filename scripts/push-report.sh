#!/usr/bin/env bash
# scripts/push-report.sh
# 将 TRAE 生成的每日报告推送到 GitHub 仓库（GitHub Pages 自动部署）
#
# 用法：
#   ./push-report.sh /path/to/generated-report-dir 2026-07-26
#
# 环境变量（在 TRAE 定时任务中通过 message 传递或在运行前 export）：
#   GH_REPO       - GitHub 仓库地址，如 https://github.com/USER/ai-web3-daily
#   GH_TOKEN      - GitHub Personal Access Token（需 repo 权限）
#   GH_BRANCH     - 推送分支，默认 main
#   COMMIT_AUTHOR - 提交者邮箱，默认 trae-bot@example.com
#   COMMIT_NAME   - 提交者名称，默认 Trae Daily Bot

set -euo pipefail

# ===== 参数校验 =====
SRC_DIR="${1:-}"
DATE_SLUG="${2:-}"

if [ -z "$SRC_DIR" ] || [ -z "$DATE_SLUG" ]; then
  echo "用法: $0 <报告源目录> <日期 YYYY-MM-DD>"
  echo "示例: $0 /workspace/ai-web3-daily-0726 2026-07-26"
  exit 1
fi

if [ ! -d "$SRC_DIR" ]; then
  echo "错误: 源目录不存在: $SRC_DIR"
  exit 1
fi

# ===== 环境变量默认值 =====
GH_BRANCH="${GH_BRANCH:-main}"
COMMIT_AUTHOR="${COMMIT_AUTHOR:-trae-bot@example.com}"
COMMIT_NAME="${COMMIT_NAME:-Trae Daily Bot}"

if [ -z "${GH_REPO:-}" ] || [ -z "${GH_TOKEN:-}" ]; then
  echo "错误: 请设置 GH_REPO 和 GH_TOKEN 环境变量"
  echo "  GH_REPO=https://github.com/USER/ai-web3-daily"
  echo "  GH_TOKEN=ghp_xxxxxxxxxxxx"
  exit 1
fi

# ===== 计算路径 =====
# 仓库根目录 = 本脚本所在目录的上一级
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# 目标报告目录: reports/YYYY-MM-DD/
DEST_DIR="$REPO_ROOT/reports/$DATE_SLUG"

# 从日期生成 MMDD 后缀（用于文件名）
DATE_MMDD="${DATE_SLUG:5:2}${DATE_SLUG:8:2}"
HTML_FILENAME="ai-web3-daily-${DATE_MMDD}.html"
HTML_FILENAME_EN="ai-web3-daily-${DATE_MMDD}-en.html"

echo "==> 源目录:   $SRC_DIR"
echo "==> 目标目录: $DEST_DIR"
echo "==> HTML 文件: $HTML_FILENAME"
echo "==> 仓库:     $GH_REPO ($GH_BRANCH)"
echo ""

# ===== 1. 复制报告到仓库 =====
echo "[1/5] 复制报告文件..."
rm -rf "$DEST_DIR"
mkdir -p "$DEST_DIR"
cp -r "$SRC_DIR"/* "$DEST_DIR/"
echo "    完成。文件列表:"
ls -1 "$DEST_DIR"

# 确认 HTML 文件存在
if [ ! -f "$DEST_DIR/$HTML_FILENAME" ]; then
  echo "    警告: 预期的中文 HTML 文件 $HTML_FILENAME 不存在，列出目录内容供排查:"
  ls -la "$DEST_DIR"
fi
if [ ! -f "$DEST_DIR/$HTML_FILENAME_EN" ]; then
  echo "    提示: 英文版 HTML 文件 $HTML_FILENAME_EN 不存在，本次仅部署中文版"
fi

# ===== 2. 更新 latest.html 索引（在列表顶部插入新条目）=====
echo ""
echo "[2/5] 更新 reports/latest.html 索引..."
LATEST_FILE="$REPO_ROOT/reports/latest.html"

# 生成中文日期标签
YEAR="${DATE_SLUG:0:4}"
MONTH="${DATE_SLUG:5:2}"
DAY="${DATE_SLUG:8:2}"
# 去除前导零用于中文显示
MONTH_NUM=$((10#$MONTH))
DAY_NUM=$((10#$DAY))

# 计算星期（中文）
WEEKDAY=$(date -d "$DATE_SLUG" +%u 2>/dev/null || echo "0")
case "$WEEKDAY" in
  1) WEEK_CN="周一";; 2) WEEK_CN="周二";; 3) WEEK_CN="周三";; 4) WEEK_CN="周四";;
  5) WEEK_CN="周五";; 6) WEEK_CN="周六";; 7) WEEK_CN="周日";; *) WEEK_CN="";;
esac

NEW_ENTRY="    <li>
      <a href=\"${DATE_SLUG}/${HTML_FILENAME}\">
        <span class=\"row-left\">
          <span>${YEAR} 年 ${MONTH_NUM} 月 ${DAY_NUM} 日 · ${WEEK_CN}</span>
          <span class=\"lang-tags\">
            <a href=\"${DATE_SLUG}/${HTML_FILENAME}\">中文</a>
            <a href=\"${DATE_SLUG}/${HTML_FILENAME_EN}\">EN</a>
          </span>
        </span>
        <span><span class=\"date\">${DATE_SLUG}</span> <span class=\"arrow\">→</span></span>
      </a>
    </li>"

# 在 <!-- 推送脚本会在此列表顶部插入最新条目 --> 注释后插入新条目
if grep -q "推送脚本会在此列表顶部插入最新条目" "$LATEST_FILE"; then
  # 使用临时文件避免 sed 转义问题
  python3 -c "
import sys
with open('$LATEST_FILE', 'r', encoding='utf-8') as f:
    content = f.read()
marker = '<!-- 推送脚本会在此列表顶部插入最新条目 -->'
entry = '''$NEW_ENTRY'''
content = content.replace(marker, marker + '\n' + entry, 1)
with open('$LATEST_FILE', 'w', encoding='utf-8') as f:
    f.write(content)
print('    索引已更新')
"
else
  echo "    警告: latest.html 中未找到插入标记，跳过索引更新"
fi

# ===== 3. Git 配置与提交 =====
echo ""
echo "[3/5] 配置 Git 并提交..."
cd "$REPO_ROOT"

git config user.email "$COMMIT_AUTHOR"
git config user.name "$COMMIT_NAME"

git add -A
git status --short

git commit -m "chore(report): add daily report $DATE_SLUG

- 报告目录: reports/$DATE_SLUG/
- 生成时间: $(date -u '+%Y-%m-%d %H:%M:%S UTC')
- 生成者: Trae Daily Bot

Co-Authored-By: Trae <noreply@trae.ai>" || {
  echo "    无变更需要提交，跳过"
  exit 0
}

# ===== 4. 推送到 GitHub =====
echo ""
echo "[4/5] 推送到 GitHub..."

# 构造带 token 的推送 URL（仅用于推送，不写入 remote 配置）
# 格式: https://x-access-token:TOKEN@github.com/USER/REPO.git
REPO_PATH=$(echo "$GH_REPO" | sed 's|https://github.com/||')
PUSH_URL="https://x-access-token:${GH_TOKEN}@github.com/${REPO_PATH}.git"

git push "$PUSH_URL" HEAD:"$GH_BRANCH" 2>&1 | sed "s|$GH_TOKEN|***TOKEN***|g" || {
  echo "    推送失败，请检查 GH_TOKEN 权限和网络"
  exit 1
}
echo "    推送成功"

# ===== 5. 同步部署到 Cloudflare Pages =====
echo ""
echo "[5/6] 同步部署到 Cloudflare Pages..."

CF_PROJECT_NAME="${CLOUDFLARE_PROJECT_NAME:-ai-web3-daily}"
CF_BASE_URL="https://${CF_PROJECT_NAME}.pages.dev"
GH_BASE_URL="https://hiblk1.github.io/ai-web3-daily"

if [ -n "${CLOUDFLARE_API_TOKEN:-}" ] && [ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]; then
  npx wrangler pages deploy "$REPO_ROOT" \
    --project-name "$CF_PROJECT_NAME" \
    --branch main \
    --commit-message "Auto deploy: $DATE_SLUG" 2>&1 || {
    echo "    Cloudflare Pages 部署失败，不影响 GitHub Pages 部署结果"
  }
  echo "    Cloudflare Pages 部署完成"
else
  echo "    跳过: 未设置 CLOUDFLARE_API_TOKEN 或 CLOUDFLARE_ACCOUNT_ID 环境变量"
  echo "    如需同步部署 Cloudflare Pages，请设置这两个环境变量"
fi

# ===== 6. 完成 =====
echo ""
echo "[6/6] 部署完成 ✓"
echo ""
echo "报告将在 1-2 分钟内通过 GitHub Pages 生效，Cloudflare Pages 即时生效。"
echo "访问地址:"
echo "  极简入口:        ${CF_BASE_URL}/"
echo "  中文报告:        ${CF_BASE_URL}/reports/$DATE_SLUG/$HTML_FILENAME"
echo "  英文报告:        ${CF_BASE_URL}/reports/$DATE_SLUG/$HTML_FILENAME_EN"
echo "  历史归档:        ${CF_BASE_URL}/reports/latest.html"
echo "  GitHub 备用首页: ${GH_BASE_URL}/"
echo "  GitHub 中文备用: ${GH_BASE_URL}/reports/$DATE_SLUG/$HTML_FILENAME"
echo "  GitHub 英文备用: ${GH_BASE_URL}/reports/$DATE_SLUG/$HTML_FILENAME_EN"
echo ""
echo "Wix 嵌入地址（iframe src）:"
echo "  ${CF_BASE_URL}/"
