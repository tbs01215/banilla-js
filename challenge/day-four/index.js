const body = document.querySelector("body");

function resize() {
  const width = window.innerWidth;
  console.log(width);
  if (width > 1100) {
    body.classList.add("c1");
    body.classList.remove("c2");
  } else if (width > 600) {
    body.classList.add("c2");
    body.classList.remove("c3", "c1");
  } else {
    body.classList.add("c3");
    body.classList.remove("c2");
  }
}
window.addEventListener("resize", resize);
