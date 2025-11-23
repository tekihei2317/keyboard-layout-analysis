/**
 * 月見草配列v3 打鍵数定義
 * 適当なので間違ってるところ多々ある、ぎゃとかは2打鍵かも
 * 参考: https://x.com/mentaik92877176/status/1446067615089057792/photo/1
 */
const tsukimisouV3Map: { [key: string]: number } = {
  // 上段
  だ: 1,
  か: 1,
  が: 1,
  を: 1,
  き: 1,
  ん: 1,
  た: 1,
  つ: 1,
  ち: 1,
  // 中段
  せ: 1,
  に: 1,
  う: 1,
  て: 1,
  こ: 1,
  っ: 1,
  い: 1,
  と: 1,
  く: 1,
  り: 1,
  // 下段
  ー: 1,
  で: 1,
  も: 1,
  ま: 1,
  の: 1,
  は: 1,
  し: 1,
  な: 1,
  る: 1,
  す: 1,
  れ: 1,

  や: 2,
  ゆ: 2,
  よ: 2,

  ぁ: 2,
  ふ: 2,
  ば: 2,
  ず: 2,
  ぺ: 2,
  べ: 2,
  ぷ: 2,
  ぶ: 2,
  ぜ: 2,
  ぞ: 2,
  ざ: 2,

  む: 2,
  び: 2,
  ろ: 2,
  じ: 2,
  さ: 2,
  そ: 2,
  わ: 2,
  め: 2,
  あ: 2,
  ほ: 2,
  ら: 2,
  ひ: 2,
  お: 2,
  け: 2,
  え: 2,
  ど: 2,
  げ: 2,
  ご: 2,
  ぐ: 2,
  ぴ: 2,
  づ: 2,
  ぎ: 2,
  ね: 2,
  ゃ: 1,
  ょ: 1,
  ゅ: 1,

  ぃ: 2,
  ぅ: 2,
  ぇ: 2,
  ぉ: 2,
  ぬ: 2,
  へ: 2,
  ぱ: 2,
  ぽ: 2,

  ふぁ: 2,
  ふぃ: 2,
  ふぇ: 2,
  ふぉ: 2,
  うぃ: 2,
  うぇ: 2,
  うぉ: 2,
  どぅ: 2,
  でぃ: 2,
  でゅ: 2,
  しぇ: 2,
  じぇ: 2,
  ちぇ: 2,
  ゔ: 2,

  じゃ: 2,
  じゅ: 2,
  じょ: 2,

  ぼ: 2,
  み: 2,
  ぢ: 2,
};

/**
 * 単語の打鍵数を計算する関数
 */
export function countTsukimisouStrokesForWord(
  word: string,
  excludeChars: Set<string>
): number {
  let total = 0;
  let i = 0;

  while (i < word.length) {
    const char = word[i];
    const next = word[i + 1] ?? "";
    const twoChars = char + next;

    if (excludeChars.has(char)) {
      i++;
      continue;
    }

    if (tsukimisouV3Map[twoChars]) {
      // 1. まず2文字の並び（じょ、じゅ等）が定義されているか確認
      total += tsukimisouV3Map[twoChars];
      i += 2;
      continue;
    }

    // 1文字の計算
    if (tsukimisouV3Map[char]) {
      total += tsukimisouV3Map[char];
    } else {
      throw new Error(`未定義文字: ${char}`);
    }
    i++;
  }
  return total;
}
