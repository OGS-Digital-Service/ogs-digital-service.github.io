import "./photoGallery.scss";
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";


const galleries = document.getElementsByClassName('o-photoGallery__gallery');


function createSlider(gallery, uuid) {
  // If the Photo Gallery isn't already initialized, initialize it
  if (gallery && !gallery.classList.contains('tns-slider') && uuid) {
    const classes = [
      'o-photoGallery__gallery',
      'uuid--' + uuid.value
    ];
    const selector = '.' + classes.join('.');
    const slider = tns({
      container: selector,
      controls: false,
      navPosition: 'bottom',
      freezable: false,
      items: 1,
      autoHeight: true,
      mouseDrag: true,
      rewind: true,
    });

    const slideNavControls = gallery.getElementsByClassName('slide-nav-controls');
    // Loop over nav controls on each slide
    for (let j = 0; j < slideNavControls.length; j++) {
      const navContainer = slideNavControls.item(j);
      if (navContainer) {
        // Prev button
        navContainer.children[0].addEventListener('click', (e) => {
          slider.goTo('prev');
        });
        // Next button
        navContainer.children[1].addEventListener('click', (e) => {
          slider.goTo('next');
        });
      }
    }

  // Destroys all instances of Photo Galleries for the print screen
  window.addEventListener("beforeprint", () => { slider.destroy() });

  }
  
};


window.addEventListener("load", () => {
  // Iterate over all Photo Galleries on page
  for (let i = 0; i < galleries.length; i++) {
    const gallery = galleries.item(i);
    const uuid = gallery ? gallery.attributes.getNamedItem('data-uuid') : null;
    createSlider(gallery, uuid);
  }
});


  // Restores all instances of Photo Galleries when print screen is closed
  window.addEventListener("afterprint", () => {

    // Iterate over all Photo Galleries on page
    for (let i = 0; i < galleries.length; i++) {
      const gallery = galleries.item(i);
      const uuid = gallery ? gallery.attributes.getNamedItem('data-uuid') : null;

      createSlider(gallery, uuid);
    }
  })

