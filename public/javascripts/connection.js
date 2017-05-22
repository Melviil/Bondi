
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
                    statusCode: {

                      400: function(response) {
                    alert("User/Password incorrect");
                  },

                      200: function(response) {
                    alert("Bien log in");
                    document.cookie = "token= "+response.token+"; path='/'";
                    window.location = "/" ;
                  }
                },

                    method: "POST",
                    url: "http://localhost:3000/checkuser",
                    data: data,
                     dataType: "json"
                });
}