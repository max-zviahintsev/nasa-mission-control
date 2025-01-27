FROM guergeiro/pnpm:current-latest-slim

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN pnpm run install-client-prod

COPY server/package*.json server/
RUN pnpm run install-server-prod

COPY client/ client/
RUN pnpm run --prefix ./client build

COPY server/ server/

USER node

CMD ["pnpm", "--prefix", "./server", "start"]

EXPOSE 8080