  var spData = null;
  var firstRow=true;
  function doData(json) {
      spData = json.feed.entry;
  }
  
  function drawCell(tr, val, column) {
      var td = $("<td/>");
      tr.append(td);
      if(!firstRow && column==1){
	var str=val.split(",");
	  var text="";
	  for (i = 0; i < str.length; i++) {
		if(str[i]) {str[i]=str[i].trim();}
		if(str[i].startsWith('http'))
		   text += "<a onClick='sendcontacttoga();' target='_blank' href='"+str[i]+"'><i class='icofont-web'></i>&nbsp;"+str[i]+"</a>&nbsp;&nbsp;";
		else
		   text += "<a onClick='sendcontacttoga();' href='tel:"+str[i].replace(/\D/g,'')+"'><i class='icofont-phone'></i>&nbsp;"+str[i]+"</a>&nbsp;&nbsp;";
	 }
	}
	  else{
		  text=val;
	  }
      td.append(text);
      return td;
  }
	
  function drawRow(table, rowData) {
	  if (rowData == null) return null;
	  if (rowData.length == 0) return null;
	  var tr = $("<tr/>");
	  table.append(tr);
	  for(var c=0; c<rowData.length; c++) {
		  drawCell(tr, rowData[c], c);
	  }
	  firstRow=false;//th has been created
	  return tr;
  }
  
  function drawTable(parent) {
	  var table = $("<table/>");
	  parent.append(table);
	  return table;
  }
  
  function readData(parent) {
      var data = spData;
      var table = drawTable(parent);
      var rowData = [];
	var tbody;
      
       for(var r=0; r<data.length; r++) {
          var cell = data[r]["gs$cell"];
          var val = cell["$t"];
          if (cell.col == 1) {
              drawRow(table, rowData);
              rowData = [];
          }
          rowData.push(val);
      }
      drawRow(table, rowData);
	  
var myTable = table;
var thead = myTable.find("thead");
var tbody = myTable.find("tbody");
var thRow1 =  myTable.find("tr:first");
var thRows =  myTable.find("tr");

if (thead.length===0){
    thead = jQuery("<thead></thead>").appendTo(myTable);    
}
if (tbody.length===0){
    tbody = jQuery("<tbody></tbody>").appendTo(myTable);    
}
//Add first row to thead
var copy = thRow1.clone(true).appendTo("thead");
thRow1.remove();
	  
//Add all rows to tbody
var copy = thRows.clone(true).appendTo("tbody");
thRows.remove();
	  
//Remove duplicate header
var duplicateHeader = tbody.find("tr:first"); 
duplicateHeader.remove();

return table;
}
$(document).ready(function(){
   var table=readData($("#tablecontainer"));
   table.DataTable({"paging": false});
});
var script_tag = document.getElementById('sheets_js');
var sheetnum = script_tag.getAttribute("num");
var sheeturl="https://spreadsheets.google.com/feeds/cells/178jCM3irD0TNUhYBjoLmqqDy3HNW2qz46hM76r4gh0U/"+sheetnum+"/public/full?alt=json";
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             doData(this.responseText);
         }
    };
    xhttp.open("GET", sheeturl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
