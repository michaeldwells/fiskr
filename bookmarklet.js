(function( originalWindow, undefined ) {

var window = originalWindow;
var document = window.document;

//var p = document.createElement('p');
//p.innerHTML = "Hello";
//document.body.appendChild(p);

//document.body.innerHTML = "<p>Hello</p>";

var allNodes = document.querySelector('*');
var texts = [];
for (var i in allNodes) {
    texts.push(allNodes[i].textContent);
}

document.body.innerHTML = "";

for (var i in texts) {
    var p = document.createElement('p');
    p.innerHTML = texts[i];
    document.body.appendChild(p);
}

}(window));