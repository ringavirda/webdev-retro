import "../style.css";
import { createImgElementAsync } from "./image";

const container = document.querySelector(".wrapper");
const button = document.querySelector("button");
const imgs = [];
const maxDoroCount = 4;

async function loadImage() {
  const img = await createImgElementAsync();
  imgs.push(img);
  if (imgs.length <= maxDoroCount) container.appendChild(img);
  else {
    button.textContent = "There are too many doros!";
    button.style = "background-color:red";
  }
}

button.addEventListener("click", loadImage);
