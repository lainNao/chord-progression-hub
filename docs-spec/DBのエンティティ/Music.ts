import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * アーティスト
 *
 * TODO: こういうの、どっかの公開APIとかのjsonでもらえないかな…？GracenoteのAPIがpending approvalすぎて止まってるけど
 */
export type Artist = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /** 検索用のひらがな名（日本語モードの時だけUIで入力させる）*/
    nameHiragana?: string;
    releases: Release[];
    tracks: Track[];
  };

/**
 * 「アルバム・EP・シングル・コンピレーション・その他」等のリリース単位
 */
export type Release = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /** 検索用のひらがな名（日本語モードの時だけUIで入力させる）*/
    nameHiragana?: string;
    artists: Artist[];
    tracks: Track[];
  };

/**
 * 楽曲
 */
export type Track = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /** 検索用のひらがな名（日本語モードの時だけUIで入力させる）*/
    nameHiragana?: string;
    artist: Artist;
    releases?: Release[];
    trackUrls: {
      id: string;
      url: string;
      track: Track;
    }[];
  };

/**
 * 楽曲のURL
 *
 * フロント側では「聴けるURL（ex. `https://youtube.com/...`）」のような項目で複数入力を可能にさせる
 * で、入力したURLがyoutubeならばフロント側でyoutubeとして表示などする。soundcloudならsoundcloudプレイヤーとして表示したり。spotifyならspotifyだし
 * TODO: URLが無効になった時は・・・どうする？UI側で「動画が無効ですか？変更する」のようなテキストボタン出せばいいかな
 */
export type TrackUrl = IdField &
  CreatedInfo &
  UpdatedInfo & {
    url: string;
    track: Track;
  };

/**
 * コード進行
 */
export type ChordProgression = IdField &
  CreatedInfo &
  UpdatedInfo & {
    artist: Artist;
    track: Track;
    /**
     * 入力されたコード進行文字列
     */
    value: string;
  };

/**
 * セクション
 */
export type Section = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
  };
