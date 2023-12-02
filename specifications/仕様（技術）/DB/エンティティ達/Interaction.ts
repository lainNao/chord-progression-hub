import { Emoji } from "./Resource";
import { ChordProgression } from "./Music";
import { User } from "./User";
import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * コード進行に対する絵文字のリアクション
 */
export type ChordProgressionEmojiReaction = IdField &
  CreatedInfo &
  UpdatedInfo & {
    user: User;
    emoji: Emoji;
    chordProgression: ChordProgression;
  };

/**
 * ユーザーのお気に入り
 */
export type CuratedChordProgressions = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    user: User;
    chordProgressions: ChordProgression[]; // 別テーブルに分けなくてもよいかも
  };

/**
 * 検索履歴
 *
 * 機能案:
 * - マイページのどこかに表示
 * - 1ヶ月以上前の履歴を遡りたいなら有料としたい（履歴テーブルはお金かかりそうなので）
 */
export type SearchHistory = IdField &
  CreatedInfo & {
    searchString: string;
  };

/**
 * ユーザーが作成したコード進行のリスト
 *
 * 機能案:
 * - リストに含まれる曲を分析＆集計を自動でして表示できたらいいな
 * - リスト一覧ページ、リスト詳細ページもあればいいかも
 */
export type ChordProgressionList = IdField &
  CreatedInfo &
  UpdatedInfo & {
    user: User;
    title: string;
    description: string;
    isPublic: boolean;
    chordProgressions: ChordProgression[];
  };
