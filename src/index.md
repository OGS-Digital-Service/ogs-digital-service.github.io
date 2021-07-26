---
layout: layout-homepage.njk
title: OGS Digital Service Design Lab
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs,categorytiles %} 

{{ hero({ 
    title: "The NYS Web Design System",
    subtitle: "With an information first approach, the components and design patterns are focused on connecting people to the resources they need.",
    image:"",
    buttontext: "Architecture Reports",
    link: "/architecture-decision-reports",
    arialabel: "Read about the decisions made about this web archtecture",
    buttontext2: "Demo Page",
    link2: "/patterns",
    arialabel2: "A demonstration page"
})}}



# An Evolving Sandbox Environment
This website represents a test and demonstration space for the New York State Digital & Media Services Center to test design system components, integrations, static site implementations, code snippets and other resusable content, among other technical things. 

If you have any questions about the content or technical aspects here, please contact us at <digital.services@ogs.ny.gov>



{{ categorytiles({ 
    title:"Demo Content",
     items: [
    {
      text: "Accessibility Remediations Dashboard",
      link: "/accessibility-remediations-dashboard"
    },
    {
      text: "Tableau Test",
      link: "/tableau"
    }
  ]
})}}