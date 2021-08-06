---
layout: layout.njk
title: DMV Accessibility Remediations Dashboard
---
{% from '../_includes/_components.njk' import statuscard, categorytiles %}

# {{title}}

{{ categorytiles({ 
    title:"Tickets and Status",
     items: [
    {
      text: "Needs Discussion",
      link: "#needs-discussion"
    },
    {
      text: "Ready to Rescan",
      link: "#complete-and-ready-to-rescan"
    },
    {
      text: "In-Progress",
      link: "#work-still-in-progress"
    }
  ]
})}}


{{ statuscard({ 
    heading:'Needs Discussion',
    cards: [
    {
        cardtitle:'Tables: remove aria-label from sortable headers and move header text into an a element inside th',
        incident:'1898812747',
        severity:'5',
        govstory: 
          {title:'GOV-309',
          link:'https://itswebny.atlassian.net/browse/GOV-309',
          complete: true},
        projectstory: 
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
        cardtitle:'Sticky Header: SHARE text should be an h2 not an implicit heading',
        incident:'1898214322',
        severity:'6',
        govstory: 
          {title:'GOV-314',
          link:'https://itswebny.atlassian.net/browse/GOV-314',
          complete: false},
        projectstory: 
          {title:'',
          link:'https://itswebny.atlassian.net/browse/DMV-167',
          complete: false},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:'wrong',
        reviewlink:''
    }
 
    ]
})}}

{{ statuscard({ 
    heading:'Complete and Ready to Rescan',
    cards: [
     {
        cardtitle:'Sticky Header: add aria-label to TOP link',
        incident:'1896986111',
        severity:'6',
        govstory: 
          {title:'GOV-311',
          link:'https://itswebny.atlassian.net/browse/GOV-311',
          complete: true},
        projectstory: 
          {title:'DMV-168',
          link:'https://itswebny.atlassian.net/browse/DMV-168',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status: 'ready',
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
        projectstory: 
          {title:'DMV-169',
          link:'https://itswebny.atlassian.net/browse/DMV-169',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status: 'ready',
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
     {
        cardtitle:'Navigator: "SECTIONS" text should be an <h2>',
        incident:'1898206771',
        severity:'6',
        govstory: 
          {title:'GOV-317',
          link:'https://itswebny.atlassian.net/browse/GOV-316',
          complete: true},
        projectstory: 
          {title:'DMV-171',
          link:'https://itswebny.atlassian.net/browse/DMV-171',
          complete: true},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status: 'ready',
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
    {
        cardtitle:'Page with Navigator: continue next section links need a role and must be keyboard focusable ',
        incident:'1898214230, 1898214229, 1898214206,1898214205, 1899053315, 1899053318, 1899053411, 1899052727',
        severity:'7 & 8',
        govstory: 
          {title:'GOV-320',
          link:'https://itswebny.atlassian.net/browse/GOV-320',
          complete: true},
        projectstory: 
          {title:'DMV-172',
          link:'https://itswebny.atlassian.net/browse/DMV-172',
          complete: true},
        corestory: 
          {title:'CORE-744',
          link:'https://itswebny.atlassian.net/browse/CORE-744',
          complete: true},
        status: 'ready',
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/upstate-new-york-junior-learner-permit-restrictions'
    },
    {
        cardtitle:'Tables: Sortable header needs to receive focus or state change when sorted',
        incident:'1898234909',
        severity:'8',
        govstory: 
          {title:'GOV-322',
          link:'https://itswebny.atlassian.net/browse/GOV-322',
          complete: true},
        projectstory: 
          {title:'DMV-166',
          link:'https://itswebny.atlassian.net/browse/DMV-166',
          complete: true},
        corestory: 
          {title:'CORE-753',
          link:'https://itswebny.atlassian.net/browse/CORE-753',
          complete: false},
        status: 'ready',
        reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/new-york-state-license-types-0'
    },
    {
        cardtitle:"Content Snippet: HTML id's must be unique",
        incident:'1898296822',
        severity:'6',
        govstory: 
          {title:'GOV-330',
          link:'https://itswebny.atlassian.net/browse/GOV-330',
          complete: true},
        projectstory: 
          {title:'DMV-159',
          link:'https://itswebny.atlassian.net/browse/DMV-159',
          complete: true},
        corestory: 
          {title:'',
          link:'https://itswebny.atlassian.net/browse/CORE-753',
          complete: false},
        status: 'ready',
        reviewlink:'http://nydmvd8dev.prod.acquia-sites.com/test-snippets'
    },
    {
          cardtitle:'Photo Gallery: previous & next controls need a role and label ',
          incident:'1898030135',
          severity:'7',
          govstory: 
            {title:'GOV-318',
            link:'https://itswebny.atlassian.net/browse/GOV-318',
            complete: true},
          projectstory: 
            {title:'DMV-175',
            link:'https://itswebny.atlassian.net/browse/DMV-175',
            complete: true},
          corestory: 
            {title:'CORE-762',
            link:'https://itswebny.atlassian.net/browse/CORE-762',
            complete: false},
          status: 'ready',
          reviewlink:'https://nydmvd8ode98.prod.acquia-sites.com/test-carousel'
      },
      {
          cardtitle:'Photo Gallery: carousel is not well structured',
          incident:'1898820137',
          severity:'6',
          govstory: 
            {title:'GOV-316',
            link:'https://itswebny.atlassian.net/browse/GOV-316',
            complete: true},
          projectstory: 
            {title:'DMV-174',
            link:'https://itswebny.atlassian.net/browse/DMV-174',
            complete: true},
          corestory: 
            {title:'CORE-762',
            link:'https://itswebny.atlassian.net/browse/CORE-762',
            complete: false},
          status: 'ready',
          reviewlink:'https://nydmvd8ode98.prod.acquia-sites.com/test-carousel'
      },
      {
          cardtitle:'Quick Links: column titles need to be headings h3',
          incident:'1899037480',
          severity:'6',
          govstory: 
            {title:'GOV-328',
            link:'https://itswebny.atlassian.net/browse/GOV-328',
            complete: true},
          projectstory: 
            {title:'DMV-177',
            link:'https://itswebny.atlassian.net/browse/DMV-177',
            complete: true},
          corestory: 
            {title:'CORE-763',
            link:'https://itswebny.atlassian.net/browse/CORE-763',
            complete: false},
          status:'ready',
          reviewlink:'http://nydmvd8dev.prod.acquia-sites.com/younger-driver/graduated-license-law-and-restrictions-drivers-under-18'
      },
      {
          cardtitle:'Bio Frame: additional links need to be in a list',
          incident:'1899027322',
          severity:'6',
          govstory: 
            {title:'GOV-327',
            link:'https://itswebny.atlassian.net/browse/GOV-327',
            complete: true},
          projectstory: 
            {title:'DMV-178',
            link:'https://itswebny.atlassian.net/browse/DMV-178',
            complete: true},
          corestory: 
            {title:'CORE-763',
            link:'https://itswebny.atlassian.net/browse/CORE-763',
            complete: false},
          status:'ready',
          reviewlink:'http://nydmvd8dev.prod.acquia-sites.com/younger-driver/graduated-license-law-and-restrictions-drivers-under-18'
      },
      {
        cardtitle:'Alerts: use proper heading h2 to indicate importance of main alert text ',
        incident:'1899058972',
        severity:'6',
        govstory: 
          {title:'GOV-326',
          link:'https://itswebny.atlassian.net/browse/GOV-326',
          complete: true},
        projectstory: 
          {title:'DMV-164',
          link:'https://itswebny.atlassian.net/browse/DMV-164',
          complete: true},
        corestory: 
          {title:'CORE-761',
          link:'https://itswebny.atlassian.net/browse/CORE-761',
          complete: false},
        status:'ready',
        reviewlink:'http://nydmvd8dev.prod.acquia-sites.com/'
    },
    {
          cardtitle:'Call and Response - Ensure Aria roles, states and properties are valid',
          incident:'1899017650',
          severity:'5',
          govstory: 
            {title:'GOV-310',
            link:'https://itswebny.atlassian.net/browse/GOV-310',
            complete: true},
          projectstory: 
            {title:'DMV-125',
            link:'https://itswebny.atlassian.net/browse/DMV-125',
            complete: true},
          corestory: 
            {title:'CORE-708',
            link:'https://itswebny.atlassian.net/browse/CORE-708',
            complete: false},
          status:'ready',
          reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/accordion-front-end-test-landing-page-3'
      },
      {
          cardtitle:'Document download link should be an h3 and combine links for a more well formed element',
          incident:'',
          severity:'',
          govstory: 
            {title:'GOV-325',
            link:'https://itswebny.atlassian.net/browse/GOV-325',
            complete: true},
          projectstory: 
            {title:'DMV-184',
            link:'https://itswebny.atlassian.net/browse/DMV-184',
            complete: true},
          corestory: 
            {title:'CORE-769',
            link:'https://itswebny.atlassian.net/browse/CORE-769',
            complete: false},
          status:'ready',
          reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/news/new-york-state-warns-new-yorkers-risk-heatstroke'
      },
      {
          cardtitle:'Contact Frame: titles need to be headings and fieldset',
          incident:'',
          severity:'6, 3',
          govstory: 
            {title:'GOV-329',
            link:'https://itswebny.atlassian.net/browse/GOV-329',
            complete: true},
          projectstory: 
            {title:'DMV-185',
            link:'https://itswebny.atlassian.net/browse/DMV-185',
            complete: true},
          corestory: 
            {title:'CORE-769',
            link:'https://itswebny.atlassian.net/browse/CORE-769',
            complete: false},
          status:'ready',
          reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/news/new-york-state-warns-new-yorkers-risk-heatstroke'
      }
       
  ]
})}}


  {{ statuscard({ 
      heading:'Work still in progress',
      cards: [
      {
          cardtitle:'Popular Services: "cards" are not in a list and lose grouped meaning for non-sighted users',
          incident:'1899017190',
          severity:'6, 3',
          govstory: 
            {title:'GOV-325',
            link:'https://itswebny.atlassian.net/browse/GOV-325',
            complete: true},
          projectstory: 
            {title:'',
            link:'https://itswebny.atlassian.net/browse/DMV-174',
            complete: false},
          corestory: 
            {title:'CORE-750',
            link:'https://itswebny.atlassian.net/browse/CORE-750',
            complete: false},
          status:false,
          reviewlink:''
      },
      {
          cardtitle:'Cards: card image link does not have meaningful text in relation to the image and title heading remediation',
          incident:'1899017077, 1899017078',
          severity:'6, 3',
          govstory: 
            {title:'GOV-315',
            link:'https://itswebny.atlassian.net/browse/GOV-315',
            complete: true},
          projectstory: 
            {title:'DMV-190',
            link:'https://itswebny.atlassian.net/browse/DMV-190',
            complete: false},
          corestory: 
            {title:'',
            link:'https://itswebny.atlassian.net/browse/CORE-769',
            complete: false},
          status:false,
          reviewlink:'https://nydmvd8dev.prod.acquia-sites.com/news/new-york-state-warns-new-yorkers-risk-heatstroke'
      },
      {
          cardtitle:'Alerts - Provide Alternate Text For Images',
          incident:'n/a',
          severity:'5',
          govstory: 
            {title:'GOV-336',
            link:'https://itswebny.atlassian.net/browse/GOV-336',
            complete: true},
          projectstory: 
            {title:'DMV-124',
            link:'https://itswebny.atlassian.net/browse/DMV-124',
            complete: false},
          corestory: 
            {title:'CORE-709',
            link:'https://itswebny.atlassian.net/browse/CORE-709',
            complete: false},
          status:false,
          reviewlink:''
      },
      {
        cardtitle:'Ensure custom controls are keyboard accessible for decision tree component',
        incident:'n/a',
        severity:'n/a',
        govstory: 
          {title:'',
          link:'https://itswebny.atlassian.net/browse/GOV-314',
          complete: false},
        projectstory: 
          {title:'DMV-91',
          link:'https://itswebny.atlassian.net/browse/DMV-91',
          complete: false},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:false,
        reviewlink:''
    },
    {
        cardtitle:'Navigator: Active section anchor link needs aria-current=true and clicking a section link should change focus in the page ',
        incident:'1898206902, 1899053688, 1898206903, 1899053995, 1899053993, 1899053994',
        severity:'8, 7',
        govstory: 
          {title:'GOV-323',
          link:'https://itswebny.atlassian.net/browse/GOV-323',
          complete: true},
        projectstory: 
          {title:'DMV-195',
          link:'https://itswebny.atlassian.net/browse/DMV-195',
          complete: false},
        corestory: 
          {title:'',
          link:'',
          complete: false},
        status:false,
        reviewlink:''
    }
      ]
  })}}


