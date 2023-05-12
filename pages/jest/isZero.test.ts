// テストする関数をインポート
import { isZero } from "./isZero";

test("0を渡したらtrueになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);  // toBeマッチャーはJavaScriptの厳密等価比較と同じ
});

test("1を渡したらfalseになること", () => {
  const result = isZero(1);
  expect(result).toBe(false);
});