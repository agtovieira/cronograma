FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache apache2-utils
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint-auth.sh /docker-entrypoint-auth.sh
RUN chmod +x /docker-entrypoint-auth.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint-auth.sh"]
CMD ["nginx", "-g", "daemon off;"]
