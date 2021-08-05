---
layout: layout.njk
title: Accessibility Remediations
---
{% from '../_includes/_components.njk' import categorytiles  %}

# {{title}}

{{ categorytiles({ 
    title:"Remeditaions in Progress",
     items: [
    {
      text: "NYS DMV",
      link: "/dmv-accessibility"
    },
    {
      text: "ACSF Drupal Cards",
      link: "../cards"
    }
  ]
})}}