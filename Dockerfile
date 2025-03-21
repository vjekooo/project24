FROM node:21-alpine as build

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY vite.config.mjs tsconfig.json tailwind.config.ts index.html ./

RUN pnpm build
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]