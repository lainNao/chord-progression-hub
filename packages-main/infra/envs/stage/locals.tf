# local変数定義
locals {
  env    = "stage"
  region = "us-east-1"
  ecs = {
    task_cpu    = 256
    task_memory = 512
  }
}
