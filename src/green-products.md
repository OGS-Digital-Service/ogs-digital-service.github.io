---
layout: layout-tablesort.njk
title: Green Cleaning Products
data: newproductlist
---
<div class="flex-row">
<button type="button" id="test" class="border border-solid border-black p-4 m-4">Clear Filters</button>
<label for="filter1"> Filter by Category </label><span class="filter1 border border-solid border-black p-2 m-2"></span> </div>



<table id="example" class="display">
<thead class="">
<tr>
<th>Product Category </th> 
<th>Product Type</th>
<th>Product Manufacturer</th>
<th>Product Name</th>
<th>Meets Standard</th>
</tr>
</thead>
<tbody>
{% for products in newproductlist %}
<tr> 
<td>{{ products.category }}</td>
<td>{{ products.subcategory }}</td>
<td>{{ products.manufacturer }}</td>
<td><a href="{{ products.category | slug }}/{{ products.subcategory | slug }}/{{ products.manufacturer | slug }}/{{ products.product | slug }}/">{{ products.product }}</a></td>
<td>{{ products.standard }}</td>
</tr>
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


