# STAGE 1: Build Frontend & Backend
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# STAGE 2: Production Runtime
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/firebase-applet-config.json* ./

RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "dist/server.cjs"]
