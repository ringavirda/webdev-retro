type DoroCache = {
  blob: Blob | null;
  blobUrl: string;
};

const doroUrl = "https://i.ibb.co/Xxww9JT3/fallen-doro.png";
const cache = {} as DoroCache;

export async function createImgElementAsync() {
  const img = document.createElement("img");
  if (cache.blobUrl === undefined || cache.blob === undefined) {
    const resp = await fetch(doroUrl);
    if (!resp.ok) throw new Error("Failed to load image!");
    cache.blob = await resp.blob();
    cache.blobUrl = URL.createObjectURL(cache.blob);
  }

  img.src = cache.blobUrl;
  img.alt = "fallen-doro";
  img.onload = () => (img.classList = "loaded");

  return img;
}
