FROM node:21-alpine as build

ARG API_DOMAIN
ENV API_DOMAIN=$API_DOMAIN

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY app.config.mjs tsconfig.json tailwind.config.ts ./

RUN pnpm build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]