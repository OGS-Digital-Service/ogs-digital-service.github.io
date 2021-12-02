import "./hero.scss";

// Polyfill for IE9
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("remove")) {
      return;
    }
    Object.defineProperty(item, "remove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

function disableAddFramesButton() {
  const iframe = document.getElementsByClassName("o-hero__liveVideo -iframe");
  const live = document.getElementsByClassName("-live");
  const watchLive = document.getElementsByClassName("-watchLive");

  if (iframe.length > 0) {
    live[0].setAttribute("style", "pointer-events:none;");
    watchLive[0].setAttribute("style", "pointer-events:none;");
    return false;
  }

  if (iframe.length == 0) {
    live[0].removeAttribute("style");
    watchLive[0].removeAttribute("style");
    return true;
  }
}

function appendIframe(event: Event, hero: any) {
  if (!event) {
    return;
  }

  if (!event.target) {
    return;
  }

  // @ts-ignore
  if (!event.target.dataset) {
    return;
  }

  // @ts-ignore
  const url = event.target.dataset.stream;
  const iframeEl = document.createElement("iframe");
  iframeEl.src = url;
  iframeEl.allowFullscreen = true;
  iframeEl.classList.add("o-hero__liveVideo", "-iframe");

  const iframeBgEl = document.createElement("div");
  iframeBgEl.classList.add("o-hero__liveVideo", "-bg");

  const closeIcon = document.createElement("div");
  closeIcon.classList.add("far");
  closeIcon.classList.add("fa-times-circle");
  closeIcon.classList.add("o-hero__closeVideo");

  hero[0].appendChild(iframeEl);
  hero[0].appendChild(iframeBgEl);
  hero[0].appendChild(closeIcon);

  const closeVideo = document.getElementsByClassName("o-hero__closeVideo");
  const iframe = document.getElementsByClassName("o-hero__liveVideo -iframe");
  const iframeBg = document.getElementsByClassName("o-hero__liveVideo -bg");

  closeVideo[0].addEventListener("click", () => {
    iframe[0].remove();
    iframeBg[0].remove();
    closeVideo[0].remove();
    disableAddFramesButton();
  });

  disableAddFramesButton();
}

window.addEventListener("load", () => {
  const hero = document.getElementsByClassName("o-hero");
  const live = document.getElementsByClassName("-live");
  const watchLive = document.getElementsByClassName("-watchLive");

  if (live[0]) {
    live[0].addEventListener("click", (event) => {
      const iframe = disableAddFramesButton();
      if (iframe) {
        appendIframe(event, hero);
      }
    });
  }

  if (watchLive[0]) {
    watchLive[0].addEventListener("click", (event) => {
      const iframe = disableAddFramesButton();
      if (iframe) {
        appendIframe(event, hero);
      }
    });
  }
});
