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

## 1.まずインフラの事前準備

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

- 次にartifact registryだけ作って、そこに先にイメージをアップロードする（理由： そうしないとCloud Runのデプロイ時に「そのコンテナのパスにファイル無いぞ」ってエラー出る）

    ```sh
    make init-artifact-registry-prod
    make init-artifact-registry-stg

    # TODO それぞれにサンプルのコンテナファイルアップ
    # _temp-app/README.mdを参照
    
    ```
  
- 次に、アップロードしたそのパスを取得し`cloud_run_service_container_image_path`にセットする
- 次に、ようやく`terraform apply`をする（IAMの設定やAPI有効化等が不遡行してるとエラー出るかも）
  - `make apply-stag`
  - `make apply-prod`
- 最後に、それぞれにアクセスできるか確かめてみる
  - stagingはとりあえず`gcloud run services proxy YOUR_CLOUD_RUN_SERVICE_NAME --project YOUR_PROJECT_ID`を実行してproxyを通してアクセスしてくれ
  - productionは普通にできたURLにアクセスしてもらえればOKにしてあるので、URLをGCPコンソールとかから調べてくれ

## 2.デプロイ（CIでやる場合）

- TODO（開発終盤になってきたらでいいかな、。本番環境も含め）

## 2.デプロイ（ローカルでやる場合）

- 変更する
- planする
  - `make plan-prod`か`make plan-stag`
- 適用する
  - `make apply-prod`か`make apply-stag`
