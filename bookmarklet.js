(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

var sel = window.getSelection();

function crawl(n)
{
    var out = [];
    for (var i in n.childNodes)
    {
        kid = n.children[i];
        if ((kid.nodeType == Node.TEXT_NODE) ||
            (kid.nodeType == Node.CDATA_SECTION_NODE) &&
            (kid.textContent != ""))
        {
            out.push(kid.textContent);
        }
        else
        if (kid.nodeType == Node.ELEMENT_NODE)
        {
            var grandKids = crawl(kid);
            for (var j in grandKids)
            {
                out.push(grandKids[j]);
            }
        }
    }
    return out;
}

// Get the non-trivial text content from every leaf node
/*
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
*/
var texts = crawl(document.body);

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