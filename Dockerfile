# ベースイメージを指定
FROM nginx:alpine

# Nginxのデフォルト設定を削除し、新しい設定ファイルを作成
RUN rm /etc/nginx/conf.d/default.conf && \
  echo "server {" > /etc/nginx/conf.d/default.conf && \
  echo "    listen 3000;" >> /etc/nginx/conf.d/default.conf && \
  echo "    location / {" >> /etc/nginx/conf.d/default.conf && \
  echo "        root   /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf && \
  echo "        index  index.html index.htm;" >> /etc/nginx/conf.d/default.conf && \
  echo "    }" >> /etc/nginx/conf.d/default.conf && \
  echo "}" >> /etc/nginx/conf.d/default.conf

# 単純なHTMLページを作成
RUN echo 'Hello World from Nginx running on port 3000!' > /usr/share/nginx/html/index.html

# ポート3000を開放
EXPOSE 3000

# Nginxを前面で実行
CMD ["nginx", "-g", "daemon off;"]
