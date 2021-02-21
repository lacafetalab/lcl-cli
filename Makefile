.DEFAULT_GOAL := help
## GENERAL ##

install:
	npm --prefix "ddd-cli" install

run:
	npm --prefix "ddd-cli" run console:dev

build:
	npm --prefix "ddd-cli" run build --if-present

lint:
	npm --prefix "ddd-cli" run lint

format:
	npm --prefix "ddd-cli" run format

format-check:
	npm --prefix "ddd-cli" run format-check

.PHONY: test
test:
	#npm --prefix "ddd-cli" run test:cov
	npm --prefix "ddd-cli" run test
	#npm --prefix "ddd-cli" run test:e2e


help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'