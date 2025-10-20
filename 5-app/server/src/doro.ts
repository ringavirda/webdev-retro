import { readFile } from "node:fs/promises";
import path from "node:path";

const doroPath = path.resolve(__dirname, "assets", "fallen_doro.png");

export async function loadDoroAsync(): Promise<Buffer<ArrayBufferLike>> {
  const doro = await readFile(doroPath);
  return doro;
}
