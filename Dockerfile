
# 使用 node 官方镜像作为基础镜像
FROM crpi-l4eaw54bzztpe9af.cn-hangzhou.personal.cr.aliyuncs.com/caihuaoo/node:18.20.3

# 创建一个工作目录
RUN mkdir -p /cms_web

# 设置工作目录
WORKDIR /cms_web

# 将本地项目文件复制到容器内
COPY . /cms_web

# 安装项目依赖
RUN npm install

# 暴露端口（假设 Vite 默认开发端口为 3002 )
EXPOSE 3002

# 启动命令
CMD ["npm", "run", "dev"]