---
layout: layout.njk
title: Accessibility Remediations
---
{% from '../_includes/_components.njk' import categorytiles, breadcrumbs  %}

# {{title}}

{{ categorytiles({ 
    title:"Remeditaions in Progress",
     items: [
    {
      text: "NYS DMV",
      link: "/accessibility-remediations-dashboard/dmv-accessibility"
    },
    {
      text: "ACSF Drupal Cards",
      link: "../cards"
    },
    {
      text: "ACSF Hero Gradient",
      link: "../hero"
    }
  ]
})}}