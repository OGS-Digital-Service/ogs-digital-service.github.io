---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs,categorytiles %} 

{{ hero({ 
    title: "The NYS Simplified Design System for Applications",
    subtitle: "With an information first approach, the components and design patterns are focused on connecting people to the resources they need.",
    image:"",
    buttontext: "How to Start",
    link: "/adopt-incrementally",
    arialabel: "How to Start using the Application Design System",
    buttontext2: "The Patterns",
    link2: "/patterns",
    arialabel2: "The patterns used in the Application Design System"
})}}





With an information first approach, the components and design patterns are focused on connecting people to the resources they need.
# Now built using 11ty and tailwind

{{ categorytiles({ 
    title:"This is the title of the category tiles",
     items: [
    {
      text: "Green Products List",
      link: "/green-products"
    },
    {
      text: "TEST this goes no where",
      link: "#"
    }
  ]
})}}