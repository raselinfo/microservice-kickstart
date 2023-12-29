FROM node:18-alpine
# RUN addgroup -S app && adduser -S app -G app

# WORKDIR /user/src/app
WORKDIR /app

RUN npm install -g pnpm


COPY package.json ./

RUN pnpm i

COPY . .

CMD ["pnpm", "dev"]