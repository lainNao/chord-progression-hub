# use makefile instead of npm scripts

test__all:
	make test__common-test-case-runners &
	make test__ts-simple-result &
	wait

############################################### common test case runners

test__common-test-case-runners:
	npm run test --workspace=common-test-case-runners

############################################### qase explorer

qase-explorer__start:
	npm run start --workspace=qase-explorer

############################################### parseSpecComments

parse-spec-comments:
	node ./scripts/parseSpecComments.js ./docs-spec

############################################### ts-simple-result	

test__ts-simple-result:
	npm run test --workspace=ts-simple-result

