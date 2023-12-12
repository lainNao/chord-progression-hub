import { ChordProgression, Music, Section } from "./Music";
import { CreatedInfo, IdField, UpdatedInfo } from "./_util";

/**
 * 検索用に変換されたコード進行文字列（セクション別）
 */
export type LookupChordProgressionBySection = IdField &
  CreatedInfo &
  UpdatedInfo & {
    section: Section;
    music: Music;
    chordProgression: ChordProgression;
    /**
     * TSD等に変換した文字列
     *
     * セクションの途中で転調しようがそのキーの機能でいい（むしろセクション変えて欲しい）。ここは諦め
     */
    functional: string;
    /**
     * 全文検索用に変換されたコード進行文字列
     *
     * 全文検索対応するために、検索用カラムに入れるデータは英数字だけに書き換えた値にコンバートしておく
     * 1.まず、`#`を全部`b`のコードに変換しておく
     * 2.次に、pg_trgmに対応してる文字に置き換える。以下文字列の置き換えは「Base, accidental, Extension」にある文字とかぶらないことがルール。（bはかぶってもOK）
     *  ・`#`→（これは1をクリアすれば存在しないはずであるのでスルー）
     *  ・`/`→`X`
     *  ・`,`→`Y`
     *  ・`@`→`V`
     *  ・`=`→`W`
     *  ・`-`→`半角スペース`
     * 3.なので`D#m(7,9)/G - A`は例えば`Ebm1X2YGZ A`のような文字列になる
     */
    normalized: string;
    /**
     * normalizedから、テンションコード部分を抜いた文字列
     */
    tensionless: string;
  };

/**
 * 最大4連続のディグリーから検索するときのやつ
 *
 * pg_trgmみたいなことを自前で4つでやる
 *
 * このテーブルへの検索は料金かかるとして有料にしてもいい
 */
export type LookupChordProgressionDegreesByFour = IdField &
  CreatedInfo &
  UpdatedInfo & {
    music: Music;
    chordProgression: ChordProgression;
    /**
     * 4つ（無いならそれ未満）のディグリー（を意味する文字列）を保存するカラム
     * テンションとかはスルー
     * 1曲をパースして、このテーブルへの行を複数作る感じ。特にレコードをトリアージしなくていい（個数とかもカウントしたりに使えるかもなので）
     *
     * degreeはにおいてはtrgm等を使いやすくするため、以下の変換をかました文字列にする
     * 1. まず、`#`を全部`b`のコードに変換しておく
     * 2. パフォーマンス等のため、全部のディグリーやマイナーメジャー等を1文字のアルファベットで表現したい。かつ#やbは全部bで格納したい。そのため、1はA、1mはa。2bはB、2bmはb。のような規則性とする。
     *
     */
    degrees: string;
    /**
     * 始まりのセクション
     */
    sectionStart: Section;
    /**
     * 終わりのセクション
     */
    sectionEnd: Section;
    /**
     * セクションをまたいでいるかどうか
     */
    isCrossingSection: boolean;
  };
