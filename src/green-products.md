---
layout: layout.njk
title: Adopt the System Incrementally
---


<ol class="list">
{% for post in collections.green %}
<li><a href="{{ post.url }}">{{ post.url }}</a></li>
{% endfor %}
</ol>


