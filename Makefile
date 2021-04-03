.DEFAULT_GOAL := help
## GENERAL ##

install:
	npm --prefix "ddd-commander" install

run:
	npm --prefix "ddd-commander" run console:dev

build:
	npm --prefix "ddd-commander" run build --if-present

lint:
	npm --prefix "ddd-commander" run lint

format:
	npm --prefix "ddd-commander" run format

format-check:
	npm --prefix "ddd-commander" run format-check

test-unit:
	npm --prefix "ddd-commander" run test

test-e2e:
	npm --prefix "ddd-commander" run test:e2e

.PHONY: test
test:
	#npm --prefix "ddd-cli" run test:cov
	@make format-check
	@make test-unit
	@make test-e2e
	@make lint


help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'