# Stage 1: Сборка Angular-приложения
FROM node:20 as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Запуск в Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем билд Angular
COPY --from=build /usr/src/app/dist/test-cicdangular/browser /usr/share/nginx/html

# Копируем env.template.js
COPY public/env.template.js /usr/share/nginx/html/public/env.template.js

# Подставляем переменные окружения
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/public/env.template.js > /usr/share/nginx/html/public/env.js && exec nginx -g 'daemon off;'"]

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
