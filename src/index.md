---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs,categorytiles %} 

{{ hero({ 
    title: "The NYS Web Design System",
    subtitle: "With an information first approach, the components and design patterns are focused on connecting people to the resources they need.",
    image:"",
    buttontext: "How to Start",
    link: "/adopt-incrementally",
    arialabel: "How to Start using the Application Design System",
    buttontext2: "The Patterns",
    link2: "/patterns",
    arialabel2: "The patterns used in the Application Design System"
})}}



# This Website
Is in alpha stages and should be considered a work in progess.



{{ categorytiles({ 
    title:"Demo Content",
     items: [
    {
      text: "Green Products List",
      link: "/green-products"
    },
    {
      text: "DMV data",
      link: "/dmv-office-locations"
    }
  ]
})}}