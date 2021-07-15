---
layout: layout.njk
title: DMV Accessibility Remediations Tracker
---
{% from './_includes/_components.njk' import statuscard  %}

# {{title}}

{{ statuscard({ 
    heading:'Severity 5 and Greater',
    cards: [
    {
        cardtitle:'Tables: remove aria-label from sortable headers and move header text into an <a> element inside <th>',
        incident:'123123123',
        severity:'5',
        govstory: 
          {title:'GOV-309',
          link:'https://itswebny.atlassian.net/browse/GOV-309',
          complete: true},
        dmvstory: 
          {title:'DMV-167',
          link:'https://itswebny.atlassian.net/browse/DMV-167',
          complete: true},
        corestory: 
          {title:'title',
          link:'link',
          complete: false},
        status:true,
        reviewlink:''
    }
      
  ]
})}}
