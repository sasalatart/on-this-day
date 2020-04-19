#!/bin/bash

CMD_NAME=${0##*/}

PORT=$1
if [ -z "$PORT" ]; then
  printf "❌ Missing PORT.\n\n"
  echo "👉 Usage: $CMD_NAME PORT [HOST]"
  exit 1
fi

HOST=$2
if [ -z "$HOST" ]; then
  HOST="localhost"
fi

for i in $(seq 1 45); do
  nc -z $HOST "$1" && exit 0
  echo "⏳ Waiting for $HOST:$PORT to be ready... ($i seconds...)"
  sleep 1
done

echo "❌ $HOST:$PORT timeout. Exiting..."
exit 1
