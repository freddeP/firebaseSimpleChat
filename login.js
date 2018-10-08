window.addEventListener("DOMContentLoaded",initJs);

function initJs()
{
    _id("loginForm").addEventListener("submit", login);
    _id("logoutForm").addEventListener("submit", logout);

}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("user:", user);
      _cl("messages")[0].style.display = "block";  
      _cl("chatForm")[0].style.display = "block";  
      _id("uid").value = user.uid;
    } else {
      // No user is signed in.
    }
  });



function login(e){
    e.preventDefault();

    email = _id("email").value;
    password = _id("password").value;
    


firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        _cl("loginForm")[1].style.display = "block";
        _cl("loginForm")[0].style.display = "none";
        
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.log(error);
  });

}

function logout(e)
{
    e.preventDefault();
    firebase.auth().signOut().then(function() {
        console.log("user logged out");
        _cl("loginForm")[0].style.display = "block";
        _cl("loginForm")[1].style.display = "none";
        _cl("chatForm")[0].style.display = "none";
        _cl("messages")[0].style.display = "none";
      }).catch(function(error) {
        // An error happened.
      });
}