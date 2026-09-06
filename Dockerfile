# ==========================================
# STAGE 1: Build the Frontend & Backend
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifest files first for layer caching
COPY package*.json ./
RUN npm install

# Copy all project source code and configuration files
COPY . .

# Compile the Vite frontend assets and bundle the Express server into dist/server.cjs
RUN npm run build

# ==========================================
# STAGE 2: Lightweight Production Runtime
# ==========================================
FROM node:20-alpine
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Copy compiled distribution artifacts and configs from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/firebase-applet-config.json* ./

# Install only production runtime dependencies
RUN npm install --omit=dev

# Standard Cloud Run exposed port
EXPOSE 8080

# Boot the compiled CommonJS Express production server
CMD ["node", "dist/server.cjs"]
