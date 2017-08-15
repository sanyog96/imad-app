console.log('Loaded!');

var element = document.getElementById('main text');
element.innerHTML = 'New Value';

//move the image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
    var interval = setInterval(moveRight, 100);//Every 100 millisecond apply  moveRight function
};

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function() {
    counter = counter + 1;
    var spam = document.getElementById('count');
    spam.innerHTML = counter.toString();
};