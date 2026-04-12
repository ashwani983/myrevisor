# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy web package files
COPY web/package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy web source code
COPY web/ ./

# Copy data files from root src/data to web/src/data
COPY src/data ./src/data

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Copy static assets
COPY --from=builder /app/public/ /usr/share/nginx/html/public

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
