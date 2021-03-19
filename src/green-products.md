---
layout: layout-tablesort.njk
title: Green Cleaning Products
data: productlist
---

<table id="example" class="display">
<thead class="">
<tr>
<th>Product Type </th>
<th>Product Manufacturer</th>
<th>Product Name</th>
</tr>
</thead>
<tbody>

{% for product in productlist %}
<tr>
<td>{{ product.type }}</td>
<td>{{ product.manufacturer }}</td>
<td><a href="/green-products/{{ product.type | slug }}/{{ product.category | slug }}/{{ product.manufacturer | slug }}/{{ product.name | slug }}{{ product.approval | slug}}/">{{ product.name }}</a></td>
</tr>
{% endfor %}

</tbody>
</table>




