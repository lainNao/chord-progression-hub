# 目次

- [コードの説明](#コードの説明)
- デプロイの流れ
  - [1.まずインフラの事前準備](#1まずインフラの事前準備) TODO
  - [2.デプロイ（ローカルでやる場合）](#2デプロイローカルでやる場合) TODO
  - [2.デプロイ（CIでやる場合）](#2デプロイciでやる場合) TODO

## コードの説明

- `environments`　・・・環境ごとの設定ファイル
  - productionとstagingの違いはterraform cloudのワークスペースの名前だけなので留意
- `modules`　・・・Terraformのモジュール
- `tests`　・・・テストコード（仮置き）

## 2.デプロイ（CIでやる場合）

- TODO

## 2.デプロイ（ローカルでやる場合）

- TODO

## 1.まずインフラの事前準備

- `最初だけ`
  - まず`.terraform.tfvars.example`を複製し`.terraform.tfvars`を作り、中身を設定する。
    - プロジェクトを作ってなかったら`gcloud projects create <NEW_PROJECT_ID>`で作れる
    - そしたらプロジェクトIDが手に入るはずで、それで一旦OK
  - 次に、Terraform cloudのワークスペースを作ってなかったら作る
    - `chord-progression-hub-production`
    - `chord-progression-hub-staging`
  - 次に、必要なら各プラットホームにログインしておく
    - `gcloud auth login`
    - `terraform login`
  - 次に、必要ファイルを作成。値の部分は他メンバーに聞いて書き換える。（1password等で管理してもいいのかな？）
    - `environments/production`と`environments/staging`

      ```txt
      region                                 = 値
      project_id                             = 値
      artifact_registry_repository_id        = 値
      cloud_run_service_name                 = 値
      cloud_run_service_container_image_path = 値
      ```

  - 次にartifact registryだけ作って、そこに先にイメージをアップロードする

    ```sh
    # artifact registryのみ最初に作成し、先にコンテナをアップロードしておく
    # そうしないとCloud Runのデプロイ時にエラー出る
    make init-artifact-registry-prod
    make init-artifact-registry-stg

    # TODO それぞれにサンプルのコンテナファイルアップ
    
    
    ```
  
  - 次に、アップロードしたそのパスを取得し`cloud_run_service_container_image_path`にセットする
  - 次に、ようやく`terraform apply`をする

### 毎度

- 適用する
  - `terraform apply -var-file=".terraform.tfvars"`
    - もし「APIを有効にしろ」というエラーメッセージが出たら、エラーメッセージに従って有効化してから再度↑を実行。未設定なら出るので初回は出てしまうけど一度有効化すればOK
