//submit username/password to login
var submit= document.getElementById('submit-btn');
submit.onclick = function() {
    //should make a request to server and send the name
    //capture the list of name and render it as a list
    var request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                console.log("user logged in....");
                alert("logged in successfully...........");
            }
            else if (request.status === 403) {
                alert("username/password is incorrect.........");
            }
            else if (request.status === 500) {
                alert("Something went wrong  on the server..........");
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = nameInput.value;
    request.open('POST', "http://sanyog96.imad.hasura-app.io/submit-name?name="+name, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({username: username, password: password}));
};
