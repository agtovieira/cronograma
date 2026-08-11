#!/bin/sh
set -eu

AUTH_USER="${BASIC_AUTH_USER:-}"
AUTH_PASSWORD="${BASIC_AUTH_PASSWORD:-}"

if [ -z "$AUTH_USER" ] || [ -z "$AUTH_PASSWORD" ]; then
  echo "BASIC_AUTH_USER and BASIC_AUTH_PASSWORD must be set."
  exit 1
fi

htpasswd -bc /etc/nginx/.htpasswd "$AUTH_USER" "$AUTH_PASSWORD"

exec /docker-entrypoint.sh "$@"
