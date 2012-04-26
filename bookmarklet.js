(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

var sel = window.getSelection();

function inline(n)
{
    var child = n.firstChild;
    while (child)
    {
        if ((child.nodeType === Node.ELEMENT_NODE) &&
            (sel.isCollapsed || sel.containsNode(child, true)))
        {
            inline(child);
            var displayMode = window.getComputedStyle(child,null).getPropertyValue("display");
            if (displayMode === "inline")
            {
                /*
                var grandChild = child.firstChild;
                if (grandChild)
                {
                    while (grandChild)
                    {
                        grandChild.style.background = "green";
                        n.insertBefore(grandChild, child.nextSibling);
                        grandChild = child.firstChild;
                    }
                }
                else
                {
                    textNode = document.createTextNode(child.textContent);
                    n.insertBefore(textNode, child.nextSibling);
                }
                */
                n.removeChild(child);
                //child.style.background = "red";
            }
        }
        child = child.nextSibling;
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
                var grandChildren = serialize(child);
                for (var j=0; j<grandChildren.length; j++)
                {
                    out.push(grandChildren[j]);
                }
            }
        }
    }
    return out;
}

inline(document.body);
document.body.normalize();

/*
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
*/

}(window));