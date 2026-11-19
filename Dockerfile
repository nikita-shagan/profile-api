FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run lint && npm run build && npm prune --omit=dev --ignore-scripts

FROM base
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY prisma ./prisma
COPY schema.graphql package*.json ./
RUN mkdir data && chown node:node data
USER node
EXPOSE 3000
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && exec node dist/main.js"]
