# 目次

- [仕様書の仕様](#仕様書の仕様)
- [GitHub管理](#github管理)
- [インフラ操作](#インフラ操作)
- [開発者への通知](#開発者への通知)
- [品質管理](#品質管理)
- 成功設計
  - [知ってもらう](#知ってもらう)
  - [定着してもらう](#定着してもらう)

## 品質管理

- [ ] 12factorを守りたいな(spec-20240101190532)
  - <https://12factor.net/>
- できれば以下を意識したい
  - [ ] Availability(可用性)(spec-20240127160434)
  - [ ] Reliability(信頼性)(spec-20240127160436)
  - [ ] Testability(テスト容易性)(spec-20240127160437)
  - [ ] Scalability(spec-20240127160438)
  - [ ] Security(spec-20240127160439)
  - [ ] Agility(spec-20240127160440)
  - [ ] Fault Tolerance(耐障害性)(spec-20240127160442)
  - [ ] Elasticity(弾力性)(spec-20240127160443)
  - [ ] Recoverability(回復性)(spec-20240127160444)
  - [ ] Performance(spec-20240127160445)
  - [ ] Deployability(デプロイ容易性)(spec-20240127160446)
  - [ ] Learnability(学習容易性)(spec-20240127160447)
- Operational Architecture Characteristicsも意識したい
  - [ ]Availability(可用性)：　How long the system will need to be available(システムがどれくらいの期間利用できるか)(spec-20240127160924)
  - [ ]Continuity(継続性)：　障害復旧能力(spec-20240127160926)
  - [ ]Performance：　stress testing, peak analysis, capacity required, response timesなどの分析が含まれる(spec-20240127160928)
  - [ ]Recoverability(回復性)：　Business continuity requirements. 災害発生時にどれだけ早くオンラインに戻す必要があるか(spec-20240127160930)
  - [ ]Reliability/safety(信頼性/安全性)：　システムがフェイルセーフである必要があるか、人命に影響するか、障害が会社の多額の費用負担につながるか(spec-20240127160933)
  - [ ]Robustness(堅牢性)：　Ability to handle error and boundary conditions(spec-20240127160935)
  - [ ]Scalability：　ユーザやリクエスト数が増えてもシステムが動作する能力(spec-20240127160937)
- Structural Architecture Characteristicsも意識したい
　- [ ] Configurability(構成容易性)：Softwareの設定をend userが簡単に変更できる(spec-20240127160754)
　- [ ] Extensibility(拡張容易性)：新機能をプラグインで追加できること(spec-20240127160756)
　- [ ] Installability(インストール容易性)：インストールの容易さ(spec-20240127160757)
　- [ ] Leverageability/Reuse(活用性/再利用性)：共通コンポーネントを複数プロダクトで再利用できること(spec-20240127160807)
　- [ ] Localization：多言語対応(spec-20240127160809)
　- [ ] Maintainability(メンテナンス容易性)：システムの変更や拡張を簡単に行えるか(spec-20240127160810)
　- [ ] Portability(可搬性)：一つ以上のプラットフォームで動作するか(spec-20240127160812)
　- [ ] Upgradeability(アップグレード容易性)：新versionへの移行を簡単に行えるか(spec-20240127160813)
- Cross-Cutting Architectural Characteristicsも意識したい
  - [ ]Accessibility：　色覚障害や難聴等のユーザを含めたすべてのユーザの使いやすさ(spec-20240127161043)
  - [ ]Archivability(長期保存性)：　データの保持/削除要件。(spec-20240127161044)
  - [ ]Authentication(認証)：　ユーザがユーザが主張する者であることに自信をもつこと(spec-20240127161046)
  - [ ]Authorization(認可)：　ユーザが許可されたリソースにだけアクセスできること(spec-20240127161048)
  - [ ]Legal(合法性)：　法的制約(データ保護、GDPR等)(spec-20240127161049)
  - [ ]Privacy：　従業員からも情報を秘匿できているか(spec-20240127161050)
  - [ ]Security：　暗号化、社内システムの認証等(spec-20240127161052)
  - [ ]Supportability(サポート容易性)：　エラー対応時に必要になる情報をロギングできているか(spec-20240127161054)
  - [ ]Usability/archievability(ユーザビリティ/達成容易性)：　ユーザが目標を達成するのにどれだけのトレーニングが必要か。他のarchitecture上の課題と同様に真剣に扱われる必要がある(spec-20240127161057)

## インフラ操作

- インフラ変更操作の流れは`packages-main/infra`配下に記載していく
  - 開発進めていって新しいインフラが必要になったらその都度追記でいい、と思う。動作確認のコードも同時に書いていくケースが結構あると思うので

## GitHub管理

- [ ] あれこれの設定ファイルを置いておく <https://zenn.dev/morinokami/articles/dot-github-directory#%E3%81%9D%E3%81%AE%E4%BB%96> (spec-20231221034913)

## 知ってもらう

- [ ] ツイッターアカウント解説し、そこで更新情報をツイートする(spec-20231221004524)
- [ ] 最初はベータ版という形で公開することで、温かい目で認知を広げてもらう(spec-20231221004639)
  - 一定期間バグ無さそうならベータ版を外す
- [ ] できたらいろんなところに投稿(spec-20231221004725)
  - reddit
  - product hunt
  - hacker news
  - twitter
  - etc

## 定着してもらう

- [ ] いろんなジャンルのコード進行を登録しまくる。(spec-20231221004831)
  - 超古い曲もコード進行載せておく。コード進行の歴史を知ることができるので。バロックなり、もっと前の音楽なり。
  
## 仕様書の仕様

- [ ] 一旦、仕様は`docs-spec`フォルダ配下にマークダウンで書いていく(spec-20231220134352)
- [x] 一つ一つの仕様は以下のように定義する(spec-20231220134421)

  ```md
  ・- [ ] や - [x] 等のタスクリスト形式で定義する
  ・末尾に (spec-${仕様id}) をつける
  ・仕様idは、14文字の数かアルファベットにする
  ・仕様idは他とかぶってはいけない（このチェックは自動化する）
  ・例えば年月日時分秒をつなげたものでも14桁になるし、別にランダムなものでもいい

  このようにする理由は、以下の通り
  ・仕様と、タスクと、自動テストを紐づけたい
  ・例えば「タスク完了したけど仕様修正を忘れた」「自動テスト書いたけど仕様を網羅してるかは勘」「そもそも仕様修正が重くてスルーして更新しなくなって見なくなって形骸化して…」のようなやつを無くしたい
  ```

  - ちなみに仕様idは、`shift + cmd + i`押下で生成できるようにするなどして入力を簡単にするできる。以下は日時をつなげたものを生成する例

    ```json
      // vscodeの場合、~/Library/Application\ Support/Code/User/keybindings.jsonを以下のようにすると可能
      [
        {
          "key": "cmd+shift+i",
          "command": "editor.action.insertSnippet",
          "when": "editorTextFocus",
          "args": {
            "snippet": "(spec-$CURRENT_YEAR$CURRENT_MONTH$CURRENT_DATE$CURRENT_HOUR$CURRENT_MINUTE$CURRENT_SECOND)"
          }
        }
      ]
    ```

- [ ] 仕様をパースして「自動テストの仕様網羅率」、「完了していない仕様」を閲覧するページやCIを用意したい(spec-20231220135217)
