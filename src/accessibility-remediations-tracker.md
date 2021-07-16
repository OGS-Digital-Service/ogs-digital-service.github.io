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
        cardtitle:'Tables: remove aria-label from sortable headers and move header text into an a element inside th',
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
        cardtitle:'Sticky Header: add aria-label to share links',
        incident:'1896986315',
        severity:'6',
        govstory: 
          {title:'GOV-312',
          link:'https://itswebny.atlassian.net/browse/GOV-312',
          complete: true},
        dmvstory: 
          {title:'DMV-169',
          link:'https://itswebny.atlassian.net/browse/DMV-169',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:true,
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
     {
        cardtitle:'Photo Gallery: carousel is not well structured',
        incident:'1898820137',
        severity:'6',
        govstory: 
          {title:'GOV-316',
          link:'https://itswebny.atlassian.net/browse/GOV-316',
          complete: true},
        dmvstory: 
          {title:'DMV-174',
          link:'https://itswebny.atlassian.net/browse/DMV-174',
          complete: false},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:false,
        reviewlink:''
    },
     {
        cardtitle:'Navigator: "SECTIONS" text should be an <h2>',
        incident:'1898206771',
        severity:'6',
        govstory: 
          {title:'GOV-317',
          link:'https://itswebny.atlassian.net/browse/GOV-316',
          complete: true},
        dmvstory: 
          {title:'DMV-171',
          link:'https://itswebny.atlassian.net/browse/DMV-171',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:true,
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
    {
        cardtitle:'Photo Gallery: previous & next controls need a role and label ',
        incident:'1898030135',
        severity:'7',
        govstory: 
          {title:'GOV-318',
          link:'https://itswebny.atlassian.net/browse/GOV-318',
          complete: true},
        dmvstory: 
          {title:'DMV-175',
          link:'https://itswebny.atlassian.net/browse/DMV-175',
          complete: false},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:false,
        reviewlink:''
    },
    {
        cardtitle:'Page with Navigator: continue next section links need a role and must be keyboard focusable ',
        incident:'1898214230, 1898214229, 1898214206',
        severity:'7 & 8',
        govstory: 
          {title:'GOV-320',
          link:'https://itswebny.atlassian.net/browse/GOV-320',
          complete: true},
        dmvstory: 
          {title:'DMV-172',
          link:'https://itswebny.atlassian.net/browse/DMV-172',
          complete: true},
        corestory: 
          {title:'CORE-744',
          link:'https://itswebny.atlassian.net/browse/CORE-744',
          complete: true},
        status:true,
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    }
      
  ]
})}}
