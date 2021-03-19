---
layout: layout.njk
title: Adopt the System Incrementally
---
{% from './_includes/_components.njk' import button,buttonhero,card,hero,breadcrumbs %} 

{{ breadcrumbs({ 
     items: [
    {
      text: "Home",
      link: "#"
    },
    {
      text: "Passports, travel and living abroad",
      link: "#"
    },
    {
      text: "Travel abroad",
      link: "#"
    },
    {
      text: "Travel again",
      link: "#"
    }
  ]
})}}

<ol class="list">
{% for post in collections.green %}
<li><a href="{{ post.url }}">{{ post.url }}</a></li>
{% endfor %}
</ol>


