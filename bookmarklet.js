(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

var sel = window.getSelection();

function flattenInline(node)
{
    if ((node.nodeType === Node.ELEMENT_NODE) &&
        (sel.isCollapsed || sel.containsNode(node, true)))
    {
        var displayMode = window.getComputedStyle(node,null).getPropertyValue("display");
        if (displayMode === "inline")
        {
            for (var i=0; i<node.childNodes.length; i++)
            {
                node.parentNode.insertBefore(node.childNodes[i].cloneNode(true), node.nextSibling);
                node.nextSibling.style.background = "red";
            }
            node.parentNode.removeChild(node);
        }
    }
}
            /*
            var child = match.firstChild;
            while (child)
            {
                match.parent.insertBefore(child, match.nextSibling);
                child = match.firstChild;
            }
            */
            //node.removeChild(match);

function flattenAllInlines()
{
    var matches = document.querySelectorAll("body *");
    for (var i=0; i<matches.length; i++)
    {
        flattenInline(matches[i]);
    }
}
    /*
    var child = node.firstChild;
    while (child)
    {
        if ((child.nodeType === Node.ELEMENT_NODE) &&
            (sel.isCollapsed || sel.containsNode(child, true)))
        {
            inline(child);
            var displayMode = window.getComputedStyle(child,null).getPropertyValue("display");
            if (displayMode === "inline")
            {
                var grandChild = child.firstChild;
                while (grandChild)
                {
                    grandChild = child.removeChild(grandChild);
                    node.insertBefore(grandChild, child.nextSibling);
                    grandChild = child.firstChild;
                }
                child.style.background = "red";
                //node.removeChild(child);
            }
        }
        child = child.nextSibling;
    }
    */

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

flattenAllInlines();
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