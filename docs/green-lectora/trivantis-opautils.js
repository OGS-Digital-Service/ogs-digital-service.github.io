try{
   
   var trivActualSetTimeout = window.setTimeout;
   var trivActualSetInterval = window.setInterval;
   var trivTimeoutIds = {};
   var trivIntervalIds = {};
   window.setTimeout = function( callback, time ) {
       
       if( typeof(callback) != 'function' && typeof(callback) != 'string' )
               trivActualSetTimeout.apply(this, arguments );//abort
           
       var params = [];
       if( arguments.length > 2 ) 
           params = arguments.slice( 2, arguments.length-1 );
       var timeoutId = null;
       var trivCallBack = function( ){
           delete trivTimeoutIds[ timeoutId+"" ];
           if( typeof(callback) == 'function' ) 
           {
               callback.apply( this, params );
           }
           else if( typeof(callback) == 'string' )
           {
               eval( callback );
           }
       };
       timeoutId = trivActualSetTimeout( trivCallBack, time );
       trivTimeoutIds[ timeoutId+"" ] = timeoutId;
       return  timeoutId;       
   };
   
   window.setInterval = function(callback, time){
	   if( typeof(callback) != 'function' && typeof(callback) != 'string' )
               return trivActualSetInterval.apply(this, arguments );//abort
           
       var params = [];
       if( arguments.length > 2 ) 
           params = arguments.slice( 2, arguments.length-1 );
       var timeoutId = null;
       var trivCallBack = function( ){
           if( typeof(callback) == 'function' ) 
           {
               callback.apply( this, params );
           }
           else if( typeof(callback) == 'string' )
           {
               eval( callback );
           }
       };
       timeoutId = trivActualSetInterval( trivCallBack, time );
       trivIntervalIds[ timeoutId+"" ] = timeoutId;
	   
       return timeoutId;        
   };
   
   window.clearAllTimeouts = function(){
       for (var timeoutId in trivTimeoutIds) {
           if (trivTimeoutIds.hasOwnProperty(timeoutId)) {
               delete trivTimeoutIds[ timeoutId+"" ];
               window.clearTimeout( timeoutId );
           }
       }
   };
   
    window.clearAllIntervals = function(){
       for (var timeoutId in trivIntervalIds) {
           if (trivIntervalIds.hasOwnProperty(timeoutId)) {
               delete trivIntervalIds[ timeoutId+"" ];
               window.clearInterval( timeoutId );
           }
       }
   };
}    
catch(e){
   
}


function jsOpaUtils()
{

}

jsOpaUtils.createMediaElemPlayerYoutube = function (htmlVideoElem, options, jsObj)
{
	var mediaPlayerObj = null;
	if(jsObj.iType && jsObj.iType =='youtube')
	{
		mediaPlayerObj = new YT.Player('html5'+jsObj.name, 
		{
			height: jsObj.h,
			width: jsObj.w,
			videoId: jsObj.vID,
			playerVars: jsObj.ytVar,
			events: { 'onStateChange': jsObj.stateChange}		
		});
	}
	return mediaPlayerObj;
};

//Might have other functionality in the future
jsOpaUtils.setUpPage = function (pageObj, bRebuild)
{
	if(pageObj)
	{
		pageObj.iframe.contentWindow.SetPageDivID(pageObj.div.id);
		
		pageObj.iframe.contentWindow.RebuildPageLayerObj(bRebuild);
		
		if(bRebuild)
		{
			if(pageObj.iframe.contentWindow["loadVariables"])
				pageObj.iframe.contentWindow["loadVariables"]();
			
			if(pageObj.iframe.contentWindow["loadActions"])
				pageObj.iframe.contentWindow["loadActions"]();
			
			if(pageObj.iframe.contentWindow["UpdateIndicators"])
				pageObj.iframe.contentWindow["UpdateIndicators"]();
		}
		pageObj.iframe.contentWindow.RebuildPageLayerObj(bRebuild);
		
		pagePlayer.updatePlayerDIVs(pageObj.div, pageObj.iframe.contentWindow["pageLayer"]);
	}
};

jsOpaUtils.setupPreloadedPage = function (pageObj)
{
	if(pageObj)
	{
		if(pageObj.iframe.contentWindow.location.href.indexOf(pageObj.name)>-1 && pageObj.iframe.contentDocument.readyState == 'complete')
		{
			jsOpaUtils.setUpPage(pageObj, false);
			window.removeEventListener("resize", pageObj.iframe.contentWindow.changeSize);
			jsOpaUtils.stopMedia(pageObj);
		}
		else
		{
			var THIS = this;
			setTimeout( function(){THIS.setupPreloadedPage(pageObj);}, 100);
		}
	}
};

jsOpaUtils.completeRCDLoad = function (pageObj)
{
	if(pageObj)
	{
		if(pageObj.iframe.contentWindow.bTrivResponsive)
		{
			pageObj.iframe.contentWindow.SaveStyles(pageObj);
			if(is.iOS)
			{
				window.addEventListener("orientationchange", pageObj.iframe.contentWindow.changeSize);
				window.addEventListener("resize", pageObj.iframe.contentWindow.barHidden);
			}
			else {
				window.addEventListener("resize", function(){
					
					var cw = pageObj.iframe.contentWindow;
					if (cw && cw.changeSize)
						cw.changeSize();
					else if (window.console) console.error('pageObj.iframe.contentWindow.changeSize() not found');
					
					if (cw && cw.ReFlow)
						cw.ReFlow();
					else if (window.console) console.error('pageObj.iframe.contentWindow.ReFlow() not found');
					
				});					
			}
		}
	}
};

jsOpaUtils.removeRCDListener = function (prevPage)
{
	if(prevPage)
	{
			if(prevPage.iframe.contentWindow.bTrivResponsive)
			{
				if(is.iOS)
				{
					window.removeEventListener("orientationchange", prevPage.iframe.contentWindow.changeSize);
					window.removeEventListener("resize", prevPage.iframe.contentWindow.barHidden);
				}
				else
					window.removeEventListener("resize", prevPage.iframe.contentWindow.changeSize);
			}
	}
};

jsOpaUtils.resolveRCDSetup = function (currPage, prevPage)
{
	if(currPage)
	{
		if(currPage == prevPage)
		{
			setTimeout( function(){jsOpaUtils.resolveRCDSetup(pagePlayer.activePage, prevPage);}, 100);
		}
		else
		{
			if(currPage.iframe.contentWindow.bTrivResponsive)
			{
				window.removeEventListener("resize", prevPage.iframe.contentWindow.changeSize);
				window.addEventListener("resize", currPage.iframe.contentWindow.changeSize);
			}
		}
	}
};

jsOpaUtils.stopMedia = function (pageObj)
{
	if(pageObj)
	{
		var tmpAr = pageObj.iframe.contentWindow.arObjs;
		for (var index = 0; index < tmpAr.length; index++)
		{
			//Check if the objects exist
			if(tmpAr[index].objLyr)
			{
				if(!tmpAr[index].bInherited && tmpAr[index].timerVar == null)
					tmpAr[index].actionStop();
			}
			else
			{
				setTimeout(function(){jsOpaUtils.stopMedia(pageObj);}, 150);
				return;
			}
		}
	}
};

//Remove Listeners for objects that are going away, currently only doing for media
jsOpaUtils.removeListeners = function (pageObj)
{
	if(pageObj)
	{
		var tmpAr = pageObj.iframe.contentWindow.arObjs;
		for (var index = 0; index < tmpAr.length; index++)
		{
			//Check if the objects exist
			if(tmpAr[index].objLyr)
			{
				//If it is a media object then remove the event listeners
				if(typeof(pageObj.iframe.contentWindow["ObjMedia"]) != 'undefined' && tmpAr[index].constructor == pageObj.iframe.contentWindow["ObjMedia"])
				{
					//If mediaEle remove all listeners
					if(tmpAr[index].bMediaEle)
					{
						if (! (tmpAr[index].bNeedPool && is.isMobile.any() && isSinglePagePlayerAvail()) ) // listeners handled by the media pool code
							tmpAr[index].removeAllMediaListeners();
					}
				}
				
			}
		}
	}
};

jsOpaUtils.doTransition = function (objLayer, out, tData)
{
	var transD = null;
	if(typeof(tData) != "undefined")
		transD = tData;
	else
		transD = objLayer.transData;
	
	//LD-4647 --These two transitions are a special case.
	if((transD.tNum == 16 || transD.tNum == 14) && out)
	{
		objLayer.doTrans(out?1:transD.tOut,
						 34, 5,
						 null, transD.ol,
						 transD.ot, transD.fl,
						 transD.ft, transD.fr,
						 transD.fb, transD.il,
						 transD.eff, transD.tb);
	}
	else
	{
		objLayer.doTrans(out?1:transD.tOut,
						 transD.tNum, transD.dur,
						 transD.fn, transD.ol,
						 transD.ot, transD.fl,
						 transD.ft, transD.fr,
						 transD.fb, transD.il,
						 transD.eff, transD.tb);
	}
};

jsOpaUtils.createInitClickDiv = function (trivpage)
{
	var nDiv = document.createElement('div');
	var style = nDiv.style;
	nDiv.setAttribute('id', "initClickDiv");
	style.position = 'absolute';
	style.backgroundColor = 'rgb(77, 77, 77)';
	style.opacity = '.9';
	style.width = '100%';
	style.height = '100%';
	style.top = '0px';
	style.left = '0px';
	style.textAlign = 'center';
	style.zIndex = 999999;
	nDiv.onclick = function()
	{
		jsOpaUtils.createPooledMedia();

		triv$('#initClickDiv').remove();

		if ( trivpage ) trivpage();

	};
	var pTag = document.createElement('span');
	pTag.innerHTML = trivstrAUTO;
	style = pTag.style;
	style.color = 'white';
	style.right = '0%';
	style.width = '100%';
	style.position = 'relative';
	style.top = '20%';
	style.fontSize= '36pt';
	nDiv.appendChild(pTag);
	document.body.appendChild(nDiv);
};

jsOpaUtils.createPooledMedia = function()
{
	var mediaPoolDiv = document.getElementById('mediaPool');

	function addMedia(count, tagName)
	{
		for ( var i = 0; i < count; i++ )
		{
			var elem = document.createElement(tagName);

			jsOpaUtils.remapEventFunctions(elem);

			triv$(elem).attr('preload', 'none');
			triv$(elem).attr('playsinline', '');	// LO-4443
			triv$(elem).attr('trivpool', tagName + (i+1));

			var source = document.createElement('source');
			triv$(source).attr('src', 'media/blank.mp4');

			var trackSrc = document.createElement('track');
			triv$(trackSrc).attr('srclang', 'en');
			triv$(trackSrc).attr('kind', 'subtitles');

			elem.appendChild(source);
			elem.appendChild(trackSrc);
			mediaPoolDiv.appendChild(elem);

			elem.load();	// needs to do something on user gesture event
		}
	}

	if ( mediaPoolDiv )
	{
		var audioCount = window.audioPoolCount || 0,
			videoCount = window.videoPoolCount || 0,
			t1 = new Date().getTime(),
			t2;

		addMedia(audioCount, 'audio');
		addMedia(videoCount, 'video');

		t2 = new Date().getTime();

		//if ( window.console )
		//	console.log('Created media pool; audio: ' + audioCount + ', video: ' + videoCount + '; took ' + (t2-t1));
	}
	return;
};

// Needed for pooled audio/video elements to be cleaned up when putting them back in the pool.
jsOpaUtils.remapEventFunctions = function(element)
{
	element.addEventListenerORIG = element.addEventListener;
	element.addEventListener = function(type, listener, opt1, opt2)
	{
		element.addEventListenerORIG(type, listener, opt1, opt2);

		element.__listeners = element.__listeners || [];
		element.__listeners.push( { 'type': type, 'listener': listener } );
	};
};

jsOpaUtils.playAutoStartMedia = function(trivpage)
{
/*if(!pagePlayer.bFirstClickGrabbed && is.isMobile.any())
	{
		jsOpaUtils.createInitClickDiv(trivpage);
		return;
	}
*/
	if(!is.isMobile.any()){
		var bkAudio = getDisplayDocument().getElementsByTagName("audio");
			for(var idx = 0; idx < bkAudio.length; idx++)
			{
				if(bkAudio[idx] && bkAudio[idx].id.indexOf("BkAudio") > -1)
					bkAudio[idx].play();
			}
	}else{
		var arPoolItems = getDisplayDocument().querySelectorAll("[trivpool]");
		for(var idx = 0; idx < arPoolItems.length; idx++)
			{
				var mediaElem = arPoolItems[idx];
				if(mediaElem.autoplay){
					if(mediaElem.player)
						mediaElem.player.play();
					else{
						mediaElem.play();
					}
				}
			}
	}



};

jsOpaUtils.cleanUpBkAudio = function(thePage)
{
	if(thePage && thePage.iframe && thePage.iframe.contentWindow)
	{
		//Verifying that this page has background audio
		var arobjs = thePage.iframe.contentWindow.arObjs;
		for(var idx = 0; idx < arobjs.length; idx++)
		{
			if(arobjs[idx].bBkAudio)
			{
				return;
			}
		}
		//If we dont, we need to clean up any existing audio
		var arBodyChild = getDisplayDocument().body.children;
		for(idx = 0; idx < arBodyChild.length; idx++)
		{
			if(arBodyChild[idx].id.indexOf("BkAudio") > -1)
			{
				if(arBodyChild[idx].getAttribute("trivpool"))
				{
					this.checkInMediaElement(arBodyChild[idx]);
					return;
				}
				else
				{
					getDisplayDocument().body.removeChild(arBodyChild[idx]);
				}
			}
		}
	}
};

jsOpaUtils.checkInMediaElement = function(mediaElem)
{
	mediaElem = mediaElem.get ? mediaElem.get(0) : mediaElem;		// in case it's jQuery object, make it a DOM element
	var idSave = mediaElem.id;

	var checkedIn = f;
	var mediaPoolDiv = triv$('#mediaPool', getDisplayDocument().body);
	if ( mediaPoolDiv[0] )
	{
		triv$('source', mediaElem).remove();
		triv$('track', mediaElem).remove();
		triv$(mediaElem).removeAttr('id name src style controls hidden autoplay loop');

		if ( mediaElem.__listeners ) for ( var i = 0; i < mediaElem.__listeners.length; i++ )
		{
			var listn = mediaElem.__listeners[i];
			mediaElem.removeEventListener(listn.type, listn.listener);
		}
		delete mediaElem.__listeners;

		triv$(mediaElem).appendTo(mediaPoolDiv);
		var source = document.createElement('source');
		source.src = 'media/blank.mp4';

		var track = document.createElement('track');
		triv$(track).attr('srclang', 'en');
		triv$(track).attr('kind', 'subtitles');

		triv$(source).appendTo(mediaElem);
		triv$(track).appendTo(mediaElem);
		checkedIn = t;
	}

	// Clean up... delete the attributes that ME player added
	var tagName = mediaElem.tagName.toLowerCase();
	var arAttrs  = mediaElem.parentElement.__origAttribs && mediaElem.parentElement.__origAttribs[tagName];
	for ( var x in mediaElem )
	{
		if ( triv$.inArray(x, arAttrs) == -1 )
		{
			delete mediaElem[x];
			//if ( window.console )
			//	console.log('cleaning up after ME, id: [' + idSave + '], deleted attrib: ' + x);
		}
	}

	return checkedIn;
};

jsOpaUtils.refreshObjects = function(pageObj)
{
	if(pageObj.iframe.contentWindow.bPageLoaded && pageObj.iframe.contentWindow.bLoadedVariables)
	{
		var arObj = pageObj.iframe.contentWindow.arObjs;
		for(var index = 0; index < arObj.length; index++)
		{
			arObj[index].refresh();
		}
		//There is a posibility that an action will act on an objects that needs to be refreshed first
		//So moved the loadActions function call to happen after the refresh
		if(pageObj.iframe.contentWindow["loadActions"])
			pageObj.iframe.contentWindow["loadActions"]();
	}
	else
		setTimeout(function(){jsOpaUtils.refreshObjects(pageObj);},100);
};

jsOpaUtils.rvPage = function(pageObj)
{
	if(pageObj.iframe.contentWindow.bPageLoaded  && pageObj.iframe.contentWindow.bLoadedVariables)
	{
		jsOpaUtils.refreshObjects(pageObj);
		var arObj = pageObj.iframe.contentWindow.arObjs;
		for(var index = 0; index < arObj.length; index++)
			arObj[index].rv();
		
		pageObj.iframe.contentWindow.writeStyleSheets(arObj);
		
		if(pageObj.iframe.contentWindow["loadActions"])
			pageObj.iframe.contentWindow["loadActions"]();
	}
	else
		setTimeout(function(){jsOpaUtils.rvPage(pageObj);},100);	
};

//Helper function for preload
jsOpaUtils.cleanUpDestStr = function(pageStr)
{
	if(pageStr)
	{
		pageStr = pageStr.split(",")[0];
		pageStr = pageStr.replace("'","");
		pageStr = pageStr.replace("'","");
		pageStr = pageStr.trim();
	}
	
	return pageStr;
};

jsOpaUtils.createMediaPoolDiv = function()
{
	var poolDiv = document.createElement('div');
	poolDiv.style.visibility = "hidden";
	poolDiv.id = "mediaPool";
	poolDiv.style.zIndex = 0;
	document.body.appendChild(poolDiv);
	return poolDiv;
};

jsOpaUtils.createMediaElemPlayer = function (htmlVideoElem, options)
{
	if (typeof(window.parent) == 'undefined' && getDisplayWindow()==window)
		window.parent = window;

	return triv$(htmlVideoElem).mediaelementplayer(options)[0];
};