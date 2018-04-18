var data = [
  {
    "id": 1,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "dateOfBirth": "1.7.1990 11:35",
    "company": "XSolve",
    "note": 90
  },
  {
    "id": 4,
    "firstName": "Justyna",
    "lastName": "Kowalska",
    "dateOfBirth": "4.02.1976 14:37",
    "company": "XSolve",
    "note": 91
  },
  {
    "id": 2,
    "firstName": "Krzysztof",
    "lastName": "Krawczyk",
    "dateOfBirth": "28.10.1950 2:15",
    "company": "Chilid",
    "note": 27
  },
  {
    "id": 3,
    "firstName": "Bogusław",
    "lastName": "Linda",
    "dateOfBirth": "03.01.1963 23:10",
    "company": "XSolve",
    "note": 50
  },
  {
    "id": 5,
    "firstName": "Krzysztof",
    "lastName": "Kononowicz",
    "dateOfBirth": "10.10.1910 18:00",
    "company": "Chilid",
    "note": 77
  },
  {
    "id": 6,
    "firstName": "Maryla",
    "lastName": "Rodowicz",
    "dateOfBirth": "29.02.1936 11:35",
    "company": "XSolve",
    "note": 8
  }
]
//making date var
var employee_data = "";
$.each(data,function(key,value){ 
var d = new Date(value.dateOfBirth.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2.$1.$3"));
var dateOfBirth = d.getFullYear()+"-" + ("00" + (d.getMonth() + 1)).slice(-2)+"-"+("00" + d.getDate()).slice(-2);
var timeOfBirth = ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2)       
      employee_data +="<tr>";
      employee_data +="<td>"+ value.id +"</td>";
      employee_data +="<td>"+ value.firstName +"</td>";
      employee_data +="<td>"+ value.lastName +"</td>";
      employee_data +="<td> <input type='date' value='"+ dateOfBirth + "'><input type='time' value='"+ timeOfBirth + "'></td>";
      employee_data +="<td>"+ value.company +"</td>";
      employee_data +="<td>"+ value.note +"</td>";
      employee_data +="</tr>";
      });
    $("#employee_table").append(employee_data);

//filtering    
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#employee_table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
//pagination
$( document ).ready(function(){
$("#employee_table").each(function() {
    var currentPage = 0;
    var numPerPage = 5;
    var $table = $(this);
    $table.bind("repaginate", function() {
        $table.find("tbody tr").hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
$table.trigger("repaginate");
    var numRows = $table.find("tbody tr").length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind("click", {
            newPage: page
        }, function(event) {
            currentPage = event.data["newPage"];
            $table.trigger("repaginate");
            $(this).addClass("active").siblings().removeClass("active");
        }).appendTo($pager).addClass("clickable");
    }
    $pager.insertAfter($table).find("span.page-number:first").addClass("active");
});
});
