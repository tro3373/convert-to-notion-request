SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c # -c: Needed in .SHELLFLAGS. Default is -c.
.DEFAULT_GOAL := run

dotenv := $(PWD)/.env
-include $(dotenv)

export

npmi:
	@npm i
npmi-%:
	@npm i $(*)
npmi_if_needed:
	@if [[ ! -e node_modules ]]; then \
		make npmi; \
	fi

clean:
	@rm -rf node_modules
build: npmi_if_needed
	@npm run build

run: npmi_if_needed # open_browser
	# @vercel dev -d #-l 2999
	# @npm run dev
	# @npx ts-node --esm ./api/index.ts
	@npm run start

open_browser:
	@local_url="http://$(shell ipa 2>/dev/null || echo localhost):3000" && \
		open "$${local_url}" 2>/dev/null || echo "==> Open $${local_url} in your browser."

setup:
	@npm init -y
	@npm i express
	@npm i -D typescript @types/node @types/express ts-node nodemon
	@npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

login:
	@vercel login

deploy:
	@vercel
deploy-prod:
	@vercel --prod

