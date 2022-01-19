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


<a href="" id="demo"></a>
<script>
var newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
var otherURL = window.location.protocol + "//" + 'ogs-digital-services.github.io' + window.location.pathname + window.location.search
document.getElementById("demo").innerHTML = otherURL;
document.getElementById("demo").setAttribute('href', otherURL);
</script>




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
