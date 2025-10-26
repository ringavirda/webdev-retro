import "style.css";
import { createImgElementAsync } from "./image";

const container = document.querySelector<HTMLDivElement>(".wrapper");
const button = document.querySelector<HTMLButtonElement>("button");
const imgs = [];
const maxDoroCount = 4;

async function loadImage() {
  if (container === null || button === null)
    throw new Error("HTML didn't load!");
  const img = await createImgElementAsync();
  imgs.push(img);
  if (imgs.length <= maxDoroCount) container?.appendChild(img);
  else {
    button.textContent = "There are too many doros!";
    button.style = "background-color:red";
  }
}

button?.addEventListener("click", loadImage);
