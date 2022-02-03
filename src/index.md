---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs,categorytiles %} 

{{ hero({ 
    title: "OGS Digital Service Design Lab",
    subtitle: "",
    image:"",
    buttontext: "Demo Page",
    link: "/patterns",
    arialabel: "A demonstration page"
})}}



# An Evolving Sandbox Environment
This website represents a test and demonstration space for the New York State Digital & Media Services Center to test design system components, integrations, static site implementations, code snippets and other resusable content, among other technical things. All the work here is to be considered in-progress and in alpha stages.

If you have any questions about the content or technical aspects here, please contact us at <digital.services@ogs.ny.gov>. Or if you want to collaborate in any way - we're super cool people who want the web to work best for real people.

## Government as a Service
We're going to be building some pretty awesome utilities here for the people of the State of New York. Government Digital services are an amazing way to innovate for the greater good. 

Upcoming things for NYS:
- Well formatted and accessible form input library including accessible validation and error states.
- A content publishing pipeline for jamstack sites.
- Jamstack sites!
- Components you can just use anywhere.

{{ card({ 
    frametitle:'A Row of Cards',
    cards: [
        {
        title:"NYGov Profile Sandbox",
        content:"A rapid prototype and design sandbox page for nygov profile updates",
        link:"/nygov-sandbox",
        linktext:"See the Designs",
        arialabel:'go to the sandbox and prototype page to access the new designs for the ny.gov profile'
        },
        {
        title:"Language Switcher",
        content:"A functional demo of the language switcher component",
        link:"/language-access",
        linktext:"See the Translation Banner",
        arialabel:'go to the page with the demonstration language switcher'
        }
        
        
    ]
    
})}}

{{ categorytiles({ 
    title:"Demo Content",
     items: [
    {
      text: "Cookie Banner and Footer Switcher ",
      link: "/language-access-cookie-banner"
    }
  ]
})}}