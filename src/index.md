---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs,categorytiles %} 

{{ hero({ 
    title: "The NYS Web Design System",
    subtitle: "With an information first approach, the components and design patterns are focused on connecting people to the resources they need.",
    image:"",
    buttontext: "Demo Page",
    link: "/patterns",
    arialabel: "A demonstration page"
})}}



# An Evolving Sandbox Environment
This website represents a test and demonstration space for the New York State Digital & Media Services Center to test design system components, integrations, static site implementations, code snippets and other resusable content, among other technical things. All the work here is to be considered in-progress and in alpha stages.

If you have any questions about the content or technical aspects here, please contact us at <digital.services@ogs.ny.gov>

{{ card({ 
    frametitle:'A Row of Cards',
    cards: [
        {
        title:"Architecture Decision Records",
        content:"Read about the architecture decisions that went into this website as well as other digital web components and integrations.",
        link:"/architecture-decision-records",
        linktext:"Browse the Records",
        arialabel:'Browse the list of architecture decision records'
        },
        {
        title:"Accessibility Remediations Dashboard",
        content:"A dashboard to organize outstanding accessibility work being completed for in-flight projects",
        link:"/accessibility-remediations-dashboard",
        linktext:"Go to the Dashboard",
        arialabel:'go to the dashboard of in progress accessibility remediations'
        },
         {
        title:"NYGov Profile Sandbox",
        content:"A rapid prototype and design sandbox page for nygov profile updates",
        link:"/nygov-sandbox",
        linktext:"See the Designs",
        arialabel:'go to the sandbox and prototype page to access the new designs for the ny.gov profile'
        }
        
        
    ]
    
})}}

{{ categorytiles({ 
    title:"Demo Content",
     items: [
    {
      text: "Language Access",
      link: "/language-access"
    },
    {
      text: "Language Access Cookie Banner ",
      link: "/language-access-alt"
    }
  ]
})}}