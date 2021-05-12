---
layout: layout-tablesort.njk
title: OPEN DATA API test
data: dmv46de4d71copy
---
{{title}}

<table id="dmv" class="display">
<thead class="">
<tr>
<th>Office name</th> 
<th>Office type</th>
</tr>
</thead>
<tbody>
{% for offices in dmv46de4d71copy %} 
<tr> 
<td>{{ offices.office_name}}</td>
<td>{{ offices.office_type}}</td>
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