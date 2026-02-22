#!/bin/bash

# 项目清理脚本 - 删除不必要的文件以便打包

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 获取文件/目录大小
get_size() {
    if [ -e "$1" ]; then
        du -sh "$1" 2>/dev/null | cut -f1
    else
        echo "0B"
    fi
}

# 安全删除函数
safe_remove() {
    local path="$1"
    local description="$2"
    
    if [ -e "$path" ]; then
        local size=$(get_size "$path")
        log_info "删除 $description ($size): $path"
        rm -rf "$path"
        log_success "已删除: $path"
    else
        log_info "跳过（不存在）: $path"
    fi
}

# 显示清理前的项目大小
show_before_size() {
    log_info "清理前项目大小:"
    echo "总大小: $(get_size .)"
    echo ""
    echo "主要文件/目录大小："
    [ -d "node_modules" ] && echo "  node_modules: $(get_size node_modules)"
    [ -d "dist" ] && echo "  dist: $(get_size dist)"
    [ -d ".git" ] && echo "  .git: $(get_size .git)"
    [ -d "src/assets" ] && echo "  src/assets: $(get_size src/assets)"
    echo ""
}

# 显示清理后的项目大小
show_after_size() {
    log_info "清理后项目大小:"
    echo "总大小: $(get_size .)"
    echo ""
}

# 主清理函数
cleanup_project() {
    echo "=================================================="
    echo "           项目清理脚本"
    echo "=================================================="
    echo ""
    
    show_before_size
    
    log_info "开始清理项目文件..."
    echo ""
    
    # 删除依赖目录
    log_info "--- 清理依赖文件 ---"
    safe_remove "node_modules" "Node.js依赖包"
    safe_remove "package-lock.json" "npm锁定文件"
    safe_remove "pnpm-lock.yaml" "pnpm锁定文件"
    safe_remove "yarn.lock" "yarn锁定文件"
    echo ""
    
    # 删除构建产物
    log_info "--- 清理构建产物 ---"
    safe_remove "dist" "构建输出目录"
    safe_remove "build" "构建输出目录"
    safe_remove ".vite" "Vite缓存目录"
    safe_remove ".turbo" "Turbo缓存目录"
    echo ""
    
    # 删除开发工具文件
    log_info "--- 清理开发工具文件 ---"
    safe_remove ".vscode" "VS Code配置"
    safe_remove ".idea" "IntelliJ IDEA配置"
    safe_remove "*.code-workspace" "VS Code工作区文件"
    echo ""
    
    # 删除日志和临时文件
    log_info "--- 清理临时文件 ---"
    safe_remove "*.log" "日志文件"
    safe_remove "npm-debug.log*" "npm调试日志"
    safe_remove "yarn-debug.log*" "yarn调试日志"
    safe_remove "yarn-error.log*" "yarn错误日志"
    safe_remove ".npm" "npm缓存"
    safe_remove ".cache" "缓存目录"
    safe_remove "*.tmp" "临时文件"
    safe_remove "*.temp" "临时文件"
    echo ""
    
    # 删除操作系统生成的文件
    log_info "--- 清理系统文件 ---"
    safe_remove ".DS_Store" "macOS系统文件"
    safe_remove "Thumbs.db" "Windows系统文件"
    safe_remove "*.swp" "Vim临时文件"
    safe_remove "*.swo" "Vim临时文件"
    safe_remove "*~" "备份文件"
    echo ""
    
    # 询问是否删除Git历史（可选）
    read -p "是否要删除Git历史记录？这将大大减小项目大小 (y/N): " delete_git
    if [[ $delete_git =~ ^[Yy]$ ]]; then
        log_info "--- 清理Git历史 ---"
        safe_remove ".git" "Git版本控制历史"
        safe_remove ".gitignore" "Git忽略文件"
        echo ""
        log_warning "Git历史已删除，项目将失去版本控制"
    else
        log_info "保留Git历史记录"
    fi
    
    echo ""
    show_after_size
    
    echo "=================================================="
    echo "           清理完成"
    echo "=================================================="
    echo ""
    
    log_success "项目清理完成！"
    echo ""
    echo "📦 打包建议："
    echo "  1. 检查 package.json 确保依赖列表正确"
    echo "  2. 可以使用以下命令创建压缩包："
    echo "     tar -czf algo-website.tar.gz *"
    echo "     zip -r algo-website.zip * -x '*.git*'"
    echo ""
    echo "📝 部署时需要："
    echo "  1. 在目标服务器运行: npm install"
    echo "  2. 构建项目: npm run build"
    echo "  3. 或直接使用 deploy.sh 脚本"
    echo ""
}

# 显示要删除的内容预览
show_cleanup_preview() {
    echo "=================================================="
    echo "           清理预览"
    echo "=================================================="
    echo ""
    echo "以下文件/目录将被删除："
    echo ""
    
    [ -d "node_modules" ] && echo "✗ node_modules/ ($(get_size node_modules))"
    [ -f "package-lock.json" ] && echo "✗ package-lock.json"
    [ -f "pnpm-lock.yaml" ] && echo "✗ pnpm-lock.yaml"
    [ -d "dist" ] && echo "✗ dist/ ($(get_size dist))"
    [ -d ".vscode" ] && echo "✗ .vscode/"
    [ -d ".git" ] && echo "? .git/ ($(get_size .git)) - 可选删除"
    
    echo ""
    echo "以下文件将保留："
    echo "✓ src/ - 源代码"
    echo "✓ public/ - 静态资源"
    echo "✓ package.json - 项目配置"
    echo "✓ *.config.js - 配置文件"
    echo "✓ *.sh - 部署脚本"
    echo "✓ *.md - 文档文件"
    echo ""
}

# 主函数
main() {
    show_cleanup_preview
    
    read -p "确认开始清理吗？(y/N): " confirm
    if [[ $confirm =~ ^[Yy]$ ]]; then
        cleanup_project
    else
        log_info "清理已取消"
    fi
}

# 运行主函数
main "$@" 