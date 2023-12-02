import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * 絵文字
 */
export type Emoji = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    imageUrl: string;
    genre: EmojiGenre;
  };

/**
 * 絵文字のジャンル
 */
export type EmojiGenre = IdField &
  CreatedInfo &
  UpdatedInfo & {
    name: string;
    emojis: Emoji[];
  };
