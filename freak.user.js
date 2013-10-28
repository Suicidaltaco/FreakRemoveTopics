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

var bannedTopics = ["Kjøp av maskinvare", "Rusforum", "Rusmidler", "Rusdebatt", "Rusrapporter", "Utvalgte rusforumtråder", "Research Chemicals", "Legal highs", "Rus på legemidler"];  


function inList(myList, value)
{
	if(myList.indexOf(value) != -1)
			return true;
	return false;
}

function getElementsToRemove(table)
{
	var linktags = table.getElementsByTagName("a");
	var elementsToRemove = [];

	for(var i=linktags.length-1; i >= 0 ; i--)
	{
		if(inList(bannedTopics, linktags[i].innerText))
			elementsToRemove.push(linktags[i].parentNode.parentNode);
	}

	return elementsToRemove;
}

function removeFromFrontpage()
{
	old_tbody = document.getElementById("collapseobj_module_5");
	var elementsToRemove = getElementsToRemove(old_tbody);

	for(var i=0; i < elementsToRemove.length; i++)
		old_tbody.removeChild(elementsToRemove[i].parentNode);
	}

function removeFromSearchPage()
{
	var table = document.getElementById("threadslist");
	if(table == null)
		return

	var elementsToRemove = getElementsToRemove(table.childNodes[1]);

	for(var i=0; i < elementsToRemove.length; i++)
		table.childNodes[1].removeChild(elementsToRemove[i]);
}

function removeFromKpPage() {
	var table = document.getElementsByTagName("tbody")[7];
	if(table == null)
		return

	var elementsToRemove = getElementsToRemove(table);

	for(var i=0; i < elementsToRemove.length; i++)
		table.removeChild(elementsToRemove[i]);	
}


if (location.pathname == "/")
	removeFromFrontpage();
else if (location.pathname == "/forum/search.php")
	removeFromSearchPage();
else if (location.pathname == "/forum/kvalitetspoeng.php")
	removeFromKpPage()

