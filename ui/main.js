var button = document.getElementById('counter');
button.onclick = function() {
    //create a request object
    var request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var counter = request.responseText;
                document.getElementById('count').innerHTML = counter.toString();
            }
        }
    };
    request.open('Get', "http://sanyog96.imad.hasura-app.io/counter", true);
    request.send(null);
};

//chnage name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit= document.getElementById('submit-btn');
submit.onclick = function() {
    //should make a request to server and send the name
    //capture the list of name and render it as a list
    var request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++)
                {
                list = list + "<li>"+ names[i] + "</li>";
                }
                var ul= document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    request.open('Get', "http://sanyog96.imad.hasura-app.io/submit-name?name="+name, true);
    request.send(null);
};
