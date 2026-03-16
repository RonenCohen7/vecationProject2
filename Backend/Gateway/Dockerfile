
FROM node:24-alpine AS builder

RUN npm install -g pnpm 

WORKDIR /app

#copy workspace from root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

#copy All
COPY . .

#Install workspace
RUN pnpm install --frozen-lockfile

#build auth
RUN pnpm --filter ./Backend/Gateway build

EXPOSE 4003

WORKDIR /app/Backend/Gateway

CMD ["pnpm", "start"]