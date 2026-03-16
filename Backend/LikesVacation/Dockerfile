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
RUN pnpm --filter ./Backend/LikesVacation build

EXPOSE 4001

WORKDIR /app/Backend/LikesVacation

CMD ["pnpm", "start"]