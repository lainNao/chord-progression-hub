# 目次

- [概要](#概要)
- [留意](#留意)
- [コードの説明](#コードの説明)
- IaC管理してるやつのデプロイの流れ
  - [1.まずインフラの事前準備](#1まずインフラの事前準備) TODO
  - [2.デプロイ（ローカルでやる場合）](#2デプロイローカルでやる場合) TODO
  - [2.デプロイ（CIでやる場合）](#2デプロイciでやる場合) TODO
- 他
  - [DBマイグレーション](#dbマイグレーション) TODO
  - [Identity Workload](#identity-workload)

## 概要

- 以下のリソースのTerraformのコードを置いてみています
  - `Cloud Run`　・・・Dockerイメージを動かす場所
  - `Artifact Registry`　・・・Dockerイメージを置く場所
  - `Secret Manager`　・・・シークレットを置く場所
  - `Service Account`　・・・各サービスアカウント
- ただ、以下は手動で管理してみているので、コード化はしないので手順書を書きます
  - `Neon`　・・・なぜかTerraformでエラーが出るため
  - `Identity Workload`　・・・GitHub Actionsに使いたいだけなのにTerraform化したらコードが長すぎるのと、そもそも一度作成した後はそのままにしておくものな気がしてIaC化するのが気持ち的に向かなかったため
    - TODO: いや、でもmodule使えば楽そうなので書き換えたいかも <https://github.com/terraform-google-modules/terraform-google-github-actions-runners/blob/master/examples/oidc-simple/main.tf> 
- GitHub Actionsで環境変数として色々使ったりしますが、Environment Secretsも使います（指定ブランチでしか読み取れない環境変数を作れそうで、それがセキュリティ上便利そうだったため）

## 留意

- `NeonをDBとして使うが、それは一旦Terraformで管理しない`
  - なんか以下をapplyしたら`projects not found`というエラーが出るため。（これ、Neonの管理画面のSQL Editorでcreate table文を実行したときにも`table not found`的なエラーが出たり出なかったりすることがあったので、terraformというよりNeon側のバグな可能性がある…）

    ```hcl
    terraform {
      cloud {
        organization = "chord-progression-hub"

        workspaces {
          name    = "shared"
          project = "chord-progression-hub"
        }
      }

      required_providers {
        neon = {
          source = "kislerdm/neon"
        }
      }

    }

    provider "neon" {
      api_key = var.neon_api_key
    }

    resource "neon_project" "default" {
      name = var.neon_project_name
    }

    ## staging 

    resource "neon_database" "staging_database" {
      project_id = neon_project.default.id
      branch_id  = neon_branch.staging_branch.id
      owner_name = neon_role.staging_branch_role.name
      name       = var.neon_db_name
    }

    resource "neon_branch" "staging_branch" {
      project_id = neon_project.default.id
      parent_id  = neon_project.default.default_branch_id
      name       = "staging"
    }

    resource "neon_role" "staging_branch_role" {
      project_id = neon_project.default.id
      branch_id  = neon_branch.staging_branch.id
      name       = var.neon_role_name
    }
    
    ```
  
  - 面倒なのでそれを試みた`environments/shared`は残しておくが、まだ使えていないし、使うかもわからない。
    - なのでNeonに関しては手順書を書いておく。
      - ブランチをstagingだけ作る
      - DB名はcphubとする
      - リージョンは安い＆Cloud Runと近いところにする
      - 一旦以上

## コードの説明

- `environments`　・・・環境ごとの設定ファイル
  - productionとstagingの違いは
    - terraform cloudのワークスペースの名前
    - `google_cloud_run_service_iam_policy`に対する"noauthの有無
    - neonのブランチ名
- `modules`　・・・Terraformのモジュール
- `tests`　・・・テストコード（仮置き）

## 1.まずインフラの事前準備

- まずTerraform Cloudのアカウントを作って、ワークスペースを3つ作っておく
  - `production`
  - `staging`
  - ~~`shared`~~
- 次に、Terraform cloudのワークスペースを作ってなかったら作る
  - `production`
  - `staging`
  - ~~`shared`~~
- 次に、GCPのプロジェクトを作っておく
  - `gcloud projects create <NEW_PROJECT_ID>`
  - `gcloud config get-value project`
- 次に、Neonに登録しておく
  - ~~最初に色々DBとか作っちゃうけど、作ってもプロジェクトごと削除しておく~~
    - 留意に書いたことをやっておく
- 次に、必要なら各プラットホームにCLIでログインしておく
  - `gcloud auth login`
  - `terraform login`
  - Neonは管理画面に行ってログインしておく（ついでにAPIキーをどうにか取得してくる。↓で使う）
- 次に、gcloudのAPIをいくつか有効化する
  - Secret Manager
    - `gcloud services enable secretmanager.googleapis.com`
  - Artifact Registry
    - `gcloud services enable artifactregistry.googleapis.com`
  - Cloud Run
    - `gcloud services enable run.googleapis.com`
- 次に、必要ファイルを作成。値の部分は他メンバーに聞いて書き換える。（1password等で管理してもいいのかな？）。（※TODO: 本当はここはTerraform Cloudで設定した値を勝手に使ってほしい）
  - `environments/production`と`environments/staging`の`terraform.tfvars`

      ```txt
      region                                 = 値
      project_id                             = 値
      artifact_registry_repository_id        = 値
      cloud_run_service_name                 = 値
      cloud_run_service_container_image_path = 値
      ```

  - `environments/shared`の`terraform.tfvars`
  
      ```txt
      neon_api_key      = 値
      neon_project_name = 値
      neon_role_name    = 値
      neon_db_name      = 値
      ```

- 次に以下手コマンドで共通リソースを作る
  - `make init-shared`
  - `make apply-shared`

- 次に以下手順でartifact registryだけ作って、そこに先にイメージをアップロードする（理由： そうしないとCloud Runのデプロイ時に「そのコンテナのパスにファイル無いぞ」ってエラー出る）

    ```sh
    make init-artifact-registry-prod
    make init-artifact-registry-stg

    # それぞれにサンプルのコンテナファイルアップ
    # _temp-app/README.mdを参照
    # （_temp-app2というのもあるが、そっちはもはや完全に個人的な動作確認のためのものなので、ダミーのコンテナをアップするだけの用途ではそっちはスルーしていい）
    
    ```
  
- 次に、アップロードしたそのパスを取得し`cloud_run_service_container_image_path`にセットする
- 次に、ようやく`terraform apply`をする（IAMの設定やAPI有効化等が不遡行してるとエラー出るかも）
  - `make apply-stag`
  - `make apply-prod`

- あと以下もやる（github actionsで必要になるので）
  - IAMのAPI有効化 <https://console.cloud.google.com/apis/library/iam.googleapis.com>
- 最後に、それぞれにアクセスできるか確かめてみる
  - stagingはとりあえず`gcloud run services proxy YOUR_CLOUD_RUN_SERVICE_NAME --project YOUR_PROJECT_ID`を実行してproxyを通してアクセスしてくれ
  - productionは普通にできたURLにアクセスしてもらえればOKにしてあるので、URLをGCPコンソールとかから調べてくれ

## 2.デプロイ（CIでやる場合）

- TODO（開発終盤になってきたらでいいかな、。本番環境も含め）
- 以下メモ。もしかしたらCI用のサービスアカウントいるかも

    ```sh
    # テラフォーム用のサービスアカウント作成
    gcloud iam service-accounts create <NEW_SERVICE_ACCOUNT_NAME>
    #確認
    gcloud iam service-accounts list
    # 権限付与
    gcloud projects add-iam-policy-binding <MY_PROJECT_ID> --member="serviceAccount:<MY_SERVICE_ACCOUNT_NAME>@<MY_PROJECT_ID>.iam.gserviceaccount.com" --role="roles/editor"
    # キー取得
    gcloud iam service-accounts keys create service-account-key.json --iam-account <MY_SERVICE_ACCOUNT_NAME>@<MY_PROJECT_ID>.iam.gserviceaccount.com
    ```

## 2.デプロイ（ローカルでやる場合）

- 変更する
- planする
  - `make plan-prod`か`make plan-stag`
- 適用する
  - `make apply-prod`か`make apply-stag`

## DBマイグレーション

- TODO

## Identity Workload

<https://github.com/google-github-actions/auth>に従ってどうにか。

```sh

PROJECT_ID="cph-workload-identity-pj"

# create project
gcloud projects create "${PROJECT_ID}"

# 作ったプロジェクトを請求アカウントと関連付けておこう

# Create a Workload Identity Pool
gcloud iam workload-identity-pools create "github" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool"  

# Get the full ID of the Workload Identity Pool
gcloud iam workload-identity-pools describe "github" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --format="value(name)"

# すると何やらIDっぽい文字列が出てくるのでそれをメモ

# Create a Workload Identity Provider in that pool
gcloud iam workload-identity-pools providers create-oidc "my-repo" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github" \
  --display-name="My GitHub repo Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Extract the Workload Identity Provider resource name
gcloud iam workload-identity-pools providers describe "my-repo" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github" \
  --format="value(name)"

# すると何やらIDっぽい文字列が出てくるのでそれをメモ
# workload_identity_providerの値にはそれを使う

# 以下で必要に応じてgithub actionsからSecret ManagerにあるSecretへのアクセスを許可する
# TODO(developer): Update this value to your GitHub repository.
export REPO="値！！！！！！！！！！！！！！"
export WORKLOAD_IDENTITY_POOL_ID="値！！！！！！！！！！！！！！"
gcloud secrets add-iam-policy-binding "シークレットの名前！！！！！！！" \
  --project="${PROJECT_ID}" \
  --role="roles/secretmanager.secretAccessor" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"


```
