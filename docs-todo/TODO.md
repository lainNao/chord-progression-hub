# 目次

- メタ
  - [成功設計](#成功設計)
  - [CI](#ci)
- 仕様
  - [UIデザイン](#uiデザイン)
  - [仕様策定](#仕様策定)
- 技術
  - [技術調査](#技術調査)
- 他
  - [余裕あれば](#余裕あれば)

## `成功設計`

- 成功しているサービスを分析し、その成功の抽象的な理由を一つずつ列挙し、踏襲する

## `UIデザイン`

- 参考サイトをまず色々見つけたい
  - LP <https://www.landingfolio.com/>
  - <https://godly.website/?ref=dailydev>
  - ColorMagicのスマホ版のデザイン参考にしたいな
- Figmaでやるなど
- なんか自分でUIライブラリ作ってもいいのかもしれない。ちょっとマット（うっすら粒子が見えるような）な感じのUIライブラリが無いけどそういうのもありだと思う。

## `CI`

- CloudBuildでdevelop->staging->productionの流れを作りたい。それぞれ承認は自分が手動でやる
  - 以下参考
    - <https://cloudandbuild.jp/blog/article-20230122>
  - でも自分で承認するなら結局ローカルでやっても変わらないな…?makefile一発でデプロイできるようにすればCloudBuildでやろうが変わらない気がする
    - やりたいならやればいいというレベルになってくるかも
  - クラウドでやるパターンからGitHub Actionsに移行する人もいるので検討したい <https://blog.studysapuri.jp/entry/2022/02/04/080000>
    - というかプライベートリポジトリにしてしまったほうが早いかな…？ライブラリ的な部分だけオープンで出すなど

## `技術調査`

- `Next.jsとCloud Run`
  - <https://zenn.dev/team_zenn/articles/nextjs-standalone-mode-cloudrun#%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%89%E3%82%A2%E3%83%AD%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89%E3%82%92%E4%BD%BF%E3%82%8F%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%A8%E6%AF%94%E8%BC%83>
- `Cloud Runとジョブ`
  - <https://zenn.dev/t_hayashi/articles/81568469119480>
- 以下気になる
  - <https://zenn.dev/mizchi/articles/fullstack-remix-d1-boilerplate>
  - <https://note.com/jnlmyz/n/n51dd526fbac0>
  - <https://zenn.dev/lovegraph/articles/56f8d5f28ba1c3>
  - <https://twitter.com/yusukebe/status/1716768420216332624>
    - 安い
  - <https://laiso.hatenablog.com/entry/2023/11/23/210736>
  - GCPはlocalstack的なエミュレータが公式であるらしい
    <https://www.reddit.com/r/googlecloud/comments/h82qyi/is_there_anything_like_localstack_for_gcp/>
  - <https://zenn.dev/catnose99/articles/f8a90a1616dfb3>
  - <https://planetscale.com/lp/lower-gcp-bill>を見るとDBはGoogle Cloud Databaseを使うよりPlanetScaleの方が安いっぽい。公式が書いてるので…
  ただ、読み込み行数が料金に大きな影響を与えると<https://zenn.dev/catnose99/articles/f8a90a1616dfb3>で言われてるので、場合によっては本当にインデックスの工夫というよりもむしろ検索系機能はキーバリュー系のDBにしたほうが安くなる可能性すらある
  - <https://zenn.dev/ring_belle/books/athenai-develop/viewer/gcp-project-terraform>
  - <https://zenn.dev/catnose99/articles/f99ea2a8b985b2>
  - <https://zenn.dev/team_zenn/articles/nextjs-standalone-mode-cloudrun#%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%89%E3%82%A2%E3%83%AD%E3%83%B3%E3%83%A2%E3%83%BC%E3%83%89%E3%82%92%E4%BD%BF%E3%82%8F%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88%E3%81%A8%E6%AF%94%E8%BC%83>
  - <https://zenn.dev/shoito/articles/nextjs-on-google-appengine>
  - ライブラリのバージョンをrenovateとかdepenadabotとかで上げるの、メジャーバージョンアップ追従or脆弱性対応or「この機能が必要だから今すぐ上げたい」の3種類だけでいいのでは感が出てきた。細かく上げていたらCI代がかかりそう
  - VRT、こういうのが安くてクロスブラウザでよさそうかもね <https://speakerdeck.com/kubotak/storybookwoshu-kudakederiguretusiyontesutoga-shi-xing-sarerushi-jie-heyoukoso?slide=57>
    - S3でVRTして料金あんまかけたくないな…
  - playwrightのUIモード？でやればstorybookいらないのでは
    - playwrightのVRTは直接リポジトリ内に画像を保存するのが基本かもだけど、S3に置くやり方もあるし、ただS3に置くのが嫌ならもうリポジトリ内に置いちゃって、リポジトリにコミットしちゃうのもありだと思う。そのリポジトリを別リポジトリにして、仮にgit的に重くなってきたらまた新規でリポジトリを作り直すとかすれば。
      - または特定ディレクトリ以下のgit履歴を完全破棄するみたいなことができれば、スクショを入れておくフォルダを定期的にそうやってリセットするとか（できるならば）
- 技術選定前のハローワールドを一通りしてもいいかも
  - 認証認可周り（パスキー、Google、Apple、メールアドレスの3つ）
  - google analytics
  - DB系
    - postgresqlの検索機能のあれこれ
      - <https://www.postgresql.jp/document/9.0/html/functions-matching.html>
      - <https://www.postgresql.jp/docs/9.0/datatype-textsearch.html>
      - pg_stat_statments
    - D1
      - maximum db sizeが少ない？ <https://developers.cloudflare.com/d1/platform/limits/>
    - PlanetScale
  - IaC系（Terraform、Pulumi、etc）
    - Neon使うなら現状なPulumiは無理なのでTerraformしかない…
    - 感覚的にはPulumiが好きかもしれない。軽くTerraformやってみて、なんかファイル数が増大したりするわりにコード補完とかも効きづらいしでPHPのレガシーなでっかいグローバル変数を作ったり拡張したり触ったりしまくってる気分になってしまったので
      - 有名でないプロバイダやリソースに対応してないのもあるかもだけど有名でないプロバイダやリソースを使うべきでないので <https://zenn.dev/koheiyamayama/articles/dd2129eee9f145#3.-%E7%AE%A1%E7%90%86%E3%81%A7%E3%81%8D%E3%82%8B%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E7%A8%AE%E9%A1%9E>
        - Pulumi Cloudは個人で使う分には無料？
      - 廃れるかもしれないけどどうしてもなんかTerraformが違和感まだあるので一旦Pulumiで概念に慣れるという体でやるのもありかなという、、
  - 以下その他あれこれ
    - Terraform
    - Kubernetes
    - Istio
    - Linkerd
    - Envoy
    - CloudFlare
    - R2 <https://twitter.com/catnose99/status/1713828706928783773>
    - Vercel
    - Firebase内の付属機能達全部
    - CloudFront
    - CloudWatch
    - Datadog
    - New Relic
    - Grafana
    - Prometheus
    - Fluentd
    - Logstash
    - Jaeger
    - OpenTelemetry
    - OpenTracing
    - OpenCensus
    - OpenMetrics
    - OpenAPI
    - OpenID
    - OpenID Connect
    - SAML
    - gRPC
- インフラ最低限な状態でまず動くか試してみたいね
  - 例えばなんかNext.jsをvercel以外で動くかどうかはコンテナを使わないといけないらしい <https://zenn.dev/morinokami/articles/why-nextjs-summary#independence-(vercel-%E3%81%A8%E3%81%AE%E7%99%92%E7%9D%80)>
  - あとキャッシュ、CDN、IP固定、ServerActionsとか、VercelとGCPで違いあるのかとかね
- CI/CI周りの調査
  - オープンソースのCI/CDを見まくる
  - lighthouse、core web vitals、a11y、エラー検知、ロギング、とか全部やりたい
- タイムゾーン別の日時表示とかどうするか考えないと。特にDBとか
  - とりあえずdate-fnsがよさそう
- wasmのやつをcloudflare workersで使えるのか見れてないからそこを見ておきたいところ
  - <https://developers.cloudflare.com/workers/runtime-apis/webassembly/>
    - 1MB制限に引っかかる…？
    - `du -h node_modules/@lainnao`で164kbしかないからOK？
- あと、もしよかったらlookupテーブル系だけsqliteにしたらどう？fts5使って。
  - fts5ってormとか対応してないっぽいから、lookup系の一部のテーブルだけ生sqliteを扱うとかね

## `仕様策定`

- こういうジェネレータも欲しいかも <https://www.youtube.com/watch?v=9rBmFR0Htps>
  - 曲をいくつか選択し、それっぽいコード進行を生成してくれる機能
  - そもそもこんな感じでいい感じに再生できる機能は普通に作りたい
- strictサーチ有料ってだけでいいのではないか論
- なんでもフォローできるようにしたほうがいいかも。Zennのようにフォロー対象に新規投稿があればタイムラインに出てくるようなイメージ
  - フォロー対象にコード進行を指定できるようにするのを有料プランに入れてもいいのかも
- もしかしたらローカルアプリにしたほうがよいでは？eagleのように買い切り数千円みたいな
  - 他人のコード進行セットを持ってくるのが1000曲につき1000円とかさ
- 小さいチップチューン的な打ち込みページも用意してもいいかもしれない（なんかすごいかわいいUIを自している人がいたけど参考になるかな <https://twitter.com/amuru_mekimeki/status1729508983117869409> ）
  - そこで打ち込んだやつは勝手にコード進行の分析されてフィードバックされるような感じにするとか（GitHubのAIによるPRレビューみたいにコメントが勝手に入るみたいな。「バロック風ですね」とか知らんけど）
- <https://www.foriio.com/discover/collaborations> こんな感じでお題ごとに投稿されるやつありかもしれない
- コード進行に名前をつけてもらう。ユーザーに。簡単なのは王道進行とか。でその名前の付いたコード進でその名前から検索できるようにする。
  - 登録時にちょっとした差分で複数登録されないように、入力中に似てるやつを出す
  - 多少テンションが余分に含まれても当てはまるか、それともこれじゃないとだめかも入力させる
- 単なるコード進行共有サービスだと面白くないかもだしお金にならないので、以下のようなのはどうか
  - Eagleのように、それぞれが勝手に作るライブラリをマージできるようにすればよいのではないか？（月あたりのマージの数を無制限にする＆非公開にできるのが有料プラン）。あくまでも自分が投稿するものに関して分析が得られるイメージで
  - で、マージされたグループ内でコード進行の検索ができるまたは全グループがマージされた中で検索ができる
    - うーん厳しそうなので無理か
- 検索機能、1パターンとして<https://airbnb.io/visx/gallery?pkg=hierarchy>のShape.Linkグラフのように、セクションの始まりから一つ一つディグリーを選択していく方式で検索してもらう方式も白いかも。（「から始まる」に特化した感じ）
  - これならキャッシュできるしね。ディグリーは最大4コード進行なので、24の4乗のしかありえないし。ん？多いな。331776か…キャッシュすると33万種類とかを覚悟する必要あるのか…
    - そんな感じでチャート系、グラフ系ライブラリを見回ってなんか思いつかないか考えるのもいい
- 有料コミュニティもありなのかもしれない
  - カスタムテーマをアップロードする機能（これ系はVSCodeでしか見たこと無いけど色々UI見たい。クリックしたらすぐ反映プレビューされるような感じにしたい）
- Chord Progression Generator機能
  - 好きな条件を入れればジェネレートしてくれる機能。これは金銭的な条件を作りやすそう
- SNS機能めんどくさいし、合わない気がする。なのでもう完全に本当に自分用にツールサイトにしちゃっいいかも。便利版のWikiみたいなサービスに近い感じだと思うもはや。画面のレイアウトもそんな感じでもやいいかもしれない。左のサイドメニューとか特に
  - GitHubだってSNSではないしいいねとかはない（スターはあるけど）。そもそも他人のコード進行を書いてスターもらうのもおかしい。
- コード進行の勉強のためのリンク集とか載せても良いのかもね
  - 場合によっては有料のを乗せる場合は追加料金でPRという形で乗せるとか（別によいサービスならば無料で勧めるし、よくないサービスなら載せないけど）

## `余裕あれば`

- これも網羅したい <https://zenn.dev/tacoms/articles/09ff8e5481480f?redirected=1>
- 正常系のメトリクスや監視技術（お金かかるのは最初は特にいらないので、あとで）
