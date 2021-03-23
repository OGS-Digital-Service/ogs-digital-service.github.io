---
layout: layout-tablesort.njk
title: Green Cleaning Products
data: newproductlist
---

<button type="button" id="test" class="border border-solid border-black p-4 m-4">Clear Filters</button>
<div class="filter1"> Filter 1 </div>
<div class="filter2"> Filter 1 </div>
<div class="filter3"> Filter 1 </div>


<table id="example" class="display">
<thead class="">
<tr>
<th>Product Category </th> 
<th>Product Type</th>
<th>Product Manufacturer</th>
<th>Meets Standard</th>
<th>Product Name</th>
</tr>
</thead>
<tbody>
{% for products in newproductlist %}
<tr> 
<td>{{ products.category }}</td>
<td>{{ products.subcategory }}</td>
<td>{{ products.manufacturer }}</td>
<td>{{ products.standard }}</td>
<td><a href="{{ products.category | slug }}/{{ products.subcategory | slug }}/{{ products.manufacturer | slug }}/{{ products.product | slug }}/">{{ products.product }}</a></td>
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


category
subcat
manufacturer
product name
standard

