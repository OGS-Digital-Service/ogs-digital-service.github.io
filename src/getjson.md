---
layout: layout.njk
title: Testing getJSON
---
{% from './_includes/_components.njk' import breadcrumbs,button,buttonhero,card,hero,heroold,categorytiles,iconframe,iconframesix,filtercard %} 

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$.getJSON('https://data.ny.gov/resource/9upz-c7xg.json', function(data){
	/* console.log(data); */
  $(data).each(function(i, jsondata){
  	$('#dataBody').append($("<tr>")
    	.append($("<td>").append(jsondata.office_name))
      .append($("<td>").append(jsondata.office_type))
      .append($("<td>").append(jsondata.public_phone_number)));
  });
})
  
  </script>
  <table class="nysdataTable">
	<thead class="bg-gray-700 text-white text-center">
		<th>Office</th>
		<th>Type</th>
		<th>Phone Number</th>
	</thead>
	<tbody id="dataBody"></tbody>
</table>