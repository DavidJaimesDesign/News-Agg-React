#!/usr/bin/env bash
set -e

run_app(){
	npm run build
	npm install serve
	./node_modules/.bin/serve -s build
}

run_app
exit
