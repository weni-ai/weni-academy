# syntax = docker/dockerfile:1

ARG NODE_VERSION="14.17.4"
ARG BASE_VERSION="alpine3.14"

FROM node:${NODE_VERSION}-${BASE_VERSION} as builder

WORKDIR /app

RUN apk --no-cache add git

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn yarn install

COPY . ./

RUN yarn build

FROM nginxinc/nginx-unprivileged:1.25-alpine

COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html/academy/
COPY docker-entrypoint.sh /
RUN mv /usr/share/nginx/html/academy/index.html /usr/share/nginx/html/academy/index.html.tmpl \
    && cd /usr/share/nginx/html/academy/ \
    && ln -s /tmp/index.html

EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
