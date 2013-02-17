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

var bannedTopics = ["Kjøp av maskinvare"];



function inList(myList, value)
{
    for(var x=0; x<myList.length; x++)
    {
        if(value.indexOf(myList[x]) !== -1)
            return true;
    }
    return false;
}

if (location.pathname == "/")
{
	old_tbody = document.getElementById("collapseobj_module_5");
	var rows = document.getElementById("collapseobj_module_5").childNodes;

	for(var i=rows.length-1; i >= 0 ; i--)
	{
		var child = rows[i];
		if(child.childNodes.length < 13)
			continue;

		var j;
		for(j=0; j < child.childNodes.length; j++)
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

if (location.pathname == "/forum/search.php")
	{
	var td = document.getElementsByTagName("td");
	//for loop? fuck that
	var i = td.length - 1;
	while (i >= 0)
		{
		if (inList(bannedTopics, td[i].innerHTML))
			td[i].parentNode.parentNode.removeChild(td[i].parentNode);
		i--;
		}
	}
		
