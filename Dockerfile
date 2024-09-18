
# 使用 node 官方镜像作为基础镜像
FROM crpi-l4eaw54bzztpe9af.cn-hangzhou.personal.cr.aliyuncs.com/caihuaoo/node:18.20.3

# 创建一个工作目录
RUN mkdir -p /cms_web

# 设置工作目录
WORKDIR /cms_web

# 将本地项目文件复制到容器内
COPY . /cms_web



# # 设置 npm 镜像为淘宝镜像
# RUN npm config set registry https://registry.npm.taobao.org

# RUN npm cache clean --force


# 安装依赖 （--verbose 显示详细日志） 当前dockerfile 不需要安装依赖命令 已在 github action 中安装依赖）
# # 安装项目依赖  （--legacy-peer-deps 允许安装旧版本依赖 忽略部分依赖冲突）
RUN npm install --verbose --legacy-peer-deps

# 暴露端口（假设 Vite 默认开发端口为 3002 )
EXPOSE 3002

# 启动命令
CMD ["npm", "run", "dev"]