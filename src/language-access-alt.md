---
layout: language.njk
title: Language Access Cookie Banner
---

{% from './_includes/_components.njk' import languageaccess %}

# {{title}}

## This one uses the cookie banner



<style>
.nysds-cookie-banner {
  position: fixed;
  bottom: 0;
  background-color: rgba(0,0,0,0.9);
  width: 100%;
  padding: 2.5rem;
  font-size: 1rem;
  z-index: 1000;
}

.globe-icon::after {
  content: "\F0AC" !important;
  font-family: "Font Awesome 5 Free" !important;
  font-weight: 900 !important;
  color: #fff;
}

.globe-icon {
  margin-left:20px;
}

.nysds-select {
    font-family: "Proxima Nova",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 600;
    font-size: 1rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 9em;
    border: none;
    background-image: url(data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20focusable%3D%22false%22%20data-prefix%3D%22fas%22%20data-icon%3D%22angle-down%22%20class%3D%22svg-inline--fa%20fa-angle-down%20fa-w-10%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22white%22%20d%3D%22M143%20352.3L7%20216.3c-9.4-9.4-9.4-24.6%200-33.9l22.6-22.6c9.4-9.4%2024.6-9.4%2033.9%200l96.4%2096.4%2096.4-96.4c9.4-9.4%2024.6-9.4%2033.9%200l22.6%2022.6c9.4%209.4%209.4%2024.6%200%2033.9l-136%20136c-9.2%209.4-24.4%209.4-33.8%200z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
    background-repeat: no-repeat;
    background-size: auto 1.5rem;
    background-position:right;
    background-color: transparent;
    -webkit-appearance: none;
    color: #fff;
    border-bottom: 2px solid #fff;
    text-transform: uppercase;
    margin: 0px 10px;
}

.nysds-select option {
  color: #000;
}

.nysds-translate-group {
  display: inline-flex;
  color: #fff;
  width: 100%;
}

.nysds-close-icon:before {
  content: "\F00D" !important;
  font-family: "Font Awesome 5 Free" !important;
  font-weight: 900 !important;
  color: #fff;
}

.nysds-close-icon {
  padding:0px 15px;
}

.nysds-close-button{
  margin-left: auto;
}

  </style>

<div id="translate-banner" class="nysds-cookie-banner -mx-8 md:-mx-20">
<div class="nysds-translate-group">
<p> This page is available in other languages. Select your language preference </p>
<span class="globe-icon">
</span>
  <label class="sr-only" id="translate-label" for="langs">
   Select your language preference
  </label>
  <select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label">
      <option value="en" selected>English</option>
      <option value="fr">French</option>
      <option value="po">Polish</option>
      <option value="hc">Haitan-Creole</option>
  </select>
  <button id="close" class="nysds-close-button"><span class="nysds-close-icon"></span><span class="sr-only">Close this translate banner</span></button>
</div>

</div>


<script>
var translatebanner = document.getElementById('nygov-universal-navigation');
translatebanner.insertAdjacentHTML('afterbegin', '');


document.getElementById("close").addEventListener("click", closetranslate);
function closetranslate () {
  document.getElementById("translate-banner").style.display = "none";
}
</script>














<div class="h-48" data-purposelabel="a spacer for demo yo"> </div>
{% include 'language-access-data.md' %}


