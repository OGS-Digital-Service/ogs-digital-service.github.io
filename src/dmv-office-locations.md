---
layout: layout-tablesort.njk
title: OPEN DATA API test
data: office-s
---
{{title}}


<table id="example" class="display">
<thead class="">
<tr>
<th>Office name</th> 
<th>Office type</th>

</tr>
</thead>
<tbody>
{% for offices in office-s %} 
<tr> 
<td>{{ offices.office_name}}</td>
<td>{{ offices.office_type}}</td>
{% endfor %}
</tbody>
<tfoot> 
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tfoot>
</table>
