#!/bin/sh
JSON_STRING='window.configs = { \
  "VUE_APP_BASE_API":"'${VUE_APP_BASE_API}'", \
  "VUE_APP_PARENT_DOMAIN":"'${VUE_APP_PARENT_DOMAIN}'", \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/academy/index.html

exec "$@"