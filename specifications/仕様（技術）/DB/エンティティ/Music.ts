import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * アーティスト
 */
export type Artist = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    albums: Album[];
    musics: Music[];
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
    musics: Music[];
  };

/**
 * 楽曲
 */
export type Music = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    /**
     * 検索用のひらがな名
     */
    nameHiragana?: string;
    artist: Artist;
    album?: Album;
    musicUrls: {
      id: string;
      url: string;
      music: Music;
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
    music: Music;
  };

/**
 * コード進行
 */
export type ChordProgression = IdField &
  CreatedInfo &
  UpdatedInfo & {
    artist: Artist;
    music: Music;
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
