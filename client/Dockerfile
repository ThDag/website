FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Pre-populate node_modules in the image
COPY --from=builder /app/node_modules ./node_modules
