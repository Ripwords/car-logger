FROM node:22-alpine as build

RUN npm i -g bun

WORKDIR /app
COPY package.json /app
RUN bun i
COPY . /app





RUN bun build
FROM gcr.io/distroless/nodejs:22 as prod
WORKDIR /app
COPY --from=build /app/.output/server /app/.output/server
EXPOSE 3000/tcp
CMD ["/app/.output/server/index.mjs"]


