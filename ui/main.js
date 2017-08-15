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