import "./video.scss";

window.addEventListener('load', () => {
  const videos = document.querySelectorAll('.m-video');

  videos.forEach((video, index) => {
    if (video === undefined || video === null) return;

    const iframe = video.querySelector('iframe');
    let srcUrl = '';

    if (iframe) {
      const src = iframe.attributes.getNamedItem('src');
      if (src) {
        srcUrl = src.value;
        src.value = srcUrl + '?autoplay=0';
      }
    }

    const cover = video.querySelector('.m-video__cover');
    if (cover === undefined || cover === null) return;
    
    cover.addEventListener('click', (element) => {
      if (!element || !element.target) return;
      const coverElement = <Element> element.currentTarget;
      coverElement.classList.add('hidden');

      if (!iframe) return;

      iframe.classList.add('loaded');
      const src = iframe.attributes.getNamedItem('src');

      if (src) {
        src.value = srcUrl + '?autoplay=1';
      }
    }, { once: true }); // end of on click
  }); // end of foreach
}, {
  once: true
});
