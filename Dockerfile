FROM node:14-alpine as builder

WORKDIR /home/app

RUN apk --no-cache update && \
    apk --no-cache add git yarn && \
    yarn global add @vue/cli

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn yarn install

COPY . .

RUN yarn build

FROM nginx:1.24-alpine

ENV APP_USER=app \
    APP_GROUP=app \
    USER_ID=1999 \
    GROUP_ID=1999

RUN addgroup --system --gid ${GROUP_ID} ${APP_GROUP} \
    && adduser --system --disabled-password --home /home/${APP_USER} \
    --uid ${USER_ID} --ingroup ${APP_GROUP} ${APP_USER}

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=${APP_USER}:${APP_GROUP} /home/app/dist /usr/share/nginx/html/academy

COPY docker-entrypoint.sh /usr/share/nginx/

WORKDIR /home/app

USER ${APP_USER}:${APP_GROUP}

EXPOSE 8080
RUN chmod +x /usr/share/nginx/docker-entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

# COPY config.js.tmpl /usr/share/nginx/html/academy/
