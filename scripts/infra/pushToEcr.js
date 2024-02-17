/**
 * DockerイメージをビルドしてECRにプッシュするスクリプト。
 *
 * 必要な環境：
 * ・AWS CLIがインストールされていること
 * ・Dockerがインストールされていること
 * ・AWS CLIによるECRへのログインが可能であること
 * ・Dockerfileが存在するディレクトリで実行されること
 *
 * 使い方：
 *   node pushToEcr \
 *    [ecrRepositoryUri] \
 *    [commitId] \
 *    [awsProfileName]
 *
 * TODO: これは使わないはず。なぜならエラーが出た時にシークレットが漏れる懸念があるから。他にAWSのCodePipeline周りで案を考える
 *
 */

const { execSync } = require("child_process");
const assert = require("assert").strict;
const path = require("path");
const fs = require("fs");
const constantsFilePath = path.join(
  __dirname,
  "../../",
  "PUBLIC_CONSTANTS.json"
);
const constants = JSON.parse(fs.readFileSync(constantsFilePath, "utf-8"));

if (!constants) {
  console.error(`${constantsFilePath}が存在しません`);
  process.exit(1);
}

const vars = {
  imageName: constants.APP_NAME_SHORT,
  awsRegion: constants.AWS_REGION,
  ecrRepositoryUri: process.argv[2],
  commitId: process.argv[3],
  awsProfileName: process.argv[4],
};

// 引数の存在チェック
Object.entries(vars).forEach(([key, value]) => {
  assert(
    value,
    `引数が不足しているか、空文字列です。引数:${key} に値を指定してください。`
  );
});

let currentProcess = "AWS CLI用の環境変数を設定";
try {
  console.log(`${currentProcess}します...`);

  currentProcess = "ECRにログイン";
  console.log(`${currentProcess}します...`);
  execSync(
    `aws ecr get-login-password --profile ${vars.awsProfileName}  | docker login --username AWS --password-stdin ${vars.ecrRepositoryUri}`
  );

  currentProcess = "Dockerイメージをビルド";
  console.log(`${currentProcess}します...`);
  const imageNameWithTag = `${vars.imageName}:${vars.commitId}`;
  // --platform linux/x86_64 をつけないと「exec format error」でECSが起動しない
  execSync(
    `docker build --platform linux/x86_64 -t ${imageNameWithTag} -f Dockerfile .`
  );

  currentProcess = "ビルドしたDockerイメージにタグを付与";
  console.log(`${currentProcess}します...`);
  const newImageUrl = `${vars.ecrRepositoryUri}:${vars.commitId}`;
  execSync(`docker tag ${imageNameWithTag} ${newImageUrl}`);

  currentProcess = "DockerイメージをECRにプッシュ";
  console.log(`${currentProcess}します...`);
  execSync(`docker push ${newImageUrl}`);

  const green = "\u001b[32m";
  console.log(
    `${green}[SUCCESS]Dockerイメージのビルドとプッシュが完了しました。`
  );
} catch (error) {
  const red = "\u001b[31m";
  console.error(`${red}[ERROR]${currentProcess}できませんでしたm(__)m`);
  // NOTE: エラーはGitHubにシークレット漏らしたくないので出さない
  console.error(error);
  process.exit(1);
}
