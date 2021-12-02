import "./programSupporter.scss";

// Toggle element visibility with class.
var toggle = function (elem) {
  elem.classList.toggle('is-visible');
};

window.addEventListener("load", () => {

  // Iterate over supporter, then add click event.
  document.querySelectorAll(".m-supporter").forEach(supporter => {
    supporter.addEventListener("click", (e) => {

      // Select quote-overlay element.
      var overlay = supporter.querySelector(".quote-overlay");

      // Toggle overaly with class function.
      toggle(overlay);

    });
  })

})
