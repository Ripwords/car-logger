FROM node:18-alpine AS build

RUN npm i -g pnpm

WORKDIR /app
COPY . /app
RUN pnpm i
RUN pnpm build

FROM gcr.io/distroless/nodejs:18 AS prod
WORKDIR /app
COPY --from=build /app/.output/server /app/.output/server
EXPOSE 3000/tcp
CMD ["/app/.output/server/index.mjs"]


