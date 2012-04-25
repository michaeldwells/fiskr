(function( originalWindow, undefined ) {

var window = originalWindow;
var document = window.document;

//var p = document.createElement('p');
//p.innerHTML = "Hello";
//document.body.appendChild(p);

//document.body.innerHTML = "<p>Hello</p>";

var texts = []
for (var n in document.querySelector('*')) {
    texts.push(n.textContent);
}

document.body.innerHTML = "";

for (var t in texts) {
    var p = document.createElement('p');
    p.innerHTML = t;
    document.body.appendChild(p);
}

}(window));