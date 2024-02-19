# stage
stage_init:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage init
stage_init_upgrade:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage init -upgrade
stage_plan:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage plan
stage_apply:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage apply -auto-approve
stage_validate:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage validate
stage_destroy:
	AWS_PROFILE=cph-stage terraform -chdir=envs/stage destroy -auto-approve

# TODO: ドメインの設定はGUIで行ってもらう件を書いておく。AWSなどから、vercel指定のAレコード等を設定すればOK

# prod
prod_plan:
	AWS_PROFILE=cph-prod terraform -chdir=envs/prod plan
prod_apply:
	AWS_PROFILE=cph-prod terraform -chdir=envs/prod apply -auto-approve
prod_init:
	AWS_PROFILE=cph-prod terraform -chdir=envs/prod init
prod_validate:
	AWS_PROFILE=cph-prod terraform -chdir=envs/prod validate
prod_destroy:
	AWS_PROFILE=cph-prod terraform -chdir=envs/prod destroy -auto-approve


# all
validate-all:
	make validate-prod
	make validate-stag

# fmt
fmt-all:
	terraform fmt -recursive

# 他
# terraform taint module.cloud_run_service_main
# terraform init -upgrade
# docker run --rm -it -v "$(pwd):/src" aquasec/tfsec /src

###################### only use at specifig case ##################
