(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

var sel = window.getSelection();

function inline(n)
{
    for (var i=0; i<n.childNodes.length; i++)
    {
        var child = n.childNodes[i];
        if (child.nodeType == Node.ELEMENT_NODE)
        {
            inline(child);
            var displayMode = window.getComputedStyle(child,null).getPropertyValue("display");
            if (display == "inline")
            {
                if (i < n.childNodes.length-1)
                {
                    for (j=0; j<child.childNodes.length; j++)
                    {
                        n.insertBefore(child.childNodes[j],n.childNodes[i+1]);
                    }
                }
                else
                {
                    for (j=0; j<child.childNodes.length; j++)
                    {
                        n.insertBefore(child.childNodes[j]);
                    }
                }
                n.removeChild(child);
            }
        }
    }
}

function serialize(n)
{
    var out = [];
    for (var i=0; i<n.childNodes.length; i++)
    {
        var child = n.childNodes[i];
        if (sel.isCollapsed || sel.containsNode(child, true))
        {
            if ((child.nodeType == Node.TEXT_NODE) ||
                (child.nodeType == Node.CDATA_SECTION_NODE) &&
                (child.textContent != ""))
            {
                out.push(child.textContent);
            }
            else
            if (child.nodeType == Node.ELEMENT_NODE)
            {
                var grandKids = crawl(child);
                for (var j=0; j<grandKids.length; j++)
                {
                    out.push(grandKids[j]);
                }
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

inline(document.body);
var texts = serialize(document.body);

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