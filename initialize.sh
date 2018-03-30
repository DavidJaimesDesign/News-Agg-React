#!/usr/bin/env bash
set -e
run_var='./node_modules/.bin/serve -s build'

run_app(){
	npm run build
	npm install serve
	eval "${run_var}" &>/dev/null &disown;
}

run_app
