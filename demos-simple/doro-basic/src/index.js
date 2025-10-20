const doroUrl = "https://i.ibb.co/Xxww9JT3/fallen-doro.png";
const doroCache = {
  blob: null,
  blobUrl: "",
  imgs: [],
};
const maxDoroCount = 4;

const container = document.querySelector(".wrapper");

async function loadImage() {
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
  doroCache.imgs.push(img);

  if (doroCache.imgs.length <= maxDoroCount) container.appendChild(img);
  else {
    const button = document.querySelector("button");
    button.textContent = "There are too many doros!";
    button.style = "background-color:red";
  }
}
