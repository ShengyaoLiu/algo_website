# 🚀 快速部署指南

这个自动化部署脚本可以在全新的Ubuntu 22.04服务器上一键部署多语言网站。

## 📋 前提条件

1. **服务器环境**: Ubuntu 22.04 LTS
2. **用户权限**: 具有sudo权限的普通用户（不要使用root用户）
3. **域名解析**: 域名已正确解析到服务器IP
4. **防火墙**: 确保80和443端口开放

## 🎯 支持的部署选项

- **aiminjia.com** - 中文站点
- **algoquality.com** - 英文站点  
- **自定义域名** - 支持任何域名

## ⚡ 快速部署

### 1. 上传项目到服务器

```bash
# 方法1: 使用scp上传整个项目
tar -czf algo-website.tar.gz --exclude=node_modules --exclude=dist --exclude=.git *
scp algo-website.tar.gz user@your-server:~/
ssh user@your-server
tar -xzf algo-website.tar.gz
cd algo-website

# 方法2: 直接在服务器上操作
# 将项目文件上传到服务器的某个目录，确保包含 deploy.sh
chmod +x deploy.sh
```

### 2. 运行部署脚本

```bash
./deploy.sh
```

### 3. 按照提示进行配置

脚本会询问以下信息：

1. **选择站点类型**:
   ```
   1) aiminjia.com (中文站点)
   2) algoquality.com (英文站点)  
   3) 自定义域名
   ```

2. **SSL证书配置**:
   - 邮箱地址（用于SSL证书通知）

## 📝 部署过程

脚本会自动执行以下步骤：

1. ✅ **系统更新** - 更新Ubuntu包
2. ✅ **安装依赖** - Node.js 18, Nginx, UFW, Certbot
3. ✅ **配置防火墙** - 开放SSH、HTTP、HTTPS端口
4. ✅ **复制项目** - 将当前目录的代码复制到服务器
5. ✅ **构建项目** - 安装依赖并构建生产版本
6. ✅ **配置Nginx** - 创建优化的Nginx配置
7. ✅ **申请SSL证书** - 自动申请Let's Encrypt证书
8. ✅ **创建更新脚本** - 生成便捷的更新命令

## 🎉 部署完成后

### 网站访问
- HTTP: `http://your-domain.com`
- HTTPS: `https://your-domain.com`

## 📱 更新网站

### 使用自动更新脚本

1. **上传新代码到服务器**:
   ```bash
   # 在本地打包项目（排除不必要文件）
   tar -czf website-update.tar.gz --exclude=node_modules --exclude=dist --exclude=.git *
   
   # 上传到服务器
   scp website-update.tar.gz user@your-server:/tmp/
   
   # 在服务器上解压
   ssh user@your-server
   cd /tmp
   tar -xzf website-update.tar.gz -C ./website-update/
   ```

2. **运行更新脚本**:
   ```bash
   # 更新 aiminjia.com
   sudo /usr/local/bin/update-aiminjia.com.sh /tmp/website-update
   
   # 或更新 algoquality.com
   sudo /usr/local/bin/update-algoquality.com.sh /tmp/website-update
   ```

### 手动更新

```bash
# 1. 备份当前版本
sudo cp -r /var/www/your-domain.com /var/www/your-domain.com.backup.$(date +%Y%m%d_%H%M%S)

# 2. 复制新代码
sudo rm -rf /var/www/your-domain.com/*
sudo cp -r /path/to/new/code/* /var/www/your-domain.com/
sudo chown -R $USER:$USER /var/www/your-domain.com

# 3. 重新构建
cd /var/www/your-domain.com
npm install
npm run build

# 4. 重新加载Nginx
sudo nginx -s reload
```

### 常用命令
```bash
# 更新网站（需要先上传新代码到服务器）
sudo /usr/local/bin/update-your-domain.sh /path/to/new/code

# 重启Nginx
sudo systemctl restart nginx

# 查看Nginx状态
sudo systemctl status nginx

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 查看SSL证书状态
sudo certbot certificates

# 手动续期SSL证书
sudo certbot renew --dry-run
```

## 📁 重要路径

- **网站文件**: `/var/www/your-domain.com/`
- **构建产物**: `/var/www/your-domain.com/dist/`
- **Nginx配置**: `/etc/nginx/sites-available/your-domain.com`
- **更新脚本**: `/usr/local/bin/update-your-domain.sh`

## 🔧 手动SSL证书申请

如果自动申请失败，可以手动申请：

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🚨 故障排除

### 常见问题

1. **域名解析问题**
   ```bash
   # 检查域名解析
   nslookup your-domain.com
   dig your-domain.com
   ```

2. **防火墙问题**
   ```bash
   # 检查防火墙状态
   sudo ufw status
   
   # 开放端口
   sudo ufw allow 'Nginx Full'
   ```

3. **Nginx配置问题**
   ```bash
   # 测试Nginx配置
   sudo nginx -t
   
   # 查看Nginx错误日志
   sudo tail -f /var/log/nginx/error.log
   ```

4. **SSL证书问题**
   ```bash
   # 查看证书状态
   sudo certbot certificates
   
   # 测试续期
   sudo certbot renew --dry-run
   ```

5. **Node.js版本问题**
   ```bash
   # 检查Node.js版本
   node --version
   npm --version
   
   # 如果版本过低，重新安装
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

### 日志位置

- **Nginx访问日志**: `/var/log/nginx/access.log`
- **Nginx错误日志**: `/var/log/nginx/error.log`
- **系统日志**: `sudo journalctl -u nginx`

## 🔄 多服务器部署

为了部署两个不同的站点，您需要：

1. **第一台服务器** - 部署中文站点
   ```bash
   ./deploy.sh
   # 选择: 1) aiminjia.com (中文站点)
   ```

2. **第二台服务器** - 部署英文站点
   ```bash
   ./deploy.sh  
   # 选择: 2) algoquality.com (英文站点)
   ```

## 📞 技术支持

如果遇到问题，请检查：

- [ ] 服务器是否为Ubuntu 22.04
- [ ] 用户是否有sudo权限
- [ ] 域名DNS是否正确解析
- [ ] 80和443端口是否开放
- [ ] 项目代码是否已正确上传到服务器

---

**提示**: 整个部署过程大约需要5-10分钟，请耐心等待完成。 