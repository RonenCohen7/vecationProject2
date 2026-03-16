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
RUN pnpm --filter ./Backend/Booking build

EXPOSE 4004

WORKDIR /app/Backend/Booking

CMD ["pnpm", "start"]