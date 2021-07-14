---
layout: layout.njk
title: DMV Accessibility Remediations Tracker
---
{% from './_includes/_components.njk' import statuscard  %}

# {{title}}

{{ statuscard({ 
    heading:'As of 7/14/2021',
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
          {title:'the dmv story title',
          link:'',
          complete: true},
        corestory: 
          {title:'the core story title',
          link:'',
          complete: true},
        status:true,
        reviewlink:''
    },
        {
        cardtitle:'second task',
        incident:'123123123',
        severity:'4',
        govstory: 
          {title:'the gov story title',
          complete: false},
        dmvstory: 
          {title:'the dmv story title',
          complete: true},
        corestory: 
          {title:'the core story title',
          complete: true},
        status:'ready for rescan',
        reviewlink:'https://html.com'
    },
      {
        cardtitle:'second task',
        incident:'123123123',
        severity:'4',
        govstory: 
          {title:'the gov story title',
          complete: false},
        dmvstory: 
          {title:'the dmv story title',
          complete: true},
        corestory: 
          {title:'the core story title',
          complete: true},
        status:'ready for rescan',
        reviewlink:'https://html.com'
    }
  ]
})}}
