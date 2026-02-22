# 多语言网站部署指南

本项目支持在两台服务器上分别部署中文版和英文版网站，实现智能的语言切换和域名跳转。

## 🎯 部署目标

- **中文站点**: `aiminjia.com` - 自动显示中文内容
- **英文站点**: `algoquality.com` - 自动显示英文内容
- **智能切换**: 用户可以通过按钮在两个站点之间跳转

## 🚀 部署步骤

### 1. 代码准备

确保代码已经包含以下功能：
- ✅ 根据域名自动检测语言
- ✅ 智能显示语言切换按钮
- ✅ 正确的跳转逻辑

### 2. 中文站点部署 (aiminjia.com)

使用自动部署脚本：

```bash
# 在项目根目录运行部署脚本
./deploy.sh

# 选择选项: 1) aiminjia.com (中文站点)
```

或手动部署：

```bash
# 1. 上传代码到服务器
# 上传项目文件到 /var/www/aiminjia.com

# 2. 安装依赖
cd /var/www/aiminjia.com
npm install

# 3. 构建生产版本
npm run build

# 4. 配置Web服务器 (nginx示例)
# /etc/nginx/sites-available/aiminjia.com
server {
    listen 80;
    listen 443 ssl;
    server_name aiminjia.com www.aiminjia.com;
    
    root /var/www/aiminjia.com/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # SSL配置
    ssl_certificate /path/to/ssl/aiminjia.com.crt;
    ssl_certificate_key /path/to/ssl/aiminjia.com.key;
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/aiminjia.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. 英文站点部署 (algoquality.com)

使用自动部署脚本：

```bash
# 在项目根目录运行部署脚本
./deploy.sh

# 选择选项: 2) algoquality.com (英文站点)
```

或手动部署：

```bash
# 1. 上传代码到服务器
# 上传项目文件到 /var/www/algoquality.com

# 2. 安装依赖
cd /var/www/algoquality.com
npm install

# 3. 构建生产版本
npm run build

# 4. 配置Web服务器 (nginx示例)
# /etc/nginx/sites-available/algoquality.com
server {
    listen 80;
    listen 443 ssl;
    server_name algoquality.com www.algoquality.com;
    
    root /var/www/algoquality.com/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # SSL配置
    ssl_certificate /path/to/ssl/algoquality.com.crt;
    ssl_certificate_key /path/to/ssl/algoquality.com.key;
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/algoquality.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 🔧 功能说明

### 自动语言检测

项目会根据访问的域名自动设置语言：

```javascript
// src/i18n.js
const getLanguageByDomain = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('aiminjia.com')) {
    return 'zh'; // 中文站点
  } else if (hostname.includes('algoquality.com')) {
    return 'en'; // 英文站点
  }
  return 'en'; // 默认英文
};
```

### 智能按钮显示

- **在 aiminjia.com**: 只显示"🇬🇧 English"按钮，点击跳转到 algoquality.com
- **在 algoquality.com**: 只显示"🇨🇳 中文"按钮，点击跳转到 aiminjia.com
- **本地开发**: 显示两个按钮便于测试

## 📱 测试验证

### 本地测试
```bash
npm run dev
# 访问 http://localhost:5173/ 
# 应该看到两个语言切换按钮
```

### 生产环境测试
1. 访问 `https://aiminjia.com`
   - 页面应该自动显示中文内容
   - 右上角应该只有"🇬🇧 English"按钮
   - 点击按钮应该跳转到 `algoquality.com`

2. 访问 `https://algoquality.com`
   - 页面应该自动显示英文内容
   - 右上角应该只有"🇨🇳 中文"按钮
   - 点击按钮应该跳转到 `aiminjia.com`

## 🔄 更新部署

当需要更新网站内容时：

### 使用自动更新脚本

```bash
# 1. 上传新代码到服务器
scp -r /path/to/new/code user@server:/tmp/new-code

# 2. 运行更新脚本
sudo /usr/local/bin/update-aiminjia.com.sh /tmp/new-code
# 或
sudo /usr/local/bin/update-algoquality.com.sh /tmp/new-code
```

### 手动更新

```bash
# 在对应的服务器上
# 1. 备份当前版本
sudo cp -r /var/www/[domain-name] /var/www/[domain-name].backup

# 2. 上传新代码并覆盖
# 上传新代码到 /var/www/[domain-name]

# 3. 重新构建
cd /var/www/[domain-name]
npm install
npm run build

# 4. 重新加载Web服务器
sudo nginx -s reload
```

## 🚨 注意事项

1. **SSL证书**: 确保两个域名都配置了有效的SSL证书
2. **DNS配置**: 确保域名正确解析到对应的服务器
3. **防火墙**: 确保80和443端口开放
4. **CDN**: 如果使用CDN，确保缓存策略正确配置

## 📞 技术支持

如果在部署过程中遇到问题，请检查：
- [ ] 域名DNS解析是否正确
- [ ] Web服务器配置是否正确
- [ ] SSL证书是否有效
- [ ] 防火墙设置是否正确
- [ ] 代码是否正确构建 