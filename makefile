# use makefile instead of npm scripts

test__all:
	make test__common-test-case-runners &
	make test__ts-simple-result &
	make test__spec-checklist &
	make test__spec-checklist-parser &
	make test__spec-checklist-parser-runner &
	make test__spec-checklist-parser-runner_ids-unique &
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

############################################### spec checklist

spec-checklist-parser-runner__generate-specs-json:
	npm run generate-specs-json --workspace=spec-checklist-parser-runner

test__spec-checklist:
	npm run test --workspace=spec-checklist

############################################### spec checklist parser

test__spec-checklist-parser:
	npm run test --workspace=spec-checklist-parser

############################################### spec checklist parser runner

test__spec-checklist-parser-runner_ids-unique:
	npm run test:ids-unique --workspace=spec-checklist-parser-runner

test__spec-checklist-parser-runner:
	npm run test --workspace=spec-checklist-parser-runner

############################################### ts-simple-result	

test__ts-simple-result:
	npm run test --workspace=ts-simple-result

