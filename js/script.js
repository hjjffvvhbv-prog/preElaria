document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const overlay = document.getElementById("audio-overlay");

  const bgContainer = document.getElementById("background-container");
  const contentBlock = document.getElementById("content-block");
  const changeBtn = document.getElementById("change-moment-btn");
  const footer = document.querySelector(".footer");

  const FADE_DURATION = 15000;
  const TARGET_VOLUME = 1.0;
  let fadeInterval = null;

  const AUTO_BUTTON_APPEAR_DELAY = 10000;
  const TEXT_FADE_DURATION = 500;
  const newTitle = "...и днём";
  const newParagraph = `И мы гуляем до утра в Нихоне,<br />
Среди нежнейшей красоты... <br />
Но не смотрю на те бутоны, <br />
Моя квiточка тiльки - ти`;

  music.volume = 0;

  function fadeInVolume() {
    const increment = 0.01;
    const intervalTime = (FADE_DURATION * increment) / TARGET_VOLUME;

    fadeInterval = setInterval(() => {
      if (music.volume < TARGET_VOLUME - increment) {
        music.volume = Math.min(music.volume + increment, TARGET_VOLUME);
      } else {
        music.volume = TARGET_VOLUME;
        clearInterval(fadeInterval);
      }
    }, intervalTime);
  }

  function showChangeButton() {
    changeBtn.classList.remove("hidden-btn");
    changeBtn.classList.add("fade-in-btn");
  }

  function changeMomentAction() {
    bgContainer.classList.add("light-background");

    changeBtn.classList.remove("fade-in-btn");
    changeBtn.classList.add("fade-out-btn");

    contentBlock.classList.add("fade-out-content");

    if (footer) {
      footer.classList.add("footer-dark-text");
    }

    setTimeout(() => {
      contentBlock.querySelector("h1").textContent = newTitle;
      contentBlock.querySelector("p").innerHTML = newParagraph;

      contentBlock.classList.remove("fade-out-content");
      contentBlock.classList.add("fade-in-content-new");

      contentBlock.classList.add("dark-text");
    }, TEXT_FADE_DURATION);
  }

  function startMusic() {
    if (overlay) {
      overlay.classList.add("hidden");
    }

    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeInVolume();

          setTimeout(() => {
            showChangeButton();
          }, AUTO_BUTTON_APPEAR_DELAY);

          changeBtn.addEventListener("click", changeMomentAction, {
            once: true,
          });
        })
        .catch((error) => {
          if (overlay) {
            overlay.classList.remove("hidden");
          }
        });
    }
  }

  if (overlay) {
    overlay.addEventListener("click", startMusic, { once: true });
  }
});
