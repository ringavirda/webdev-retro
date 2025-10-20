const imgs = [];
const maxDoroCount = 4;

const container = document.querySelector(".wrapper");

async function loadImage() {
  const img = await createImgElementAsync();
  imgs.push(img);
  if (imgs.length <= maxDoroCount) container.appendChild(img);
  else {
    const button = document.querySelector("button");
    button.textContent = "There are too many doros!";
    button.style = "background-color:red";
  }
}
