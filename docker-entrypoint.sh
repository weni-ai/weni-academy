#!/bin/sh
JSON_STRING='window.configs = { \
  "VUE_APP_BASE_API":"'${VUE_APP_BASE_API}'", \
  "VUE_APP_PARENT_DOMAIN":"'${VUE_APP_PARENT_DOMAIN}'", \
  "VUE_APP_LOGROCKET_ID":"'${VUE_APP_LOGROCKET_ID}'", \
}'
sed "s|//CONFIGURATIONS_PLACEHOLDER|${JSON_STRING}|" /usr/share/nginx/html/academy/index.html.tmpl > /tmp/index.html

exec "$@"
