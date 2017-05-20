

function checkPassGood() {
           //Fonction allant chercher les données de tous les markers
      var pseudo = document.getElementById("inputPseudo").value;
      var name = document.getElementById("inputName").value;
      var password = document.getElementById("inputPassword").value;
      var passwordCheck = document.getElementById("inputCheckPassword").value;
     
      if( password == passwordCheck){
        data = {
                    "pseudo" : pseudo,
                    "name" : name,
                    "password" : password
                     
                };
                $.ajax({
                  statusCode: {
                  400: function() {
                    alert("Pseudo already used");
                  }
                },
                    method: "POST",
                    url: "http://localhost:3000/adduser",
                    data: data,
                    
          });
       
            }else{
                alert("Passwords are not the same");
            }
     
}