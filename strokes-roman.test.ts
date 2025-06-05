import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { countRomajiStrokesForWord } from "./strokes-roman.ts";

Deno.test("撥音（文中）: てんき", () => {
  assertEquals(countRomajiStrokesForWord("てんき"), "tenki".length);
});

Deno.test("撥音（文末）: じかん", () => {
  assertEquals(countRomajiStrokesForWord("じかん"), "jikann".length);
});

Deno.test("2打鍵外来音: ゔぁんぱいあ", () => {
  assertEquals(countRomajiStrokesForWord("ゔぁんぱいあ"), "vanpaia".length);
});

Deno.test("2打鍵外来音: じぇっと", () => {
  assertEquals(countRomajiStrokesForWord("じぇっと"), "jetto".length);
});

Deno.test("2打鍵外来音、母音で始まる: うぃー", () => {
  assertEquals(countRomajiStrokesForWord("うぃー"), "wi-".length);
});

Deno.test("3打鍵外来音、母音で始まる: うぉーたー", () => {
  assertEquals(countRomajiStrokesForWord("うぉーたー"), "who-ta-".length);
});

Deno.test("3打鍵外来音: とぅーす", () => {
  assertEquals(countRomajiStrokesForWord("とぅーす"), "two-su".length);
});

Deno.test("拗音（2打鍵）: じょあ", () => {
  assertEquals(countRomajiStrokesForWord("じょあ"), "joa".length);
});

Deno.test("拗音（3打鍵）: きゅう", () => {
  assertEquals(countRomajiStrokesForWord("きゅう"), "kyuu".length);
});

Deno.test("促音: がっこう", () => {
  assertEquals(countRomajiStrokesForWord("がっこう"), "gakkou".length);
});

Deno.test("促音: にっか", () => {
  assertEquals(countRomajiStrokesForWord("にっか"), "nikka".length);
});
