#!/usr/bin/env bash
set -e

run_app(){
	npm run build
	npm install serve
	./node_modules/.bin/serve -s build &>/dev/null &disown
}

run_app
exit
