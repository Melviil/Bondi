
function checkPasswd() {
           //Fonction allant chercher les données de tous les markers
     
       console.log(document.getElementById("inputPseudo").value);    
      var pseudo = document.getElementById("inputPseudo").value;
      var password = document.getElementById("inputPassword").value;
     data = {
                    "pseudo" : pseudo,
                    "password" : password
                };
                $.ajax({
                    method: "POST",
                    url: "http://localhost:3000/checkuser",
                    data: data,
                     success :function(response){
                        console.log("response succes");
                     },
                     error : function(response){
                        console.log(response);
                     }
                });
}