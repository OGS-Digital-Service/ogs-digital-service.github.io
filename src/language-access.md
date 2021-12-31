---
layout: layout.njk
title: Language Access
---
{% from './_includes/_components.njk' import languageaccess %} 
{{title}}

<label class="nys-label pb-4 font-bold text-xl" for="languages">Select a language</label>
<div class="nys-combo-box border border-black w-max m-4 p-2 rounded-xl">
  <select class="usa-select" name="languages" id="languages">
    <option value>Select a language</option>
    <option value="english">English</option>
    <option value="french">French</option>
    <option value="spanish">Spanish</option>
    <option value="polish">Polish</option>
  </select>
  </div>  
  <button type="submit" class="bg-yellow-100 w-max border border-black p-2 m-4 rounded-xl font-bold"> Translate this page </button>
{% include 'language-access-data.md' %} 
<div class="h-48" data-purposelabel="a spacer for demo yo"> </div>


<button onclick="changeLang('es')">Espanol</button>
<button onclick="changeLang('en')">English</button>
<button onclick="changeLang('fr')">French</button>

<script>
    const changeLang = (languageCode) => {
       document.documentElement.setAttribute("lang", languageCode);
      };
</script>

