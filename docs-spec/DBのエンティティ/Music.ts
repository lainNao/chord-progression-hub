import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * アーティスト
 */
export type Artist = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    albums: Album[];
    tracks: Track[];
  };

/**
 * アルバム
 */
export type Album = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /**
     * 検索用のひらがな名
     */
    nameHiragana?: string;
    artist: Artist;
    tracks: Track[];
  };

/**
 * 楽曲
 */
export type Track = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /**
     * 検索用のひらがな名
     */
    nameHiragana?: string;
    artist: Artist;
    // TODO: 複数にする必要あるかも
    // TODO: アルバムじゃなくEPとかシングルの付属とかな場合もある。albumというエンティティの名前を抽象的にするか…？
    album?: Album;
    musicUrls: {
      id: string;
      url: string;
      music: Track;
    }[];
  };

/**
 * 楽曲のURL
 *
 * フロント側では「聴けるURL（ex. `https://youtube.com/...`）」のような項目で複数入力を可能にさせる
 * で、入力したURLがyoutubeならばフロント側でyoutubeとして表示などする。soundcloudならsoundcloudプレイヤーとして表示したり。spotifyならspotifyだし
 * URLが無効になった時は・・・どうする？
 */
export type MusicUrl = IdField &
  CreatedInfo &
  UpdatedInfo & {
    url: string;
    music: Track;
  };

/**
 * コード進行
 */
export type ChordProgression = IdField &
  CreatedInfo &
  UpdatedInfo & {
    artist: Artist;
    music: Track;
    /**
     * 入力されたコード進行文字列
     * prettifyしてから入れたい
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
