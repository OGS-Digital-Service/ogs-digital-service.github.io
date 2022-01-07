---
layout: language.njk
title: Language Access
permalink: false
---


<div id="translate-banner" class="relative top-0 p-4 bg-ny-dark z-501 w-full">
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

  
<style>.relative{position:relative}.top-0{top:0}.mx-2{margin-left:.5rem;margin-right:.5rem}.ml-6{margin-left:1.5rem}.ml-8{margin-left:2rem}.flex{display:flex}.table{display:table}.w-full{width:100%}.justify-center{justify-content:center}.rounded{border-radius:.25rem}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-ny-dark{--tw-bg-opacity:1;background-color:rgba(98,102,106,var(--tw-bg-opacity))}.p-4{padding:1rem}.font-bold{font-weight:700}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}</style>
<script>
var translatebanner = document.getElementById('nygov-universal-navigation');
translatebanner.insertAdjacentHTML('afterbegin', '<div id="translate-banner" class="relative top-0 p-4 bg-ny-dark z-501 w-full"><div class="flex justify-center"><span class="font-bold text-white">This page is available in other languages</span><label class="nys-label font-bold text-white ml-6" for="langs">Translate this page into</label><div class="nys-combo-box rounded mx-2 bg-white"><select class="usa-select bg-white" name="languages" id="langs"><option value>Select a language</option><option value="en">English</option><option value="fr">French</option><option value="es">Spanish</option></select></div><button id="close" class="font-bold text-white ml-8">X</button></div></div>');
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