window.addEventListener("DOMContentLoaded",initChatApp);
var database = "";
function initChatApp()
{
    // initiera en referens till databasen
    database = firebase.database();
    // Click på formuläret
    document.getElementById("chatForm").addEventListener("submit", sendChat);
}

// skapa referens till vår chat
var messages = database.ref('chat');
// funktion som körs om värden i chat ändras
messages.on('value', function(snapshot) {

    let data = snapshot.val();
    let htmlTarget = document.getElementsByClassName("messages")[0];
    htmlTarget.innerHTML= "";
    for(let mes in data )
    {

        let tempTemplate = `
            <h3>Author: ${data[mes].author}</h3>
            <p>Message: ${data[mes].message}</p>
            <hr>
            `;
        
            htmlTarget.innerHTML += tempTemplate; 
    }
});



// skriv till DB

function sendChat(e)
{
    e.preventDefault();
    console.log("form submitted");

        database.ref('chat').push({
            id: Date.now(),
            author: document.getElementById("author").value,
            message: document.getElementById("message").value
        });

}

