#!/usr/bin/env bash
set -e

run_app(){
	npm run build
	serve -s build
}

run_app
exit
