function generate(){
  buildHtmlTableMarkers('#marker');
  buildHtmlTableUsers('#user');
}
function buildHtmlTableMarkers(selector) {
$.ajax({
            method: "GET",
           //url: "http://localhost:3000/markerlist",
           url: "https://bondi.herokuapp.com/markerlist",
            dataType: "json"}
            ).done(function(data){
 var columns = addAllColumnHeaders(data, selector);

  for (var i = 0; i < data.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = data[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
  $("#nbmarker").text("There are " + data.length + " markers");
            }).fail(function(err){
                console.log(err);
            });
 
}
function buildHtmlTableUsers(selector) {
$.ajax({
            method: "GET",
           //url: "http://localhost:3000/userlist",
           url: "https://bondi.herokuapp.com/userlist",
            dataType: "json"}
            ).done(function(data){
 var columns = addAllColumnHeaders(data, selector);

  for (var i = 0; i < data.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = data[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
    $("#nbuser").text("There are " + data.length + " users");

            }).fail(function(err){
                console.log(err);
            });
 
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(data, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < data.length; i++) {
    var rowHash = data[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
    
      }

  $(selector).append(headerTr$);

  return columnSet;
}

function destroyMarker(){
 var supp = document.getElementById("deleteMarker");
 console.log(supp.value);
 confirm = prompt("sure to remove ? Yes to delete", "");
            if (confirm == "yes"){
              console.log("on supp");
     data = {
                        "idimage" : supp.value
                    };
                     $.ajax({

                      type: "DELETE",
                     //url: 'http://localhost:3000/supplikesbyidmarker',
                     url: "https://bondi.herokuapp.com/supplikesbyidmarker",
                      data: data,
                      dataType: "json"
                       
                  }); 
                   $.ajax({

                      type: "DELETE",
                     //url: 'http://localhost:3000/suppmarkerbyidmarker',
                     url: "https://bondi.herokuapp.com/suppmarkerbyidmarker",
                      data: data,
                      dataType: "json"
                       
                  }); 
    }
    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "/admin";

    }, 2000);
}
function destroyUserandMarkers(){
 var supp = document.getElementById("deleteUser");
 console.log(supp.value);
 confirm = prompt("sure to remove ? Yes to delete", "");
            if (confirm == "yes"){
                  data = {
                      "pseudo" : supp.value
                  };
                   $.ajax({

                      type: "DELETE",
                     //url: 'http://localhost:3000/supplikesbypseudo',
                     url: "https://bondi.herokuapp.com/supplikesbypseudo",
                      data: data,
                      dataType: "json"
                       
                  }); 
                   $.ajax({

                      type: "DELETE",
                     //url: 'http://localhost:3000/suppmarkersbypseudo',
                     url: "https://bondi.herokuapp.com/suppmarkersbypseudo",
                      data: data,
                      dataType: "json"
                       
                  }); 
                   $.ajax({

                      type: "DELETE",
                     //url: 'http://localhost:3000/suppuserbypseudo',
                     url: "https://bondi.herokuapp.com/suppuserbypseudo",
                      data: data,
                      dataType: "json"
                       
                  });
}
window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "/admin";

    }, 2000);
}