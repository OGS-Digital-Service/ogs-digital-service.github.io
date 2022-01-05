---
layout: language.njk
title: Language Access
---
{% from './_includes/_components.njk' import languageaccess %} 

<script>
var translatebanner = document.getElementById('nygov-universal-navigation');
translatebanner.insertAdjacentHTML('afterbegin', '<div id="translate-banner" class="relative top-0 p-4 bg-ny-dark z-auto w-full"><div class="flex justify-center"><span class="font-bold text-white">This page is available in other languages</span><label class="nys-label font-bold text-white ml-6" for="langs">Translate this page into</label><div class="nys-combo-box rounded mx-2 bg-white"><select class="usa-select bg-white" name="languages" id="langs"><option value>Select a language</option><option value="en">English</option><option value="fr">French</option><option value="es">Spanish</option></select></div><button id="close" class="font-bold text-white ml-8">X</button></div></div>');
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



# {{title}}



## disregard this section

I built a simple page language html lang attribute changer to try and force the browser into detecting a language and translating. Browsers are hard though so this doesn't work the way I thought it might.
<!-- 
<div id="translate-banner" class="relative top-0 p-4 bg-ny-dark z-auto w-full">
<div class="flex justify-center">
<span class="font-bold text-white "> This page is available in other languages</span>
<label class="nys-label font-bold text-white ml-6" for="langs">Translate this page into</label>
<div class="nys-combo-box rounded mx-2 bg-white">
  <select class="usa-select bg-white" name="languages" id="langs">
    <option value>Select a language</option>
    <option value="en">English</option>
    <option value="fr">French</option>
    <option value="es">Spanish</option>
  </select>
  </div>
  <button id="close" class="font-bold text-white ml-8"> X </button>
  </div>
  </div>
  
  <script>
  document.getElementById("langs").addEventListener("change", changelang);
function changelang() {
  var x = document.getElementById("langs").value;
  document.documentElement.setAttribute("lang", x);
}
</script> -->


{% include 'language-access-data.md' %} 
<div class="h-48" data-purposelabel="a spacer for demo yo"> </div>