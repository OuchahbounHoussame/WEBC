# Multi-stage Dockerfile for Crochet Store (Frontend + Backend)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build frontend
COPY . .
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# Copy server, built frontend, and storage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 5000

CMD ["node", "server/index.js"]
