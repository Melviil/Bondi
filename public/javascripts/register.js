

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
                    "password" : password,
                    "passwordcheck" : passwordCheck
                     
                };
                $.ajax({
                  statusCode: {

                      400: function(response) {
                    alert("Pseudo already taken");
                  },

                      200: function(response) {
                    alert("Well registered");
                    window.location = "/" ;
                  }
                },
                    method: "POST",
                    url: "https://bondi.herokuapp.com/adduser",
                    //url: "http://localhost:3000/adduser",
                    data: data,
                    
          });
       
            }else{
                alert("Passwords are not the same");
            }
     
}