#

- それぞれの機能を調べまくる

## MySQL

- `使えそうな挙動`
  - 読み取りパフォーマンスがよくなりやすい？
    - <https://aws.amazon.com/jp/compare/the-difference-between-mysql-vs-postgresql/>
      - PostgreSQL は、データベースに接続しているすべてのユーザーに対して、大量のメモリ割り当て (約 10 MB) を伴う新しいシステムプロセスを作成します。複数のユーザー向けにスケーリングするには、メモリを大量に消費するリソースが必要です。一方、MySQL は複数のユーザーに対して 1 つのプロセスを使用します。その結果、MySQL データベースは、主にユーザーにデータを読み込んで表示するアプリケーションでは PostgreSQL よりも優れています。
- `諦めながらやることになりそうな挙動`
  - ACIDと外部キーを両立できない？
    - <https://www.integrate.io/jp/blog/postgresql-vs-mysql-which-one-is-better-for-your-use-case-ja/>
      - MyISAMはACIDをサポートしていない
      - InnoDBは外部キーをサポートしていない

## PostgreSQL

- `使えそうな挙動`
  - 検索表現力が強そう
    - <https://aws.amazon.com/jp/compare/the-difference-between-mysql-vs-postgresql/>
      - MySQL は、階層的にインデックス化されたデータを格納する B ツリーと R ツリーのインデックスをサポートしています。PostgreSQL のインデックスタイプには、ツリー、式インデックス、部分インデックス、ハッシュインデックスがあります。スケールに合わせてデータベースのパフォーマンス要件を微調整するためのオプションは他にもあります。
      - MySQL は純粋なリレーショナルデータベースです。一方、PostgreSQL はオブジェクトリレーショナルデータベースです。つまり、PostgreSQL では、データをプロパティ付きのオブジェクトとして保存できます。オブジェクトは、Java や.NET などの多くのプログラミング言語で一般的なデータ型です。オブジェクトは、親子関係や継承などのパラダイムをサポートします。
      - マテリアライズドビューがある
- `諦めながらやることになりそうな挙動`

## MongoDB

- `使えそうな挙動`
- `諦めながらやることになりそうな挙動`
  - 機能が弱い
