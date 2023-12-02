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
 * コード進行
 */
export type ChordProgression = IdField &
  CreatedInfo &
  UpdatedInfo & {
    artist: Artist;
    music: Music;
  };
