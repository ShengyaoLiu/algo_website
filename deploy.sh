#!/bin/bash

# 多语言网站自动部署脚本 - Ubuntu 22.04
# 支持部署到 aiminjia.com (中文) 或 algoquality.com (英文)

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
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

# 检查当前目录是否为项目目录
check_project_dir() {
    if [ ! -f "package.json" ]; then
        log_error "当前目录不是有效的项目目录，请确保在项目根目录运行此脚本"
        exit 1
    fi
}

# 获取部署信息
get_deployment_info() {
    echo "=================================================="
    echo "    多语言网站部署脚本"
    echo "=================================================="
    echo ""
    echo "请选择要部署的站点："
    echo "1) aiminjia.com (中文站点)"
    echo "2) algoquality.com (英文站点)"
    echo "3) 自定义域名"
    echo ""
    
    read -p "请输入选择 (1-3): " site_choice
    
    case $site_choice in
        1)
            DOMAIN="aiminjia.com"
            SITE_TYPE="chinese"
            ;;
        2)
            DOMAIN="algoquality.com"
            SITE_TYPE="english"
            ;;
        3)
            read -p "请输入自定义域名: " DOMAIN
            read -p "请选择站点类型 (chinese/english): " SITE_TYPE
            ;;
        *)
            log_error "无效选择"
            exit 1
            ;;
    esac
    
    # 设置路径
    WEB_ROOT="/var/www/$DOMAIN"
    NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"
    CURRENT_DIR=$(pwd)
    
    log_info "部署信息："
    log_info "域名: $DOMAIN"
    log_info "站点类型: $SITE_TYPE"
    log_info "当前项目目录: $CURRENT_DIR"
    log_info "网站根目录: $WEB_ROOT"
    echo ""
}

# 更新系统
update_system() {
    log_info "更新系统包..."
    sudo apt update
    sudo apt upgrade -y
    log_success "系统更新完成"
}

# 安装基础依赖
install_dependencies() {
    log_info "安装基础依赖..."
    
    # 安装必要的包
    sudo apt install -y curl wget nginx ufw certbot python3-certbot-nginx
    
    # 安装Node.js 18.x
    log_info "安装Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    
    # 验证安装
    node_version=$(node --version)
    npm_version=$(npm --version)
    log_success "Node.js $node_version 安装完成"
    log_success "npm $npm_version 安装完成"
}

# 配置防火墙
setup_firewall() {
    log_info "配置防火墙..."
    
    # 重置防火墙规则
    sudo ufw --force reset
    
    # 设置默认策略
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    
    # 允许SSH、HTTP、HTTPS
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    
    # 启用防火墙
    sudo ufw --force enable
    
    log_success "防火墙配置完成"
}

# 复制项目代码
copy_project() {
    log_info "复制项目代码..."
    
    # 删除已存在的目录
    if [ -d "$WEB_ROOT" ]; then
        log_warning "目录 $WEB_ROOT 已存在，正在删除..."
        sudo rm -rf "$WEB_ROOT"
    fi
    
    # 创建目录
    sudo mkdir -p "$WEB_ROOT"
    
    # 复制项目文件（排除不必要的文件）
    log_info "复制项目文件到 $WEB_ROOT ..."
    sudo cp -r ./* "$WEB_ROOT/" 2>/dev/null || true
    sudo cp -r ./.[!.]* "$WEB_ROOT/" 2>/dev/null || true
    
    # 删除目标目录中不需要的文件
    sudo rm -rf "$WEB_ROOT/node_modules" 2>/dev/null || true
    sudo rm -rf "$WEB_ROOT/dist" 2>/dev/null || true
    sudo rm -rf "$WEB_ROOT/.git" 2>/dev/null || true
    
    # 设置权限
    sudo chown -R $USER:$USER "$WEB_ROOT"
    
    log_success "项目代码复制完成"
}

# 安装项目依赖并构建
build_project() {
    log_info "安装项目依赖..."
    
    cd "$WEB_ROOT"
    
    # 安装依赖
    npm install
    
    log_info "构建项目..."
    # 构建生产版本
    npm run build
    
    log_success "项目构建完成"
}

# 配置Nginx
setup_nginx() {
    log_info "配置Nginx..."
    
    # 创建Nginx配置文件（初始只配置HTTP，SSL稍后由certbot添加）
    sudo tee "$NGINX_CONFIG" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    root $WEB_ROOT/dist;
    index index.html;
    
    # 安全headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 静态文件缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }
    
    # SPA路由支持
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # SSL配置将由certbot自动添加
}
EOF
    
    # 启用站点
    sudo ln -sf "$NGINX_CONFIG" "/etc/nginx/sites-enabled/$DOMAIN"
    
    # 删除默认站点（如果存在）
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # 测试Nginx配置
    if sudo nginx -t; then
        log_success "Nginx配置验证通过"
    else
        log_error "Nginx配置有误"
        exit 1
    fi
    
    # 重启Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    log_success "Nginx配置完成"
}

# 申请SSL证书
setup_ssl() {
    log_info "申请SSL证书..."
    
    read -p "请输入您的邮箱地址（用于SSL证书通知）: " EMAIL
    
    if [ -z "$EMAIL" ]; then
        log_error "邮箱地址不能为空"
        exit 1
    fi
    
    # 申请SSL证书
    if sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive; then
        log_success "SSL证书申请成功"
        
        # 设置自动续期
        sudo systemctl enable certbot.timer
        sudo systemctl start certbot.timer
        
        log_success "SSL证书自动续期已设置"
    else
        log_warning "SSL证书申请失败，您可以稍后手动申请"
        log_warning "命令: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    fi
}

# 创建更新脚本
create_update_script() {
    log_info "创建更新脚本..."
    
    sudo tee "/usr/local/bin/update-$DOMAIN.sh" > /dev/null <<EOF
#!/bin/bash

# 网站更新脚本 - $DOMAIN
# 使用方法：将新代码上传到服务器后运行此脚本

set -e

log_info() {
    echo -e "\033[0;34m[INFO]\033[0m \$1"
}

log_success() {
    echo -e "\033[0;32m[SUCCESS]\033[0m \$1"
}

log_error() {
    echo -e "\033[0;31m[ERROR]\033[0m \$1"
}

WEB_ROOT="$WEB_ROOT"
DOMAIN="$DOMAIN"

log_info "开始更新 \$DOMAIN ..."

# 检查是否提供了源代码目录
if [ -z "\$1" ]; then
    log_error "请提供源代码目录路径"
    log_info "使用方法: \$0 /path/to/source/code"
    exit 1
fi

SOURCE_DIR="\$1"

if [ ! -d "\$SOURCE_DIR" ]; then
    log_error "源代码目录不存在: \$SOURCE_DIR"
    exit 1
fi

if [ ! -f "\$SOURCE_DIR/package.json" ]; then
    log_error "源代码目录中没有找到 package.json 文件"
    exit 1
fi

# 备份当前版本
log_info "备份当前版本..."
sudo cp -r "\$WEB_ROOT" "\$WEB_ROOT.backup.\$(date +%Y%m%d_%H%M%S)"

# 复制新代码
log_info "复制新代码..."
sudo rm -rf "\$WEB_ROOT"/*
sudo cp -r "\$SOURCE_DIR"/* "\$WEB_ROOT/"
sudo chown -R \$USER:\$USER "\$WEB_ROOT"

# 进入项目目录
cd "\$WEB_ROOT"

# 安装依赖
log_info "安装依赖..."
npm install

# 构建项目
log_info "构建项目..."
npm run build

# 重新加载Nginx配置
log_info "重新加载Nginx配置..."
sudo nginx -s reload

log_success "\$DOMAIN 更新完成！"
log_info "如果有问题，可以从备份恢复: \$WEB_ROOT.backup.*"
EOF
    
    # 设置执行权限
    sudo chmod +x "/usr/local/bin/update-$DOMAIN.sh"
    
    log_success "更新脚本已创建: /usr/local/bin/update-$DOMAIN.sh"
}

# 显示部署结果
show_deployment_info() {
    echo ""
    echo "=================================================="
    echo "    部署完成！"
    echo "=================================================="
    echo ""
    log_success "网站已成功部署到: $DOMAIN"
    echo ""
    echo "📁 网站根目录: $WEB_ROOT"
    echo "⚙️  Nginx配置: $NGINX_CONFIG"
    echo "🔄 更新脚本: /usr/local/bin/update-$DOMAIN.sh"
    echo ""
    echo "🌐 您可以通过以下方式访问网站："
    echo "   http://$DOMAIN"
    echo "   https://$DOMAIN"
    echo ""
    echo "🔧 常用命令："
    echo "   更新网站: sudo /usr/local/bin/update-$DOMAIN.sh /path/to/new/code"
    echo "   重启Nginx: sudo systemctl restart nginx"
    echo "   查看Nginx日志: sudo tail -f /var/log/nginx/error.log"
    echo "   查看SSL证书状态: sudo certbot certificates"
    echo ""
    echo "📝 注意事项："
    echo "   1. 确保域名DNS已正确解析到此服务器"
    echo "   2. 如果SSL证书申请失败，请稍后手动申请"
    echo "   3. 更新网站时，先上传新代码到服务器，然后运行更新脚本"
    echo ""
}

# 主函数
main() {
    echo "开始部署多语言网站..."
    echo ""
    
    check_project_dir
    get_deployment_info
    
    read -p "确认开始部署吗？(y/N): " confirm
    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_info "部署已取消"
        exit 0
    fi
    
    update_system
    install_dependencies
    setup_firewall
    copy_project
    build_project
    setup_nginx
    
    read -p "是否要申请SSL证书？(y/N): " ssl_confirm
    if [[ $ssl_confirm =~ ^[Yy]$ ]]; then
        setup_ssl
    else
        log_warning "跳过SSL证书申请，您可以稍后手动申请"
    fi
    
    create_update_script
    show_deployment_info
}

# 运行主函数
main "$@" 