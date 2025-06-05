const tsukiStrokeTable: Record<string, number> = (() => {
  const table: Record<string, number> = {};

  const unshifted = [
    "そ",
    "こ",
    "し",
    "て",
    "ょ",
    "つ",
    "ん",
    "い",
    "の",
    "り",
    "ち",
    "は",
    "か",
    "☆",
    "と",
    "た",
    "く",
    "う",
    "★",
    "゛",
    "き",
    "れ",
    "す",
    "け",
    "に",
    "な",
    "さ",
    "っ",
    "る",
    "、",
    "。",
    "゜",
    "・",
  ];

  const shifted = [
    "ぁ",
    "ひ",
    "ほ",
    "ふ",
    "め",
    "ぬ",
    "え",
    "み",
    "や",
    "ぇ",
    "「",
    "ぃ",
    "を",
    "ら",
    "あ",
    "よ",
    "ま",
    "お",
    "も",
    "わ",
    "ゆ",
    "」",
    "ぅ",
    "へ",
    "せ",
    "ゅ",
    "ゃ",
    "む",
    "ろ",
    "ね",
    "ー",
    "ぉ",
  ];

  for (const ch of unshifted) table[ch] = 1;
  for (const ch of shifted) table[ch] = 2;

  const dakuonPairs = [
    ["が", "か"],
    ["ぎ", "き"],
    ["ぐ", "く"],
    ["げ", "け"],
    ["ご", "こ"],
    ["ざ", "さ"],
    ["じ", "し"],
    ["ず", "す"],
    ["ぜ", "せ"],
    ["ぞ", "そ"],
    ["だ", "た"],
    ["ぢ", "ち"],
    ["づ", "つ"],
    ["で", "て"],
    ["ど", "と"],
    ["ば", "は"],
    ["び", "ひ"],
    ["ぶ", "ふ"],
    ["べ", "へ"],
    ["ぼ", "ほ"],
    ["ゔ", "う"],
  ];

  const handakuonPairs = [
    ["ぱ", "は"],
    ["ぴ", "ひ"],
    ["ぷ", "ふ"],
    ["ぺ", "へ"],
    ["ぽ", "ほ"],
  ];

  for (const [voiced, base] of dakuonPairs) {
    table[voiced] = (table[base] ?? 1) + (table["゛"] ?? 1);
  }

  for (const [semiVoiced, base] of handakuonPairs) {
    table[semiVoiced] = (table[base] ?? 1) + (table["゜"] ?? 1);
  }

  return table;
})();

export function getTsukiStrokeCount(char: string): number {
  if (tsukiStrokeTable[char] === undefined)
    throw new Error(`カウントできない文字が含まれています: ${char}`);

  // 不明文字は1打鍵と仮定する（数字、アルファベット、記号）
  return tsukiStrokeTable[char] ?? 1;
}
