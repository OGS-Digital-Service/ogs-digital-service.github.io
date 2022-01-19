---
layout: layout.njk
title: The NYS Design Patterns
---
{% from './_includes/_components.njk' import breadcrumbs,button,buttonhero,card,hero,heroold,categorytiles,iconframe,iconframesix,filtercard,languageaccess %} 


{{ heroold({ 
    title: "Demo Content Page for Testing Only",
    subtitle: "Empire State Plaza Art Collection-Inspired Artwork by Capital Region School District Students.",
    image:"",
    buttontext: "First Button",
    link: "https://ogs.ny.gov",
    arialabel: "Office of General Services",
    buttontext2: "Second Button",
    link2: "https://ogs.ny.gov",
    arialabel2: "Office of General Services"
})}}


{{ breadcrumbs({ 
     items: [
    {
      text: "Home",
      link: "/"
    },
    {
      text: "How to Start",
      link: "#"
    }
  ]
})}}

# In Progress demo page


<a href="" id="es-spanish">Spanish</a>
<a href="" id="fr-french">French</a>

<script>
var esURL = window.location.protocol + "//" + "es." + window.location.host + window.location.pathname + window.location.search
document.getElementById("es-spanish").setAttribute('value', esURL);
var frURL = window.location.protocol + "//" + "fr." + window.location.host + window.location.pathname + window.location.search
document.getElementById("fr-french").setAttribute('value', frURL);
</script>


var frURL = window.location.protocol + "//" + "fr." + window.location.host + window.location.pathname + window.location.search
document.getElementById("fr-french").setAttribute('value', frURL);

var url = window.location.protocol + "//" + location.host.split(":")[0];





{{ filtercard({ 
    heading:"Simple JS data filter",
    filtercards: [
    {
      title: "nothing",
      link: "/tableau",
      description:"Use to apply for a learner permit, driver license or non-driver ID. Also use to renew your license or non-driver ID."
    },
    {
      title: "whatever",
      link: "/icon-frame-review",
      description:"whatever"
    },
    {
      title: "something",
      link: "/language-access",
      description:"something"
    },
    {
      title: "nothing",
      link: "/",
      description:"nothing"
    }
  
  ]
})}}
