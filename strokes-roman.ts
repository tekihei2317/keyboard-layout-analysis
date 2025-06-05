const romajiStrokeTable: Record<string, number> = (() => {
  const table: Record<string, number> = {};

  // 母音（1打鍵）
  const vowels = "あいうえお";
  for (const ch of vowels) table[ch] = 1;

  // 清音（子音＋母音 → 2打鍵）
  const consonants =
    "かきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわを";
  for (const ch of consonants) table[ch] = 2;

  // 濁音（清音と同様に扱う）
  const dakuon = "がぎぐげござじずぜぞだぢづでどばびぶべぼゔ";
  for (const ch of dakuon) table[ch] = 2;

  // 半濁音（ぱぴぷぺぽ）も2打鍵
  const handakuon = "ぱぴぷぺぽ";
  for (const ch of handakuon) table[ch] = 2;

  // 記号や長音など
  table["ー"] = 1;

  return table;
})();

export function countRomajiStrokesForWord(
  word: string,
  excludeChars: Set<string> = new Set()
): number {
  let total = 0;

  for (let i = 0; i < word.length; i++) {
    const prev = word[i - 1] ?? "";
    const curr = word[i];
    const next = word[i + 1] ?? "";

    if (excludeChars.has(curr)) continue;

    // 1. 促音（っ）
    if (curr === "っ") {
      total += 1;
      continue;
    }

    // 2. 撥音（ん）
    if (curr === "ん") {
      const needsDouble = next === "" || "あいうえおなにぬねの".includes(next);
      total += needsDouble ? 2 : 1;
      continue;
    }

    // 3. 外来音（ぁぃぅぇぉ）
    if ("ぁぃぅぇぉ".includes(curr)) {
      const pair = prev + curr;

      const zeroStrokePairs = new Set(["ゔぁ", "ゔぃ", "ゔぇ", "ゔぉ", "じぇ"]);
      const oneStrokePairs = new Set(["うぃ", "うぇ"]);
      const twoStrokePairs = new Set(["うぉ"]);

      if (zeroStrokePairs.has(pair)) continue;
      if (oneStrokePairs.has(pair)) {
        total += 1;
        continue;
      }
      if (twoStrokePairs.has(pair)) {
        total += 2;
        continue;
      }

      // その他は +1打鍵
      total += 1;
      continue;
    }

    // 4. 拗音（ゃゅょ）
    if ("ゃゅょ".includes(curr)) {
      if (prev === "じ") continue; // じゃ/じゅ/じょ は既に2打鍵分カウント済
      total += 1;
      continue;
    }

    // 5. 通常のひらがな
    if (romajiStrokeTable[curr] === undefined) {
      throw new Error(`カウントできない文字が含まれています: ${curr}`);
    }
    total += romajiStrokeTable[curr];
  }

  return total;
}
