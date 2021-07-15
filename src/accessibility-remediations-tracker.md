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
        incident:'1898812747',
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
          {title:'',
          link:'',
          complete: false},
        status:'wrong',
        reviewlink:''
    },
     {
        cardtitle:'Sticky Header: add aria-label to TOP link',
        incident:'1896986111',
        severity:'6',
        govstory: 
          {title:'GOV-311',
          link:'https://itswebny.atlassian.net/browse/GOV-311',
          complete: true},
        dmvstory: 
          {title:'DMV-168',
          link:'https://itswebny.atlassian.net/browse/DMV-168',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:true,
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
    {
        cardtitle:'Sticky Header: add aria-label to TOP link',
        incident:'1896986111',
        severity:'6',
        govstory: 
          {title:'GOV-311',
          link:'https://itswebny.atlassian.net/browse/GOV-311',
          complete: true},
        dmvstory: 
          {title:'DMV-168',
          link:'https://itswebny.atlassian.net/browse/DMV-168',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:true,
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    }
      
  ]
})}}
