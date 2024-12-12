SHELL := bash
mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
mkfile_dir := $(patsubst %/,%,$(dir $(mkfile_path)))
PATH := $(mkfile_dir)/bin:$(PATH)
.SHELLFLAGS := -eu -o pipefail -c # -c: Needed in .SHELLFLAGS. Default is -c.
.DEFAULT_GOAL := run

# dotenv := $(PWD)/.env
# -include $(dotenv)

export

zip:
	@zip -r envs.zip \
		./bin/curl_test.env \
		./bin/lib/curl_test/req/app/do.json.copy \
		./bin/lib/curl_test/req/notion/post_new_magazine.json.copy
unzip:
	@test -e envs.zip
	@unzip envs.zip

run: npmi_if_needed open_browser
	@vercel dev -d -l 3000
clean:
	@rm -rf node_modules

npmi_if_needed:
	@if [[ ! -e node_modules ]]; then \
		npm i; \
	fi

login:
	@vercel login
deploy:
	@vercel
deploy-prod:
	@vercel --prod


open_browser:
	@open "http://localhost:3000/api/do"

open_browser-prd:
	@open "https://convert-to-notion-request.vercel.app/api/do"

curl_test:
	@curl_test
