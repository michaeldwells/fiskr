(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

var sel = window.getSelection();

// Get the non-trivial text content from every leaf node
var allNodes = document.querySelectorAll('*');
var texts = [];
for (var i in allNodes)
{
    if (allNodes[i].childElementCount == 0)
    {
        if ((allNodes[i].textContent != "") &&
            (allNodes[i].tagName.toLowerCase() != "script") &&
            (allNodes[i].tagName.toLowerCase() != "style"))
        {
            if (sel.isCollapsed || sel.containsNode(allNodes[i], true))
            {
                texts.push(allNodes[i].textContent);
            }
        }
    }
}

// Clear the body
document.body.innerHTML = "";

// Populate the body with just the text from the original document
for (var i in texts)
{
    var p = document.createElement('p');
    p.innerHTML = texts[i];
    document.body.appendChild(p);
}


}(window));