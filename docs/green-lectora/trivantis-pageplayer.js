var t = true;
var f = false;
var n = null;
var u = undefined;

var arDomEvents = 
[
// see webtoraAppl.prototype.cleanDOMNode for list
	'onclick',
	'oncontextmenu',
	'ondblclick',
	'onkeydown',
//	'onload',
	'onmousedown',
	'onmousemove',
	'onmouseup',
//	'onresize',
//	'onunload',
	n
];

var arDomFunctSafe = 
[
	'outerWidth',
	'outerHeight',
	'screenX',
	'screenY',
	'is'
];

var arSkipAttrs =
[
 	'webkitIndexedDB',
 	'sessionStorage',
 	'webkitStorageInfo'
 ];
/*
 * Global functions needed:
 *   - loadTrivPage(pageName, containerDiv)
 */

function jsPagePlayer()
{
	this.activePage = n;
	this.arLoadedPages = [];
	this.window = window;
	this.document = document;
	this.bFirstClickGrabbed = false;
	this.bkAudioObj = n;
	this.inheritedDiv = n;
	this.autoAudioObj = n;
	this.autoVideoObj = n;
	this.iPageCap = 5;
	this.bAllowPreload = false;
	this.bLoadingPage = false;
	this.timeoutArr = [];
	this.timeoutCap = 100;
	this.bFirstPage = true;
	this.bSkipFlag = false;
}

jsPagePlayer.prototype.togglePreload = function(bPreload, pgCap)
{
	if(typeof pgCap == 'undefined')
		pgCap = 5;//Default value
	
	this.bAllowPreload = bPreload;
	this.iPageCap = pgCap;
};

jsPagePlayer.prototype.loadPoolDiv = function(numAudioPool, numVideoPool)
{
	var poolDiv = jsOpaUtils.createMediaPoolDiv();
	//Initialize audio pool items
	for(index = 1; index <= numAudioPool; index++)
	{
		var tmpDiv = document.createElement("audio");
		tmpDiv.setAttribute("trivpool","audio" + index);
		var tmpSrc = document.createElement("source");
		tmpSrc.setAttribute("src","media/blank.mp4");
		tmpDiv.appendChild(tmpSrc);
		poolDiv.appendChild(tmpDiv);
	}
	//Initialize video pool items
	for(index = 1; index <= numVideoPool; index++)
	{
		var tmpDiv = document.createElement("video");
		tmpDiv.setAttribute("trivpool","video" + index);
		var tmpSrc = document.createElement("source");
		tmpSrc.setAttribute("src","media/blank.mp4");
		tmpDiv.appendChild(tmpSrc);
		poolDiv.appendChild(tmpDiv);
	}
};

/**
 * If pageName is not given, global variable firstPageName must be specified.
 */
jsPagePlayer.prototype.loadPage = function(pageName, cb)
{
	var THIS = this;
	pageName = pageName || firstPageName;

	if(this.revertPublish())
		window.location.href = pageName;

	this.bLoadingPage = true;
	
	var trivPage = THIS.getLoadedPage(pageName);
	
	if(trivPage == u)
		if(this.arLoadedPages.length == this.iPageCap)
			this.cleanupLoadedPages();
		
	
	if ( trivPage == u )
	{
		trivPage = new jsPage(pageName);
		trivPage.loadPage(pageName, function(thePage) { if ( cb ) cb(arguments); });
		THIS.addPage(trivPage);
	}
	return trivPage;
};

//Update the browser title bar
jsPagePlayer.prototype.updateTitleBar = function(page)
{
	var playerTitle = document.getElementsByTagName("title");
	var pgTitle = page.iframe.contentDocument.getElementsByTagName("title");
	if(pgTitle.length > 0)
		playerTitle[0].text = pgTitle[0].text;
};

//In the case the browser might not support what we are trying to do
//such as IE8 and below
jsPagePlayer.prototype.revertPublish = function()
{
	var name = navigator.appName
	var ua = navigator.userAgent.toLowerCase();
	var v;
	var ie;
	var revert = false;
    if(name=="Netscape") 
		name = "ns";
	else if(name=="Microsoft Internet Explorer") 
		name = "ie";
	v = parseInt(navigator.appVersion,10);
    ie = (name=="ie" && v>=4);
	if(ie && (document.documentMode == 9 || document.documentMode == 8 || document.documentMode == 7 || document.documentMode == 6 || document.documentMode == 5))
		revert = true;
		
	return revert;
};

jsPagePlayer.prototype.pageIsCrossDomain = function( thePage )
{
	var bCrossDomain = false;
	try{
		var doc = thePage.iframe.contentDocument || thePage.iframe.contentWindow.document;
	}
	catch(e){
		bCrossDomain = true;
	}
	
	return bCrossDomain;
};

jsPagePlayer.prototype.gotoPageSkip = function (pageName)
{
	this.bSkipFlag = false;
	var h = location.href.split('?')[0] + '?jmptopg=' + pageName;
	location.href = h;
}

jsPagePlayer.prototype.gotoPage = function ( pageName, noHist )
{
	if(this.bLoadingPage)
		return;
	
	if (is.isMobile.any())
		this.checkInMediaPool();
	
	var THIS = this, thePage,
		curPageName = window.currentPage ? window.currentPage.name : n;

	var prevPage = window.currentPage;
	if(comparePageNameAndScroll( pageName, curPageName))
		return;
	
	thePage = this.getLoadedPage(pageName);
	
	jsOpaUtils.removeRCDListener(prevPage);
	
	this.updateWindowValues(prevPage);
	
	var dir = THIS.getPgTransDir(curPageName, pageName);
	
	if( window.currentPage && window.currentPage.iframe && window.currentPage.iframe.contentWindow.finish && (is.webkit && !is.iOSSafari))
		window.currentPage.iframe.contentWindow.finish();
	
	//Clear all possible callbacks on the current page
	window.clearAllTimeouts();
	window.clearAllIntervals();
	
	window.currentPage = n;
	
	if ( thePage == u )
		thePage = THIS.loadPage(pageName, function() {
				
			if( THIS.pageIsCrossDomain( thePage ) )
			{
				window.location.href = pageName;
				return;
			}
			else if( pageIsUsingWebAddress (thePage.name))
			{
				window.location.href = pageName;
				return;
			}
			
			if( window.history && window.history.pushState && window.history.replaceState )
			{
				if(curPageName && !noHist && history.state && history.state.status)
					window.history.pushState(history.state , "", "" );
				
				//Add History
				histPageName = pageName;
				var statusObj = {  status: histPageName };
				window.history.replaceState(statusObj , "", "" );
			}

			//jsOpaUtils.prepBackgroundAudio(prevPage , thePage);
			thePage.showPage(THIS.getPgTransDir(curPageName, pageName));
			THIS.inheritanceCheck(prevPage, thePage, dir);
		});
	else{
		thePage.showPage(dir);
	}
		
	
	
	window.currentPage = thePage;
	this.activePage = thePage;
	
};
/*
*This function moves the pool element back into the mediapool div
*
*/
jsPagePlayer.prototype.checkInMediaPool = function ()
{
	var arPoolItems = getDisplayDocument().querySelectorAll("[trivpool]")
	var mediaPoolDiv = getDisplayDocument().getElementById("mediaPool")
	for (idx = 0; idx < arPoolItems.length; idx++)
	{
		var mediaElem = arPoolItems[idx];
		delete mediaElem.player;
		var par = mediaElem.parentElement;
		//We dont need to check in elements that are not checked out
		//We will also let background audio fall through as it will be
		if(par.id == "mediaPool" || mediaElem.id.indexOf("BkAudio") > -1)
			continue;
		//Remove not needed attributes
		triv$(mediaElem).removeAttr('id name src style controls hidden autoplay loop');

		//LD-6017 remove track child element
		triv$('track', mediaElem).remove();
		// Add blank source back to the element
		triv$('source', mediaElem).remove();
		mediaPoolDiv.appendChild(mediaElem);

		var tmpSrc = document.createElement("source");
		tmpSrc.setAttribute("src","media/blank.mp4");

		var temptrack = document.createElement('track');
		triv$(temptrack).attr('srclang', 'en');
		triv$(temptrack).attr('kind', 'subtitles');

		mediaElem.appendChild(tmpSrc);
		mediaElem.appendChild(temptrack);
		
		if ( mediaElem.__listeners ) 
		{
			for ( var i = 0; i < mediaElem.__listeners.length; i++ )
			{
				var listn = mediaElem.__listeners[i];
				mediaElem.removeEventListener(listn.type, listn.listener);
			}
			mediaElem.__listeners.length = 0;
			delete mediaElem.__listeners;
		}
	}

};

jsPagePlayer.prototype.inheritanceCheck = function (prevPage, thePage, dir)
{
	if(prevPage)
	{
		if(thePage && thePage.iframe.contentWindow.arObjs && !this.bLoadingPage)
		{
			//this.verifyInheritedObjects(thePage);
			//Move inherited objects now before firing any transitions
			//this.moveInheritedObjects(prevPage);
			prevPage.hidePage(dir, thePage);
			//this.cleanUpInheritedObjects(thePage, prevPage);
		}
		else
		{
			var THIS = this; 
			setTimeout(function(){THIS.inheritanceCheck(prevPage, thePage, dir);},150);
		}
	}
};

jsPagePlayer.prototype.addPage = function (thePage)
{
	if ( this.getLoadedPage(thePage.name) == u )
		this.arLoadedPages.push(thePage);
};

jsPagePlayer.prototype.getLoadedPage = function (pageName)
{
	var thePage = n;
	for ( var i = 0; i < this.arLoadedPages.length; i++ )
	{
		if ( this.arLoadedPages[i].name == pageName )
		{
			thePage = this.arLoadedPages[i];
			break;
		}
	}
	return thePage;
};

jsPagePlayer.prototype.postPageShow = function(thePage)
{
	if(thePage.iframe.contentWindow.bPageLoaded)
	{
		jsOpaUtils.setUpPage(thePage, true);
		jsOpaUtils.cleanUpBkAudio(thePage);
		setTimeout(function(){jsOpaUtils.playAutoStartMedia(thePage);}, 200);
		
		window.scrollTo(0,0);

		var jumpToPage = getQueryParams().jmptopg;
		var scrollUrl = jumpToPage ? window.location.href : thePage.name;

		if (scrollUrl.indexOf("#") != -1)
		{
			var scrollTo =  scrollUrl.substring( scrollUrl.indexOf("#")+1, scrollUrl.length);
			if(scrollTo != "top")
				window.scroll(0,getTopofObj(document.getElementById(scrollTo)));
		}
		else
			setTimeout(function(){window.scrollTo(0,0);},300);
	}
	else
	{
		var THIS = this;
		setTimeout(function(){THIS.postPageShow(thePage);},500);
	}
};

jsPagePlayer.prototype.postPageHide = function(thePage)
{
	var THIS = this;
	if(thePage.div.style.visibility == 'hidden')
	{	
		thePage.removeStyleTags();

		if(!this.bAllowPreload)
			this.cleanupLoadedPages();
	}
	else
		setTimeout(function(){THIS.postPageHide(thePage);}, 300);
};

jsPagePlayer.prototype.updateIDPostHide = function(thePage, allChildren)
{
	var objChildren = null;
	for(var index = 0; index < allChildren.length; index++)
	{
		var ele = allChildren[index];
		if(typeof(ele.className) == "string")
			if(ele.className.indexOf('trivInherited')!=-1)
				continue;
		
			if(ele.nodeName.toLowerCase().indexOf("map") >-1)
				ele.name = ele.name?ele.name+thePage.idChange:"";
				
			ele.id = ele.id?ele.id+thePage.idChange:thePage.idChange;
			
			objChildren = ele.children || ele.childNodes;
			
			if(objChildren)
				this.updateIDPostHide(thePage, objChildren);
		
		//reset back to null
		objChildren = null;
	}
};

jsPagePlayer.prototype.updateIDForShow = function(thePage, allChildren)
{
	var objChildren = null;
	for(var index = 0; index < allChildren.length; index++)
	{
		var ele = allChildren[index];
		
		if(ele.nodeName.toLowerCase().indexOf("map") >-1)
			if(ele.name.indexOf(thePage.idChange) > -1)
				ele.name = ele.name.replace(thePage.idChange,"");
			
		if(ele.id && ele.id.indexOf(thePage.idChange) > -1) 
			ele.id = ele.id.replace(thePage.idChange,"");
		
		objChildren = ele.children || ele.childNodes;	
		if(objChildren)
			this.updateIDForShow(thePage, objChildren);
		
		//reset back to null
		objChildren = null;
	}
}

jsPagePlayer.prototype.createMediaElemPlayer = function (htmlVideoElem, options, jsObj)
{
    return jsOpaUtils.createMediaElemPlayer(htmlVideoElem, options, jsObj);
};

jsPagePlayer.prototype.createMEPlayer = function (htmlVideoElem, options, jsObj)
{
    return jsOpaUtils.createMediaElemPlayer(htmlVideoElem, options, jsObj);
};

jsPagePlayer.prototype.createMediaElemPlayerYoutube = function (htmlVideoElem, options, jsObj)
{
    return jsOpaUtils.createMediaElemPlayerYoutube(htmlVideoElem, options, jsObj);
};
jsPagePlayer.prototype.getPageIdx = function(pageName)
{
	for ( var i = 0; i < this.arLoadedPages.length; i++ )
	{
		if (this.arLoadedPages[i].name == pageName )
			return i;
	}
	return -1;
};

jsPagePlayer.prototype.getPageByDivID = function (divID)
{
	var page = null;
	for(var i = 0; i < this.arLoadedPages.length; i++)
	{
		if (this.arLoadedPages[i].div.id == divID )
		{
			page =  this.arLoadedPages[i];
			break;
		}
	}
	return page;
};

jsPagePlayer.prototype.getPgTransDir = function (currPageName, newPageName)
{
	var dir = 1;	// to higher page
	if (currPageName && newPageName)
		dir = this.getPageIdx(newPageName) > this.getPageIdx(currPageName) ? 1 : -1;
	return dir;
};

jsPagePlayer.prototype.trivOnFocus = function ()
{
	if(this.activePage)
		if(this.activePage.iframe.contentWindow.trivOnFocus)
			this.activePage.iframe.contentWindow.trivOnFocus();
};

jsPagePlayer.prototype.ReFlow = function ()
{
	if(this.activePage)
	{
		if(this.activePage.iframe.contentWindow.ReFlow)
			this.activePage.iframe.contentWindow.ReFlow();
		
		this.updatePlayerDIVs(this.activePage.div, this.activePage.iframe.contentWindow["pageLayer"]);
	}
};

jsPagePlayer.prototype.PrepPreloadPage = function (thePage)
{
	if(thePage)
	{
		jsOpaUtils.setupPreloadedPage(thePage);
	}
};

//Need to loop through all the loaded pages and see if it exists already
//this is called by the loading page
jsPagePlayer.prototype.checkForObjectExistance = function (objName)
{
	var div = null;
	var searchName = objName;
	if(this.arLoadedPages.length > 1)
	{
		for(var i = 0; i < this.arLoadedPages.length; i++)
		{
			searchName += this.arLoadedPages[i].idChange;
			div = document.getElementById(searchName);
			
			if(div)
				break;
			else
				searchName = objName;
		}
	}
	return div;
};

//Moves the objects from the page div to the inherited div
jsPagePlayer.prototype.moveInheritedObjects = function (thePage)
{
	if(thePage)
	{
		var ifr = thePage.iframe;
		var childrens = thePage.div.children || thePage.div.childNodes;
		for( var i = 0; i< childrens.length; i++)
		{
			var div = childrens[i];			
			if(div.className.indexOf("trivInherited") > -1)
			{
				//Make sure the object is aware that it is an inherited object
				var obj = div.id+"Object";
				if(obj.indexOf("ReflectionDiv") >-1)
					obj = obj.substring(0,obj.indexOf("ReflectionDiv"))+"Object"
				if(ifr.contentWindow[obj] && !ifr.contentWindow[obj].bInherited)
					ifr.contentWindow[obj].bInherited = true;
				
				//It is not part of the inherited div 
				if(this.inheritedDiv != div.parentElement)
				{
					this.inheritedDiv.appendChild(div);
					i--;
				}
			}
		}		
	}
};

//Verify that all the inherited objects were tagged
jsPagePlayer.prototype.verifyInheritedObjects = function (thePage)
{
	if(thePage)
	{
		var arObj = thePage.iframe.contentWindow.arObjs;
		if(arObj)
		{
			for( var i = 0; i< arObj.length; i++)
			{
				var obj = arObj[i];
				if(!obj.bInherited || obj.hasReflection)
				{
					//Clean up may be necessary if the div exists
					if(obj.div)
					{
						if(thePage.iframe.contentWindow.checkObjectInheritance(obj, false))
						{
							if(obj.div.parentElement && (obj.div.parentElement != this.inheritedDiv && obj.div.parentElement == thePage.div))
								obj.div.parentElement.removeChild(obj.div);
							if(obj.reflecDiv && obj.reflecDiv.parentElement && (obj.reflecDiv.parentElement != this.inheritedDiv && obj.reflecDiv.parentElement == thePage.div))
								obj.reflecDiv.parentElement.removeChild(obj.reflecDiv);
						}
					}
					
					obj.bInherited = thePage.iframe.contentWindow.checkObjectInheritance(obj);
				}
			}
		}
	}
};

/*Clean up the inherited objects so that they are not being kept in the 
inherited div when not needed*/
jsPagePlayer.prototype.cleanUpInheritedObjects = function (nxtPage, prevPage)
{
	if(nxtPage)
	{
		var childrens = this.inheritedDiv.children || this.inheritedDiv.childNodes;
		var ifr = nxtPage.iframe;
		for(var i = 0; i < childrens.length; i++)
		{
			var obj = childrens[i].id+"Object";
			if(obj.indexOf("ReflectionDiv") >-1)
				obj = obj.substring(0,obj.indexOf("ReflectionDiv"))+"Object"
			if(nxtPage.iframe.contentWindow[obj])
				continue;//Just go to the next item
			else
			{
				prevPage.div.appendChild(childrens[i]);//The Object does not exist in the page, so it should not have an element in the inherited div
				i--;
			}
		}
		
		//Ensure that all the objects that are inherited 
		childrens = document.getElementsByClassName("trivInherited");
		for( var i = 0; i< childrens.length; i++)
		{
			var div = childrens[i];			
			
			//Make sure the object is aware that it is an inherited object
			var obj = div.id+"Object";
			if(obj.indexOf("ReflectionDiv") >-1)
				obj = obj.substring(0,obj.indexOf("ReflectionDiv"))+"Object"
			if(ifr.contentWindow[obj])
			{
				//It is not part of the inherited div 
				if(this.inheritedDiv != div.parentElement)
				{
					this.inheritedDiv.appendChild(div);
					i--;
				}
			}				
		}
	}
};

//Used during delete of a page, make sure no one depends on the divs
jsPagePlayer.prototype.removeInheritanceLink = function(div, page){
	var bRemoved = false;
	if(page && div)
	{
		var arObjs;
		for(var index = 0; index < this.arLoadedPages.length; index++)
		{
			arObjs = null;
			var pg = this.arLoadedPages[index];
			if(pg == page)
				continue;
			
			arObjs = pg.iframe.contentWindow.arObjs;
			for(var objIndex = 0; objIndex < arObjs.length; objIndex++)
			{
				var obj = arObjs[index];
				if(obj.bInherited)
				{
					if(div == obj.div)
					{
						pg.div.appendChild(div);
						obj.bInherited = false;
						bRemoved = true;
					}
				}
			}
		}
	}
	return bRemoved;
};
/*Need to update the inherited div so that it contains the same
style as the page div*/
jsPagePlayer.prototype.updatePlayerDIVs = function (pgDiv, pgLayer){
	
	if(pgLayer && this.inheritedDiv)
	{
		if(!pgLayer.bInTrans)
		{
			var idx = this.timeoutArr.indexOf("updatePlayerDIVs");
			if(pgDiv)
			{
				for ( var i = 0; i < pgDiv.style.length; i++ )
				{
					var styleName = pgDiv.style[i];
					//Inherited div is always visible
					if(!this.validInheritStyle(styleName))
						continue;
					if(this.inheritedDiv.style[styleName] != pgDiv.style[styleName])
						this.inheritedDiv.style[styleName] = pgDiv.style[styleName];
				}
				this.inheritedDiv.style.display = '';//Reset display
				this.inheritedDiv.style.zIndex = '';//Reset z-index
				this.inheritedDiv.style.opacity = '';//Reset opacity
				if(idx >-1)
				{
					this.timeourArr.splice(idx, 1);
				}
			}
		}
		else
		{
			var obj = this.timeoutArr["updatePlayerDIVs"];
			var THIS = this;
			if(!obj)
			{
				var timeOutObj = {};
				timeOutObj.cb = setTimeout(function(){THIS.updatePlayerDIVs(pgDiv, pgLayer);}, 250);
				timeOutObj.name = "updatePlayerDIVs";
				timeOutObj.ct = 0;
				this.timeoutArr["updatePlayerDIVs"] = timeOutObj;
			}
			else
			{
				if(obj.ct == this.timeoutCap)
					return;
				else
				{
					obj.ct +=1;
					setTimeout(function(){THIS.updatePlayerDIVs(pgDiv, pgLayer);}, 250);
				}
			}
		}
	}
};

jsPagePlayer.prototype.validInheritStyle = function (styleName){
	var bValid = true;
	if(styleName.indexOf('visibility') >-1 || styleName.indexOf('background-image') >-1 || 
	   styleName.indexOf('background-repeat') >-1 || styleName.indexOf('background-size') >-1||
	   ( is.isMobile.any() && styleName.indexOf('left') >-1 ))
		bValid = false;
	
	return bValid;
};

//Update the values of the window on page change
jsPagePlayer.prototype.updateWindowValues = function(page){
	if(page)
	{
		var ifr = page.iframe;
		for (var funcIn in ifr.contentWindow)
		{
			var bContinue = false; 
			for ( var j in arDomFunctSafe )
			{
				if (funcIn == arDomFunctSafe[j])
					bContinue = true;
			}
			if(bContinue)
				continue;
			if(window[funcIn] == ifr.contentWindow[funcIn])
				window[funcIn] = u;
		}
		for ( var index in arDomEvents )
		{
			var handlerName = arDomEvents[index];
			if(window.document[handlerName])
			{
				window.document.removeEventListener(handlerName, window.document[handlerName]);
				window.document[handlerName] = n;
			}
		}
	}
};

//Clean up the array of loaded pages
jsPagePlayer.prototype.cleanupLoadedPages = function(){
	var activePgName = this.activePage.name;
	var index = 0;
	var delCount = 0;
	if(this.arLoadedPages.length == this.iPageCap)
	{
		
		for(index = 0; index < this.arLoadedPages.length; index++)
		{
			if(this.arLoadedPages[index].name == activePgName)
				break;
		}
		if(index >= this.arLoadedPages.length/2)
		{
				//Lets remove the first two pages
				for (var pgDel = 0; pgDel < index; pgDel++)
				{
					var pg = this.arLoadedPages[pgDel];
					pg.deletePage();
					this.arLoadedPages.splice(pgDel,1);
					pgDel--;
					delCount++;
					if(delCount == 2)
						break;
				}
		}
		else 
		{
			//Lets remove the last two pages
			for (var pgDel = this.arLoadedPages.length-1; pgDel > index; pgDel--)
			{
				var pg = this.arLoadedPages[pgDel];
				pg.deletePage();
				this.arLoadedPages.pop();
				pgDel = this.arLoadedPages.length;
				delCount++
				if(delCount == 2)
					break;
			}
		}
	}
	else
	{
		for(index = 0; index < this.arLoadedPages.length; index++)
		{
			if(this.arLoadedPages[index].name == activePgName)
				continue;
			else
			{
				var pg = this.arLoadedPages[index];
				pg.deletePage();
				this.arLoadedPages.splice(index,1);
				index--;
			}
		}
	}
};

// Returns the file name portion with the extension
function getBasePageName(pageName)
{
	var reMatch = pageName.match(/(.*)\..*/);
	return reMatch && reMatch.length > 0 ? pageName.match(/(.*)\..*/)[1] : pageName;
}

////////////////////////////////////////////////////////
// The page object
////////////////////////////////////////////////////////
function jsPage(pageName)
{
	this.name = pageName;
	this.nameNoEx = getBasePageName(this.name)
	this.arWindowHandlers = {};
	this.arBodyHandlers = {};
	this.cssName = pageName+"_CSS_";
	this.linkName = pageName+"_Link_";
	this.idChange = "_"+this.name;
	this.bkAudio = pageName.substr(0, pageName.indexOf("."))+"_BkAudio";
}

jsPage.prototype.loadPage = function(pageName, cb)
{
	var THIS = this,
		div = document.createElement('div'),
		ifr = document.createElement('iframe'),
		basePgName = getBasePageName(pageName),
		style = ifr.style;

	//LD-4467 --- Div will get unique id from page once loaded
	div.style.visibility = "hidden";
	div.style.display = "none";
	div.style.position = "absolute";
	div.style.overflow = "hidden";
	
	ifr.id = 'ifr_' + basePgName;
	ifr.name = ifr.id;
	ifr.scrolling = 'no';
	ifr.src = pageName;
	
	//Callback function for when the iframe is loaded, it does not imply the document is ready
	//for that use readyState == complete
	ifr.onload = function() 
	{ 
		if ( cb ) cb(THIS);
	};
	
	style.width = '100%';
	style.height = '100%';
	style.border = '0px';
	style.overflow = 'hidden';
	style.visibility = 'hidden';
	style.left = "0px";
	style.top = "0px";
	
	THIS.div = div;
	THIS.iframe = ifr;
	div.appendChild(ifr);
	document.body.insertBefore(div, document.body.firstChild);
};

// dir : 1 or -1
jsPage.prototype.showPage = function(dir)
{
	var THIS = this;
	var pageDiv = THIS.div;
	var ifr = THIS.iframe;
	var wndPage = ifr.contentWindow.GetCurrentPageDiv(true);
	var nodes = wndPage?wndPage.childNodes:null;
	
	pagePlayer.updateTitleBar(THIS);
	
	// Copy styles from iframe wndPage's to the top level pageDiv
	pageDiv.style.position = "";
	for ( var i = 0; i < wndPage.style.length; i++ )
	{
		var styleName = wndPage.style[i];
		pageDiv.style[styleName] = wndPage.style[styleName];
	}
	pageDiv.style.visibility = "hidden";
			
	//Update all the object ids
	var allChildren = pageDiv.children || pageDiv.childNodes;
	if(allChildren)
		pagePlayer.updateIDForShow(this, allChildren);
	
	//Copy styles from iFrame
	this.copyStyleTags()
	
	//This saves all the current styles for RCD switching
	jsOpaUtils.completeRCDLoad(THIS);
	
	//Adds a class to the div for the current page style
	ifr.contentWindow.applyPageCSSStyle(pageDiv);
	
	// Move all the object divs (tobjXX) from iframe wndPage to top level pageDiv
	if(nodes)
	{
		for(var i = nodes.length-1; i >= 0; i--)
		{
			var node = nodes[i];
			node.parentNode.removeChild(node);
			pageDiv.appendChild(node);
		}
	}
		
	// Move the event handlers from iframe wndPage to top level pageDiv
	THIS.arWindowHandlers = {};
	THIS.arBodyHandlers = {};
	for ( var i = 0; i < arDomEvents.length; i++ )
	{
		var handlerName = arDomEvents[i];
		if ( handlerName )
		{
			var handlerFn = ifr.contentWindow[handlerName];
			if ( handlerFn )
			{
				window[handlerName] = handlerFn;
				THIS.arWindowHandlers[handlerName] = handlerFn;
				ifr.contentWindow[handlerName] = u;
				console.log('patched window handler ' + handlerName);
			}
			
			handlerFn = ifr.contentDocument.body[handlerName];
			if ( handlerFn )
			{
				document.body[handlerName] = handlerFn;
				THIS.arBodyHandlers[handlerName] = handlerFn;
				ifr.contentDocument.body[handlerName] = u;
				console.log('patched body handler ' + handlerName);
			}
		}
	}
	
	//Copy over window functions
	for (var funcIn in ifr.contentWindow)
	{
		if(triv$.inArray(funcIn, arSkipAttrs) == -1 && !window[funcIn])
			window[funcIn] = ifr.contentWindow[funcIn];
	}
	
	//Explicitly set the is to be the iFrame's is
	window.is = ifr.contentWindow.is;
	
	if(pagePlayer.bAllowPreload)
		this.startPreload();
	
	pageDiv.style.visibility = "";
	pagePlayer.bLoadingPage = false;
	
	adjustAllObjectsForFixedPosition();

	pageDiv.style.visibility = "hidden"; //add
	pageDiv.style.display = "";
	if (ifr.contentWindow.ReFlow)  // add
		ifr.contentWindow.ReFlow();  // add
	pageDiv.style.visibility = ""; // add
	THIS.firePageTransition();
	pagePlayer.postPageShow(THIS);
	
	if( !this.bFirstPage )
		pageDiv.focus();//for screen readers
	
	this.bFirstPage = false;
};



jsPage.prototype.startPreload = function()
{
	var arrPgToLoad = [];
	if(!trivInTest)
	{
		for (var func in window)
		{
			if(typeof(window[func]) == "function")
			{
				var funcString = window[func].toString();
				if(funcString)
				{
					if(funcString.indexOf("trivExitPage") > -1)
					{
						var openBracket = funcString.indexOf("{");
						var closeBracket = funcString.lastIndexOf("}");
						funcString = funcString.substring(openBracket+1, closeBracket);
						var trivExit = funcString.indexOf("trivExitPage(");
						if(trivExit > -1)
						{
							var page = funcString.substring(funcString.indexOf("(",trivExit)+1, funcString.indexOf(")",trivExit));
							page = jsOpaUtils.cleanUpDestStr(page);
							//If the destination is in a function then go one call deeper
							if(page && page.indexOf("(") >-1)
							{
								if(page.indexOf(")") ==-1)
									page +=")";
								
								if(page.indexOf("ObjLayerActionExit()") != -1)
									continue;
								
								page = eval(page);
								page = jsOpaUtils.cleanUpDestStr(page)
							}
							
							if(page && page.indexOf(".") >-1)
							{
								if(arrPgToLoad.indexOf(page) == -1)
									arrPgToLoad.push(page);
							}
						}
						
					}
				}
			}
		}
	}
	var thePage = null;
	var cbFunc = function(){
		var pg = arguments[0];
		if(pg.length)
			pg = pg[0];
		
		if(pg)
		{
			var allChildren = pg.div.children || pg.div.childNodes;
			if(allChildren)
				pagePlayer.updateIDPostHide(pg, allChildren);
		}
	};
	
	if(arrPgToLoad.length > pagePlayer.arLoadedPages.length-1)
		arrPgToLoad.splice(pagePlayer.arLoadedPages.length, arrPgToLoad.length-pagePlayer.arLoadedPages.length-1);
	
	for(var index = 0; index < arrPgToLoad.length; index++)
	{
		//Stop preload once cap is reached
		if(pagePlayer.arLoadedPages.length == pagePlayer.iPageCap)
			break;
		thePage = pagePlayer.loadPage(arrPgToLoad[index], cbFunc);
		pagePlayer.PrepPreloadPage(thePage);
	}
};

jsPage.prototype.copyStyleTags = function(){
	var pageDiv = this.div;
	var ifr = this.iframe;
	var ifrHead = ifr.contentDocument.head;
	var ifrBody = ifr.contentDocument.body;
	var styleTags = ifrHead.getElementsByTagName('style');
	
	var idx = 0;
	//Copy the style tags first
	for ( var i = 0; i < styleTags.length; i++ )
	{
		var styTag = styleTags[i];
		var style = document.createElement('style');
		style.type = 'text/css';
		if(styTag.id)
			style.id = this.cssName+styTag.id;
		else
		{
			style.id = this.cssName+idx;
			idx++;
		}
		
		if(document.getElementById(style.id))
			style = document.getElementById(style.id);
		
		style.innerHTML = styTag.innerHTML;
		document.head.appendChild(style);
	}
	
	//Copy from the body as well
	styleTags = ifrBody.getElementsByTagName('style');
	for ( var i = 0; i < styleTags.length; i++ )
	{
		var styTag = styleTags[i];
		var style = document.createElement('style');
		style.type = 'text/css';
		if(styTag.id)
			style.id = this.cssName+styTag.id;
		else
		{
			style.id = this.cssName+idx;
			idx++;
		}
		
		if(document.getElementById(style.id))
			style = document.getElementById(style.id);
		
		style.innerHTML = styTag.innerHTML;
		document.head.appendChild(style);
	}
	
	//Copy link styles
	styleTags = ifrHead.getElementsByTagName('link');
	for ( var i = 0; i < styleTags.length; i++ )
	{
		var styTag = styleTags[i];
		if(styTag.rel !='stylesheet')
			continue;
		
		var style = document.createElement('link');
		style.rel = 'stylesheet';
		style.type = 'text/css';
		if(styTag.id)
			style.id = this.linkName+styTag.id;
		else
		{
			style.id = this.linkName+idx;
			idx++;
		}
		
		if(document.getElementById(style.id))
			style = document.getElementById(style.id);
		
		style.href = styTag.href;
		document.head.appendChild(style);
	}
};

jsPage.prototype.removeStyleTags = function(){
	var pageDiv = this.div;
	var styleTags = document.head.getElementsByTagName('style');
	
	var idx = 0;
	//Remove the style tags related to this page
	for ( var i = 0; i < styleTags.length; i++ )
	{
		var styTag = styleTags[i];
	
		if(styTag.id)
		{
			if(styTag.id.indexOf(this.cssName) == 0)
			{
				document.head.removeChild(styTag);
				i--;
			}
		}
	}
	
	//Remove link styles related to this page
	styleTags = document.head.getElementsByTagName('link');
	for ( var i = 0; i < styleTags.length; i++ )
	{
		var styTag = styleTags[i];
		if(styTag.rel !='stylesheet')
			continue;
		
		if(styTag.id)
		{
			if(styTag.id.indexOf(this.linkName) == 0)
			{
				document.head.removeChild(styTag);
				i--;
			}
		}
	}
};

// dir : 1 or -1
jsPage.prototype.hidePage = function(dir, nxtPage)
{
	var THIS = this;
	var pageDiv = THIS.div;
	var ifr = THIS.iframe;

	jsOpaUtils.stopMedia(this);
	jsOpaUtils.removeListeners(this);
	// Restore the event handlers for body and window in the iframe.
	for ( var handlerName in THIS.arBodyHandlers )
	{
		var handlerFn = THIS.arBodyHandlers[handlerName];
		THIS.iframe.contentDocument.body[handlerName] = handlerFn;
		console.log('restoring body event handler for [' + handlerName + ']');
	}
	for ( var handlerName in THIS.arWindowHandlers )
	{
		var handlerFn = THIS.arWindowHandlers[handlerName];
		THIS.iframe.contentWindow[handlerName] = handlerFn;
		console.log('restoring window event handler for [' + handlerName + ']');
	}
	
	var nxtPageFrm = nxtPage.iframe;
	
	if(nxtPageFrm.contentWindow.pageLayer && nxtPageFrm.contentWindow.pageLayer.transData)
		jsOpaUtils.doTransition(ifr.contentWindow.pageLayer, true, nxtPageFrm.contentWindow.pageLayer.transData);
	else if(ifr.contentWindow.pageLayer && ifr.contentWindow.pageLayer.transData)
		jsOpaUtils.doTransition(ifr.contentWindow.pageLayer, true);
	else
		this.div.style.visibility = "hidden";
	
	var fixDIV = getDisplayDocument().getElementById('fixDIV');
	if(fixDIV)
	{
		for(var index = fixDIV.childNodes.length - 1; index >= 0 ; index--)
		{
			fixDIV.removeChild(fixDIV.childNodes[index]);
		}
	}
	
	pagePlayer.postPageHide(THIS);
};

jsPage.prototype.deletePage = function()
{
	var childrens = this.div.children || this.div.childNodes;
	for(var index = 0; index < childrens.length; index++)
	{
		if(childrens[index].id && childrens[index].id.indexOf("trivInherited") >-1)
		{
			if(pagePlayer.removeInheritanceLink(childrens[index], this))
				index--;
		}
	}
	document.body.removeChild(this.div);
};

jsPage.prototype.firePageTransition = function(bOut)
{
	if(typeof(bOut) == 'undefined')
		bOut = false;
	
	//check to see if there is page transition data before doing transition
	if(this.iframe.contentWindow.bPageLoaded)
	{	
		if(this.iframe.contentWindow.pageLayer.transData)
			jsOpaUtils.doTransition(this.iframe.contentWindow.pageLayer, bOut);
		if(this.div.style.visibility == "hidden")
			this.div.style.visibility = "visible";
	}
	else
	{
		var THIS = this;
		setTimeout( function(){THIS.firePageTransition();}, 100);
	}
};

jsPage.prototype.pageShowComplete = function()
{
	var bShowComplete = false;
	//check to see if there is page transition data before doing transition
	if(this.iframe.contentWindow.bPageLoaded)
	{	
		if(!this.iframe.contentWindow.pageLayer.transData && this.div.style.visibility != "hidden")
			bShowComplete = true;
		else if(this.iframe.contentWindow.pageLayer.transData)
			if(!this.iframe.contentWindow.pageLayer.bInTrans)
				bShowComplete = true;	
	}
	
	return bShowComplete;
};

function getQueryParams(qs) {
	if( typeof(qs) == "undefined" || qs == null )
		qs = document.location.search;
	
	qs = qs.split("+").join(" ");

	var params = {}, tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}

	return params;
}


if( window.history && window.history.pushState && window.history.replaceState )
{
	window.onpopstate = function(event) {
		if(event.state.status)
		{
			setTimeout( function(){ pagePlayer.gotoPage( event.state.status, true ); }, 100 );
		}
	};
}

function getTopofObj (thisObj) {
	var curtop = 0;
    if (thisObj.offsetParent) {
        do {
            curtop += thisObj.offsetTop;
        } while (thisObj = thisObj.offsetParent);
    return [curtop];
    }
}

function comparePageNameAndScroll ( currPage , prevPage)
{
	
	if( currPage == n || prevPage == n)
		return false;
	else if ( currPage == prevPage )
		return true; 
	else 
	{
		var scroll = "";
		var prPageName = prevPage;
		var bReturn = false; 
		
		
		//Does the page require scrolling
		if(currPage.indexOf("#") != -1)
			scroll  = currPage.substring( currPage.indexOf("#")+1, currPage.length);
		
		//Previous page was scrolled need to clean up for name comparison
		if(prPageName.indexOf("#")!= -1)
			prPageName = prPageName.substring( 0, prPageName.indexOf("#") ); 
		
		if( currPage.indexOf (prPageName) == 0 || currPage.indexOf( '#' ) == 0 )
			bReturn = true;
		
		
		if(scroll != "" && bReturn)
		{
			if(scroll == "top")
				window.scrollTo(0,0);
			else
				window.scrollTo(0 , getTopofObj(document.getElementById(scroll)));
		}
		return bReturn;	
	}
}	

function pageIsUsingWebAddress( pageDest )
{
	if( pageDest.indexOf('http://')  != -1   || pageDest.indexOf('https://')  != -1 )
		return true;
	else
		return false;
}