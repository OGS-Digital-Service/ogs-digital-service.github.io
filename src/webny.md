---
layout: layout-tablesort.njk
title: webny
data: webnysites
---
{{title}}
 




<table id="dmv" class="display">
<thead class="">
<tr>
<th>Title</th> 
<th>URL</th>
<th>Platform</th>
<th>server</th>
<th>agency</th>
<th>cluster</th>
</tr>
</thead>
<tbody>
{% for sites in webnysites %} 
<tr> 
<td>{{ sites.Title }}</td>
<td><a href="{{ sites.URL }}">{{ sites.URL }}</a></td>
<td>{{ sites.Platform }}</td>
<td>{{ sites.Server }}</td>
<td>{{ sites.Agency }}</td>
<td>{{ sites.Cluster }}</td>
</tr>
{% endfor %}
</tbody>
<tfoot> 
<tr>
<td></td>
<td></td>
</tr>
</tfoot>
</table>