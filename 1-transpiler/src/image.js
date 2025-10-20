const doroUrl = "https://i.ibb.co/Xxww9JT3/fallen-doro.png";
const doroCache = {
  blob: null,
  blobUrl: "",
};

async function createImgElementAsync() {
  const img = document.createElement("img");
  if (doroCache.blobUrl === "" || doroCache.blob === null) {
    const resp = await fetch(doroUrl);
    if (!resp.ok) throw new Error("Failed to load image!");
    doroCache.blob = await resp.blob();
    doroCache.blobUrl = URL.createObjectURL(doroCache.blob);
  }

  img.src = doroCache.blobUrl;
  img.alt = "fallen-doro";
  img.onload = () => (img.classList = "loaded");

  return img;
}
