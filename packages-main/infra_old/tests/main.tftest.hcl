# example test file with terraform test https://developer.hashicorp.com/terraform/cli/commands/test

# run with: terraform test -test-directory=tests

# run "check_artifact_registry_region" {
#   command = plan

#   assert {
#     condition     = module.service_account_for_cloud_run.info.account_id == "sa-for-cloud-run"
#     error_message = "Bucket name is not ca-terraform-test-bucket"
#   }
# }
