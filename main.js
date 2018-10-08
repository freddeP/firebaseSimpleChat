window.addEventListener("DOMContentLoaded",initChatApp);
 // initiera en referens till databasen
const database = firebase.database();
function initChatApp()
{
    
    // Click på formuläret
    document.getElementById("chatForm").addEventListener("submit", sendChat);
}

// skapa referens till vår chat
var messages = database.ref('chat').orderByChild('timestamp');;

firebase.auth().onAuthStateChanged(function(user){if(user) {
      
    // funktion som körs om värden i chat ändras
    messages.on('value', function(snapshot) {

        let data = snapshot.val();
        let dataKeys = Object.keys(data).reverse();
        let htmlTarget = document.getElementsByClassName("messages")[0];
        htmlTarget.innerHTML= "";
        for(let key in dataKeys )
        {
            key = dataKeys[key];
            let tempTemplate = `<div>
                <h3>${data[key].author}</h3>
                <p><pre>${data[key].message}</pre></p>
                <hr></div>
                `;
            
                htmlTarget.innerHTML += tempTemplate; 
        }
    });


}});  // end if user




// skriv till DB

function sendChat(e)
{
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("user:", user);
      
              database.ref('chat').push({
                  timestamp: Date.now(),
                  userid: _id("uid").value,
                  author: _id("author").value,
                  message: _id("message").value
              });  
        } else {
          // No user is signed in.
        }
      });




}

