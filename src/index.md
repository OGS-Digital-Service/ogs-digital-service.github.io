---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
featuring: Now Built using 11ty!
---
{% from './_includes/button/_macro.njk' import button %}
{% from './_includes/card/_macro.njk' import card%}
# {{ title }}

<p class="text-2xl font-bold"> {{ featuring }} </p>

This is a link to [something else](https://ogs.ny.gov)


something else


{{ button({ 
    buttontext: "Office of General Services",
    link: "https://ogs.ny.gov",
    arialabel: "Office of General Services"
})}}


