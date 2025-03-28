FROM node:21-alpine as build

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY app.config.mjs tsconfig.json tailwind.config.ts .env.production ./

RUN pnpm build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]