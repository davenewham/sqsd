FROM alpine:3.24 AS node-base
RUN apk upgrade --no-cache && \
    apk add --no-cache nodejs=~24


FROM node-base AS node-packages
WORKDIR /sqsd
RUN apk add --no-cache npm
COPY package.json package-lock.json ./
RUN npm ci --omit=dev


FROM node-base
WORKDIR /sqsd
COPY --from=node-packages /sqsd/node_modules ./node_modules
COPY package.json cli.js run-cli.js ./
COPY lib ./lib

# Run sqsd
CMD ["node", "run-cli.js"]
