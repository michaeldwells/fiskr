(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

function flattenInlineNodes(node,selection)
{
    if ((node.nodeType === Node.ELEMENT_NODE) &&
        (selection.isCollapsed || selection.containsNode(node, true)))
    {
        var displayMode = window.getComputedStyle(node,null).getPropertyValue("display");
        if (displayMode === "inline")
        {
            for (var i=0; i<node.childNodes.length; i++)
            {
                node.parentNode.insertBefore(node.childNodes[i].cloneNode(true), node.nextSibling);
            }
            node.parentNode.removeChild(node);
        }
    }
    for (var i=0; i<node.childNodes.length; i++)
    {
        flattenInlineNodes(node.childNodes[i], selection);
    }
}

function serialize(n,selection)
{
    var out = [];
    for (var i=0; i<n.childNodes.length; i++)
    {
        var child = n.childNodes[i];
        if (selection.isCollapsed || selection.containsNode(child, true))
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

function pageToTextBlocks()
{
    var selection = window.getSelection();
    flattenInlineNodes(document.body, selection);
    document.body.normalize();
    var texts = serialize(document.body, selection);

    // Clear the body
    document.body.innerHTML = "";

    // Populate the body with just the text from the original document
    for (var i in texts)
    {
        var p = document.createElement('p');
        p.innerHTML = texts[i];
        document.body.appendChild(p);
    }
}

pageToTextBlocks();

}(window));