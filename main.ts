import { parse } from "https://deno.land/x/xml/mod.ts";
import { getTsukiStrokeCount } from "./strokes-tsuki.ts";
import { getJisKanaStrokeCount } from "./strokes-jis-kana.ts";
import { countRomajiStrokesForWord } from "./strokes-roman.ts";
import { countSelfmadeFrequencyForWord } from "./strokes-selfmade.ts";

const xml = await Deno.readTextFile("data/1272_元気が出る言葉.xml");
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

// 数字や記号等は除外して計算することにする
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

function countTsukiTotalStrokes(
  frequencies: { char: string; count: number }[]
): number {
  return frequencies.reduce((sum, { char, count }) => {
    return sum + getTsukiStrokeCount(char) * count;
  }, 0);
}

function countJisKanaTotalStrokes(
  frequencies: { char: string; count: number }[]
): number {
  return frequencies.reduce((sum, { char, count }) => {
    return sum + getJisKanaStrokeCount(char) * count;
  }, 0);
}

function countRomajiTotalStrokes(words: string[]): number {
  return words.reduce(
    (sum, word) => sum + countRomajiStrokesForWord(word, excludeChars),
    0
  );
}

function countSelfmadeTotalStrokes(words: string[]): number {
  return words.reduce(
    (sum, word) => sum + countSelfmadeFrequencyForWord(word, excludeChars),
    0
  );
}

const frequencies = countCharacterFrequency(readings, { excludeNonKana: true });

let total = 0;
// console.log("文字\t回数\t割合");
for (const { char, count, percent } of frequencies) {
  // console.log(`${char}\t${count}\t${percent.toFixed(2)}%`);
  total += count;
}

type StrokeStat = {
  name: string;
  totalStrokes: number;
  strokesPerKana: number;
  relativeToJIS: number;
};

function makeStrokeStats(
  name: string,
  totalStrokes: number,
  totalChars: number
): StrokeStat {
  return {
    name,
    totalStrokes,
    strokesPerKana: totalStrokes / totalChars,
    relativeToJIS: 0, // 後で埋める
  };
}

function printStrokeStatsTable(stats: StrokeStat[]): void {
  const jis = stats.find((s) => s.name === "JISかな");
  if (!jis) {
    console.error("JISかなを基準にできません");
    return;
  }

  for (const s of stats) {
    s.relativeToJIS = s.strokesPerKana / jis.strokesPerKana;
  }

  // 見やすく整形して出力（タブ区切り）
  console.log("方式\t打鍵数\t1文字あたり打鍵数\tJISかな比");
  for (const s of stats) {
    console.log(
      `${s.name}\t${s.totalStrokes}\t${s.strokesPerKana.toFixed(
        3
      )}\t${s.relativeToJIS.toFixed(2)}`
    );
  }
}

const totalChars = frequencies.reduce((sum, f) => sum + f.count, 0);

const jisStat = makeStrokeStats(
  "JISかな",
  countJisKanaTotalStrokes(frequencies),
  totalChars
);

const tsukiStat = makeStrokeStats(
  "月配列",
  countTsukiTotalStrokes(frequencies),
  totalChars
);

const romanStat = makeStrokeStats(
  "ローマ字",
  countRomajiTotalStrokes(readings),
  totalChars
);

const selfmadeStat = makeStrokeStats(
  "自作配列",
  countSelfmadeTotalStrokes(readings),
  totalChars
);

// Test:
// console.log(
//   "ありがとう: ",
//   countSelfmadeFrequencyForWord("ありがとう", excludeChars)
// );
// console.log(
//   "こんにちは: ",
//   countSelfmadeFrequencyForWord("こんにちは", excludeChars)
// );
// console.log(
//   "きょうははれです: ",
//   countSelfmadeFrequencyForWord("きょうははれです", excludeChars)
// );

// console.log("きょう: ", countSelfmadeFrequencyForWord("きょう", excludeChars));
// console.log(
//   "はれです: ",
//   countSelfmadeFrequencyForWord("はれです", excludeChars)
// );

printStrokeStatsTable([jisStat, tsukiStat, romanStat, selfmadeStat]);
