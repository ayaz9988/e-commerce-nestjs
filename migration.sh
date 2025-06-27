#!/usr/bin/env bash
# $1 = db/migrations/:name
yarn migration:generate $1
yarn migration:run