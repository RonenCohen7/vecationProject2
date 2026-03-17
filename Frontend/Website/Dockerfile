# Inherit from predefined image containing Linux Alpine OS + Node.js 24:
FROM node:24-alpine AS builder


# Install PNPM globally:
RUN npm install --global pnpm

# Create the application root folder: 
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./


# Copy required files and folders into /app:
COPY ./pnpm-*.yaml ./package.json ./tsconfig.base.json /app/
COPY ./Libraries /app/Libraries
COPY ./Frontend/Website /app/Frontend/Website


# Install & build;
RUN pnpm install --frozen-lockfile

WORKDIR /app/Frontend/Website

RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/Frontend/Website/dist /usr/share/nginx/html
COPY ./Frontend/Website/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

# # How to run our app when container starts: 
# ENTRYPOINT pnpm start


CMD ["nginx", "-g", "daemon off;"]