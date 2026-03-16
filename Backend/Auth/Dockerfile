FROM node:24-alpine

RUN npm install -g pnpm 

WORKDIR /app

#copy workspace from root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

#copy All
COPY . .

#Install workspace
RUN pnpm install --frozen-lockfile


#build auth
RUN pnpm --filter ./Backend/Auth build

EXPOSE 4000

WORKDIR /app/Backend/Auth

CMD ["pnpm", "start"]