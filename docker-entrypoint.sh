#!/bin/sh

if [ ! -f /usr/share/nginx/html/academy/config.js ] ; then
	envsubst < /usr/share/nginx/html/academy/config.js.tmpl > /usr/share/nginx/html/academy/config.js
fi

exec "$@"