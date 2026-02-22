#!/bin/bash

# ALGO Quality 网站自动化设置脚本
# 适用于 macOS/Linux 系统

set -e  # 遇到错误立即退出

echo "🚀 开始设置 ALGO Quality 网站..."
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if command -v $1 &> /dev/null; then
        print_success "$1 已安装"
        return 0
    else
        print_error "$1 未找到"
        return 1
    fi
}

# 检查 Node.js 环境
check_nodejs() {
    print_status "检查 Node.js 环境..."
    
    if check_command node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js 版本: $NODE_VERSION"
        
        # 检查版本是否满足要求 (>=16)
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -lt "16" ]; then
            print_error "Node.js 版本过低，需要 >= 16.0.0"
            exit 1
        fi
    else
        print_error "请先安装 Node.js (https://nodejs.org/)"
        exit 1
    fi
    
    if check_command npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm 版本: $NPM_VERSION"
    else
        print_error "npm 未找到"
        exit 1
    fi
}

# 安装项目依赖
install_dependencies() {
    print_status "安装项目依赖..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json 文件未找到，请确保在项目根目录运行此脚本"
        exit 1
    fi
    
    # 清理之前的安装
    if [ -d "node_modules" ]; then
        print_warning "清理旧的 node_modules..."
        rm -rf node_modules
    fi
    
    if [ -f "package-lock.json" ]; then
        print_warning "清理旧的 package-lock.json..."
        rm -f package-lock.json
    fi
    
    # 安装依赖
    print_status "正在安装 npm 依赖..."
    npm install --legacy-peer-deps
    
    if [ $? -eq 0 ]; then
        print_success "依赖安装完成"
    else
        print_error "依赖安装失败"
        exit 1
    fi
}

# 检查重要文件
check_project_files() {
    print_status "检查项目文件..."
    
    REQUIRED_FILES=(
        "src/App.jsx"
        "src/main.jsx"
        "src/i18n.js"
        "index.html"
        "vite.config.js"
    )
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "✓ $file"
        else
            print_error "✗ $file 缺失"
            exit 1
        fi
    done
}

# 创建启动脚本
create_start_script() {
    print_status "创建启动脚本..."
    
    cat > start.sh << 'EOF'
#!/bin/bash

echo "🌐 启动 ALGO Quality 网站开发服务器..."

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "依赖未安装，正在安装..."
    npm install --legacy-peer-deps
fi

# 启动开发服务器
echo "启动中... 服务器将在 http://localhost:5173 运行"
npm run dev
EOF

    chmod +x start.sh
    print_success "启动脚本已创建: ./start.sh"
}

# 创建部署脚本
create_build_script() {
    print_status "创建构建脚本..."
    
    cat > build.sh << 'EOF'
#!/bin/bash

echo "📦 构建 ALGO Quality 网站生产版本..."

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "依赖未安装，正在安装..."
    npm install --legacy-peer-deps
fi

# 构建项目
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建完成！生产文件位于 dist/ 目录"
    echo "可以使用以下命令预览:"
    echo "npm run preview"
else
    echo "❌ 构建失败"
    exit 1
fi
EOF

    chmod +x build.sh
    print_success "构建脚本已创建: ./build.sh"
}

# 创建 README 文档
create_readme() {
    print_status "创建项目文档..."
    
    cat > README.md << 'EOF'
# ALGO Quality 官网

面向医疗健康领域的质量咨询和数字化技术平台

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装与运行

1. **自动化设置**（推荐）
```bash
chmod +x setup.sh
./setup.sh
```

2. **手动安装**
```bash
npm install --legacy-peer-deps
npm run dev
```

3. **使用启动脚本**
```bash
./start.sh
```

### 构建生产版本
```bash
./build.sh
# 或者
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
algo-website/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 应用入口
│   ├── i18n.js          # 国际化配置
│   ├── components/ui/   # UI 组件库
│   └── assets/          # 静态资源
├── public/              # 公共文件
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
├── setup.sh             # 自动化设置脚本
├── start.sh             # 启动脚本
└── build.sh             # 构建脚本
```

## 🌐 功能特性

- ✅ React 19 + Vite 6
- ✅ TailwindCSS 样式系统
- ✅ Shadcn/ui 组件库
- ✅ 中英文国际化
- ✅ 响应式设计
- ✅ Stagewise 工具栏集成

## 🔧 技术栈

- **前端框架**: React 19.1.0
- **构建工具**: Vite 6.3.5
- **样式**: TailwindCSS 4.1.7
- **UI 组件**: Shadcn/ui (Radix UI)
- **国际化**: react-i18next
- **包管理**: npm

## 📞 联系方式

**新加坡办公室**
- Email: agoh@algoquality.com
- Tel: +65 9731-2557
- Address: 169 Jln Jurong Kechil, Singapore 598669

**上海办公室**
- Email: agoh@algoquality.com  
- Tel: +86 183-0175-1255
- Address: 668 Xinzhuan Road, Songjiang District, Shanghai, China

## 📄 许可证

© 2025 ALGO Quality Company. All rights reserved.
EOF

    print_success "项目文档已创建: README.md"
}

# 测试启动
test_startup() {
    print_status "测试项目启动..."
    
    # 检查端口是否被占用
    if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
        print_warning "端口 5173 已被占用，请先关闭其他服务"
        return 1
    fi
    
    print_success "环境检查通过，可以启动项目"
    return 0
}

# 主执行流程
main() {
    echo ""
    print_status "开始环境检查和项目设置..."
    echo ""
    
    # 检查 Node.js 环境
    check_nodejs
    echo ""
    
    # 检查项目文件
    check_project_files
    echo ""
    
    # 安装依赖
    install_dependencies
    echo ""
    
    # 创建脚本和文档
    create_start_script
    create_build_script
    create_readme
    echo ""
    
    # 测试启动
    test_startup
    echo ""
    
    print_success "🎉 ALGO Quality 网站设置完成！"
    echo ""
    echo "📖 下一步操作:"
    echo "   1. 启动开发服务器: ./start.sh"
    echo "   2. 访问网站: http://localhost:5173"
    echo "   3. 构建生产版本: ./build.sh"
    echo ""
    echo "📚 查看完整文档: cat README.md"
    echo ""
    
    # 询问是否立即启动
    read -p "是否现在启动开发服务器? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "正在启动开发服务器..."
        ./start.sh
    else
        print_status "稍后可以运行 ./start.sh 启动服务器"
    fi
}

# 运行主流程
main "$@" 