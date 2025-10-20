const doroUrl = "https://i.ibb.co/Xxww9JT3/fallen-doro.png";
type DoroCache = {
  blob: Blob | null;
  blobUrl: string;
};
const cache: DoroCache = { blob: null, blobUrl: "" };

export async function loadDoroAsync(): Promise<string> {
  if (cache.blob === null || cache.blobUrl === "") {
    const resp = await fetch(doroUrl);
    if (!resp.ok) throw new Error("Failed to load the Doro!");
    cache.blob = await resp.blob();
    cache.blobUrl = URL.createObjectURL(cache.blob);
  }
  return cache.blobUrl;
}
