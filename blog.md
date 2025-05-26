---
layout: layout.njk
title: Blog
---

# Blog

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> ({{ post.date | date: "%B %Y" }})
  </li>
{% endfor %}
</ul> 