SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c # -c: Needed in .SHELLFLAGS. Default is -c.
.DEFAULT_GOAL := run

dotenv := $(PWD)/.env
-include $(dotenv)

export

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
	@open "http://localhost:3000/api/hello"
	@open "https://convert-to-notion-request.vercel.app/api/hello"

