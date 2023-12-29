# plan
plan-prod:
	cd environments/production && \
	terraform plan && \
	cd ../../
plan-stag:
	cd environments/staging && \
	terraform plan && \
	cd ../../

# apply
apply-prod:
	cd environments/production && \
	terraform apply && \
	cd ../../
apply-stag:
	cd environments/staging && \
	terraform apply && \
	cd ../../

# init
init-prod:
	cd environments/production && \
	terraform init && \
	cd ../../
init-stag:
	cd environments/staging && \
	terraform init && \
	terraform apply -target=module.artifact_registry_for_container_image && \
	cd ../../


###################### only use at specifig case ##################

init-artifact-registry-prod:
	cd environments/production && \
	terraform apply -target=module.artifact_registry_for_container_image -auto-approve && \
	cd ../../
init-artifact-registry-stag:
	cd environments/staging && \
	terraform apply -target=module.artifact_registry_for_container_image -auto-approve && \
	cd ../../

reset-tf:
	rm -rf .terraform
	rm -rf terraform.tfstate
	rm -rf terraform.tfstate.backup
	rm -rf .terraform.lock.hcl
	rm -rf .terraform.tfstate.lock.info
	rm -rf terraform.tfstate.d


###################### common ##################
