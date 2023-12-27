#!/bin/bash

if [ ! -f .env ]; then
  echo "Файл .env не найден."
  exit 1
fi

while IFS= read -r line || [[ -n "$line" ]]; do
  if [[ -z "$line" ]]; then
    continue
  fi

  if [[ "${line:0:1}" == "#" ]]; then
    continue
  fi

  export "$line"
done < .env

npm run seed:user
