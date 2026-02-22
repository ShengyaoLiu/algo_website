#!/bin/bash

# 部署验证脚本
# 用于检查网站部署是否成功

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
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# 获取域名
get_domain() {
    if [ $# -eq 0 ]; then
        read -p "请输入要检查的域名: " DOMAIN
    else
        DOMAIN=$1
    fi
    
    if [ -z "$DOMAIN" ]; then
        log_error "域名不能为空"
        exit 1
    fi
}

# 检查DNS解析
check_dns() {
    log_info "检查DNS解析..."
    
    if nslookup "$DOMAIN" > /dev/null 2>&1; then
        log_success "DNS解析正常"
    else
        log_error "DNS解析失败"
        return 1
    fi
}

# 检查HTTP响应
check_http() {
    log_info "检查HTTP响应..."
    
    if curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" | grep -q "200\|301\|302"; then
        log_success "HTTP响应正常"
    else
        log_error "HTTP响应异常"
        return 1
    fi
}

# 检查HTTPS响应
check_https() {
    log_info "检查HTTPS响应..."
    
    if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200"; then
        log_success "HTTPS响应正常"
    else
        log_warning "HTTPS响应异常或证书问题"
        return 1
    fi
}

# 检查SSL证书
check_ssl() {
    log_info "检查SSL证书..."
    
    if openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" < /dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
        log_success "SSL证书有效"
    else
        log_warning "SSL证书可能有问题"
        return 1
    fi
}

# 检查Nginx服务
check_nginx() {
    log_info "检查Nginx服务..."
    
    if systemctl is-active --quiet nginx; then
        log_success "Nginx服务运行正常"
    else
        log_error "Nginx服务未运行"
        return 1
    fi
}

# 检查网站文件
check_website_files() {
    log_info "检查网站文件..."
    
    WEB_ROOT="/var/www/$DOMAIN"
    DIST_DIR="$WEB_ROOT/dist"
    
    if [ -d "$WEB_ROOT" ]; then
        log_success "网站根目录存在: $WEB_ROOT"
    else
        log_error "网站根目录不存在: $WEB_ROOT"
        return 1
    fi
    
    if [ -d "$DIST_DIR" ]; then
        log_success "构建目录存在: $DIST_DIR"
    else
        log_error "构建目录不存在: $DIST_DIR"
        return 1
    fi
    
    if [ -f "$DIST_DIR/index.html" ]; then
        log_success "首页文件存在"
    else
        log_error "首页文件不存在"
        return 1
    fi
}

# 检查Nginx配置
check_nginx_config() {
    log_info "检查Nginx配置..."
    
    NGINX_CONFIG="/etc/nginx/sites-available/$DOMAIN"
    NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"
    
    if [ -f "$NGINX_CONFIG" ]; then
        log_success "Nginx配置文件存在"
    else
        log_error "Nginx配置文件不存在: $NGINX_CONFIG"
        return 1
    fi
    
    if [ -L "$NGINX_ENABLED" ]; then
        log_success "Nginx站点已启用"
    else
        log_error "Nginx站点未启用"
        return 1
    fi
    
    if nginx -t > /dev/null 2>&1; then
        log_success "Nginx配置语法正确"
    else
        log_error "Nginx配置语法错误"
        return 1
    fi
}

# 检查更新脚本
check_update_script() {
    log_info "检查更新脚本..."
    
    UPDATE_SCRIPT="/usr/local/bin/update-$DOMAIN.sh"
    
    if [ -f "$UPDATE_SCRIPT" ]; then
        log_success "更新脚本存在: $UPDATE_SCRIPT"
    else
        log_warning "更新脚本不存在: $UPDATE_SCRIPT"
        return 1
    fi
    
    if [ -x "$UPDATE_SCRIPT" ]; then
        log_success "更新脚本可执行"
    else
        log_warning "更新脚本不可执行"
        return 1
    fi
}

# 检查防火墙
check_firewall() {
    log_info "检查防火墙设置..."
    
    if ufw status | grep -q "Status: active"; then
        log_success "防火墙已启用"
        
        if ufw status | grep -q "Nginx Full\|80\|443"; then
            log_success "HTTP/HTTPS端口已开放"
        else
            log_warning "HTTP/HTTPS端口可能未开放"
        fi
    else
        log_warning "防火墙未启用"
    fi
}

# 性能测试
performance_test() {
    log_info "进行简单性能测试..."
    
    # 测试首页加载时间
    load_time=$(curl -o /dev/null -s -w "%{time_total}" "https://$DOMAIN" 2>/dev/null || echo "N/A")
    
    if [ "$load_time" != "N/A" ]; then
        log_success "页面加载时间: ${load_time}秒"
    else
        log_warning "无法测试页面加载时间"
    fi
}

# 显示系统信息
show_system_info() {
    log_info "系统信息:"
    echo "操作系统: $(lsb_release -d | cut -f2)"
    echo "内核版本: $(uname -r)"
    echo "当前时间: $(date)"
    echo "运行时间: $(uptime -p)"
    echo "内存使用: $(free -h | grep Mem | awk '{printf "%.1fG/%.1fG (%.1f%%)", $3/1024, $2/1024, $3/$2*100}')"
    echo "磁盘使用: $(df -h / | tail -1 | awk '{print $3"/"$2" ("$5")"}')"
}

# 主验证函数
main() {
    echo "=================================================="
    echo "           网站部署验证脚本"
    echo "=================================================="
    echo ""
    
    get_domain "$@"
    
    log_info "开始验证域名: $DOMAIN"
    echo ""
    
    # 基础检查
    echo "--- 基础服务检查 ---"
    check_nginx || true
    check_nginx_config || true
    check_website_files || true
    check_update_script || true
    check_firewall || true
    echo ""
    
    # 网络检查
    echo "--- 网络连接检查 ---"
    check_dns || true
    check_http || true
    check_https || true
    check_ssl || true
    echo ""
    
    # 性能测试
    echo "--- 性能测试 ---"
    performance_test || true
    echo ""
    
    # 系统信息
    echo "--- 系统信息 ---"
    show_system_info
    echo ""
    
    echo "=================================================="
    echo "           验证完成"
    echo "=================================================="
    echo ""
    echo "💡 提示："
    echo "  - 如果有任何警告或错误，请查看上面的详细信息"
    echo "  - 可以运行以下命令查看详细日志："
    echo "    sudo tail -f /var/log/nginx/error.log"
    echo "    sudo journalctl -u nginx"
    echo ""
    echo "🔧 常用命令："
    echo "  - 重启Nginx: sudo systemctl restart nginx"
    echo "  - 更新网站: sudo /usr/local/bin/update-$DOMAIN.sh"
    echo "  - 查看SSL证书: sudo certbot certificates"
    echo ""
}

# 运行主函数
main "$@" 