// ==UserScript==
//
//Displayable Name of your script 
// @name           Freak.no custom frontpage 
//
// brief description
// @description    Removes unwanted sections from frontpage. 
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      https://github.com/etse
//
// Your name, userscript userid link (optional)   
// @author         Etse
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       https://github.com/etse
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        *freak.no/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @history        1.0 first version
//
// ==/UserScript==

var bannedTopics = ["Kjøp av maskinvare", "Rusforum", "Rusmidler", "Rusdebatt", "Rusrapporter", "Utvalgte rusforumtråder", "Research Chemicals", "Legal highs"];  


function inList(myList, value)
{
    for(var x=0; x<myList.length; x++)
    {
        if(value.indexOf(myList[x]) !== -1)
            return true;
    }
    return false;
}


function removeFromFrontpage()
{
	old_tbody = document.getElementById("collapseobj_module_5");
	var rows = document.getElementById("collapseobj_module_5").childNodes;

	for(var i=rows.length-1; i >= 0 ; i--)
	{
		var child = rows[i];
		if(child.childNodes.length < 13)
			continue;

		for(var j=0; j < child.childNodes.length; j++)
		{
			if(child.childNodes[j].nodeName == "#text")
				continue;
				
			if((child.childNodes[j].hasAttribute("title")))
			{
				if(inList(bannedTopics, child.childNodes[j].title))
				{
					old_tbody.removeChild(child);
				}
				break;
			}
		}
	}
}

function removeFromSearchPage()
{
	var table = document.getElementById("threadslist");
	var elementsToRemove = [];
	if(table == null)
		return

	var linktags = document.getElementById("threadslist").getElementsByTagName("a");
	for(var i=linktags.length-1; i >= 0 ; i--)
	{
		if(inList(bannedTopics, linktags[i].innerText))
			elementsToRemove.push(linktags[i].parentNode.parentNode);
	}

	for(var i=0; i < elementsToRemove.length; i++)
		table.childNodes[1].removeChild(elementsToRemove[i]);
}


if (location.pathname == "/")
	removeFromFrontpage();
else if (location.pathname == "/forum/search.php")
	removeFromSearchPage();
		
