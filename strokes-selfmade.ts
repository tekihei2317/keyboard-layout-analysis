const strokeMap: { [key: string]: number } = {
  // 単打
  ま: 1,
  る: 1,
  ゃ: 1,
  の: 1,
  り: 1,
  さ: 1,
  ん: 1,
  き: 1,
  し: 1,
  ち: 1,
  な: 1,
  ゅ: 1,
  あ: 1,
  ょ: 1,
  お: 1,
  く: 1,
  っ: 1,
  い: 1,
  う: 1,
  ー: 1,
  ぴ: 1,
  じ: 1,
  と: 1,
  ら: 1,
  に: 1,
  つ: 1,
  た: 1,
  か: 1,
  は: 1,
  こ: 1,
  す: 1,

  // マイナーかなは2打鍵
  ぢ: 2,
  び: 2,
  ぎ: 2,
  ひ: 2,
  み: 2,
  れ: 2,
  え: 2,
  て: 2,
  け: 2,
  せ: 2,
  ど: 2,
  を: 2,
  よ: 2,
  や: 2,
  め: 2,
  ぱ: 2,
  ぷ: 2,
  ぺ: 2,
  ぽ: 2,
  ほ: 2,
  だ: 2,
  ふ: 2,
  そ: 2,
  む: 2,
  ぐ: 2,
  ね: 2,
  も: 2,
  ろ: 2,
  げ: 2,
  ば: 2,
  わ: 2,
  べ: 2,
  ぼ: 2,
  ぬ: 2,
  ず: 2,
  ご: 2,
  へ: 2,
  ゆ: 2,
  が: 2,
  ぞ: 2,
  で: 2,
  ぶ: 2,
  ざ: 2,
  ぜ: 2,
  づ: 2,

  // 拗音は2打鍵
  きゃ: 2,
  きゅ: 2,
  きょ: 2,
  しゃ: 2,
  しゅ: 2,
  しょ: 2,
  ちゃ: 2,
  ちゅ: 2,
  ちょ: 2,
  にゃ: 2,
  にゅ: 2,
  にょ: 2,
  ひゃ: 2,
  ひゅ: 2,
  ひょ: 2,
  みゃ: 2,
  みゅ: 2,
  みょ: 2,
  りゃ: 2,
  りゅ: 2,
  りょ: 2,
  ぎゃ: 2,
  ぎゅ: 2,
  ぎょ: 2,
  じゃ: 2,
  じゅ: 2,
  じょ: 2,
  びゃ: 2,
  びゅ: 2,
  びょ: 2,
  ぴゃ: 2,
  ぴゅ: 2,
  ぴょ: 2,

  // 外来音は2打鍵（Shift + あいうえお）
  ぁ: 2,
  ぃ: 2,
  ぅ: 2,
  ぇ: 2,
  ぉ: 2,
};

/**
 * 自作配列の打鍵数を計算してみる
 */
export function countSelfmadeFrequencyForWord(
  word: string,
  excludeChars: Set<string>
): number {
  let total = 0;

  for (let i = 0; i < word.length; ) {
    const curr = word[i];
    const next = word[i + 1] ?? "";

    // 数字や記号等は除外して計算
    if (excludeChars.has(curr)) {
      i++;
      continue;
    }

    const str = curr + next;
    if (strokeMap[str]) {
      // 拗音で、2文字が一致する場合
      total += strokeMap[str];
      i += 2;
    } else if (strokeMap[curr]) {
      total += strokeMap[curr];
      i += 1;
    } else {
      // 打鍵数が定義されていない
      throw new Error(`文字 ${curr}の打鍵数が定義されていません`);
    }
  }

  return total;
}
