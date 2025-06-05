const jisKanaStrokeTable: Record<string, number> = (() => {
  const table: Record<string, number> = {};

  // 1打鍵（シフト不要） - 物理キー順
  const oneStroke = [
    "ぬ",
    "ふ",
    "あ",
    "う",
    "え",
    "お",
    "や",
    "ゆ",
    "よ",
    "わ",
    "ほ",
    "へ",
    "ー",

    "た",
    "て",
    "い",
    "す",
    "か",
    "ん",
    "な",
    "に",
    "ら",
    "せ",

    "ち",
    "と",
    "し",
    "は",
    "き",
    "く",
    "ま",
    "の",
    "り",
    "れ",
    "け",
    "む",

    "つ",
    "さ",
    "そ",
    "ひ",
    "こ",
    "み",
    "も",
    "ね",
    "る",
    "め",
    "ろ",
  ];

  // 2打鍵（シフト必要） - 物理キー順
  const twoStroke = [
    "ぁ",
    "ぅ",
    "ぇ",
    "ぉ",
    "ゃ",
    "ゅ",
    "ょ",
    "を",

    "ぃ",
    "「",

    "」",

    "っ",
    "、",
    "。",
    "・",

    "が",
    "ぎ",
    "ぐ",
    "げ",
    "ご",

    "ざ",
    "じ",
    "ず",
    "ぜ",
    "ぞ",

    "だ",
    "ぢ",
    "づ",
    "で",
    "ど",

    "ば",
    "び",
    "ぶ",
    "べ",
    "ぼ",

    "ぱ",
    "ぴ",
    "ぷ",
    "ぺ",
    "ぽ",

    "ゔ",
  ];

  for (const ch of oneStroke) table[ch] = 1;
  for (const ch of twoStroke) table[ch] = 2;

  return table;
})();

export function getJisKanaStrokeCount(char: string): number {
  if (jisKanaStrokeTable[char] === undefined)
    throw new Error(`カウントできない文字が含まれています: ${char}`);

  // 不明文字は1打鍵と仮定する
  return jisKanaStrokeTable[char] ?? 1;
}
