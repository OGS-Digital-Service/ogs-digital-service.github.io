---
layout: language.njk
title: Language Access
---

{% from './_includes/_components.njk' import languageaccess %}

# {{title}}

## Testing some stuff

I built a simple page language html lang attribute changer to try and force the browser into detecting a language and translating. Browsers are hard though so this doesn't work the way I thought it might.

<style>
.nysds-select {
    font-family: "Proxima Nova",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 600;
    font-size: 0.85rem;
    line-height: 1.25;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 7.5em;
    padding: 3px;
    margin-left: 5px;
    border: none;
    background-image: url(/img/expand_more.svg),linear-gradient(transparent,transparent);
    background-repeat: no-repeat;
    background-size: auto 1.5rem;
    background-position:right;
    background-color: #fff;
    -webkit-appearance: none;
}

.nysds-translate-group {
  display: flex;
  justify-content: center;
}

.nysds-highlight-language {
  border-right: 1px solid #000;
  font-size: 0.85rem;
  line-height: 1.25;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 3px 12px;
  
}

.nysds-highlight-language a:visited {
  color: #007AC2;
}

.nysds-highlight-language a:hover {
  filter: brightness(0.8);
}

.nysds-highlight-language::after {
  content:"";
}

  </style>

<div id="translate-banner" class="fixed bottom-0 z-501 bg-white p-1 w-full border-b border-gray-100">
<div class="nysds-translate-group">
<div class="nysds-highlight-language"> <a href="" class="underline" lang="es"> Español </a>
</div>
<span class="mt-0.5 ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
</svg>
</span>
  <label class="sr-only" id="translate-label" for="langs">
   Translate this page into
  </label>
  <select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label">
      <option value="en" selected>English</option>
      <option value="fr">French</option>
      <option value="po">Polish</option>
      <option value="hc">Haitan-Creole</option>
  </select>
</div>
</div>

<script>
var translatebanner = document.getElementById('nygov-universal-navigation');
translatebanner.insertAdjacentHTML('afterbegin', '<div class="bg-white border-b border-gray-100 p-1 relative w-full z-501"id=translate-banner><div class=nysds-translate-group><div class=nysds-highlight-language><a class=underline href=""lang=es>Español</a></div><span class="ml-3 mt-0.5"><svg class="bi bi-globe"fill=currentColor height=16 viewBox="0 0 16 16"width=16 xmlns=http://www.w3.org/2000/svg><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/></svg></span><label class=sr-only for=langs id=translate-label>Translate this page into</label><select aria-labelledby=translate-label class=nysds-select id=langs name=languages><option value=en selected>English<option value=fr>French<option value=po>Polish<option value=hc>Haitan-Creole</select></div></div>');
document.getElementById("langs").addEventListener("change", changelang);
function changelang() {
  var x = document.getElementById("langs").value;
  document.documentElement.setAttribute("lang", x);
}
document.getElementById("close").addEventListener("click", closetranslate);
function closetranslate () {
  document.getElementById("translate-banner").style.display = "none";
}
</script>



<!-- <div id="translate-banner" class="fixed -mx-8 md:-mx-20 bottom-0 z-501 bg-white p-1 w-full border-b border-gray-100">
<div class="nysds-translate-group">
<div class="nysds-highlight-language"> <a href="" class="underline" lang="es"> Español </a>
</div>
<span class="mt-0.5 ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
</svg>
</span>
  <label class="sr-only" id="translate-label" for="langs">
   Translate this page into
  </label>
  <select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label">
      <option value="en" selected>English</option>
      <option value="fr">French</option>
      <option value="po">Polish</option>
      <option value="hc">Haitan-Creole</option>
  </select>
</div>
</div> -->

<div class="h-48" data-purposelabel="a spacer for demo yo"> </div>
{% include 'language-access-data.md' %}


