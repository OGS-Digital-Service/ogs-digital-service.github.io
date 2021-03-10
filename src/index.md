---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
featuring: Now Built using 11ty!
---
{% from './_includes/_components.njk' import button,card %} 
# {{ title }}

<p class="text-2xl font-bold"> {{ featuring }} </p>
<p class="oswald font-bold uppercase"> {{ featuring }} </p>

This is a link to [something else](https://ogs.ny.gov)

{{ button({ 
    buttontext: "Office of General Services",
    link: "https://ogs.ny.gov",
    arialabel: "Office of General Services"
})}}



<h1 class="agencyname">Agency Name in D Sari Bold</h1>