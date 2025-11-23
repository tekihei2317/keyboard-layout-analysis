import { parse } from "https://deno.land/x/xml/mod.ts";

const xml = await Deno.readTextFile("data/word4jp.xml");
const parsed = parse(xml);

const parts = Array.isArray(parsed.Words.Part)
  ? parsed.Words.Part
  : [parsed.Words.Part];

const readings: string[] = [];

for (const part of parts) {
  const words = Array.isArray(part.Word) ? part.Word : [part.Word];
  for (const word of words) {
    if (word.Characters) {
      readings.push(word.Characters);
    }
  }
}

const excludeChars = new Set([
  ..."0123456789",
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "，",
  "!",
  "?",
  "%",
  "/",
  "(", // 公式ワード3のみ
  ")", // 公式ワード3のみ
  ".", // 公式ワード3のみ
  "・",
  "！", // 公式ワード3のみ
  "-", // 公式ワード3のK-1
  "。", // 公式ワード3
  "ボ", // 公式ワード4 Charactersのほうにカタカナが入っている
  "タ",
  "ン",
  "、",
]);

function countCharacterFrequency(
  words: string[],
  options?: { excludeNonKana?: boolean }
): {
  char: string;
  count: number;
  percent: number;
}[] {
  const frequency = new Map<string, number>();
  let total = 0;

  for (const word of words) {
    for (const char of word) {
      if (char === "\n" || char === " ") continue;
      if (options?.excludeNonKana && excludeChars.has(char)) continue;

      total += 1;
      frequency.set(char, (frequency.get(char) ?? 0) + 1);
    }
  }

  const result = [...frequency.entries()]
    .map(([char, count]) => ({
      char,
      count,
      percent: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  return result;
}

const frequencies = countCharacterFrequency(readings, { excludeNonKana: true });

let total = 0;
console.log("文字\t回数\t割合");
for (const { char, count, percent } of frequencies) {
  console.log(`${char}\t${count}\t${percent.toFixed(2)}%`);
  total += count;
}
console.log(`合計文字数: ${total}`);
console.log(`文字の種類数: ${frequencies.length}`);
