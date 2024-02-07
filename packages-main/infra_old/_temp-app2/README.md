# HOW TO USE

```sh

# set env
HOST_NAME=us-central1-docker.pkg.dev
PROJECT_ID=YOUR_PROJECT_ID
REPOSITORY_NAME=YOUR_ARTIFACT_REGISTRY_REPOSITORY_NAME
IMAGE_NAME=app
TAG=staging-1

# auth
gcloud auth configure-docker $HOST_NAME

# build
docker build --no-cache ./ -t $HOST_NAME/$PROJECT_ID/$REPOSITORY_NAME/$IMAGE_NAME:$TAG --platform linux/amd64

# push
docker push $HOST_NAME/$PROJECT_ID/$REPOSITORY_NAME/$IMAGE_NAME:$TAG
```

## コンテナを新規イメージに切り替えるには

まず別タグでイメージをプッシュ

```sh
TAG=staging-2   # ここを切り替える

docker build --no-cache ./ -t $HOST_NAME/$PROJECT_ID/$REPOSITORY_NAME/$IMAGE_NAME:$TAG --platform linux/amd64 && docker push $HOST_NAME/$PROJECT_ID/$REPOSITORY_NAME/$IMAGE_NAME:$TAG
```

そのタグでのイメージのパス（今はterraform.tfvarsに書く）で再度`terraform apply`を実行
