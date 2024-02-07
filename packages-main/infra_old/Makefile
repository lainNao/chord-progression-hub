# plan
plan-prod:
	terraform -chdir=environments/production plan
plan-stag:
	terraform -chdir=environments/staging plan
plan-shared:
	terraform -chdir=environments/shared plan

# apply
apply-prod:
	terraform -chdir=environments/production apply -auto-approve
apply-stag:
	terraform -chdir=environments/staging apply -auto-approve
apply-shared:
	terraform -chdir=environments/shared apply -auto-approve

# init
init-prod:
	terraform -chdir=environments/production init
init-stag:
	terraform -chdir=environments/staging init
init-shared:
	terraform -chdir=environments/shared init

# validate
validate-prod:
	terraform -chdir=environments/production validate
validate-stag:
	terraform -chdir=environments/staging validate
validate-shared:
	terraform -chdir=environments/shared validate
validate-all:
	make validate-prod
	make validate-stag
	make validate-shared

# fmt
fmt-all:
	terraform fmt -recursive

# 他
# terraform taint module.cloud_run_service_main
# terraform init -upgrade
# docker run --rm -it -v "$(pwd):/src" aquasec/tfsec /src

###################### only use at specifig case ##################

# TODO: これ、sharedにあるのとどっちかに寄せられそう？
init-artifact-registry-prod:
	terraform -chdir=environments/production apply -target=module.artifact_registry_for_container_image -auto-approve
init-artifact-registry-stag:
	terraform -chdir=environments/staging apply -target=module.artifact_registry_for_container_image -auto-approve
