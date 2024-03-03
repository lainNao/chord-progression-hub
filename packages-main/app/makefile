dev:
	npx next dev

build:
	npx next build

start:
	npx next start

############################ tools

sb:
	npx storybook dev -p 6006

sb__build:
	npx storybook build

prettier__format:
	npx prettier --write .

update_snapshot:
	npx jest -u

############################ tests

test__all:
	make build & \
	make test__jest & \
	make test__tsc & \
	make test__eslint & \
	wait
# make test__storybook

test__jest:
	npx jest --coverage

test__tsc:
	npx tsc --noEmit

# NOTE: tmp-file-for-...をignoreしているのは、jestで実行されるeslint.test.tsではignoreしてほしくないためデフォルトではignoreしてないので、このコマンドのオプションで実行する時にignoreしてやり過ごしているため
test__eslint:
	npx eslint . --ignore-pattern tmp-file-for-eslint-test.stories.tsx

# なんかwarnに引っかかるので、eslintでチェックしてればいらないしということでコメントアウト
# test__prettier:
# 	npx prettier --check .

test__storybook:
	npx test-storybook

# TODO: playwright