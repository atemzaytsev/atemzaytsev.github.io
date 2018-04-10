     $(document).ready(function(){
      $.getJSON("data.json",function(data){
     var employee_data = "";
        $.each(data,function(key,value){
           employee_data +="<tr>";
           employee_data +="<td>"+ value.id +"</td>";
           employee_data +="<td>"+ value.firstName +"</td>";
           employee_data +="<td>"+ value.lastName +"</td>";
           employee_data +="<td>"+ value.dateOfBirth +"</td>";
           employee_data +="<td>"+ value.company +"</td>";
           employee_data +="<td>"+ value.note +"</td>";
           employee_data +="</tr>";
        });
        $("#employee_table").append(employee_data);
    });
   });   

// $(function() {
//             $.getJSON("data.json", function(data) {
//                 console.log(data);
//             });
//         });
