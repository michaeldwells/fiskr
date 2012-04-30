(function( originalWindow, undefined ) {


var window = originalWindow;
var document = window.document;

function selected(node)
{
    var selection = window.getSelection();
    return (selection.isCollapsed || selection.containsNode(node, true));
}

function flattenInlineNodes(node)
{
    if ((node.nodeType === Node.ELEMENT_NODE) && selected(node))
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
        flattenInlineNodes(node.childNodes[i]);
    }
}

function serialize(node)
{
    var out = [];
    for (var i=0; i<node.childNodes.length; i++)
    {
        var child = node.childNodes[i];
        if (selected(child))
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
    flattenInlineNodes(document.body);
    document.body.normalize();
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
}

pageToTextBlocks();

}(window));