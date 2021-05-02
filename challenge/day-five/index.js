const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h2");

// You're gonna need this
function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const date = new Date();

  const dDay = xmasDay - date;
  const day = Math.floor(dDay / 1000 / 60 / 60 / 24);
  const hours = Math.floor((dDay / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((dDay / 1000 / 60) % 60);
  const seconds = Math.floor((dDay / 1000) % 60);
  clockTitle.innerText = `${day}d:${hours < 10 ? `0${hours}` : hours}h:${
    minutes < 10 ? `0${minutes}` : minutes
  }m:${seconds < 10 ? `0${seconds}` : seconds}s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
